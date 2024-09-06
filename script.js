let idcount = 1;
function addTask() {
    const task = document.querySelector("input").value
    console.log(task)

    // creating a new task div
    const newDiv = document.createElement("div")
    newDiv.setAttribute("id", "todo-" + idcount)
    newDiv.setAttribute("class", "tasks")

    //creating a h3 textnode
    const newTaskEl = document.createElement("P")
    newTaskEl.innerHTML = task

    //creating a div for buttons
    const buttonDiv = document.createElement("div")
    buttonDiv.setAttribute("id", "taskButtons")

    //creating a edit button
    const editButton = document.createElement("button")
    editButton.setAttribute("class", "editButton")
    editButton.setAttribute("class", "btn btn-warning ")
    editButton.innerHTML = "Edit"

    //creating a delete button
    const delButton = document.createElement("button")
    delButton.setAttribute("class", "deleteButton")
    delButton.setAttribute("class", "btn btn-danger ")

    delButton.innerHTML = "Delete"
    delButton.setAttribute("onclick", "deleteTask(" + idcount + ")")
    idcount = idcount + 1;

    // appending the task and button
    newDiv.appendChild(newTaskEl)
    buttonDiv.appendChild(editButton)
    buttonDiv.appendChild(delButton)
    newDiv.appendChild(buttonDiv)



    document.getElementById("taskbox").appendChild(newDiv)
    document.querySelector("input").value = ""


}

function deleteTask(idcount) {
    console.log(idcount)
    const delItem = document.getElementById("todo-" + idcount);
    delItem.parentNode.removeChild(delItem)
}