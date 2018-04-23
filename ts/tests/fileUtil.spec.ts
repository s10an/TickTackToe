import {fileUtils} from "./../common/fileUtils";
import {fs} from "file-system";
import 'mocha';
import { expect } from 'chai';
import { assert } from 'chai';
import {board} from "./../common/board";
import {markers} from "./../enums/markers";
// /// <reference path="./../common/fileUtils.ts" />

describe('fileUtil', () => {

    it("saveStringToFile - should create file", () =>{
        let textToSave = "Test tekst";
        let filePath = "./ts/tests/testFiles/test_write.txt";
        fileUtils.saveStringToFile(filePath, textToSave);
        var result : boolean; 
        result = fs.existsSync(filePath);
        expect(result).to.equal(true);
        fileUtils.deleteFile(filePath);
    });


    it("deleteFile - should create file and delte it", () =>{
        let textToSave = "Test tekst";
        let filePath = "./ts/tests/testFiles/test_delete.txt";
        fileUtils.saveStringToFile(filePath, textToSave);
        var result : boolean; 
        fileUtils.deleteFile(filePath);
        result = fs.existsSync(filePath);
        expect(result).to.equal(false);
        
    });

    it("saveObjectToFile - should create json file and delte it", () =>{

        let position = [
            markers.x, markers.b, markers.b,
            markers.x, markers.o, markers.b,
            markers.x, markers.b, markers.o
        ]
        let testBoard = new board(position, markers.o, false) 
        let filePath = "./ts/tests/testFiles/test_save_json.json";
        fileUtils.saveObjectToFile(filePath, testBoard);
        var result : boolean; 
        result = fs.existsSync(filePath);
        expect(result).to.equal(true);
        fileUtils.deleteFile(filePath);
    });

    it("loadObjectFromFile - should create object", () =>{

        let filePath = "./ts/tests/testFiles/test_load_json.json";
        let testBoard : board = fileUtils.loadObjectFromFile(filePath);
        expect(testBoard.position[8]).to.equal(markers.o);
    });

    it("loadTextFromFile - should create string", () =>{
        let textToCompare = "this is the loaded text";
        let filePath = "./ts/tests/testFiles/test_load_text_file.txt";
        let testText : string = fileUtils.loadTextFromFile(filePath);
        expect(testText).to.equal(textToCompare);
    });

});
