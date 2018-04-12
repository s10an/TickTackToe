import {markers} from "./../enums/markers";
import {board} from "./../common/board";
import {utils} from "./../common/utils";
import {gameStatuses} from "./../enums/gameStatuses";
import 'mocha';
import { expect } from 'chai';
import { assert } from 'chai';
import { playerMenace } from "../players/playerMenace";
import { matchBox } from "../players/playerMenace";
import {fs} from "file-system";
import { fileUtils } from "../common/fileUtils";

var testMenancePlayerX = new playerMenace(markers.x, "testPlayerX", false);
testMenancePlayerX.matchBoxes = new Array<matchBox>();

let testMatchBox1  = new matchBox();
testMatchBox1.position = [markers.o, markers.o, markers.o,markers.x, markers.b, markers.x,  markers.b, markers.x, markers.b]
testMatchBox1.weight = [ -1, -1, -1, -1, 3, -1, 4, -1, 3 ];

let testMatchBox2  = new matchBox();
testMatchBox2.position = [markers.x, markers.o, markers.b,markers.b, markers.b, markers.x,  markers.b, markers.x, markers.b]
testMatchBox2.weight = [ -1, -1, 4, 0, -6, -1, 5, -1, 5 ];

let testMatchBox3  = new matchBox();
testMatchBox3.position = [markers.b, markers.o, markers.o,markers.b, markers.o, markers.b,  markers.b, markers.x, markers.b]
testMatchBox3.weight = [ 3, -1, -1, 10, -1, 3, 1, -1, 1 ];

let testMatchBox4  = new matchBox();
testMatchBox4.position = [markers.o, markers.o, markers.o,markers.x, markers.b, markers.o,  markers.b, markers.o, markers.b]
testMatchBox4.weight = [ -1, -1, -1, -1, 3, -1, 6, -1, 2 ];

let testMatchBox5  = new matchBox();
testMatchBox5.position = [markers.x, markers.o, markers.o,markers.x, markers.b, markers.x,  markers.b, markers.o, markers.b]
testMatchBox5.weight = [ -1, -1, -1, -1, -1, 2, -1, 3, -1 ];

