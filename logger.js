const EventEmitter = require('events');

var url ="http://mylogger.io/log";

class Logger extends EventEmitter {
    log(message) {
        console.log(message);
        
    //Raise event
    this.emit('messagelogged' , {id:1,url:'http://'} );
    //Making noise , produce - signaling
    }

    
}
module.exports = Logger;
module.exports.endPoint = url; 