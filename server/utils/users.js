class Users {
    constructor(){
        this.users = [];
    }
    addUser(id, name, room){
        var user = {id,name,room};
        this.users.push(user);
        return user;
    }
    removeUser(id){
        let user = this.users.filter((user)=> user.id === id)[0];
        this.users = this.users.filter((user)=> id !== user.id);
        return user;
    }
    getUser(id){
        let user = this.users.filter((user)=> user.id === id)[0];
        return user;
    }
    getUserList(room){
        let users = this.users.filter((user)=>user.room === room);
        let namesArray = users.map((user)=>user.name);
        return namesArray;
    }
}


module.exports = {Users};