import {board} from "./common/board";
import {markers} from "./enums/markers";
import {iPlayer} from "./players/interfaces/iPlayer";
import {playerRandom} from "./players/playerRandom";
import {gameStatuses} from "./enums/gameStatuses";
import { matchStatistics } from "./common/matchStatistics";
import { fileUtils } from "./common/fileUtils";
import { dateTimeUtil } from "./common/dateTimeUtil";

// /// <reference path="./common/position.ts" />
// /// <reference path="./enums/markers.ts" />
// /// <reference path="./players/interfaces/iPlayer.ts" />
// /// <reference path="./players/playerRandom.ts" />
// /// <reference path="./enums/gameStatuses" />

export class matchEngine{
    readonly positionStart: Array<markers> = [
        markers.b, markers.b, markers.b,
        markers.b, markers.b, markers.b,
        markers.b, markers.b, markers.b
    ];

    public numberOfGames : number = 10;

    public StartTrainingMatch = () : void => {
        // set up players
        let player1 : iPlayer = new playerRandom(markers.x, "name1");
        let player2 : iPlayer = new playerRandom(markers.o, "name2");
        let playerToMoveFirst = player1;
        // Players turn to start
         matchStatistics.initPlayers(player1, player2, playerToMoveFirst);
        // play game
        for (let index = 0; index < this.numberOfGames; index++) {
            this.Play(player1, player2, playerToMoveFirst);
            this.switchStaringPlayer(player1, player2, playerToMoveFirst);
        }
        let dateTime = dateTimeUtil.getCurrentDateTime();
        fileUtils.saveObjectToFile("./data/matchdata."+dateTime+".json", matchStatistics.stats)
        console.log(matchStatistics.stats);
    }

    public Play = (player1: iPlayer, player2: iPlayer, playerToStart: iPlayer) : void =>
    {
        let currentBoard : board = new board(this.positionStart, playerToStart.playerMarker);
        let completeGame : Array<board> = [currentBoard];
        let playerToMove : iPlayer = playerToStart;
        let notGameOver = true;
        let isFirstMove = true;
        while(currentBoard.GameStatus == gameStatuses.play)
        {
            let newBoard = playerToMove.Move(currentBoard)
            if(isFirstMove) matchStatistics.setFirstMove(newBoard);
            isFirstMove = false;
            completeGame.push(newBoard);
            currentBoard = newBoard;
            newBoard = null;
            playerToMove = this.swichPlayerToMove(player1, player2, playerToMove);
        }
        matchStatistics.updateResult(currentBoard);
    }

    private swichPlayerToMove = (player1: iPlayer, player2: iPlayer, playerToMove: iPlayer) => {
        if(playerToMove == player1) return player2;
        else return player1;
    }

    private switchStaringPlayer = (player1, player2, playerWithLastFirstMove) => {
        if(playerWithLastFirstMove == player1) return player2; 
        return player2;
    }
}
