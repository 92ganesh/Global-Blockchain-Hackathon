$(document).ready(function(){

    //add Question
    $('body').on('click','#addQ',function(){
        var totalQuestions = document.getElementsByName("Quest").length;
        var currentId = totalQuestions+1;
        var st = '<div>'
        +'<label id="qlabel">Question :</label>'
        +'<textarea name="Quest" id="Q'+currentId+'">Enter Here</textarea>'
        +'<button class="setQ" onclick="App.setQues(); return false;" >confirm Question</button>'
        +'<input type="button" value="Add Option" id="addOption">'
        +'<input type="button" value="Delete Question" id="deleteQ" name="deleteQ" >'
        +'</div>';

        document.getElementById("questionList").innerHTML = document.getElementById("questionList").innerHTML+st;
    });

    //delete Complete Question                    
    $('body').on('click', '#deleteQ', function(){
        $(this).parent('div').remove();
    });

    //add  Options
    $('body').on('click', '#addOption', function(){
        $(this).parent('div').append('<div><label>Option</label><textarea name="option" id="option"></textarea>'
                                    +'<input type="button" value="Delete Option" id="deleteOption"></div>');
    });

    //delete options
    $('body').on('click', '#deleteOption', function(){
        $(this).parent('div').remove();
    });


    

});