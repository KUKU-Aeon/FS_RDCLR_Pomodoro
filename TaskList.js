document.addEventListener('DOMContentLoaded', function (){
    const taskList = document.getElementById("task-list");
    const addTaskForm = document.getElementById("add-task-form");



    // массив объектов задач
    let tasks = [
        {
            id: 1,
            title: "Задача 1",
            description: "Описание задачи 1",
            completed: false
        },
        {
            id: 2,
            title: "Задача 2",
            description: "Описание задачи 2",
            completed: false
        },
        {
            id: 3,
            title: "Задача 3",
            description: "Описание задачи 3",
            completed: false
        }
    ];

// функция для добавления задачи
    function addTask(title, description) {
        let newTask = {
            id: tasks.length + 1,
            title: title,
            description: description,
            completed: false
        };
        tasks.push(newTask);
    }

// функция для удаления задачи
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
    }

// функция для редактирования задачи
    function editTask(id, title, description) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                task.title = title;
                task.description = description;
                task.completed = false;
            }
            return task;
        });
    }

// функция для отметки задачи выполненной
    function completeTask(id) {
        tasks = tasks.map(task => {
            if (task.id === id) {
                task.completed = true;
            }
            return task;
        });
    }

// функция для получения следующей задачи
    function getNextTask() {
        return tasks.find(task => !task.completed);
    }

// функция для отображения списка задач
    function renderTaskList() {
        taskList.innerHTML = "";
        tasks.forEach(task => {
            const li = document.createElement("li");
             task.completed === true ?  li.classList.add('completed') : '';
             li.id = task.id;
            li.innerHTML = `
      <div>
        <h3>${task.title}</h3>
        <p>${task.description}</p>
      </div>
      <div class="actions">
        <button class="complete-btn" data-id="${task.id}">Выполнено</button>
        <button class="edit-btn" data-id="${task.id}">Редактировать</button>
        <button class="delete-btn" data-id="${task.id}">Удалить</button>
      </div>
    `;
            taskList.appendChild(li);
        });
        let NextTask = getNextTask();
        if (NextTask !== undefined)
        {
            document.getElementById(`${NextTask.id}`).classList.add('current');
        }
    }

// обработчик отправки формы добавления задачи
    addTaskForm.addEventListener("submit", event => {
        event.preventDefault();
        const title = event.target.elements.title.value;
        const description = event.target.elements.description.value;
        addTask(title, description);
        renderTaskList();
        event.target.reset();
    });

// обработчик клика на кнопку выполнено
    taskList.addEventListener("click", event => {
        if (event.target.classList.contains("complete-btn")) {
            const id = Number(event.target.dataset.id);
            completeTask(id);
            renderTaskList();
        }
    });

// обработчик клика на кнопку редактировать
    taskList.addEventListener("click", event => {
        if (event.target.classList.contains("edit-btn")) {
            const id = Number(event.target.dataset.id);
            const task = tasks.find(task => task.id === id);
            const title = prompt("Введите новое название задачи", task.title);
            const description = prompt("Введите новое описание задачи", task.description);
            editTask(id, title, description);
            renderTaskList();
        }
    });

// обработчик клика на кнопку удалить
    taskList.addEventListener("click", event => {
        if (event.target.classList.contains("delete-btn")) {
            const id = Number(event.target.dataset.id);
            deleteTask(id);
            renderTaskList();
        }
    });

// отображение списка задач при загрузке страницы
    renderTaskList();

})