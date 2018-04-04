import {playerBase} from "./playerBase";
import {markers} from "./../enums/markers";
import {board} from "./../common/board";
import {utils} from "./../common/utils";

export class playerRandom extends playerBase  {

    readonly PlayerEngineId = 1;

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

    public MachineLearning = (completeGame : Array<board>) => {
        // Implemet machine learning
    }


}