import {markers} from "./../../enums/markers";
import {board} from "./../../common/board";
// /// <reference path="./../common/position.ts" />


export interface iPlayer {
    readonly PlayerEngineId : number;
    readonly playerMarker : markers;
    readonly playerName : string;
    Move(currentBoard : board): board;
    MachineLearning(completeGame : Array<board>);
    
}