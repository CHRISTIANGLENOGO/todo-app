const todo = document.querySelector("#todos");
const circleBtn = document.querySelector(".circle");
const list = document.querySelector(".list");
const check = document.querySelector(".todoCheck");
const countItem = document.querySelector(".itemLeft");
const todoStatus = document.querySelectorAll(".status");

circleBtn.addEventListener('click', () => {
    addTodo();
    countItems();
    todo.value = '';
});

list.addEventListener('click', () => {
    checking(event);
});

let arrayList = [];

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
        checkList.innerHtml = "<img src=\"images/icon-check.svg\" alt=\"check icon\">";
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

todoStatus.forEach(element => {
    element.addEventListener('click', () => {
        filter(element.innerText);
    });
});

function filter(btn) {
    switch(btn){
        case 'All':
            console.log("hello fucking idiot");
            break;
        case 'Active':
            if(list.childNodes.classList === 'Completed'){

            }
            break;
        case 'Completed':
            console.log("hello");
            break;
        default:
            return;
    }
}