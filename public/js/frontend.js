
searchBtn = $('button')
let returnData


$(document).ready(function(){
    searchBtn.on('click', ()=>{
        $('.results h1').hide();
        $('.results img').show()
        console.log("hello")
        $.ajax({
            contentType: 'application/json',
            data:JSON.stringify({
                "url": $('input').val()
            }),
            success: function(response){
                console.log("success")
                $('.results img').hide()
                $('.results h1').text(response.message)
                $('.results h1').show()
                
                console.log(response.message)
            },
            
            type: "POST",
            url: "/test",
            dataType: 'json',
            error: function(){
                console.log("error")
                
            }

        })
    })
    
})