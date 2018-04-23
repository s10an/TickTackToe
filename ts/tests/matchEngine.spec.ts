import {markers} from "./../enums/markers";
import {board} from "./../common/board";
import {iPlayer} from "./../players/interfaces/iPlayer";
import {playerRandom} from "./../players/playerRandom";
import { playerMenace } from "./../players/playerMenace";
import {gameStatuses} from "./../enums/gameStatuses";
import {matchEngine} from "./../matchEngine";
import 'mocha';
import { expect } from 'chai';
import { assert } from 'chai';

var engine = new matchEngine();

describe('matchEngine - tests', () => {
    it("write output", () =>{
        engine.PlayMatch(true);
        //let testBoard = new board(positionXwin1, markers.o);
        //assert.doesNotThrow(testBoard.ValidatePosition,Error )
    }).timeout(0);
    it("switchPlayer - should return player2 ", () =>{
        let player1 : iPlayer = new playerRandom(markers.x, "name1", false );
        let player2 : iPlayer = new playerMenace(markers.o, "the Menace", false);
        let playerToMoveFirst = player1;
        playerToMoveFirst = engine.switchPlayer(player1, player2, playerToMoveFirst);
        expect(playerToMoveFirst).to.equal(player2);
    });
    it("switchPlayer - should return player1 ", () =>{
        let player1 : iPlayer = new playerRandom(markers.x, "name1", false);
        let player2 : iPlayer = new playerMenace(markers.o, "the Menace", false);
        let playerToMoveFirst = player2;
        playerToMoveFirst = engine.switchPlayer(player1, player2, playerToMoveFirst);
        expect(playerToMoveFirst).to.equal(player1);
    });

});