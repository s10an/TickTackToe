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
    
});