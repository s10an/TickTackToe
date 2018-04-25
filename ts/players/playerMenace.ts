import {playerBase} from "./playerBase";
import {markers} from "./../enums/markers";
import {gameStatuses} from "./../enums/gameStatuses";
import {board} from "./../common/board";
import {utils} from "./../common/utils";
import { fileUtils } from "../common/fileUtils";

export class playerMenace extends playerBase  {
    constructor(public readonly playerMarker : markers, public readonly playerName : string, public learingMode : boolean) {
        super(playerMarker, playerName, learingMode);
        this.loadKnowledge();
     }

    readonly PlayerEngineId = 1001;
    public readonly initMoveWeight = 3;
    public readonly winReward = 3;
    public readonly drawReward = 1;
    public readonly lostPunishment = 1;
    knowledgeFilePath = "./ts/players/Data/knowledge_" + this.PlayerEngineId + ".json";
    matchBoxes = Array<matchBox>();
    public moves = Array<move>();

    public CalculateMove = (currentBoard : board) : number => {
        let moveIndex = 0;
        let legalMoves = new Array<number>();
        let i = 0;
        let matchBox : matchBox = this.getMatcBox(currentBoard.position);
        if(!this.learingMode) moveIndex = this.selectMoveNoLearning(matchBox);
        else {
            moveIndex = this.selectMoveWithLearning(matchBox);
            let thisMove = new move(matchBox, moveIndex);
            this.moves.push(thisMove);
        }
        return moveIndex;
    }

    public LearnFromGame = (finalGameResult : gameStatuses) => {
        for (let i = 0; i < this.moves.length; i++) {
            if(this.moves[i].matchBox == undefined) throw new Error ("playerMenace LearnFromGame - Cant find MatchBox");
            let result = this.CheckResultForLearning(finalGameResult);
            if(this.moves[i].moveIndex != -1 && this.moves[i].matchBox.position[this.moves[i].moveIndex] != markers.b) throw new Error ("playerMenace LearnFromGame - Move index do not point to blank marker. index: " +this.moves[i].moveIndex + "position: " + this.moves[i].matchBox.position);
            if(result  == myResult.win){
                this.moves[i].matchBox.weight[this.moves[i].moveIndex] = this.moves[i].matchBox.weight[this.moves[i].moveIndex] + this.winReward;
            }
            else if(result == myResult.lost){
                this.moves[i].matchBox.weight[this.moves[i].moveIndex] = this.moves[i].matchBox.weight[this.moves[i].moveIndex] - this.lostPunishment;
            }
            else{
                this.moves[i].matchBox.weight[this.moves[i].moveIndex] = this.moves[i].matchBox.weight[this.moves[i].moveIndex] + this.drawReward;
            }
        }
        this.moves = [];
    }

    public CheckResultForLearning = (finalGameResult : gameStatuses) : myResult => {
        if(finalGameResult == gameStatuses.play) throw new Error("Error in playerMenance - LearnFromGame: Game not finished");
        if(this.playerMarker == markers.x){
            if(finalGameResult == gameStatuses.oresign || finalGameResult == gameStatuses.xwins) return myResult.win;
            else if(finalGameResult == gameStatuses.xresign || finalGameResult == gameStatuses.owins) return myResult.lost;
        }
        if(this.playerMarker == markers.o){
            if(finalGameResult == gameStatuses.xresign || finalGameResult == gameStatuses.owins) return myResult.win;
            else if(finalGameResult == gameStatuses.oresign || finalGameResult == gameStatuses.xwins) return myResult.lost;
        }
        return myResult.draw;
    }

    // load matchBoxes
    public loadKnowledge = () : void => {
        try{
            let loadedMatchBoxes = fileUtils.loadObjectFromFile(this.knowledgeFilePath);
            if(loadedMatchBoxes != null) this.matchBoxes = loadedMatchBoxes;
        }
        catch{
            // knoledge not found. Do nothing
        } 
    }
    // save matchboxes
    public saveKnowledge = () : void => {
        console.log(this.matchBoxes.length);
        fileUtils.saveObjectToFile(this.knowledgeFilePath, this.matchBoxes)
    }

