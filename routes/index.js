var express = require('express');
var router = express.Router();
var http=require('http');
const fs = require('fs');
const AssistantV1 = require('ibm-watson/assistant/v1');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var LanguageTranslator=require('watson-developer-cloud/language-translator/v3');
var speechToText=require('watson-developer-cloud/speech-to-text/v1');
const LanguageTranslator=new LanguageTranslator({
  iam_apikey:'VWTTCSoTbPT5xwOKPVn2U3iHaJoxAE3oz2yzzPynUJge',
  url:'https://stream.watsonplatform.net/speech-to-text/api/'
})
var fs = require('fs');

var visualRecognition = new VisualRecognitionV3({
	version: '2018-03-19',
	iam_apikey: '{iam_api_key}'
}); 

var images_file= fs.createReadStream('./fruitbowl.jpg');
var classifier_ids = ["person_detection_model_1413525950"];
var threshold = 0.6;    

var params = {
	images_file: images_file,
	classifier_ids: classifier_ids,
	threshold: threshold
};

visualRecognition.classify(params, function(err, response) {
	if (err) { 
		console.log(err);
	} else {
		console.log(JSON.stringify(response, null, 2))
	}
});


router.post('/triggerDrone',function(req,res,next){
  let params=req.body.data;
  let paramObj={
    reason:params.reason,
    status:params.status,
    location:{
      lat:params.latitude,
      lng:params.longitude
    }
  };

});

router.post('/requestSupplies',function(req,res,next){
  let params=req.body;

  //create new insident number
  let incidentNo=getRandomArbitrary(10,100000);
  
  let storeString=`{incidentNo:${incidentNo},  text:${params.text}}`;

  fs.writeFile('incidents.txt', storeString, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;
    
    // success, the file was saved
    console.log('incident saved!');
    res.send({data:'haha'});
});
});

router.post('/personMissing',function(req,res,next){

});

router.post('/audioRecognition',function(req,res,next){
const recognizeStream=speectToText
speechToText
});
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}


module.exports = router;
