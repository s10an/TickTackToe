
// /// <reference path="./../enums/markers.ts" />
// /// <reference path="./../enums/gameStatuses.ts" />
import {markers} from "./../enums/markers";
import {gameStatuses} from "./../enums/gameStatuses";
import {board} from "./../common/board";


export class matchStatistics{
    static _playerXName : string;
    static get playerXName():string {
        return matchStatistics._playerXName;
    }
    static set playerXName(name:string) {
        matchStatistics._playerXName = name;
    }
    
    static _playerOName : string;
    static get playerOName():string {
        return matchStatistics._playerOName;
    }
    static set playerOName(name:string) {
        matchStatistics._playerOName = name;
    }

    static _firstMove : Array<board> = new Array<board>();
    static get firstMove():Array<board> {
        return matchStatistics._firstMove;
    }

    static _playerNameToStart: string;
    static get playerNameToStart():string {
        return matchStatistics._playerNameToStart;
    }
    static set playerNameToStart(name:string) {
        matchStatistics._playerNameToStart = name;
    }
    
    static _playerXWins: number = 0;
    static get playerXWins():number {
        return matchStatistics._playerXWins;
    }
    static _playerOWins: number = 0;
    static get playerOWins():number {
        return matchStatistics._playerOWins;
    }
    static _draws: number = 0;
    static get draws():number {
        return matchStatistics._draws;
    }
    static _numberOfGames : number = 0; 
    static get numberOfGames():number {
        return matchStatistics._numberOfGames;
    }
    public static setFirstMove = (firstBoard: board):void =>{
        //console.log(firstBoard);
        matchStatistics._firstMove.push(firstBoard);
    }
    public static updateResult = (finalBoard: board):void =>{
        if(finalBoard.GameStatus == gameStatuses.play) throw new Error("Error update final result. Game is not finished");
        matchStatistics._numberOfGames ++;
        if(finalBoard.GameStatus == gameStatuses.xwins) matchStatistics._playerXWins++;
        if(finalBoard.GameStatus == gameStatuses.owins) matchStatistics._playerOWins++;
        if(finalBoard.GameStatus == gameStatuses.draw) matchStatistics._draws++;
    }

    public static clearStatistics = () : void => {
        matchStatistics._playerXWins = 0;
        matchStatistics._playerOWins = 0;
        matchStatistics._draws = 0;
        matchStatistics._firstMove = null;
        matchStatistics._numberOfGames = 0;
        matchStatistics._playerNameToStart = "";
        matchStatistics._playerOName = "";
        matchStatistics._playerXName = "";
    }
}