    public getMatcBox = (position : Array<markers>) : matchBox => {
        this.validatePosition(position);
        let matchBox = null;
        for (let i = 0; i < this.matchBoxes.length; i++) {
            if(this.isIdenticalPositions(this.matchBoxes[i].position, position)){
                return this.matchBoxes[i];
            }  
        }
        matchBox = this.createNewMatchBox(position);
        this.validateMatchBox(matchBox);
        return matchBox;
    }

    private isIdenticalPositions = (position1 : Array<markers>, position2 : Array<markers>) : boolean => {
        for (let i = 0; i < position1.length; i++) {
            if(position1[i].toString() != position2[i].toString()){
                return false;
            }
        }
        
        return true;
    }

    public createNewMatchBox = (position : Array<markers>) : matchBox => {
        this.validatePosition(position);
        let newMatchBox = new matchBox();
        newMatchBox.position = position.slice();

        // remove weigth for all illegal moves
        let w = this.initMoveWeight;
        let weights = [w,w,w,w,w,w,w,w,w ];
        let i = 0;
        newMatchBox.position.forEach(marker => {
            if(marker != markers.b) weights[i] = -1;
            i ++;
        });
        newMatchBox.weight = weights;
        this.matchBoxes.push(newMatchBox);
        return newMatchBox;
    }

    public validatePosition = (position : Array<markers>) : void => {
        if(position.length != 9) throw new Error("Validation error in MatchBox position");
    }

    public validateMatchBox = (matchBox : matchBox) : void => {
        for (let i = 0; i < matchBox.position.length; i++) {
            if(matchBox.position[i] != markers.b && matchBox.weight[i] > 0 ){
                throw new Error("Validation error in MatchBox weight. Illegal move have weight");
            }
        }
    }

    // Select move noLearning (higest score)
    public selectMoveNoLearning = (matchBox : matchBox) : number =>{
        let move : number = -1;
        let candidateMoves = utils.indexesOfMax(matchBox.weight);
        if(candidateMoves.length == 0) move = -1;
        else if(candidateMoves.length == 1) move = candidateMoves[0];
        else move = candidateMoves[utils.randomInt(0,candidateMoves.length-1)];
        return move;
    }

    // Select move learning (random)
    public selectMoveWithLearning = (matchBox : matchBox) : number =>{
        let move : number = -10;
        let totalWeights : number = 0;
        matchBox.weight.forEach(w => {
            if (w > 0) totalWeights += w;
        });
        if(totalWeights < 1) return -1;
        let selectedWeightIndex = utils.randomInt(1,totalWeights);
        let currentTotalWeights = 0;
        for (let i = 0; i < matchBox.weight.length; i++) {
            if(matchBox.weight[i] > 0) currentTotalWeights = currentTotalWeights + matchBox.weight[i];
            if(this.checkSelectedWeight(selectedWeightIndex, currentTotalWeights)){
                if(matchBox.position[i] != markers.b) throw new Error("Error in playerMenance - selectMoveWithLearning: Illegal move selected");
                move = i;
                break;
            }
        }
        if (move == -10) throw  new Error("Error in playerMenance - selectMoveWithLearning: No move selected, and player dont resign");
        return move;
    }

    private checkSelectedWeight = (weightIndex : number, currentTotalWeights : number) : boolean => {
        if(weightIndex <= currentTotalWeights) return true;
        return false;
        
    }

    
    
}

export class move{
    constructor(public readonly matchBox : matchBox, public readonly moveIndex : number){}
}

export enum myResult{
    win,
    lost,
    draw
}

export class matchBox{
    public position: Array<markers>;
    public weight : Array<number>;
}