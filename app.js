const express = require('express')
const app = express()
const PubNub = require('pubnub');

//middlewares
app.use(express.static('public'))


//Listen on port 3000
server = app.listen(3000);

const io = require("socket.io")(server)


io.on('connection', function (socket) {

	//Instantiate a new Pubnub instance along with the subscribeKey 
	 pubnub = new PubNub({
	        subscribeKey : 'sub-c-4377ab04-f100-11e3-bffd-02ee2ddab7fe'
	    })

    //adding listener to pubnub
     pubnub.addListener({
        message: function(message) {
        	
     /*checking whether the message contains data for the ‘Apple’ category or not.*/
        	if(message.message.symbol=='Google'){
    /*Creates a new date object from the specified message.timestamp.*/ 
		    let x = new Date(message.message.timestamp);
				//Converting the timestamp into a desired format. HH:MM:SS:MS
		    let time =  (x.getHours()) + ':' + (x.getMinutes()) + ':' + (x.getSeconds()) + ':' + (x.getMilliseconds());
		   /*Here we are creating an object which will contain a timestamp as label and the ‘order_quantity’ as value.*/
			let data = {"label": time, "value":message.message.order_quant
                  //sending data to the client
				 socket.broadcast.emit('updateChart', data);
        	}; 

        }
    })      
    
    //Subscribe the PubNub channel
    pubnub.subscribe({
        channels: ['pubnub-market-orders'] 
    });

});

