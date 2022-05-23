document.querySelector('#search1').oninput = function (){
    let val = this.value.trim();
    let items = document.querySelectorAll(".find1");
    let items2 = document.querySelectorAll(".find2");
    if(val != ''){
        items.forEach(function (elem){
            if(elem.innerText.search(val) == -1){
                elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.order=10;
                elem.innerHTML=elem.innerText;
            }
            else{
                elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.order=1;
                let str = elem.innerText;
                elem.innerHTML=insertMark(str,elem.innerText.search(val),val.length);
            }
        });
    }else{
        items.forEach(function (elem){
            elem.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.style.order=1;
            elem.innerHTML=elem.innerText;
        });
    }
}
function insertMark(str,pos,len){
    return str.slice(0,pos) + '<mark>' +str.slice(pos,pos+len) + '</mark>' + str.slice(pos+len);
}