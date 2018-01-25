const expect = require('expect');
var {Users} = require('./users');

describe('Users',()=>{
    
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id:'1',
            name:'asd',
            room:'node course'
        },
        users.users = {
            id:'2',
            name:'rrr',
            room:'react course'
        },
        users.users ={
            id:'3',
            name:'vvv',
            room:'node course'
        }
    ];
    });
    it('should add new User',()=>{
        var users = new Users();
        let user ={
            id:'123',
            name:'Jared',
            room:'The seven deadly sins fan'
        }
       var resU = users.addUser(user.id,user.name,user.room);

       expect(users.users).toMatchObject([user]);
    });

    it('should return names of node course',()=>{
        let userList = users.getUserList('node course');
        expect(userList).toMatchObject['asd','vvv'];
    });

    it('should remove one name of node course',()=>{
        let userList = users.removeUser('1');
        expect(userList).toMatchObject(['rrr','vvv']);
    });

    it('should get one user',()=>{
        let user = users.getUser('1');
        expect(user).toMatchObject(users.users[0]);
    });
});