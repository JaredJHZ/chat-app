var expect = require('expect');
const {isRealString} = require('./validation');

describe('Validation tests',()=>{

    it('should validate the string',()=>{
        let string = 'hi everyone';
        expect(isRealString(string)).toBe(true);
    });

    it('should not validate the string',()=>{
        let number = 25;
        expect(isRealString(number)).toBe(false);
    });

    it('should not pass cause its an empty string',()=>{
        let str = '';
        expect(isRealString(str)).toBe(false);
    });

});