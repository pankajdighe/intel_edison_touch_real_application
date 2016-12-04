var mraa = require('mraa'); //require mraa
const mqtt = require('mqtt');

console.log('MRAA Version: ' + mraa.getVersion()); //write the mraa version to resin.io dashboard logs
var analogPin0 = new mraa.Aio(2); //setup access analog inpuput pin 0
 //read the pin value as a float




periodicActivity(); //call the periodicActivity function

function periodicActivity()
{

	var analogValueFloat = analogPin0.read();

 

 const client =  mqtt.connect('mqtt://iot.eclipse.org', 1883, 60);


var msg=""+analogValueFloat;

client.on('connect', function () {

	var topic1 = 'topic/GeneralizedIoT/'+process.env.RESIN_DEVICE_UUID;
	console.log("Connection Successful "+ topic1);

	client.publish(topic1,msg);
});



  setTimeout(periodicActivity,1000); //call the indicated function after 1 second (1000 milliseconds)
}