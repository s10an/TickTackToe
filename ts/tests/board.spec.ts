import {markers} from "./../enums/markers";
import {board} from "./../common/board";
import {moveAndMarker} from "./../common/board";
import {gameStatuses} from "./../enums/gameStatuses";
import 'mocha';
import { expect } from 'chai';
import { assert } from 'chai';
// /// <reference path="./../common/position.ts" />
// /// <reference path="./../../node_modules/@types/chai/index.d.ts" />
// /// <reference path="./../../node_modules/@types/mocha/index.d.ts" />
// /// <reference path="./../enums/markers.ts" />
// /// <reference path="./../enums/gameStatuses.ts" />

describe('Board - validatePosition', () => {
    it("should not throw", () =>{
        let positionXwin1 = [
            markers.b, markers.b, markers.b,
            markers.b, markers.b, markers.b,
            markers.b, markers.b, markers.b
        ]
        let testBoard = new board(positionXwin1, markers.o, false);
        assert.doesNotThrow(testBoard.ValidatePosition,Error )
    });
    it("should not throw", () =>{
        let positionXwin1 = [
            markers.o, markers.o, markers.o,
            markers.x, markers.x, markers.x,
            markers.b, markers.x, markers.b
        ]
        let testBoard = new board(positionXwin1, markers.o, false);
        assert.doesNotThrow(testBoard.ValidatePosition,Error )
    });
    it("should not throw", () =>{
        let positionXwin1 = [
            markers.o, markers.o, markers.o,
            markers.x, markers.x, markers.x,
            markers.b, markers.b, markers.b
        ]
        let testBoard = new board(positionXwin1, markers.o, false);
        assert.doesNotThrow(testBoard.ValidatePosition,Error )
    });
    it("should throw", () =>{
        let positionXwin1 = [
            markers.o, markers.o, markers.o,
            markers.x, markers.b, markers.x,
            markers.b, markers.x, 
        ]
        assert.throw(function () { new board(positionXwin1, markers.o, false)});
    });
    it("should throw", () =>{
        let positionXwin1 = [
            markers.o, markers.o, markers.o,
            markers.b, markers.b, markers.x,
            markers.b, markers.x, markers.x, markers.b
        ]
        assert.throw(function () { new board(positionXwin1, markers.o, false)});
    });
    it("should throw", () =>{
        let positionXwin1 = [
            markers.o, markers.o, markers.o,
            markers.b, markers.b, markers.x,
            markers.b, markers.x, markers.b
        ]
        assert.throw(function () { new board(positionXwin1, markers.o, false)});
    });
    it("should not throw", () =>{
        let positionOResign = [
            markers.b, markers.b, markers.o,
            markers.x, markers.x, markers.b,
            markers.b, markers.b, markers.b
        ]
        let testBoard = new board(positionOResign, markers.x, true);
        assert.doesNotThrow(testBoard.ValidatePosition,Error )
    });

 });

