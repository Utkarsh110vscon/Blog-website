let editableTitle=document.querySelector(".editable");
let temp=document.querySelector(".placeholder_title");

let innerTitle=temp;

editableTitle.addEventListener("click",function () {
    editableTitle.setAttribute("contenteditable","true");
    editableTitle.focus();
});
editableTitle.addEventListener("keydown",function () {
    if(editableTitle.contains(innerTitle)){
        // console.log(innerTitle);
        innerTitle.remove();
    }
});

editableTitle.addEventListener("keyup",function(){
    if(editableTitle.textContent.length === 0) {
        innerTitle=document.createElement("span");
        const node = document.createTextNode("Add title");
        innerTitle.appendChild(node);
        editableTitle.appendChild(innerTitle);
        document.querySelector(".editable span").classList.add("placeholder_title");
    }
})

let editablepara=document.querySelector(".editable-para");
let temp2=document.querySelector(".placeholder_content");

let innerPara=temp2;

editablepara.addEventListener("click",function () {
    editablepara.setAttribute("contenteditable","true");
    editablepara.focus();
});
editablepara.addEventListener("keydown",function () {
    if(editablepara.contains(innerPara)){
        // console.log(innerPara);
        innerPara.remove();
    }
});

editablepara.addEventListener("keyup",function(){
    if(editablepara.textContent.length === 0) {
        innerPara=document.createElement("span");
        const node = document.createTextNode("Write Blog.....");
        innerPara.appendChild(node);
        editablepara.appendChild(innerPara);
        document.querySelector(".editable-para span").classList.add("placeholder_content");
    }
})

let input1;
document.querySelector(".editable").addEventListener("keyup",function(){
    if(document.querySelector(".editable").childNodes[0].className==="placeholder_title"){
        input1=false;
    } else{
        input1=true;
    }
    if(input1){
        document.querySelector('.submit-btn').disabled=false;
        document.querySelector('.submit-btn').style.color="#ffffff";
    }else{
        document.querySelector('.submit-btn').disabled=true;
        document.querySelector('.submit-btn').style.color="#ffffff63";
    }
});

document.querySelector(".submit-btn").addEventListener("click",function(){
    const heading = document.querySelector(".editable").innerText;
    const para =document.querySelector(".editable-para").innerText;

    document.getElementById("hiddenHeading").value=heading;
    document.getElementById("hiddenpara").value=para;
});