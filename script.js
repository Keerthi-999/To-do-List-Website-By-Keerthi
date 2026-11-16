let tasks = []
let userName = "";
//DOM elements
const nameForm = document.getElementById("name-form");
const nameInput = document.getElementById("username");

const greeting = document.getElementById("greet");
const todoHeading = document.getElementById("todo-heading");

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("add_task");

const taskList = document.getElementById("task-list");
const totaltask = document.getElementById("total_tasks");
const completedtasks = document.getElementById("completed_tasks");
const clearCompletedbtn = document.getElementById("clear-completed");
const deleteAllbtn = document.getElementById("del-button");

nameForm.addEventListener("submit",saveUserName);
taskForm.addEventListener('submit',addTask);
clearCompletedbtn.addEventListener('click',clearCompleted);
deleteAllbtn.addEventListener('click',deleteAllTasks);

function saveUserName(event){
    event.preventDefault();
    userName = nameInput.value.trim();
    if (username === "") return;
    localStorage.setItem("userName",userName);
    updateGreeting();
    nameInput.value = "";
    tasks = []
    saveTasks();
    renderTasks();
}

function loadUserName(){
    const storedName = localStorage.getItem('userName');
    if (storedName){
        userName= storedName;
        updateGreeting();
    }
}

function updateGreeting(){
    if (userName === ''){
        greet.textContent='Welcome!';
        todoHeading.textContent='My To-do list';
        return;
    }
    greet.textContent = `Welcome, ${userName}`;
    todoHeading.textContent = `${userName}'s To-do List `;
}
function addTask(event){
    event.preventDefault();
    //console.log(taskInput.value);
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
    const task={
    id:Date.now(),
    text:taskText,
    completed: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = "";
}

function deleteTask(id){
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}
function editTask(id){
    const task = tasks.find(task => task.id === id);
    const updatedText = prompt(
    'Edit Task:',
    task.text
    );
    if (!updatedText) return;
    task.text = updatedText.trim();
    saveTasks();
    renderTasks();
}
function toggleComplete(id){
    const task = tasks.find(task =>task.id === id);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

function renderTasks(){
    taskList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => {
            toggleComplete(task.id);
        });
        const textSpan = document.createElement("span");
        textSpan.textContent = task.text;
        textSpan.classList.add("task-test");
        if (task.completed){
            textSpan.classList.add("completed");
        }
        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("task-actions");
        const completeBtn = document.createElement("button")
        completeBtn.textContent = task.completed ? "Undo": "Complete";
        completeBtn.classList.add("complete-btn");
        completeBtn.addEventListener("click", () => {
            toggleComplete(task.id);
        });
        const editBtn =
        document.createElement("button");
        editBtn.textContent="Edit";
        editBtn.classList.add("edit-btn");
        editBtn.addEventListener("click", () => {
            editTask(task.id);
        });
        const delBtn =
        document.createElement("button");
        delBtn.textContent="Delete";
        delBtn.classList.add("delete-btn");
        delBtn.addEventListener("click", () => {
            deleteTask(task.id);
        });
        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(delBtn);

        li.appendChild(textSpan);
        li.appendChild(actionsDiv);
        taskList.appendChild(li);
        li.appendChild(checkbox);
        li.appendChild(textSpan);
    });
    updateStats();
}

function updateStats(){
    totaltask.textContent = `Total Tasks: ${tasks.length}`;
    const completedCount = tasks.filter(task => task.completed).length;
    completedtasks.textContent = `Completed tasks: ${completedCount}`;
}

function saveTasks(){
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function loadTasks(){
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks){
        tasks = JSON.parse(savedTasks);
    }
    renderTasks();
}

function clearCompleted(){
    tasks = tasks.filter(task => !task.completed)
    saveTasks();
    renderTasks();
}

function deleteAllTasks(){
    tasks = [];
    saveTasks();
    renderTasks();
}

loadUserName();
loadTasks();
updateGreeting();
renderTasks();
