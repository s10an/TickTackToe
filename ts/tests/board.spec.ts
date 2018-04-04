import {markers} from "./../enums/markers";
import {board} from "./../common/board";
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
        let testBoard = new board(positionXwin1, markers.o);
        assert.doesNotThrow(testBoard.ValidatePosition,Error )
    });
    it("should not throw", () =>{
        let positionXwin1 = [
            markers.o, markers.o, markers.o,
            markers.x, markers.x, markers.x,
            markers.b, markers.x, markers.b
        ]
        let testBoard = new board(positionXwin1, markers.o);
        assert.doesNotThrow(testBoard.ValidatePosition,Error )
    });
    it("should not throw", () =>{
        let positionXwin1 = [
            markers.o, markers.o, markers.o,
            markers.x, markers.x, markers.x,
            markers.b, markers.b, markers.b
        ]
        let testBoard = new board(positionXwin1, markers.o);
        assert.doesNotThrow(testBoard.ValidatePosition,Error )
    });
    it("should throw", () =>{
        let positionXwin1 = [
            markers.o, markers.o, markers.o,
            markers.x, markers.b, markers.x,
            markers.b, markers.x
        ]
        assert.throw(function () { new board(positionXwin1, markers.o)});
    });
    it("should throw", () =>{
        let positionXwin1 = [
            markers.o, markers.o, markers.o,
            markers.b, markers.b, markers.x,
            markers.b, markers.x, markers.x, markers.b
        ]
        assert.throw(function () { new board(positionXwin1, markers.o)});
    });
    it("should throw", () =>{
        let positionXwin1 = [
            markers.o, markers.o, markers.o,
            markers.b, markers.b, markers.x,
            markers.b, markers.x, markers.b
        ]
        assert.throw(function () { new board(positionXwin1, markers.o)});
    });

 });

describe('Board - set correct winner', () => {

    it('should return gameStatuses.xwins 1', () => {
        let positionXwin1 = [
            markers.b, markers.o, markers.b,
            markers.x, markers.x, markers.x,
            markers.b, markers.o, markers.b
        ]
        let testBoard = new board(positionXwin1, markers.o) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.xwins);
    });
    it('should return gameStatuses.xwins 2', () => {
        let positionXwin2 = [
            markers.x, markers.b, markers.b,
            markers.x, markers.o, markers.b,
            markers.x, markers.b, markers.o
        ]
        let testBoard = new board(positionXwin2, markers.o) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.xwins);
    });
    it('should return gameStatuses.xwins 3', () => {
        let positionXwin3 = [
            markers.o, markers.b, markers.x,
            markers.o, markers.x, markers.b,
            markers.x, markers.b, markers.b
        ]
        let testBoard = new board(positionXwin3, markers.o) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.xwins);
    });
    it('should return gameStatuses.owins 1', () => {
        let positionOwin1 = [
            markers.x, markers.b, markers.b,
            markers.x, markers.b, markers.x,
            markers.o, markers.o, markers.o
        ]
        let testBoard = new board(positionOwin1, markers.o) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.owins);
    });
    it('should return gameStatuses.owins 2', () => {
        let positionOwin2 = [
            markers.b, markers.o, markers.b,
            markers.x, markers.o, markers.b,
            markers.x, markers.o, markers.x
        ]
        let testBoard = new board(positionOwin2, markers.o) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.owins);
    });
    it('should return gameStatuses.owins 3', () => {
        let positionOwin3 = [
            markers.o, markers.x, markers.b,
            markers.b, markers.o, markers.b,
            markers.x, markers.x, markers.o
        ]
        let testBoard = new board(positionOwin3, markers.o) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.owins);
    });
    it('should return gameStatuses.play 1', () => {
        let positionPlay1 = [
            markers.b, markers.b, markers.b,
            markers.b, markers.b, markers.b,
            markers.b, markers.b, markers.b
        ]
        let testBoard = new board(positionPlay1, markers.o) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.play);
    });
    it('should return gameStatuses.play 2', () => {
        let positionPlay2 = [
            markers.b, markers.b, markers.b,
            markers.o, markers.o, markers.x,
            markers.b, markers.x, markers.o
        ]
        let testBoard = new board(positionPlay2, markers.x) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.play);
    });
    it('should return gameStatuses.draw 1', () => {
        let positionDraw1 = [
            markers.x, markers.x, markers.o,
            markers.o, markers.o, markers.x,
            markers.x, markers.o, markers.x
        ]
        let testBoard = new board(positionDraw1, markers.o) 
        const result = testBoard.GetGameStatus();
        expect(result).to.equal(gameStatuses.draw);
    });
    
  });
