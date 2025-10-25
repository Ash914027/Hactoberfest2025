const inputBox= document.getElementById("input-box");
const listcontainer= document.getElementById("list-container");

function addTask(){

    if(inputBox.value===''){
        window.alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        listcontainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML="\u00d7";                 /* use to add cross x button */
        li.appendChild(span);
        
    }
    inputBox.value = "";
    saveData();
}

listcontainer.addEventListener("click",(e)=>{
    if(e.target.tagName==="LI"){
        e.target.classList.toggle("checked");     /* when we will go over li and click it will get crossed */
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove(); /* onclicking on span it will remove the element */
        saveData();    
    }
},false);

function saveData(){

    localStorage.setItem("data",listcontainer.innerHTML);
}


function showTask(){
    listcontainer.innerHTML = localStorage.getItem("data");
}

showTask();