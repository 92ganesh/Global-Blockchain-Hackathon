var quesNo=0;
var optNo=0;

$(document).ready(function(){

     
    var formContent = $("#items");
    
    var optBtn=0;
    
   
    $('body').on('click','#addQ',function(){
        quesNo = quesNo+1;
        optNo = 0;
      $('#items').append("<form id = 'submitQ' onsubmit = 'App.confirmQues(); return false;'> <div> <br><br><b>: question:</b> <br>"+
                        "<input type = 'textarea' id = 'q"+quesNo+"'class = 'ques'> <button type = 'button' class = 'btn btn-primary' id = 'delQues'>Delete Question</button>"+"        "+
                        "<input type = 'submit' id = 'cnfmQues' class = 'btn btn-primary' value = 'Confirm Question'> "+
                        "<br><br><button type = 'button' id = 'ansBtn' class = 'btn btn-primary'>Add Option </button><br><br>"+
                        "</div></form>");
    });
    
    //add the option
    $('body').on('click','#ansBtn',function(){
        optNo = optNo+1;
      $(this).parent('div').append("<div> <b>: Option:</b>"+"<input type = 'text' id = '"+quesNo+"opt"+optNo+"' class = 'opt'>"+
       "<button type = 'button' id = 'delOpt' class = 'btn btn-primary'><br></div>")
    });

    //delete the question
    $('body').on('click', '#delQues', function(){
        quesNo = quesNo-1;
      $(this).parent('div').remove();
    });

    //delete the option
    $('body').on('click', '#delOpt', function(){
        optNo = optNo-1;
      $(this).parent('div').remove();
    });

});