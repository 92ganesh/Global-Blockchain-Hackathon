var j=0,ct,k,ans,optResults;
var optResults,quesResults;
var finalOpt ='';


App = {
  web3Provider: null,
  contracts: {},
  account:'0x0',
  

  init: function(){
    return App.initWeb3();
  },

  initWeb3: function(){
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

  initContract: function(){
    $.getJSON("Survey.json", function(survey){
      App.contracts.Survey = TruffleContract(survey);
      App.contracts.Survey.setProvider(App.web3Provider);
      return App.render();
    });
    //return App.render();
  },

  
  confirmQues: function(){
    var instance;

    var question = $("#q"+quesNo).val();
   console.log(question);
   App.contracts.Survey.deployed().then(function(ins){
     instance = ins;

     return instance.addQuestion(question);
   }).then(function(ins2){
      //instance = ins2;

      for(var i=1;i<=optNo;i++){
        var option = $("#"+quesNo+"opt"+i).val();
        console.log($("#"+quesNo+"opt"+2).val());
        console.log(optNo);
        instance.addOption(option);
      }
      
   });
  },

  render: function(){
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    web3.eth.getCoinbase(function(err, account){
      if(err === null){
        App.account = account;
        $("#accnt").html("Your account address is"+account);
      }

    });

    App.contracts.Survey.deployed().then(function(instance){
      surveyInstance = instance;
      
      return surveyInstance.quesCount();
    }).then(function(qCount){
        for( ct=1;ct<=qCount;ct++){
          
         surveyInstance.questions(ct).then(function(quess){
          var qId = quess[0];
          var qValue = quess[1];
          var qOptions = quess[2];

           quesResults = "<b> <p> Question "+qId+": "+qValue+" </p></b><br>";

          optResults += "<select>";

            //console.log(quess[2]);
            //for( k=1;k<=2;k++){
              surveyInstance.optCount().then(function(oCount){
              return surveyInstance.getOption(ct,1);

            /*for(var k=1;k<=oCount;k++){
              //surveyInstance.
               surveyInstance.getOption(ct,k).then(function(optValue){
                var pls = optValue;
                console.log(pls);
                optResults = "<select name = 'option' value = '"+optValue+"'>"+"</select>";
              });
              console.log(optResults);
              //var optResults = "<select name = 'option' value = '"++"'>"+"</select>";
            }*/
            
          }).then(function(ans){
            finalOpt = ans[1];
            //optResults += "<option value='"+3+"'>"+3+"</option>";
            optResults = finalOpt;
            console.log(finalOpt);
            //console.log(2);
          });
        //}
        content.append(quesResults); 
          optResults += "</select>";
          content.append(finalOpt);
          //content.append(optResults+finalOpt);
          optResults = "";
          });
        }
    });
    loader.hide();
    content.show();
},

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
