const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

let tasks = [];

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
        const li = document.createElement("li");

        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="task-buttons">
                <button onclick="toggleTask(${task.id})">
                    ${task.completed ? "Undo" : "Complete"}
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });

    updateCounter();
}


function addTask() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });

    taskInput.value = "";

    renderTasks();
}


function toggleTask(id) {
    tasks = tasks.map((task) => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    renderTasks();
}


function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);

    renderTasks();
}


function updateCounter() {
    totalTasks.textContent = tasks.length;

    pendingTasks.textContent = tasks.filter(
        task => !task.completed
    ).length;

    completedTasks.textContent = tasks.filter(
        task => task.completed
    ).length;
}


function clearAllTasks() {
    if (window.confirm("Are you sure?")) {
        tasks = [];
        renderTasks();
    }
}


addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

clearAllBtn.addEventListener("click", clearAllTasks);


renderTasks();