describe('Board - set correct winner', () => {

    it('should return gameStatuses.xwins 1', () => {
        let positionXwin1 = [
            markers.b, markers.o, markers.b,
            markers.x, markers.x, markers.x,
            markers.b, markers.o, markers.b
        ]
        let testBoard = new board(positionXwin1, markers.o, false) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.xwins);
    });
    it('should return gameStatuses.xwins 2', () => {
        let positionXwin2 = [
            markers.x, markers.b, markers.b,
            markers.x, markers.o, markers.b,
            markers.x, markers.b, markers.o
        ]
        let testBoard = new board(positionXwin2, markers.o, false) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.xwins);
    });
    it('should return gameStatuses.xwins 3', () => {
        let positionXwin3 = [
            markers.o, markers.b, markers.x,
            markers.o, markers.x, markers.b,
            markers.x, markers.b, markers.b
        ]
        let testBoard = new board(positionXwin3, markers.o, false) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.xwins);
    });
    it('should return gameStatuses.owins 1', () => {
        let positionOwin1 = [
            markers.x, markers.b, markers.b,
            markers.x, markers.b, markers.x,
            markers.o, markers.o, markers.o
        ]
        let testBoard = new board(positionOwin1, markers.o, false) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.owins);
    });
    it('should return gameStatuses.owins 2', () => {
        let positionOwin2 = [
            markers.b, markers.o, markers.b,
            markers.x, markers.o, markers.b,
            markers.x, markers.o, markers.x
        ]
        let testBoard = new board(positionOwin2, markers.o, false) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.owins);
    });
    it('should return gameStatuses.owins 3', () => {
        let positionOwin3 = [
            markers.o, markers.x, markers.b,
            markers.b, markers.o, markers.b,
            markers.x, markers.x, markers.o
        ]
        let testBoard = new board(positionOwin3, markers.o, false) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.owins);
    });
    it('should return gameStatuses.play 1', () => {
        let positionPlay1 = [
            markers.b, markers.b, markers.b,
            markers.b, markers.b, markers.b,
            markers.b, markers.b, markers.b
        ]
        let testBoard = new board(positionPlay1, markers.o, false) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.play);
    });
    it('should return gameStatuses.play 2', () => {
        let positionPlay2 = [
            markers.b, markers.b, markers.b,
            markers.o, markers.o, markers.x,
            markers.b, markers.x, markers.o
        ]
        let testBoard = new board(positionPlay2, markers.x, false) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.play);
    });
    it('should return gameStatuses.draw 1', () => {
        let positionDraw1 = [
            markers.x, markers.x, markers.o,
            markers.o, markers.o, markers.x,
            markers.x, markers.o, markers.x
        ]
        let testBoard = new board(positionDraw1, markers.o, false) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.draw);
    });
    it('GetOpponentsMarker 1 - should return marker x', () => {
        let positionDraw1 = [
            markers.x, markers.b, markers.o,
            markers.o, markers.o, markers.x,
            markers.x, markers.b, markers.x
        ]
        let testBoard = new board(positionDraw1, markers.o, false) 
        const result = testBoard.GetOpponentsMarker();
        expect(result).to.equal(markers.x);
    });
    it('GetOpponentsMarker 2 - should return marker o', () => {
        let positionDraw1 = [
            markers.x, markers.b, markers.b,
            markers.o, markers.b, markers.b,
            markers.x, markers.o, markers.b
        ]
        let testBoard = new board(positionDraw1, markers.x, false) 
        const result = testBoard.GetOpponentsMarker();
        expect(result).to.equal(markers.o);
    });
    it('GetNewPosition 1 - should return x at position 0', () => {
        let position = [
            markers.b, markers.b, markers.b,
            markers.o, markers.o, markers.x,
            markers.b, markers.x, markers.o
        ]
        let currrentBoard = new board(position, markers.x, false);
        let newPosition :Array<markers> = currrentBoard.GetNewPosition(0);
        expect(newPosition.toString()).to.equal([markers.x, markers.b, markers.b, 
                                                markers.o, markers.o, markers.x, 
                                                markers.b, markers.x, markers.o].toString());
    });
    it('GetNewPosition 2 - should return x at position 0', () => {
        let position = [
            markers.b, markers.b, markers.b,
            markers.o, markers.o, markers.x,
            markers.b, markers.x, markers.o
        ]
        let currrentBoard = new board(position, markers.x, false);
        let newPosition :Array<markers> = currrentBoard.GetNewPosition(6);
        expect(newPosition.toString()).to.equal([markers.b, markers.b, markers.b, 
                                                markers.o, markers.o, markers.x, 
                                                markers.x, markers.x, markers.o].toString());
    });
    it('GetNewBoard 3 - should return x at position 0', () => {
        let position = [
            markers.b, markers.b, markers.b,
            markers.o, markers.o, markers.x,
            markers.b, markers.x, markers.o
        ]
        let currrentBoard = new board(position, markers.x, false) 
        let newBoard : board = currrentBoard.GetNewBoard(1, false);
        expect(newBoard.position.toString()).to.equal([markers.b, markers.x, markers.b, 
                                                markers.o, markers.o, markers.x, 
                                                markers.b, markers.x, markers.o].toString());
    });
    it('GetNewBoard - should add to moveSequence', () => {
        let position = [
            markers.b, markers.b, markers.b,
            markers.o, markers.o, markers.x,
            markers.b, markers.x, markers.b
        ]
        let currrentBoard = new board(position, markers.x, false)
        currrentBoard.moveSequence = [new moveAndMarker(markers.o, 3),new moveAndMarker(markers.x, 5),
                                    new moveAndMarker(markers.o, 4), new moveAndMarker(markers.x, 8)] 
        let newBoard : board = currrentBoard.GetNewBoard(1, false);
        expect(newBoard.moveSequence).to.deep.equal([new moveAndMarker(markers.o, 3),new moveAndMarker(markers.x, 5),
                                                new moveAndMarker(markers.o, 4), new moveAndMarker(markers.x, 8),
                                                new moveAndMarker(markers.x, 1)]);
    });
    
  });
