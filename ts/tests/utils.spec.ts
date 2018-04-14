import {utils} from "./../common/utils";
import 'mocha';
import { expect } from 'chai';
import { assert } from 'chai';

describe('utils - test utils.ts', () => {
    it("indexesOfMax - should return index 0 and 3", () =>{
        let result = utils.indexesOfMax([12,0,5,12,10,4,8]);
        expect(result.toString()).to.equal("0,3");
    });
    it("indexesOfMax - should return index 4", () =>{
        let result = utils.indexesOfMax([12,0,5,12,13,4,8]);
        expect(result.toString()).to.equal("4");
    });
    it("indexesOfMax - should return index 0", () =>{
        let result = utils.indexesOfMax([1]);
        expect(result.toString()).to.equal("0");
    });
    it("indexesOfMax - should return empty array", () =>{
        let result = utils.indexesOfMax([]);
        expect(result.length).to.equal(0);
    });
    it("randomInt - should return index between 90 and 100", () =>{
        let result = utils.randomInt(90,100);
        expect(result).to.oneOf([90,91,92,93,94,95,96,97,98,99,100]);
    });
    it("randomInt - should return index between 1 and 5", () =>{
        let result = utils.randomInt(1,5);
        expect(result).to.oneOf([1,2,3,4,5]);
    });
    it("randomInt - should return index between 0 and 2", () =>{
        let result = utils.randomInt(0,2);
        expect(result).to.oneOf([0,1,2]);
    });
    it("randomInt - should return index 1", () =>{
        let result = utils.randomInt(1,1);
        expect(result).to.equal(1);
    });
    it("randomInt - should return index = 0", () =>{
        let result = utils.randomInt(0,0);
        expect(result).to.equal(0);
    });
});