let testMatchBox6  = new matchBox();
testMatchBox6.position = [markers.b, markers.o, markers.o,markers.x, markers.b, markers.x,  markers.b, markers.b, markers.b]
testMatchBox6.weight = [ 6, -1, -1, -1, 3, -1, 6, 3, 0 ];



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

    it("validateMatchBox 1 - should throw", () =>{
        let testMatchBox  = new matchBox();
        testMatchBox.position = [markers.b, markers.b, markers.o, markers.o,markers.b, markers.o, markers.b,  markers.b]
        testMatchBox.weight = [ 3, 2, 10, 0, 3, 0, 0, 3, 0 ];
        assert.throw(function () { testMenancePlayerX.validatePosition(testMatchBox.position), "Validation error in MatchBox position" });
    });

    it("validateMatchBox 2 - should throw", () =>{
        let testMatchBox  = new matchBox();
        testMatchBox.position = [markers.b, markers.o, markers.o,markers.b, markers.o, markers.b,  markers.b, markers.x]
        testMatchBox.weight = [ 3, 2, 10, 0, 3, 0, 0, 3, 0, 4 ];
        assert.throw(function () { testMenancePlayerX.getMatcBox(testMatchBox.position), "Validation error in MatchBox weight" });
    });

    it("validateMatchBox 3 - should not throw", () =>{
        let testMatchBox  = new matchBox();
        testMatchBox.position = [markers.b, markers.o, markers.o,markers.b, markers.o, markers.b,  markers.b, markers.x, markers.o]
        testMatchBox.weight = [ 3, 2, 10, 0, 3, 0, 0, 3, 0];
        assert.doesNotThrow(function () { testMenancePlayerX.validatePosition(testMatchBox.position) });
    });

    it("getMatcBox 1 - should return same matcbox with same position", () =>{
        let testMatchBox  = new matchBox();
        testMatchBox.position = [markers.b, markers.b, markers.b,markers.b, markers.b, markers.b,  markers.b, markers.x, markers.o]
        testMenancePlayerX.knowledgeFilePath = "./ts/tests/testFiles/loadKnowledgeMenanceTest.json";
        testMenancePlayerX.loadKnowledge();
        let result = testMenancePlayerX.getMatcBox(testMatchBox.position);
        expect(result.position).to.equal(testMatchBox.position);
    });
    it("getMatcBox 2 - should not add matcbox", () =>{
        let testMatchBox  = new matchBox();
        testMatchBox.position = [markers.b, markers.o, markers.o,markers.x, markers.b, markers.x,  markers.b, markers.b, markers.b]
        testMenancePlayerX.knowledgeFilePath = "./ts/tests/testFiles/loadKnowledgeMenanceTest.json";
        testMenancePlayerX.loadKnowledge();
        let numberBeforeAdding = testMenancePlayerX.matchBoxes.length;
        let result = testMenancePlayerX.getMatcBox(testMatchBox.position);
        let numberAfterAdding = testMenancePlayerX.matchBoxes.length;
        expect(numberAfterAdding).to.equal(numberBeforeAdding);
    });
    it("getMatcBox 3 - should not add matcbox two times", () =>{
        let testMatchBox  = new matchBox();
        testMatchBox.position = [markers.b, markers.b, markers.b,markers.b, markers.b, markers.b,  markers.b, markers.x, markers.o]
        testMenancePlayerX.knowledgeFilePath = "./ts/tests/testFiles/loadKnowledgeMenanceTest.json";
        testMenancePlayerX.loadKnowledge();
        let numberBeforeAdding = testMenancePlayerX.matchBoxes.length;
        testMenancePlayerX.getMatcBox(testMatchBox.position);
        testMenancePlayerX.getMatcBox(testMatchBox.position);
        let numberAfterAdding = testMenancePlayerX.matchBoxes.length;
        expect(numberAfterAdding).to.equal(numberBeforeAdding+1);
    });
    it("getMatcBox 4 - should add a matchBox", () =>{
        let testMatchBox  = new matchBox();
        testMatchBox.position = [markers.b, markers.b, markers.b,markers.b, markers.b, markers.b,  markers.b, markers.x, markers.o]
        testMenancePlayerX.knowledgeFilePath = "./ts/tests/testFiles/loadKnowledgeMenanceTest.json";
        testMenancePlayerX.loadKnowledge();
        let numberBeforeAdding = testMenancePlayerX.matchBoxes.length;
        let result = testMenancePlayerX.getMatcBox(testMatchBox.position);
        let numberAfterAdding = testMenancePlayerX.matchBoxes.length;
        expect(numberAfterAdding).to.equal(numberBeforeAdding + 1);
    });

    it("createNewMatchBox - should add matchbox", () =>{
        let position = [markers.b, markers.b, markers.b,markers.b, markers.b, markers.b,  markers.b, markers.x, markers.o]
        testMenancePlayerX.knowledgeFilePath = "./ts/tests/testFiles/loadKnowledgeMenanceTest.json";
        testMenancePlayerX.loadKnowledge();
        let numberBeforeAdding = testMenancePlayerX.matchBoxes.length;
        testMenancePlayerX.createNewMatchBox(position);
        let numberAfterAdding = testMenancePlayerX.matchBoxes.length;
        expect(numberAfterAdding).to.equal(numberBeforeAdding + 1);
    });

    it("createNewMatchBox - test position for new matchbox", () =>{
        let position = [markers.b, markers.b, markers.b,markers.b, markers.b, markers.b,  markers.b, markers.x, markers.o]
        testMenancePlayerX.knowledgeFilePath = "./ts/tests/testFiles/loadKnowledgeMenanceTest.json";
        testMenancePlayerX.loadKnowledge();
        let numberBeforeAdding = testMenancePlayerX.matchBoxes.length;
        testMenancePlayerX.createNewMatchBox(position);
        let numberAfterAdding = testMenancePlayerX.matchBoxes.length;
        expect(testMenancePlayerX.matchBoxes[numberAfterAdding-1].position.toString()).to.equal(position.toString());
    });
    it("createNewMatchBox - new matchbox should have default weights", () =>{
        let position = [markers.b, markers.b, markers.b,markers.b, markers.b, markers.b,  markers.b, markers.x, markers.o]
        testMenancePlayerX.knowledgeFilePath = "./ts/tests/testFiles/loadKnowledgeMenanceTest.json";
        testMenancePlayerX.loadKnowledge();
        let numberBeforeAdding = testMenancePlayerX.matchBoxes.length;
        testMenancePlayerX.createNewMatchBox(position);
        let numberAfterAdding = testMenancePlayerX.matchBoxes.length;
        let w = testMenancePlayerX.initMoveWeight;
        let weights = [w,w,w,w,w,w,w,-1,-1];
        expect(testMenancePlayerX.matchBoxes[numberAfterAdding-1].weight.toString()).to.equal(weights.toString());
    });
    it("createNewMatchBox - new matchbox should have default weights", () =>{
        let position = [markers.x, markers.o, markers.b,markers.x, markers.b, markers.o,  markers.o, markers.x, markers.o]
        testMenancePlayerX.knowledgeFilePath = "./ts/tests/testFiles/loadKnowledgeMenanceTest.json";
        testMenancePlayerX.loadKnowledge();
        let numberBeforeAdding = testMenancePlayerX.matchBoxes.length;
        testMenancePlayerX.createNewMatchBox(position);
        let numberAfterAdding = testMenancePlayerX.matchBoxes.length;
        let w = testMenancePlayerX.initMoveWeight;
        let weights = [-1,-1,w,-1,w,-1,-1,-1,-1];
        expect(testMenancePlayerX.matchBoxes[numberAfterAdding-1].weight.toString()).to.equal(weights.toString());
    });
    it("selectMoveNoLearning 1 - should return index 4", () =>{
        let testMatchBox  = new matchBox();
        testMatchBox.position = [markers.b, markers.o, markers.o,markers.b, markers.b, markers.x,  markers.x, markers.o, markers.x]
        testMatchBox.weight = [ 0, 0, 0, 0, 3, 0, 0, 0, 0 ];
        let index = testMenancePlayerX.selectMoveNoLearning(testMatchBox);
        expect(index).to.equal(4);
    });
    it("selectMoveNoLearning 2 - index shoud point to blank marker ", () =>{
        let testMatchBox  = new matchBox();
        testMatchBox.position = [markers.x, markers.b, markers.o,markers.x, markers.b, markers.x,  markers.b, markers.o, markers.x]
        testMatchBox.weight = [ 2, 7, 3, 4, 8, 4, 6, 4, 2 ];
        let index = testMenancePlayerX.selectMoveNoLearning(testMatchBox);
        expect(testMatchBox.position[index]).to.equal(markers.b);
    });
    it("selectMoveNoLearning 3 - should return index that can be divided by 2 ", () =>{
        let testMatchBox  = new matchBox();
        testMatchBox.position = [markers.o, markers.b, markers.b,markers.b, markers.b, markers.b,  markers.b, markers.x, markers.b]
        testMatchBox.weight = [ 0, 0, 10, 0, 10, 0, 10, 0, 10 ];
        let index = testMenancePlayerX.selectMoveNoLearning(testMatchBox);
        expect(index % 2).to.equal(0);
    });
    it("selectMoveNoLearning 4 - should return index 0 ", () =>{
        let testMatchBox  = new matchBox();
        testMatchBox.position = [markers.b, markers.o, markers.b,markers.x, markers.b, markers.o,  markers.b, markers.x, markers.b]
        testMatchBox.weight = [ 1, 0, 0, 0, 0, 0, 0, 0, 0 ];
        let index = testMenancePlayerX.selectMoveNoLearning(testMatchBox);
        expect(index).to.equal(0);
    });
    it("selectMoveNoLearning 5 - should return index -1 (reign since player cant select move based on weights) ", () =>{
        let testMatchBox  = new matchBox();
        testMatchBox.position = [markers.o, markers.o, markers.b,markers.x, markers.b, markers.o,  markers.b, markers.x, markers.b]
        testMatchBox.weight = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
        let index = testMenancePlayerX.selectMoveNoLearning(testMatchBox);
        expect(index).to.equal(-1);
    });
    it("validateMatchBox1 - should not throw", () =>{
        let testMatchBox  = new matchBox();
        testMatchBox.position = [markers.o, markers.o, markers.b,markers.x, markers.b, markers.o,  markers.b, markers.x, markers.b]
        testMatchBox.weight = [ 0, 0, 3, 0, 5, 0, 2, 0, 10 ];
        assert.doesNotThrow(function () { testMenancePlayerX.validateMatchBox(testMatchBox)});
    });
    
    it("validateMatchBox1 - should throw", () =>{
        let testMatchBox  = new matchBox();
        testMatchBox.position = [markers.o, markers.o, markers.b,markers.x, markers.b, markers.o,  markers.b, markers.x, markers.b]
        testMatchBox.weight = [ 1, 0, 3, 0, 5, 0, 2, 0, 10 ];
        assert.throw(function () { testMenancePlayerX.validateMatchBox(testMatchBox)});
    });
});