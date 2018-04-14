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
    knowledgeFilePath = "./ts/players/Data/knowledge_" + this.PlayerEngineId + ".json";
    matchBoxes = Array<matchBox>();
    private moves = Array<move>();

    public CalculateMove = (currentBoard : board) : number => {
        let moveIndex = 0;
        let legalMoves = new Array<number>();
        let i = 0;
        let matchBox : matchBox = this.getMatcBox(currentBoard.position);
        if(!this.learingMode) moveIndex = this.selectMoveNoLearning(matchBox);
        return moveIndex;
    }

    public LearnFromGame = (completeGame : Array<board>) => {
        
        completeGame.forEach(board => {
            board.GameStatus
        });
    }

    public CheckResultForLearning = (lastBoard : board) : myResult => {
        if(lastBoard.GameStatus == gameStatuses.play) throw new Error("Error in playerMenance - LearnFromGame: Game not finished");
        if(this.playerMarker == markers.x){
            if(lastBoard.GameStatus == gameStatuses.oresign || lastBoard.GameStatus == gameStatuses.xwins) return myResult.win;
            else if(lastBoard.GameStatus == gameStatuses.xresign || lastBoard.GameStatus == gameStatuses.owins) return myResult.lost;
        }
        if(this.playerMarker == markers.o){
            if(lastBoard.GameStatus == gameStatuses.xresign || lastBoard.GameStatus == gameStatuses.owins) return myResult.win;
            else if(lastBoard.GameStatus == gameStatuses.oresign || lastBoard.GameStatus == gameStatuses.xwins) return myResult.lost;
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
        fileUtils.saveObjectToFile(this.knowledgeFilePath, this.matchBoxes)
    }

    public getMatcBox = (position : Array<markers>) : matchBox => {
        this.validatePosition(position);
        let matchBox = null;
        this.matchBoxes.forEach(existingMatchBox => {
            if(existingMatchBox.position.toString() === position.toString()){
                matchBox = existingMatchBox;
                return;
            }  
        });
        if (matchBox === null) matchBox = this.createNewMatchBox(position);
        this.validateMatchBox(matchBox);
        return matchBox;
    }

    public createNewMatchBox = (position : Array<markers>) : matchBox => {
        this.validatePosition(position);
        let newMatchBox = new matchBox();
        newMatchBox.position = position;
        // remove weigth for all illegal moves
        let w = this.initMoveWeight;
        let weights = [w,w,w,w,w,w,w,w,w ];
        let i = 0;
        position.forEach(marker => {
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
            if(matchBox.position[i] != markers.b && matchBox.weight[i] > 0 ) throw new Error("Validation error in MatchBox weight. Illegal move have weight");
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
            totalWeights += w
        });
        if(totalWeights < 1) return -1;
        let selectedWeightIndex = utils.randomInt(1,totalWeights);
        let currentTotalWeights = 0;
        for (let i = 0; i < matchBox.weight.length; i++) {
            currentTotalWeights = currentTotalWeights + matchBox.weight[i];
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

class move{
    public position: Array<markers>;
    myMove : number;
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