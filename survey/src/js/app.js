//main
var surveyId = 0 ;
var numberOfQuestion;
var questionValue = ['useless'];
App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Survey.json", function(survey) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Survey = TruffleContract(survey);
      // Connect provider to interact with contract
      App.contracts.Survey.setProvider(App.web3Provider);
      
      return App.render();
    });
  },

  render: function() {
    
    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#hell").html("Your Account: " + account);
      }
    });

    // Load contract data
    var surveyInstance;
    App.contracts.Survey.deployed().then(function(instance) {
        surveyInstance = instance;
        return surveyInstance.harshu();
      }).then(function(c) {
        var candidatesResults = $("#hello");
        candidatesResults.empty();
        candidatesResults.append(c);
    });  //first call back func
  }, //render end

  initVar: function(){
    numberOfQuestion = 0;
    surveyId = 0; 
  },

  setQues: function(){
     App.contracts.Survey.deployed().then(function(instance) {
      numberOfQuestion ++;
      //var empty = ["useless"];
      var tempId =  document.getElementsByName("Quest").length;
      var curr = "Q"+tempId;
      console.log(curr);
      var temp = document.getElementById(curr).value                 //$("#tempId").val();// "'+tempId+'"
      questionValue =  questionValue.concat(temp)  ///empty.concat(temp);
      console.log(questionValue);
      //rub below line
      //document.write("question: " + questionValue[numberOfQuestion]);

    });
    
  },
  
  conductSurvey: function() {
    var surveyInstance;
    surveyId ++; 
    var surveyName = $('#surveyName').val(); //take data from html
    
    App.contracts.Survey.deployed().then(function(instance) {
      surveyInstance = instance;

      surveyInstance.createSurvey(surveyId, surveyName, numberOfQuestion); 
      
      for(var questionNoTrack = 1; questionNoTrack <= numberOfQuestion ; questionNoTrack++){
       
        var qValue = questionValue[questionNoTrack] ;
        console.log(qValue);
        var numberOfOption = 2; //changes reqd *
        surveyInstance.createQuestion(surveyId, questionNoTrack, qValue, numberOfOption);
        
        for(var optionTrack = 1; optionTrack<=numberOfOption ; optionTrack++){
          var optionValue = "gudiya";
          surveyInstance.createOption(optionTrack, optionValue, questionNoTrack, surveyId);
        } //inner for end
      } //for end
    }).catch(function(err) {
      console.error(err);
    });
  }//conduct survey end

};//App end

$(function() {
  $(window).load(function() {
    App.init();
  });
});