import {markers} from "./../enums/markers";
import {board} from "./../common/board";
import {utils} from "./../common/utils";
import {gameStatuses} from "./../enums/gameStatuses";
import {playerRandom} from "./../players/playerRandom";
import 'mocha';
import { expect } from 'chai';
import { assert } from 'chai';
import { playerMenace } from "../players/playerMenace";
import { matchBox } from "../players/playerMenace";
import {fs} from "file-system";
import { fileUtils } from "../common/fileUtils";

var testMenancePlayerX = new playerMenace(markers.x, "testPlayerX", false);

let testMatchBox1  = new matchBox();
testMatchBox1.position = [markers.o, markers.o, markers.o,markers.x, markers.b, markers.x,  markers.b, markers.x]
testMatchBox1.weight = [ 1, 2, 7, 0, 3, 0, 6, 3, 0 ];

let testMatchBox2  = new matchBox();
testMatchBox2.position = [markers.x, markers.o, markers.b,markers.b, markers.b, markers.x,  markers.b, markers.x]
testMatchBox2.weight = [ 2, 0, 2, 0, 3, 0, 5, 3, 0 ];

let testMatchBox3  = new matchBox();
testMatchBox3.position = [markers.b, markers.o, markers.o,markers.b, markers.o, markers.b,  markers.b, markers.x]
testMatchBox3.weight = [ 3, 2, 10, 0, 3, 0, 0, 3, 0 ];

let testMatchBox4  = new matchBox();
testMatchBox4.position = [markers.o, markers.o, markers.o,markers.x, markers.b, markers.o,  markers.b, markers.o]
testMatchBox4.weight = [ 4, 2, 5, 0, 3, 0, 6, 10, 0 ];

let testMatchBox5  = new matchBox();
testMatchBox5.position = [markers.x, markers.o, markers.o,markers.x, markers.b, markers.x,  markers.b, markers.o]
testMatchBox5.weight = [ 5, 2, 7, 3, 3, 0, 6, 3, 0 ];

let testMatchBox6  = new matchBox();
testMatchBox6.position = [markers.b, markers.o, markers.o,markers.x, markers.b, markers.x,  markers.b, markers.b]
testMatchBox6.weight = [ 6, 2, 8, 0, 3, 0, 6, 3, 0 ];



describe('playerMenace - test menance player', () => {
    it("loadKnowledge - should not throw if file does not exist", () =>{
        testMenancePlayerX.knowledgeFilePath = "./ts/tests/testFiles/nofile";
        assert.doesNotThrow(function () { testMenancePlayerX.loadKnowledge()});
    });

    it("loadKnowledge - Matchboxes should be added to empty array if file does not exist", () =>{
        testMenancePlayerX.loadKnowledge();
        testMenancePlayerX.matchBoxes.push(testMatchBox1);        
        expect(testMenancePlayerX.matchBoxes[0].weight).to.equal(testMatchBox1.weight);
    });

    it("loadKnowledge - Matchboxes should be loaded from file", () =>{
        testMenancePlayerX.knowledgeFilePath = "./ts/tests/testFiles/loadKnowledgeMenanceTest.json";
        testMenancePlayerX.loadKnowledge();   
        expect(testMenancePlayerX.matchBoxes[5]).to.deep.equal(testMatchBox6);
    });

    it("saveKnowledge - Matchboxes should be stored to file", () =>{
        testMenancePlayerX.knowledgeFilePath = "./ts/tests/testFiles/saveKnowledgeMenanceTest.json";
        testMenancePlayerX.matchBoxes = [testMatchBox1,testMatchBox2,testMatchBox3,testMatchBox4,testMatchBox5,testMatchBox6];   
        testMenancePlayerX.saveKnowledge();    
        let result = fs.existsSync(testMenancePlayerX.knowledgeFilePath);
        fileUtils.deleteFile(testMenancePlayerX.knowledgeFilePath);
        expect(result).to.equal(true);
    });

});