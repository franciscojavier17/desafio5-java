const initialId = Date.now();

const tasks = [
    { id: initialId, desc: "Hacer el aseo de la casa", status: false },
    { id: initialId + 1, desc: "Tomar desayuno", status: false },
    {
    id: initialId + 2,
    desc: "Estudiar y hacer las tareas de Latam",
    status: false,
},
];

const inputTask = document.querySelector("#inputTask");
const inputButton = document.querySelector("#inputButton");
const displayTotalTasks = document.querySelector("#displayTotalTasks");
const displayCompletedTasks = document.querySelector("#displayCompletedTasks");
const tasksTableContainer = document.querySelector("#tasksTableContainer");

const deleteTask = (id) => {
console.log("Test", id);
const taskElement = tasks.findIndex((task) => task.id === id);

if (taskElement === -1) {
    return;
}

tasks.splice(taskElement, 1);

renderTable();
};

const toggleTask = (id) => {
const taskElement = tasks.find((task) => task.id === id);

if (!taskElement) {
    return;
}

taskElement.status = !taskElement.status;

renderTable();
};

const makeHtmlFromTask = (task) => {
    return `
    <tr class="${task.status ? "task-completed" : ""}">
        <td>${task.id}</td>
        <td>${task.desc}</td>
        <td>
            <div class="flex-container">
                <input class="input-check-completed" type="checkbox" ${
                task.status ? "checked" : ""
                } onclick="((ev) => toggleTask(${task.id}))()"/>
            </div>
        </td>
        <td>
            <button class="btn-delete" onclick="((ev) => deleteTask(${
            task.id
        }))()">Eliminar</button>
        </td>
    </tr>
`;
};

const renderTable = () => {
    let html = "";

for (const task of tasks) {
    html += makeHtmlFromTask(task);
}

const final = `
    <table class="tasks-table">
        <tr>
            <th>ID</th>
            <th colspan="3">Tareas</th>
        </tr>
        ${html}
    </table>`;

tasksTableContainer.innerHTML = final;
displayTotalTasks.textContent = tasks.length;
displayCompletedTasks.textContent = tasks.filter(
    (task) => task.status
).length;
};

inputButton.addEventListener("click", (ev) => {
    const text = inputTask.value;

if (text.length === 0) {
    alert("El texto de la tarea no puede estar vacio");
    return;
}

tasks.push({ id: Date.now(), desc: text, status: false });
renderTable();
});

renderTable();