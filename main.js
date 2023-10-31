let btn = document.getElementById("create_item");
btn.addEventListener("click", (e) => {
    e.preventDefault();
    validateInput();
})

const addtask = document.getElementById("addtask");
const removetask = document.getElementById("removetask");
const inputDiv = document.getElementById("inputTask");

let newParagraph;

addtask.addEventListener("click", function () {
    newParagraph = document.createElement("input");
    newParagraph.placeholder = "task";
    inputDiv.appendChild(newParagraph);
});

removetask.addEventListener("click", () => {
    if (newParagraph) {
        inputDiv.removeChild(newParagraph);
        newParagraph = null;
    };
})


function validateInput(inputField, errorId) {
    errorId = document.getElementById("error");
    inputField = document.querySelector("input")
    if (inputField.value === '') {
        errorId.innerText = "all Fields are required";
        errorId.classList.add("error");
    } else {
        errorId.innerText = '';
        postData();
    }
}

async function postData() {
    const title = document.getElementById('title');
    const tasks = [document.getElementById('task')];
    const category = document.getElementById('category');
    const priority = document.getElementById('priority');
    const date = document.getElementById("date");

    const formData = {
        title: title.value,
        tasks: tasks.value,
        category: category.value,
        priority: priority.value,
        dueDate: date.value,
    };

    const apiUrl = 'https://6538e36aa543859d1bb22255.mockapi.io/api/v1/todos';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
            alert("form-data posted successfully")
            console.log('Data posted successfully:', data);
            populateDisplay();
        })
        .catch(error => {
            alert("there was a slight error, please try again")
            console.error('Error:', error);
        });
        

}

async function populateDisplay() {
    const response = await fetch(
        "https://6538e36aa543859d1bb22255.mockapi.io/api/v1/todos"
    );
    if (response.ok) {
        const data = await response.json();
        const taskContainer = document.getElementById("aside_right_content");

        data.forEach((taskData) => {
            const taskDiv = document.createElement("div");
            
            taskDiv.classList.add("task");
            taskDiv.innerHTML += `
                    <h3>${taskData.title}</h3>
                    <h5>Task</h5>
                    <ul>
                      ${Array.isArray(taskData.tasks)
                    ? taskData.tasks.map((task) => `<li>${task}</li>`).join("")
                    : ""
                }
                    </ul>
                    <div class="second">
                      <p>Category: ${taskData.category}</p>
                      <p>Priority: ${taskData.priority}</p>
                    </div>
                    <div class="second">
                      <p>Status: ${taskData.status ? "Done" : "Not Done"}</p>
                      <p>Completed Date: ${taskData.date}</p>
                    </div>
                  `;
              taskContainer.appendChild(taskDiv);
        });
    } else {
        console.error("Failed to fetch data from the API");
    }
}
populateDisplay();
