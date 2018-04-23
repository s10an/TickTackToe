import {fileUtils} from "./../common/fileUtils";
import 'mocha';
import { expect } from 'chai';
import { assert } from 'chai';
import {board} from "./../common/board";
import {matchStatistics} from "./../common/matchStatistics";
import {markers} from "./../enums/markers";
import {gameStatuses} from "./../enums/gameStatuses";
// /// <reference path="./../common/fileUtils.ts" />

describe('matchStatistics - test updateResult', () => {

    it("clearStatistics  - should clear all statistics", () =>{
        matchStatistics.clearStatistics();
        expect(matchStatistics.stats.numberOfGames).to.equal(0);
        expect(matchStatistics.stats.numberOfGames).to.equal(0);
        expect(matchStatistics.stats.playerOName).to.equal("");
        expect(matchStatistics.stats.firstMove).to.equal(null);
    });

    it("updateResult - should increase playerXWins to 2", () =>{
        let positionXwin1 = [
            markers.b, markers.o, markers.b,
            markers.x, markers.x, markers.x,
            markers.b, markers.o, markers.b
        ]
        let testBoard = new board(positionXwin1, markers.o, false)
        matchStatistics.updateResult(testBoard);
        matchStatistics.updateResult(testBoard);
        expect(matchStatistics.stats.playerXWins).to.equal(2);
    });

    it("updateResult - should increase playerOWins to 1", () =>{
        let positionOwin1 = [
            markers.x, markers.b, markers.b,
            markers.x, markers.b, markers.x,
            markers.o, markers.o, markers.o
        ]
        let testBoard = new board(positionOwin1, markers.o, false);
        matchStatistics.updateResult(testBoard);
        expect(matchStatistics.stats.playerOWins).to.equal(1);
    });

    it("updateResult - should increase draws to 3", () =>{
        let positionDraw1 = [
            markers.x, markers.x, markers.o,
            markers.o, markers.o, markers.x,
            markers.x, markers.o, markers.x
        ]
        let testBoard = new board(positionDraw1, markers.o, false) 
        matchStatistics.updateResult(testBoard);
        matchStatistics.updateResult(testBoard);
        matchStatistics.updateResult(testBoard);
        expect(matchStatistics.stats.draws).to.equal(3);
    });

    it("updateResult - should return games = 6", () =>{
        expect(matchStatistics.stats.numberOfGames).to.equal(6);
    });

    it("updateResult - should throw because position is not finished", () =>{
        let positionDraw1 = [
            markers.x, markers.x, markers.o,
            markers.b, markers.o, markers.b,
            markers.b, markers.b, markers.b
        ]
        let testBoard = new board(positionDraw1, markers.o, false);
        assert.throw(function () { matchStatistics.updateResult(testBoard)});
    });

    

});
