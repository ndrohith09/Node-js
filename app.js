function hello(name){
    console.log('Hello' + name);
}
hello(" Rohith");
console.log(module);

const log = require('./logger');
console.log(log);

const path = require('path');
var pathobj = path.parse(__filename);
console.log(pathobj);

const os = require('os');
var totalmem = os.totalmem();
var freemem = os.freemem();
console.log('Total memory' + totalmem);
console.log('Free memory' + freemem);

console.log(`Total Memory: ${totalmem}`)
console.log(`Free Memory: ${freemem}`)

const fs = require('fs');
const files =fs.readdirSync('./');
console.log(files);

fs.readdir('./',function(err , files){
    if(err) console.log('Error' , err);
    else console.log('Result' , files);
});

const EventEmitter = require('events');
const emitter = new EventEmitter();


const Logger = require('./logger');
const logger = new Logger();

//Register listener
logger.on('messagelogged' , (arg) => {
    console.log('Listener called', arg);
});

logger.log('message logger');

//Http 

const http = require('http');
const server = http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('Hello world');
        res.end();
    }

    if(req.url === '/api'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});

server.on('connection', (socket) => {
    console.log('New connection');
});

server.listen(3000);
console.log('Listening on port 3000....');
