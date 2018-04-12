
// /// <reference path="./../enums/markers.ts" />
// /// <reference path="./../enums/gameStatuses.ts" />
import {markers} from "./../enums/markers";
import {gameStatuses} from "./../enums/gameStatuses";
import {board} from "./../common/board";
import {iPlayer} from "./../players/interfaces/iPlayer"

class statistics{
    playerXName : string = "";
    playerOName : string = "";
    playerXId : number = 0;
    playerOId : number = 0;
    firstMove : Array<board> = new Array<board>();
    playerNameToStart:string = "";
    playerXWins:number = 0;
    playerOWins:number = 0;
    playerXResigns: number =0;
    playerOResigns: number = 0;
    draws: number = 0;
    numberOfGames : number = 0;
}

export class matchStatistics{
    static _stats = new statistics();
    static get stats():statistics {
        return matchStatistics._stats;
    }

    public static initPlayers(player1 : iPlayer, player2 : iPlayer, playerToMoveFirst: iPlayer){
        if(player1.playerMarker == markers.x){
            matchStatistics.stats.playerXName = player1.playerName;
            matchStatistics.stats.playerXId = player1.PlayerEngineId;
            matchStatistics.stats.playerOName = player2.playerName;
            matchStatistics.stats.playerOId = player2.PlayerEngineId;
        }
        else{
            matchStatistics.stats.playerXName = player2.playerName;
            matchStatistics.stats.playerXId = player2.PlayerEngineId;
            matchStatistics.stats.playerOName = player1.playerName;
            matchStatistics.stats.playerOId = player1.PlayerEngineId;
        }
        if(playerToMoveFirst == player1) matchStatistics.stats.playerNameToStart = player1.playerName;
        else matchStatistics.stats.playerNameToStart = player2.playerName;
    } 
    
    public static setFirstMove = (firstBoard: board):void =>{
        matchStatistics.stats.firstMove.push(firstBoard);
    }
    public static updateResult = (finalBoard: board):void =>{
        if(finalBoard.GameStatus == gameStatuses.play) throw new Error("Error update final result. Game is not finished");
        matchStatistics.stats.numberOfGames ++;
        if(finalBoard.GameStatus == gameStatuses.xwins) matchStatistics.stats.playerXWins++;
        if(finalBoard.GameStatus == gameStatuses.owins) matchStatistics.stats.playerOWins++;
        
        if(finalBoard.GameStatus == gameStatuses.oresign){ 
            matchStatistics.stats.playerXWins++;
            matchStatistics.stats.playerOResigns++;
        }
        if(finalBoard.GameStatus == gameStatuses.xresign){ 
            matchStatistics.stats.playerXResigns++;
            matchStatistics.stats.playerOWins++;
        }
        

        if(finalBoard.GameStatus == gameStatuses.draw) matchStatistics.stats.draws++;

    }

    public static clearStatistics = () : void => {
        matchStatistics.stats.playerXWins = 0;
        matchStatistics.stats.playerOWins = 0;
        matchStatistics.stats.draws = 0;
        matchStatistics.stats.firstMove = null;
        matchStatistics.stats.numberOfGames = 0;
        matchStatistics.stats.playerNameToStart = "";
        matchStatistics.stats.playerOName = "";
        matchStatistics.stats.playerXName = "";
    }
}

