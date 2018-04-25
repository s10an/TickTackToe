import {board} from "./common/board";
import {markers} from "./enums/markers";
import {iPlayer} from "./players/interfaces/iPlayer";
import {playerRandom} from "./players/playerRandom";
import { playerMenace } from "./players/playerMenace";
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


    public numberOfGames : number = 10;

    public PlayMatch = (learingMode : boolean) : void => {
        // set up players
        let player1 : iPlayer = new playerRandom(markers.x, "name1", learingMode);
        let player2 : iPlayer = new playerMenace(markers.o, "the Menace", learingMode);
        let playerToMoveFirst = player1;
        // Players turn to start
         matchStatistics.initPlayers(player1, player2, playerToMoveFirst);
        // play game
        for (let index = 0; index < this.numberOfGames; index++) {
            let gameResult : gameStatuses = this.PlayGame(player1, player2, playerToMoveFirst);
            playerToMoveFirst = this.switchPlayer(player1, player2, playerToMoveFirst);
            if(learingMode){
                player1.LearnFromGame(gameResult);
                player2.LearnFromGame(gameResult);
            }
        }
        if(learingMode) player2.saveKnowledge();
        let dateTime = dateTimeUtil.getCurrentDateTime();
        fileUtils.saveObjectToFile("./data/matchdata."+dateTime+".json", matchStatistics.stats)
        
    }

    public PlayGame = (player1: iPlayer, player2: iPlayer, playerToStart: iPlayer) : gameStatuses =>
    {
        let currentBoard : board = board.GetStartBoard(playerToStart.playerMarker);
        let completeGame : Array<board> = [currentBoard];
        let playerToMove : iPlayer = playerToStart;
        let notGameOver = true;
        let isFirstMove = true;
        while(currentBoard.GameStatus == gameStatuses.play)
        {
            let newBoard = playerToMove.Move(currentBoard)
            //if(isFirstMove) matchStatistics.setFirstMove(newBoard);
            isFirstMove = false;
            completeGame.push(newBoard);
            currentBoard = newBoard;
            newBoard = null;
            playerToMove = this.switchPlayer(player1, player2, playerToMove);
        }
        matchStatistics.updateResult(completeGame, playerToStart);
        return currentBoard.GameStatus;
    }

    public switchPlayer = (player1, player2, currentPlayer) : iPlayer => {
        if(currentPlayer == player1) return player2; 
        return player1;
    }
}
