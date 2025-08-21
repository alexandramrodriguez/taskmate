const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate"); // nuevo
const taskTime = document.getElementById("taskTime");
const taskPriority = document.getElementById("taskPriority");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskContainer = document.getElementById("taskContainer");

function addTask() {
  const taskText = taskInput.value.trim();
  const dateText = taskDate.value; // nuevo
  const taskHour = taskTime.value;
  const priority = taskPriority.value;

  if (!taskText || !dateText || !taskHour || !priority) {
    alert("Por favor, completa todos los campos: tarea, fecha, hora y prioridad");
    return;
  }

  const li = document.createElement("li");

  // Texto de la tarea
  const taskSpan = document.createElement("span");
  taskSpan.classList.add("task-text");
  taskSpan.textContent = taskText;

  // Fecha
    const dateSpan = document.createElement("span");
    dateSpan.classList.add("task-date");
    dateSpan.innerHTML = `Programado para el día 📅:<br>${taskDate.value}`;

  // Hora
  const timeSpan = document.createElement("span");
  timeSpan.classList.add("task-time");
  timeSpan.textContent = taskHour;

  // Prioridad
  const priorityTag = document.createElement("span");
  priorityTag.classList.add("priority", priority);
  priorityTag.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);

  // Status 
  const statusContainer = document.createElement("div");
  statusContainer.classList.add("status-container");
  ["Incompleto","En proceso","Completado"].forEach((estado,i) => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `status-${Date.now()}`;
    radio.value = estado.toLowerCase();
    if(i===0) radio.checked = true;

    radio.addEventListener("change", () => {
      if (radio.checked) {
        li.classList.remove("status-incompleto", "status-en-proceso", "status-completado");
        if (radio.value === "incompleto") li.classList.add("status-incompleto");
        else if (radio.value === "en proceso") li.classList.add("status-en-proceso");
        else if (radio.value === "completado") li.classList.add("status-completado");
      }
    });

    label.appendChild(radio);
    label.appendChild(document.createTextNode(estado));
    statusContainer.appendChild(label);
  });

  // Acciones (edit / delete)
  const actionsContainer = document.createElement("div");
  actionsContainer.classList.add("task-actions");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent="🗑️";
  deleteBtn.classList.add("delete");
  deleteBtn.addEventListener("click",()=>li.remove());

  const editBtn = document.createElement("button");
  editBtn.textContent="✏️";
  editBtn.classList.add("edit");
  editBtn.addEventListener("click", ()=>{
    // Editar también la fecha
    const inputEdit = document.createElement("input");
    inputEdit.type="text"; inputEdit.value=taskSpan.textContent;

    const dateEdit = document.createElement("input");
    dateEdit.type="date"; dateEdit.value=dateSpan.textContent;

    const timeEdit = document.createElement("input");
    timeEdit.type="time"; timeEdit.value=timeSpan.textContent;

    const priorityEdit = document.createElement("select");
    ["alta","media","baja"].forEach(p=>{
      const opt=document.createElement("option");
      opt.value=p;
      opt.textContent=p.charAt(0).toUpperCase()+p.slice(1);
      if(priorityTag.textContent.toLowerCase()===p) opt.selected=true;
      priorityEdit.appendChild(opt);
    });

    const saveBtn=document.createElement("button");
    saveBtn.textContent="💾"; saveBtn.classList.add("save");

    li.insertBefore(inputEdit, taskSpan);
    li.insertBefore(dateEdit, dateSpan);
    li.insertBefore(timeEdit, timeSpan);
    li.insertBefore(priorityEdit, priorityTag);

    li.removeChild(taskSpan);
    li.removeChild(dateSpan);
    li.removeChild(timeSpan);
    li.removeChild(priorityTag);

    actionsContainer.innerHTML=""; actionsContainer.appendChild(saveBtn);

    saveBtn.addEventListener("click", ()=>{
      taskSpan.textContent=inputEdit.value;
      dateSpan.textContent=dateEdit.value;
      timeSpan.textContent=timeEdit.value;
      priorityTag.textContent=priorityEdit.value.charAt(0).toUpperCase()+priorityEdit.value.slice(1);
      priorityTag.className=`priority ${priorityEdit.value}`;

      li.insertBefore(taskSpan,inputEdit);
      li.insertBefore(dateSpan,dateEdit);
      li.insertBefore(timeSpan,timeEdit);
      li.insertBefore(priorityTag,priorityEdit);

      li.removeChild(inputEdit);
      li.removeChild(dateEdit);
      li.removeChild(timeEdit);
      li.removeChild(priorityEdit);

      actionsContainer.innerHTML="";
      actionsContainer.appendChild(editBtn);
      actionsContainer.appendChild(deleteBtn);
    });
  });

  actionsContainer.appendChild(editBtn);
  actionsContainer.appendChild(deleteBtn);


  li.appendChild(taskSpan);
  li.appendChild(dateSpan);
  li.appendChild(timeSpan);
  li.appendChild(priorityTag);
  li.appendChild(statusContainer);
  li.appendChild(actionsContainer);

  taskContainer.appendChild(li);

  // Limpiar inputs
  taskInput.value=""; taskDate.value=""; taskTime.value=""; taskPriority.value="";
}

addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress",(e)=>{if(e.key==="Enter") addTask();});
taskTime.addEventListener("keypress",(e)=>{if(e.key==="Enter") addTask();});
taskPriority.addEventListener("keypress",(e)=>{if(e.key==="Enter") addTask();});
taskDate.addEventListener("keypress",(e)=>{if(e.key==="Enter") addTask();}); 

const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');
const sidebarLinks = document.querySelectorAll('.sidebar a');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });
});
