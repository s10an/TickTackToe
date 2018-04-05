import {markers} from "./../enums/markers";
import {board} from "./../common/board";
import {utils} from "./../common/utils";
import {gameStatuses} from "./../enums/gameStatuses";
import {playerRandom} from "./../players/playerRandom";
import 'mocha';
import { expect } from 'chai';
import { assert } from 'chai';

var testRandomPlayerO = new playerRandom(markers.o, "testPlayerO", false);
var testRandomPlayerX = new playerRandom(markers.x, "testPlayerX", false);

describe('playerRandom - test random player and playerBase methodes', () => {
    it("should return marker.x", () =>{
        let opponentsMarker = testRandomPlayerX.GetOpponentsMarker();        
        expect(opponentsMarker).to.equal(markers.o);
    });

    it("should return marker.o", () =>{

        let opponentsMarker = testRandomPlayerO.GetOpponentsMarker();        
        expect(opponentsMarker).to.equal(markers.x);
    });

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
        let testBoard = new board(testPosition, markers.o);
        let moveIndex = testRandomPlayerO.CalculateMove(testBoard);       
        expect(moveIndex).to.oneOf([6,8]);
    });

    it("should return value 0,1,2,3,4,5,6 or 8 equals to legal moves", () =>{
        let testPosition = [
            markers.b, markers.b, markers.b,
            markers.b, markers.b, markers.b,
            markers.b, markers.o, markers.b
        ]
        let testBoard = new board(testPosition, markers.x);
        let moveIndex = testRandomPlayerO.CalculateMove(testBoard);   
        //console.log(moveIndex); 
        expect(moveIndex).to.oneOf([0,1,2,3,4,5,6,8]);
    });

    it("should return board with 3 x markers", () =>{
        let testPositionMove1 = [
            markers.o, markers.x, markers.b,
            markers.o, markers.x, markers.b,
            markers.b, markers.o, markers.b
        ]
        let testBoardMove1 = new board(testPositionMove1, markers.x);

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
        let testBoardMove1 = new board(testPositionMove1, markers.x);
        let newBoard = testRandomPlayerX.Move(testBoardMove1);
        //console.log("board after move: " + newBoard.position);
        let oMarkers = newBoard.position.filter(function(marker){
            return (marker === markers.o);
        });
        //console.log("number of o markers: " + oMarkers.length);
        expect(oMarkers.length).to.equal(3);
    });
});

