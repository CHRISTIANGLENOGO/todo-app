const todo = document.querySelector("#todos");
const circleBtn = document.querySelector(".circle");
const list = document.querySelector(".list");
const countItem = document.querySelector(".itemLeft");
const clearCompleted = document.querySelector(".clear");
const todoStatus = document.querySelectorAll(".status");
const statusContainer = document.querySelector(".todoStatus");
//Toggle menu
const toggleBtn = document.querySelector(".toggle");
const sun = document.querySelector(".sun");
const moon = document.querySelector(".moon");
//Background Images
const light = document.querySelector(".light");
const dark = document.querySelector(".dark");

//Eventlistener
circleBtn.addEventListener('click', () => {
    addTodo();
    countItems();
});

list.addEventListener('click', checking);
clearCompleted.addEventListener('click', clear);
toggleBtn.addEventListener('click', toggleMenu);

todoStatus.forEach(element => {
    element.addEventListener('click', () => {
        filter(element.innerText);
    });
});

let arrayList = [];

//Functions
//Add todo list 
function addTodo() {
    if (todo.value === '') return
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
    //Array list for todo item
    arrayList.unshift(addli.innerText);
    //Clear Input Field
    todo.value = '';
}

//Check the complete todo and Delete todo
function checking(event) {
    const checkList = event.target;
    if (checkList.classList[0] === 'todoCheck') {
        //To create a check mark once completed
        checkList.parentNode.classList.toggle("completed");
        checkList.classList.toggle("complete");
        checkList.nextSibling.classList.toggle("todoLiComplete");

        //To check the Todo Item which is listed in the array then delete the item from the active list
        const arrayVal = checkList.nextSibling.innerText; 
        if(checkList.classList.contains("complete")){
            const indexNum = arrayList.indexOf(arrayVal);
            arrayList.splice(indexNum, 1);
            countItems();
        }else {
            arrayList.unshift(arrayVal);
            countItems();
        }      
    }

    if (checkList.classList[0] === 'cross') {
        //Delete the todoDiv and update the countitems
        checkList.parentNode.remove();
        const arrayVal = checkList.previousSibling.innerText;
        if (arrayList.includes(arrayVal)) {
            const indexNum = arrayList.indexOf(arrayVal);
            arrayList.splice(indexNum, 1);
            countItems();
        }
    }
}

//Count The todo list item
function countItems() {
    let count = arrayList.length;
    if (count > 1) {
        countItem.innerText = `${count} items left`;
        desktop(countItem);
    } else {
        countItem.innerText = `${count} item left`;
        desktop(countItem);
    }
}

//Clear all Completed todo
function clear() {
    for (let i = 0; i < list.children.length; i++) {
        if (list.children[i].classList.contains("completed")) {
            list.children[i].remove();
        }
    }
}

//Filtering Todo Status
function filter(btn) {
    const lists = list.children.length;
    switch (btn) {
        case 'All':
            for (let i = 0; i < lists; i++) {
                list.children[i].style.display = "flex";
            }
            statusContainer.children[0].classList.add("active");
            statusContainer.children[1].classList.remove('active');
            statusContainer.children[2].classList.remove('active');
            break;
        case 'Active':
            for (let i = 0; i < lists; i++) {
                if (!list.children[i].classList.contains("completed")) {
                    list.children[i].style.display = "flex";
                } else {
                    list.children[i].style.display = "none";
                }
            }
            statusContainer.children[0].classList.remove("active");
            statusContainer.children[1].classList.add('active');
            statusContainer.children[2].classList.remove('active');
            break;
        case 'Completed':
            for (let i = 0; i < lists; i++) {
                if (list.children[i].classList.contains("completed")) {
                    list.children[i].style.display = "flex";
                } else {
                    list.children[i].style.display = "none";
                }
            }
            statusContainer.children[0].classList.remove("active");
            statusContainer.children[1].classList.remove('active');
            statusContainer.children[2].classList.add('active');
            break;
    }
}

function toggleMenu(e) {
    const theme = e.target;

    const todoInput = document.querySelector(".todoInput");
    const counter = document.querySelector(".counter");

    if(theme.parentNode.classList[0] === "sun"){
        //Change Toggle Icon
        moon.style.display = "flex";
        sun.style.display = "none";

        //Change backgroung Image to light
        light.style.display = "flex";
        dark.style.display = "none";

        //Change background color to Light
        document.body.style.background = "hsl(236, 33%, 92%)";
        todoInput.style.background = "hsl(0, 0%, 98%)";
        todo.style.background = "hsl(0, 0%, 98%)";
        list.style.background = "hsl(0, 0%, 98%)";
        counter.style.background = "hsl(0, 0%, 98%)";
        statusContainer.style.background = "hsl(0, 0%, 98%)";

    }else {
        //Change toggle Icon
        moon.style.display = "none";
        sun.style.display = "flex";

        //Change Backgroung Image to dark
        light.style.display = "none";
        dark.style.display = "flex";

        //Change background color to Dark
        document.body.style.background = "hsl(235, 21%, 11%)";
        todoInput.style.background = "hsl(235, 24%, 19%)";
        todo.style.background = "hsl(235, 24%, 19%)";
        list.style.background = "hsl(235, 24%, 19%)";
        counter.style.background = "hsl(235, 24%, 19%)";
        statusContainer.style.background = "hsl(235, 24%, 19%)";
    }
}

//For desktop
const desktopItem = document.querySelector('.Item');
const desktopClear = document.querySelector(".Clear");

function desktop(countItem){
    desktopItem.innerText = countItem.innerText;
}

desktopClear.addEventListener('click', clear);