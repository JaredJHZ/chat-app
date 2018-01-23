var expect = require('expect');
var {generateMessage} = require('./message');
describe('generateMessage',()=>{
    it('should generate a correct message object',()=>{
        let message = generateMessage('Jared','hola');
        expect(message).toBeTruthy();
        expect(message.from).toBe('Jared');
    });
});