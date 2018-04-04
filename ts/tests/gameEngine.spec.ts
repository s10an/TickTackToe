import {markers} from "./../enums/markers";
import {board} from "./../common/board";
import {gameStatuses} from "./../enums/gameStatuses";
import {matchEngine} from "./../matchEngine";
import 'mocha';
import { expect } from 'chai';
import { assert } from 'chai';

var engine = new matchEngine();

describe('gameEngine - tests', () => {
    it("write output", () =>{
        engine.StartTrainingMatch();
        //let testBoard = new board(positionXwin1, markers.o);
        //assert.doesNotThrow(testBoard.ValidatePosition,Error )
    });
});