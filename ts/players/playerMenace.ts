import {playerBase} from "./playerBase";
import {markers} from "./../enums/markers";
import {board} from "./../common/board";
import {utils} from "./../common/utils";
import { fileUtils } from "../common/fileUtils";

export class playerMenace extends playerBase  {

    readonly PlayerEngineId = 1001;
    knowledgeFilePath = "knowledge" + this.PlayerEngineId + ".json";
    private readonly initMoveWeight = 3;

    matchBoxes = Array<matchBox>();
    private moves = Array<move>();

    CalculateMove = (currentBoard : board) : number => {
        let moveIndex = 0;
        let legalMoves = new Array<number>();
        let i = 0;
        currentBoard.position.forEach(element => {
            if(element == markers.b) legalMoves.push(i);
            i ++;
        });
        let randomIndex = utils.randomInt(0, legalMoves.length-1);
        moveIndex = legalMoves[randomIndex];
        return moveIndex;
    }

    public LearnFromGame = (completeGame : Array<board>) => {
        // Go troug game and change weights
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

    // 2. add matchbox, test position not exist and run validate matchbox

    // 3. create matchboxes and run add?

    // 1. validate matchbox

    // 4. find matchbox if not exist create?

    // Select move noLearning (higest score)

    // Select move learning (random)

}

class move{
    public position: Array<markers>;
    myMove : number;
}

export class matchBox{
    public position: Array<markers>;
    public weight : Array<number>;
}