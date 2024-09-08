
const inputEl = document.getElementById("input-el");
const addBtn = document.getElementById("add-btn");
const ulEl = document.getElementById("ul-el");
let myToDo = [];
let toDoFromLocalStorage = JSON.parse(localStorage.getItem("myToDo"));

if (toDoFromLocalStorage) {
    myToDo = toDoFromLocalStorage;
    renderToDo();
}

// Add button click handler
addBtn.addEventListener("click", () => {
    const newTask = inputEl.value.trim();
    if (newTask) {
        myToDo.push(newTask);
        inputEl.value = "";
        updateLocalStorage();
        renderToDo();
    }
});

// Render the To-Do list
function renderToDo() {
    let listItems = myToDo.map((task, index) => `
        <li>
            <span>${task}</span>
            <button class="delete-btn" data-index="${index}">X</button>
        </li>
    `).join('');
    ulEl.innerHTML = listItems;
}

// Event delegation for delete button
ulEl.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const index = event.target.getAttribute("data-index");
        deleteTask(Number(index));
    }
});

// Delete a task
function deleteTask(index) {
    myToDo.splice(index, 1);
    updateLocalStorage();
    renderToDo();
}

// Update local storage
function updateLocalStorage() {
    localStorage.setItem("myToDo", JSON.stringify(myToDo));
}
