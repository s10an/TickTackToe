import {playerBase} from "./playerBase";
import {markers} from "./../enums/markers";
import {gameStatuses} from "./../enums/gameStatuses";
import {board} from "./../common/board";
import {utils} from "./../common/utils";

export class playerRandom extends playerBase  {

    readonly PlayerEngineId = 1000;

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

    public LearnFromGame = (finalGameResult : gameStatuses) => {
        // Implemet machine learning
    }

    public loadKnowledge = () : void => {
    }

    public saveKnowledge = () : void => {};


}