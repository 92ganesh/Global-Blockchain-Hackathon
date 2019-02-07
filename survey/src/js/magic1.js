$(document).ready(function(){

    //add Question
    $('body').on('click','#addQ',function(){
        var totalQuestions = document.getElementsByName("Quest");
        var currentId;
        if(totalQuestions.length==0){
            currentId = 1;
        }else{
            currentId = Number(totalQuestions[0].id)+1;
        }
        
        var st = '<div>'
        +'<label id="qlabel">Question :</label>'
        +'<textarea name="Quest" id="'+currentId+'">Enter Here</textarea>'
        +'<button class="setQ" onclick="App.setQues(); return false;" >confirm Question</button>'
        +'<input type="button" value="Add Option" id="addOption">'
        +'<input type="button" value="Delete Question" id="deleteQ" name="deleteQ" >'
        +'</div>';

        //document.getElementById("questionList").innerHTML = document.getElementById("questionList").innerHTML+st;
        document.getElementById("questionList").innerHTML = st;
    });

    //delete Complete Question                    
    $('body').on('click', '#deleteQ', function(){
        $(this).parent('div').remove();
    });

    //add  Options
    $('body').on('click', '#addOption', function(){
        var totalOptions = document.getElementsByName("option");
        var currentId;
        if(totalOptions.length==0){
            currentId = 1;
        }else{
            currentId = Number(totalOptions[0].id)+1;
        }
        $(this).parent('div').append('<div><label>Option</label><textarea name="optionsForSurvey" id="'+currentId+'">option</textarea>'
                                    +'<input type="button" value="Delete Option" id="deleteOption"></div>');
    });

    //delete options
    $('body').on('click', '#deleteOption', function(){
        $(this).parent('div').remove();
    });


    

});