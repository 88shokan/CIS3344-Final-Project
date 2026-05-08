"use strict";

function MakeReminderObjList_CGF() {
  const pageDiv = document.createElement("div");
  pageDiv.className = "reminderPage";

  // Error element for first list
  const error1 = document.createElement("div");
  error1.className = "errorMessage";
  pageDiv.appendChild(error1);

  // Loading indicator for first list
  const loading1 = document.createElement("div");
  loading1.textContent = "Loading upcoming reminders...";
  loading1.className = "loadingMessage";
  pageDiv.appendChild(loading1);

  ajax("json/reminder1.json", function (data1) {
    pageDiv.removeChild(loading1);
    const reminderList1 = MakeReminderObjList({
      reminderObjList: data1.reminderList,
      title: "Upcoming Reminders",
      themeColor: "#6A1B9A",
      sortProperty: "dueDate",
      sortType: "date"
    });
    pageDiv.appendChild(reminderList1);
  }, error1);

  // Error element for second list
  const error2 = document.createElement("div");
  error2.className = "errorMessage";
  pageDiv.appendChild(error2);

  // Loading indicator for second list
  const loading2 = document.createElement("div");
  loading2.textContent = "Loading past reminders...";
  loading2.className = "loadingMessage";
  pageDiv.appendChild(loading2);

  ajax("json/reminder2.json", function (data2) {
    pageDiv.removeChild(loading2);
    const reminderList2 = MakeReminderObjList({
      reminderObjList: data2.reminderList,
      title: "Past Reminders",
      sortProperty: "dueDate",
      sortType: "date"
    });
    pageDiv.appendChild(reminderList2);
  }, error2);

  // Empty list as example
  const reminderList3 = MakeReminderObjList({
    title: "No Reminders",
    sortProperty: "task",
    sortType: "text"
  });
  pageDiv.appendChild(reminderList3);

  return pageDiv;
}