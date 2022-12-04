let globalTaskData = [];  
taskContents = document.getElementById("taskContents");


const addCard = () => {
  const newTaskDetails = {
    id: `${Date.now()}`,
    url: document.getElementById("imageURL").value,
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("taskType").value,
    description: document.getElementById("taskDescription").value
  };
  taskContents.insertAdjacentHTML('beforeend',generateTaskCard(newTaskDetails));
  
  globalTaskData.push(newTaskDetails);
  saveToLocalStorage();
};

const generateTaskCard = ({ id, url, title, type, description }) => {
  return(`<div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
    <div class="card">
        <div class="card-header">
            <div class="d-flex justify-content-end">
                <button class="btn btn-outline-info">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="btn btn-outline-danger">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
        <img src=${url} alt="image">
        <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${description}</p>
            <span class="badge bg-primary">${type}</span>
        </div>
        <div class="card-footer">
            <button class="btn btn-outline-primary float-end">Open Task</button>
        </div>
    </div>
</div>`
)};

const saveToLocalStorage = () => {
    localStorage.setItem("alltasks", JSON.stringify({tasks: globalTaskData}))
}

const reloadTaskCard = () => {
    const localStorageCopy = JSON.parse(localStorage.getItem("alltasks"));
    if(localStorageCopy) {
        globalTaskData = localStorageCopy.tasks;
    }
    globalTaskData.map((cardData) => {
        taskContents.insertAdjacentHTML('beforeend',generateTaskCard(cardData));
    })
}