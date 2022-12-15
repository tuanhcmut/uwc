// var temp = sessionStorage.getItem("vehicles");
// if (temp == null) sessionStorage.setItem("vehicles",new Map());
const vehicles = new Map();
function fetchAllVehicles(){
fetch('vehicle.json')
.then((response) => response.json())
.then((json) => {
    for (i of json){
        i.getEmployeeUsing =  function() {
            return employees.get(this.employeeId);
        }
        i.getEmployeeLastUsed =  function() {
            return employees.get(this.lastUsedEmployeeId);
        }
        i.getTaskRunning = function(){
            return tasks.get(this.taskRunning);
        }
        vehicles.set(i.vehicleId,i);   
    }   
});     
}
function getVehicleById(id){
    return vehicles.get(id);
}
function loadAllVehicles(){
    sessionStorage.getItem("vehicles").forEach((value, key) => {
        vehicles.set(value, key);
    })
}
function goRouting(){
   // createTask();
   let temp = (new URL(location)).searchParams
    if (temp.get("role") == 0) location.href = "route.html?" + temp;
    else location.href = "area.html?" + temp;
  }
function generateVehicles(uid){
    document.getElementById("table-div").innerHTML= `
        <table id="table_id" class="display">
        <thead>
            <tr>
                <th>Tên phương tiện</th>
                <th>ID</th>
                <th>Employee đang được phân công</th>
                <th>Employee đã sử dụng lần cuối</th>
                <th>Thời điểm chỉ định</th>
                <th>Ghi chú</th>
                <th>Thể tích (m3)</th>
                <th>Đang được sử dụng?</th>
                <th>Task ID đang sử dụng</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `;
    var table = $('#table_id').DataTable( {
      ajax: {
        url: 'vehicle.json',
        dataSrc: "",
      },
      columnDefs:[ ],
      columns: [
        { data: "name"},
        { data: "vehicleId"},
        { data: "employeeId", defaultContent: "None", render: function (data) { return data?employees.get(data).fullName+ " ("+ data+")":"None";   }},
        { data: "lastUsedEmployeeId", defaultContent: "None", render: function (data) { return data?employees.get(data).fullName+ " ("+ data+")":"None";   }},
        { data: "timeAssigned" ,
            render: function (data) { 
            return data?new Date(data*1000).toLocaleString('en-GB'):null;
            }},
        { data: "note" },
        { data: "volumeCapacity" },
        { 
          data: "running",
          render: function (data) {
            if (data) return "True"
            else return "False" 
          }
        },
        { data: "taskRunning" },
        { 
            data:"vehicleId",
            render: function (data){
              //return `<img src="${data} "alt="Snow">`
              return `<button class="navigate" ${!vehicles.get(data).employeeId?"":'style="background-color:purple"'} onclick = "updateData('${uid}','${data}')">${!vehicles.get(data).employeeId?"Assign":'Retake'}</button>`
            }, 
            orderable:false
        },
        { 
            data:"vehicleId",
            render: function (data){
              //return `<img src="${data} "alt="Snow">`
              return `<button class="navigate" onclick = "alert('Thuộc về chức năng quản lý vehicle ${data}')">Detail</button>`
            }, 
            orderable:false
        }
      ]
    } );
}
function updateData(i,d){
  if (vehicles.get(d).role!=employees.get(i).role)
  return window.alert("Vai trò collector hoặc janitor không tương thích giữa phương tiện và nhân viên")
  window.opener.handle(i,d);
  window.opener.alert("Đã gán vehicle "+d+" cho employee "+i)
  window.close()
}