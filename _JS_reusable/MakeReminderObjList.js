"use strict";

function MakeReminderObjList({
  reminderObjList = [],
  title = "Untitled Reminder List",
  themeColor = "#6A1B9A"
} = {}) {

  const container = document.createElement("div");
  container.className = "reminderList";
  container.style.setProperty("--theme-color", themeColor);

  const heading = document.createElement("h2");
  heading.textContent = title;
  heading.className = "reminderTitle";
  container.appendChild(heading);

  // --- SORT CONTROLS ---
  const sortDiv = document.createElement("div");
  sortDiv.className = "sortControls";
  sortDiv.innerHTML = `
    <label>Sort by: </label>
    <select class="sortSelect">
      <option value="date-earliest">Due Date (Earliest First)</option>
      <option value="date-latest">Due Date (Latest First)</option>
      <option value="priority-high">Priority (High to Low)</option>
      <option value="priority-low">Priority (Low to High)</option>
    </select>
  `;
  container.appendChild(sortDiv);

  const listArea = document.createElement("div");
  listArea.className = "reminderCardContainer";
  container.appendChild(listArea);

  function MakeReminderCard({
    task = "Default Task",
    dueDate = "2025-09-11",
    priority = "Normal",
    notes = "No Notes Provided"
  } = {}, index) {

    const card = document.createElement("div");
    card.className = "reminderCard";

    card.innerHTML = `
      <div class="reminderView">
        <h3 class="reminderTask">${task}</h3>
        <p class="reminderDate">Due: ${dueDate}</p>
        <p class="reminderPriority">Priority: ${priority}</p>
        <p class="reminderNotes">${notes}</p>
        <button class="editBtn">Edit</button>
      </div>
      <div class="reminderEdit" style="display: none;">
        <label>Task: <input type="text" class="editTask" value="${task}"></label>
        <label>Due Date: <input type="date" class="editDate" value="${dueDate}"></label>
        <label>Priority: 
          <select class="editPriority">
            <option value="Low" ${priority === "Low" ? "selected" : ""}>Low</option>
            <option value="Normal" ${priority === "Normal" ? "selected" : ""}>Normal</option>
            <option value="High" ${priority === "High" ? "selected" : ""}>High</option>
          </select>
        </label>
        <label>Notes: <textarea class="editNotes">${notes}</textarea></label>
        <button class="saveBtn">Save</button>
        <button class="cancelBtn">Cancel</button>
      </div>
    `;

    const viewDiv = card.querySelector(".reminderView");
    const editDiv = card.querySelector(".reminderEdit");
    const editBtn = card.querySelector(".editBtn");
    const saveBtn = card.querySelector(".saveBtn");
    const cancelBtn = card.querySelector(".cancelBtn");

    editBtn.addEventListener("click", () => {
      viewDiv.style.display = "none";
      editDiv.style.display = "block";
    });

    cancelBtn.addEventListener("click", () => {
      viewDiv.style.display = "block";
      editDiv.style.display = "none";
    });

    saveBtn.addEventListener("click", () => {
      const newTask = card.querySelector(".editTask").value;
      const newDate = card.querySelector(".editDate").value;
      const newPriority = card.querySelector(".editPriority").value;
      const newNotes = card.querySelector(".editNotes").value;

      reminderObjList[index].task = newTask;
      reminderObjList[index].dueDate = newDate;
      reminderObjList[index].priority = newPriority;
      reminderObjList[index].notes = newNotes;

      applyCurrentSort();
    });

    return card;
  }

  function getPriorityValue(priority) {
    const priorityMap = { "High": 3, "Normal": 2, "Low": 1 };
    return priorityMap[priority] || 2;
  }

  function renderList(list) {
    listArea.innerHTML = "";
    if (!list || list.length === 0) {
      listArea.innerHTML = `<p class="noRemindersMsg">No reminders available.</p>`;
      return;
    }
    list.forEach((obj, idx) => {
      const originalIndex = reminderObjList.indexOf(obj);
      listArea.appendChild(MakeReminderCard(obj, originalIndex));
    });
  }

  function applyCurrentSort() {
    const sortOrder = sortSelect.value;
    let sortedList = [...reminderObjList];

    sortedList.sort((a, b) => {
      if (sortOrder === "date-earliest" || sortOrder === "date-latest") {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return sortOrder === "date-earliest" ? dateA - dateB : dateB - dateA;
      } else if (sortOrder === "priority-high" || sortOrder === "priority-low") {
        const priorityA = getPriorityValue(a.priority);
        const priorityB = getPriorityValue(b.priority);
        return sortOrder === "priority-high" ? priorityB - priorityA : priorityA - priorityB;
      }
    });

    renderList(sortedList);
  }

  const sortSelect = sortDiv.querySelector(".sortSelect");
  sortSelect.addEventListener("change", applyCurrentSort);

  // initial render
  renderList(reminderObjList);

  return container;
}