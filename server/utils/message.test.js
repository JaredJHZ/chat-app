var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');
describe('generateMessage',()=>{
    it('should generate a correct message object',()=>{
        let message = generateMessage('Jared','hola');
        expect(message).toBeTruthy();
        expect(message.from).toBe('Jared');
    });
});

describe('generateLocationMessage',()=>{
    it('should generate correct location object',()=>{
        let location = generateLocationMessage('jared',30,30);
        expect(location.from).toBe('jared');
        expect(location).toMatchObject({from:'jared',url:'https://www.google.com/maps?q=30,30'});
    });
});