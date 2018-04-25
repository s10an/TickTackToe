import {markers} from "./../enums/markers";
import {board} from "./../common/board";
import {utils} from "./../common/utils";
import {gameStatuses} from "./../enums/gameStatuses";
import {playerRandom} from "./../players/playerRandom";
import 'mocha';
import { expect } from 'chai';
import { assert } from 'chai';
import { test } from "mocha";

var testRandomPlayerO = new playerRandom(markers.o, "testPlayerO", false);
var testRandomPlayerX = new playerRandom(markers.x, "testPlayerX", false);

describe('playerRandom - test random player and playerBase methodes', () => {
    it("should return value between or equal to 0 - 1", () =>{
        let randomNumber = utils.randomInt(0,1);        
        expect(randomNumber).to.oneOf([0,1]);
    });

    it("should return value between or equal to 0 - 4", () =>{
        let randomNumber = utils.randomInt(0,4);        
        expect(randomNumber).to.oneOf([0,1,2,3,4]);
    });

    it("should return value between or equal to 0 - 9", () =>{
        let randomNumber = utils.randomInt(0,9);        
        expect(randomNumber).to.oneOf([0,1,2,3,4,,5,6,7,8,9]);
    });

    it("should return value 6 or 8 equals to legal moves ", () =>{
        let testPosition = [
            markers.o, markers.o, markers.o,
            markers.x, markers.x, markers.x,
            markers.b, markers.x, markers.b
        ]
        let testBoard = new board(testPosition, markers.o, false);
        let moveIndex = testRandomPlayerO.CalculateMove(testBoard);       
        expect(moveIndex).to.oneOf([6,8]);
    });

    it("should return value 0,1,2,3,4,5,6 or 8 equals to legal moves", () =>{
        let testPosition = [
            markers.b, markers.b, markers.b,
            markers.b, markers.b, markers.b,
            markers.b, markers.o, markers.b
        ]
        let testBoard = new board(testPosition, markers.x, false);
        let moveIndex = testRandomPlayerO.CalculateMove(testBoard);   
        expect(moveIndex).to.oneOf([0,1,2,3,4,5,6,8]);
    });

    it("should return board with 3 x markers", () =>{
        let testPositionMove1 = [
            markers.o, markers.x, markers.b,
            markers.o, markers.x, markers.b,
            markers.b, markers.o, markers.b
        ]
        let testBoardMove1 = new board(testPositionMove1, markers.x, false);

        let newBoard = testRandomPlayerX.Move(testBoardMove1);
        //console.log("board after move: " + newBoard.position);
        let xMarkers = newBoard.position.filter(function(marker){
            return (marker === markers.x);
        });      
        //console.log("number of x markers: " + xMarkers.length);
        
        expect(xMarkers.length).to.equal(3);
    });

    it("should return board with 3 O markess", () =>{
        let testPositionMove1 = [
            markers.o, markers.x, markers.b,
            markers.o, markers.x, markers.b,
            markers.b, markers.o, markers.b
        ]
        let testBoardMove1 = new board(testPositionMove1, markers.x, false);
        let newBoard = testRandomPlayerX.Move(testBoardMove1);
        //console.log("board after move: " + newBoard.position);
        let oMarkers = newBoard.position.filter(function(marker){
            return (marker === markers.o);
        });
        //console.log("number of o markers: " + oMarkers.length);
        expect(oMarkers.length).to.equal(3);
    });
    it("moveAndMarker - player sould add moves to moveAndMarker", () =>{
        let testFinalPostition = [
            markers.b, markers.b, markers.b,
            markers.b, markers.b, markers.b,
            markers.b, markers.b, markers.b
        ]
        let startBoard : board = board.GetStartBoard(markers.x);
        let board1 = testRandomPlayerX.Move(startBoard);
        let board2 = testRandomPlayerO.Move(board1);
        let board3 = testRandomPlayerX.Move(board2);
        board3.moveSequence.forEach(move => {
            testFinalPostition[move.moveIndex] = move.marker;
        });
        expect(board3.position.toString()).to.equal(testFinalPostition.toString());
    });
    it("switchInternalMarker", () =>{
        let testPostitionToSwitch = [
            markers.x, markers.o, markers.x,
            markers.o, markers.x, markers.o,
            markers.b, markers.b, markers.b
        ]
        let testFinalPostition = [
            markers.o, markers.x, markers.o,
            markers.x, markers.o, markers.x,
            markers.b, markers.b, markers.b
        ]
        let testBoard = new board(testPostitionToSwitch, markers.o, false);
        testBoard = testRandomPlayerO.switchInternalMarkers(testBoard);
        //console.log(testBoard.position.toString())
        expect(testBoard.position.toString()).to.equal(testFinalPostition.toString());
    });
    
});

