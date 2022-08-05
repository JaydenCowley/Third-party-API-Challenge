// variables
var currentDate = moment().format("MMMM, Do, dddd, YYYY, h:mm a")
var currentTime = moment().format("h:mm")
var currentHour = moment().hour();
var tasks = [];
var saveTask = function () {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
console.log(currentDate)
// GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
$("#currentDay").append("Today is " + currentDate)
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
$("textarea").each(function () {
  var time = $(this).attr("id");
if (time < currentHour) {
  $(this).addClass("past")
} 
else if (time > currentHour) {
    $(this).addClass("future")
  }
  else {
  $(this).addClass("present")
};
})
// WHEN I click into a time block
// $(".task-item").on("click", function() {
//     // get current text of p element
//     var text = $(this)
//       .text()
//       .trim();
// //  replace  element with a new textarea
// var textInput = $("<textarea>").addClass("task-item").val(text);
// $(this).replaceWith(textInput);
// // auto focus new element
// textInput.trigger("focus");
// });
// // editable field was un-focused
// $(".task-item").on("blur", function() {
//     // get current value of textarea
//     var text = $(this).val();
//     // recreate p element
//   var taskP = $("<td>")
//   .text(text);

// // replace textarea with new content
// $(this).replaceWith(taskP);
// // });
// });
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
$(".saveBtn").on("click", function () {
  var saveId = $(this).siblings("textarea").attr("id");
  var saveText = $(this).siblings("textarea").val().trim();
  var createDataObject = {
    id: saveId,
    text: saveText
  };
  if(tasks === null){
    tasks = [];
  }
  tasks.push(createDataObject);
  saveTask();
});
// WHEN I refresh the page
// THEN the saved events persist
var getTasks = function () {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
   $.each(tasks, function (index, value) {
    var eventId = value.id;
    var eventText = value.text;

    $("#"+eventId).val(eventText);
   });
  }
};
getTasks();