// var temp = sessionStorage.getItem("tasks");
// if (temp == null) sessionStorage.setItem("tasks",new Map());
const tasks = new Map();
async function createTask(){
fetch('task.json')
.then((response) => response.json())
.then((json) => {
    json.push("d");
    console.log(json);
});

  [fileHandle] = await window.showOpenFilePicker();
  const file = await fileHandle.getFile();
  const contents = await file.text();
  textArea.value = contents;

    // const fs = require(['fs']);
    // const file = require(['task.json']);
    // let fileName = "task.json"
    // fs.writeFile(fileName, "content", err => {
    //     if (err) {
    //       console.error(err);
    //     }
    //     // file written successfully
    //   });
}
function fetchAllTasks(){
fetch('task.json')
.then((response) => response.json())
.then((json) => {
    for (i of json){
        i.getEmployee =  function() {
            return employees.get(this.employeeId);
        }
        i.getVehicle =  function() {
            return vehicles.get(this.vehicleId);
        }
        i.getTaskRunning = function(){
            return tasks;
        }
        tasks.set(i.taskId,i);   
    }   
}); 
}
function loadAllTasks(){
    sessionStorage.getItem("tasks").forEach((value, key) => {
        tasks.set(value, key);
    })
}
function goHome(){
    alert("Tạo task thành công. Bấm OK để quay lại trang quản lý công việc")
    location.href = "task.html" 
}
function recreate(taskId){
    var temp = tasks.get(taskId);
    location.href = `create.html?role=${temp.role == 'collector'?0:1}&mcps=${temp.MCPs.join('+')}&description=${temp.description}&timestart=${new Date (temp.timeStart).toISOString()}&employee=${temp.employeeId}`
}
 