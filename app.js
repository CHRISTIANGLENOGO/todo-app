const todo = document.querySelector("#todos");
const circleBtn = document.querySelector(".circle");
const list = document.querySelector(".list");
const countItem = document.querySelector(".itemLeft");
const clearCompleted = document.querySelector(".clear");
const todoStatus = document.querySelectorAll(".status");
const statusContainer = document.querySelector(".todoStatus");
//Toggle menu
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");

//Eventlistener
circleBtn.addEventListener('click', () => {
    addTodo();
    countItems();
    todo.value = '';
});

list.addEventListener('click', () => {
    checking(event);
});

clearCompleted.addEventListener('click', () => {
    clear();
});

todoStatus.forEach(element => {
    element.addEventListener('click', () => { 
        filter(element.innerText);x
    });
});

sun.addEventListener('click', () => {
    toggleThemeSun();
});

moon.addEventListener('click', () => {
    toggleThemeMoon();
});

let arrayList = [];

//FUnctions
function addTodo() {
    if(todo.value === '') return
    //create div
    const addDiv = document.createElement("div");
    addDiv.classList.add("todoDiv");
    //create circle
    const addCheck = document.createElement("div");
    addCheck.classList.add("todoCheck");
    addDiv.appendChild(addCheck);
    //create li
    const addli = document.createElement("li");
    addli.classList.add("todoLi")
    addli.innerText = todo.value;
    addDiv.appendChild(addli);
    //Create cross
    const addCross = document.createElement("div")
    addCross.classList.add("cross");
    addDiv.appendChild(addCross);
    list.appendChild(addDiv);
    arrayList.unshift(addli.innerText);
}

function checking(event) {
    const checkList = event.target;
    if(checkList.classList[0] === 'todoCheck'){
        checkList.style.background = "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%)";
        checkList.innerHtml = "<img src=\"images/icon-check.svg\" alt=\"check icon\"/>";
        checkList.nextSibling.style.textDecoration = "line-through";
        checkList.parentNode.classList.add('completed');
        const arrayVal = checkList.nextSibling.innerText;
        if(arrayList.includes(arrayVal)){
            const indexNum = arrayList.indexOf(arrayVal);
            arrayList.splice(indexNum, 1);
            countItems();
        }
    }
    if(checkList.classList[0] === 'cross'){
        checkList.parentNode.remove();
        const arrayVal = checkList.previousSibling.innerText;
        if(arrayList.includes(arrayVal)){
            const indexNum = arrayList.indexOf(arrayVal);
            arrayList.splice(indexNum, 1);
            countItems();
        }
    }
}

function countItems() {
    let count = arrayList.length;
    if(count > 1) {
        countItem.innerText = `${count} items left`;
    }else {
        countItem.innerText = `${count} item left`;
    }
}

function clear(){
    for(let i = 0; i < list.children.length; i++){
        if(list.children[i].classList.contains("completed")){
            list.children[i].remove();
        }
    }
}

function filter(btn) {
    const lists = list.children.length;
    switch(btn){
        case 'All':
            for(let i = 0; i < lists; i++){
                list.children[i].style.display = "flex";
            }
            statusContainer.children[0].classList.add("active");
            statusContainer.children[1].classList.remove('active');
            statusContainer.children[2].classList.remove('active');
            break;
        case 'Active':
            for(let i = 0; i < lists; i++){
                if(!list.children[i].classList.contains("completed")){
                    list.children[i].style.display = "flex";
                }else {
                    list.children[i].style.display = "none";
                }
            }
            statusContainer.children[0].classList.remove("active");
            statusContainer.children[1].classList.add('active');
            statusContainer.children[2].classList.remove('active');
            break;
        case 'Completed':
            for(let i = 0; i < lists; i++){
                if(list.children[i].classList.contains("completed")){
                    list.children[i].style.display = "flex";
                }else {
                    list.children[i].style.display = "none";
                }
            }
            statusContainer.children[0].classList.remove("active");
            statusContainer.children[1].classList.remove('active');
            statusContainer.children[2].classList.add('active');
            break;
    }
}

function toggleThemeSun(){
    sun.style.display = "none";
    moon.style.display = "flex";

    //Change Background to light
    document.body.style.background = "url(\"images/bg-mobile-light.jpg\") no-repeat";
}

function toggleThemeMoon(){
    moon.style.display = "none";
    sun.style.display = "flex";

    //Change Background to dark
    document.body.style.background = "url(\"images/bg-mobile-dark.jpg\") no-repeat";
}