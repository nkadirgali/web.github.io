/*document.getElementById("createPost").addEventListener('click',function (){
    let div=document.getElementById("textDiv");
    if(div.style.display=="none"){
        div.style.display="inline";
    }else{
        div.style.display="none";
    }
})*/
$(document).ready(function(){
    $("#createPost").click(function(){
        $("#textDiv").slideToggle("slow");
        $("#triangle1").toggleClass("rotatedTriangle1");
        $("#triangle1").toggleClass("rotatedTriangle2");
    });
});