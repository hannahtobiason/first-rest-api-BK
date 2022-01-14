const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors')

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if(name != undefined && job != undefined){
        let result = findUserByNameJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});


app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    let result = findUserByID(id);
    if (result === undefined || result.length == 0){
        res.status(404).send('Resource not found.');
    }
    else{
        result = {users_list: result};
        res.send(result);
    }

});

app.post('/users', (req, res) => {
    const userToAdd = req.body;
    userToAdd.id = generateId();
    addUser(userToAdd);
    res.status(201).send(userToAdd).end();

});

app.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    let result = findUserByID(id);
    if (result === undefined || result.length == 0){
        res.status(404).send('Resource not found.');
    }
    else{
        const userToDelete = req.body
        deleteUser(result);
        res.status(204).end();
    }
});

function findUserByID(id){
    return users['users_list'].find((user) => user['id'] === id);
}
function deleteUser(user){
    let delIndex = users['users_list'].indexOf(user);

    users['users_list'].splice(delIndex, 1);
}
function addUser(user){
    users['users_list'].push(user);
}

function generateId(){
    return (Math.floor(Math.random()*900000)+100000).toString();
}

/*const findUserByName = (name) => {
    return users['users_list'].filter( (user) => user['name'] === name);
}*/

const findUserByNameJob = (name, job) => {
    users['users_list'].filter( (user) => user['name'] === name);
    return users['users_list'].filter( (user) => user['job'] === job);
}

const users = {
    users_list : [
        { 
            id : 'xyz789',
            name : 'Charlie',
            job: 'Janitor',
        },
        {
            id : 'abc123', 
            name: 'Mac',
            job: 'Bouncer',
        },
        {
            id : 'ppp222', 
            name: 'Mac',
            job: 'Professor',
        }, 
        {
            id: 'yat999', 
            name: 'Dee',
            job: 'Aspring actress',
        },
        {
            id: 'zap555', 
            name: 'Dennis',
            job: 'Bartender',
        }        
    ]
}

app.listen(port, () => {
    console.log('Example app listening at http://localhost:${port}');
});