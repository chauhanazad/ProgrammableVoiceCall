const callerNumber = '1234567890'; //buy a twilio number to make call on user phone number
const callerId = 'client:alice';

exports.handler = function(context, event, callback) {
    var to = event.to;

    const voiceResponse = new Twilio.twiml.VoiceResponse();

    if (!to) {
        voiceResponse.say("Congratulations! You have made your first call! Good bye.");
    } else if (isNumber(to)) {
        const dial = voiceResponse.dial({callerId : callerNumber});
        dial.number(to);
    } else {
        const dial = voiceResponse.dial({callerId : event.From});
        dial.client(to);
    }
    console.log('Response:' + voiceResponse.toString());
    callback(null, voiceResponse);
};

function isNumber(to) {
  if(to.length == 1) {
    if(!isNaN(to)) {
      console.log("It is a 1 digit long number" + to);
      return true;
    }
  } else if(String(to).charAt(0) == '+') {
    number = to.substring(1);
    if(!isNaN(number)) {
      console.log("It is a number " + to);
      return true;
    };
  } else {
    if(!isNaN(to)) {
      console.log("It is a number " + to);
      return true;
    }
  }
  console.log("not a number");
  return false;
}