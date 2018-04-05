import {markers} from "./../../enums/markers";
import {board} from "./../../common/board";
// /// <reference path="./../common/position.ts" />


export interface iPlayer {
    readonly PlayerEngineId : number;
    readonly playerMarker : markers;
    readonly playerName : string;
    learingMode : boolean;
    Move(currentBoard : board): board;
    LearnFromGame(completeGame : Array<board>);
    
}