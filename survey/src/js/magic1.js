$(document).ready(function(){

    //add Question
    $('body').on('click','#addQ',function(){
        $('.items').append('<div>'
                                +'<label id="qlabel">Question :</label>'
                                +'<textarea name="Quest" id="Quest"></textarea>'
                                +'<button class="setQ" onclick="App.setQues(); return false;" >confirm Question</button>'
                                +'<input type="button" value="Add Option" id="addOption">'
                                +'<input type="button" value="Delete Question" id="deleteQ" name="deleteQ" >'
                            +'</div>');

        
       
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