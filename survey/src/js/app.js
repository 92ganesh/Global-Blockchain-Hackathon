var surveyId = 1 ;
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
////upto here untouch code

//edit from here
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
        candidatesResults.append("hi");
        var a = c;
        var b = "<h1>"+a+"</h1>";
        candidatesResults.append(b);
    });  //first call back func
  }, //render end

  //conduct survey
  conductSurvey: function() {
    var surveyInstance;
    surveyId ++; 
    var surveyName = $('#surveyName').val();
    var numberOfQuestion = 2;
    App.contracts.Survey.deployed().then(function(instance) {
      surveyInstance = instance;
      return surveyInstance.createSurvey(surveyId, surveyName, numberOfQuestion); // 2 is temporary here 
    }).then(function() {
      var q;
      for(q = 1; q <= numberOfQuestion ; q++){
        var numberOfOption = 2;
        var questionValue = $('#Quest').val();
        surveyInstance.createQuestion(surveyId, q, questionValue, numberOfOption);
      }
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