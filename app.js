const themes = [
  {
    "--bg-color": "#F0F2F5",
    "--card-bg": "#FFFFFF",
    "--text-primary": "#2E2E2E",
    "--text-secondary": "#6C757D",
    "--btn-add": "#28A745",
    "--btn-delete": "#DC3545",
    "--task-highlight": "#E8F0FE"
  },
  {
    "--bg-color": "#E8FFF4",
    "--card-bg": "#FFFFFF",
    "--text-primary": "#2D4739",
    "--text-secondary": "#6CA89F",
    "--btn-add": "#34C759",
    "--btn-delete": "#FF3B30",
    "--task-highlight": "#D9FBEA"
  },
  {
    "--bg-color": "#EAF6FF",
    "--card-bg": "#FFFFFF",
    "--text-primary": "#1E3A5F",
    "--text-secondary": "#6B91B0",
    "--btn-add": "#007BFF",
    "--btn-delete": "#DC3545",
    "--task-highlight": "#D6EFFF"
  },
  {
    "--bg-color": "#FFF3E6",
    "--card-bg": "#FFFFFF",
    "--text-primary": "#5E3D2C",
    "--text-secondary": "#A1796D",
    "--btn-add": "#FF914D",
    "--btn-delete": "#FF5E5B",
    "--task-highlight": "#FFE3D2"
  },
  {
    "--bg-color": "#F4F9F4",
    "--card-bg": "#FFFFFF",
    "--text-primary": "#2E4637",
    "--text-secondary": "#7A9E88",
    "--btn-add": "#2ECC71",
    "--btn-delete": "#E74C3C",
    "--task-highlight": "#E6F4EA"
  },
  {
    "--bg-color": "#F5F0FF",
    "--card-bg": "#FFFFFF",
    "--text-primary": "#3B2C60",
    "--text-secondary": "#8574A3",
    "--btn-add": "#7F56D9",
    "--btn-delete": "#FF5C8A",
    "--task-highlight": "#EDE3FF"
  }
];




function setTheme(vars) {
  for (const [key, value] of Object.entries(vars)) {
    document.documentElement.style.setProperty(key, value);
  }
}

themes.forEach((theme, index) => {
    const button = document.getElementById(`btn${index + 1}`)
    if(button) {
        button.addEventListener("click", () => {setTheme(theme); localStorage.setItem("themeIndex", index);})
    }
})



let todos = []

document.getElementById("add-btn").addEventListener("click", function(e){
    e.preventDefault();
    addTodo();
})
document.getElementById("todo-input").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        addTodo();
    }
});

window.onload = function () {

    todos = JSON.parse(localStorage.getItem("todos")) || []

    updateTodoList()
    updateDetails()

    const index = localStorage.getItem("themeIndex");
    console.log(index, themes[Number(index)])
    const themeToSet = index !== null && themes[Number(index)] ? themes[Number(index)] : themes[3];
    setTheme(themeToSet);

}

const addTodo = () => {
    const textInput = document.getElementById("todo-input")
    const text = textInput.value.trim()
    if (text){
        todos.push({text: text, completed: false})
        textInput.value = ""

        updateTodoList()
        updateDetails()
    }
}

const updateTodoList = () => {

    //For Date
    const currentDate = new Date();
    document.getElementById("day").textContent = currentDate.toLocaleDateString('en-US', {weekday: 'long'})
    document.getElementById("date").textContent = `, ${currentDate.getDate()}`
    document.getElementById("month").textContent = currentDate.toLocaleDateString('en-US', {month: 'long'})
    document.getElementById("total-count").textContent = todos.length


    // For list image
    if (todos.length === 0){
        document.getElementById("emptylist").style.display = "flex"
        document.getElementById("todolist").style.display = "none"
    } else {
        document.getElementById("emptylist").style.display = "none"
        document.getElementById("todolist").style.display = "block"
    }

    // For toto list
    const todoList = document.getElementById("tasks")
    todoList.innerHTML = ''

    todos.forEach((todo, index) => {
        const listItem = document.createElement("li")

        listItem.innerHTML = `
            <div class="todo-item">
                <div class="todo ${todo.completed ? "completed" : ''}">
                    <label class="custom-checkbox">
                        <input type="checkbox" id="taskCheckbox" ${todo.completed ? "checked" : ''}>
                        <span class="checkmark"></span>
                        
                        <span class="label-text">${todo.text}</span>
                    </label>
                </div>
                <div class="icons">
                    <img src="/assets/delete.png" alt="Delete" id="delete-btn" onClick="deleteTodo(${index})">
                </div>
            </div>
        `

        listItem.addEventListener("change", () => toggleTodoCompleted(index))
        todoList.append(listItem)
    });
}

const toggleTodoCompleted = (index) => {
    todos[index].completed = !todos[index].completed

    updateDetails()
}

const updateDetails = () => {
    const completed = todos.filter(todo => todo.completed === true).length
    const active = todos.length - completed
    document.getElementById("completed").textContent = completed
    document.getElementById("active").textContent = active

    //For Localy Storing
    localStorage.setItem("todos", JSON.stringify(todos))
}

const deleteTodo = (index) => {
    todos.splice(index, 1)
    updateDetails()
    updateTodoList()
}

document.getElementById("delete-all").addEventListener("click", () => {
    todos = []
    updateDetails()
    updateTodoList( )
})
