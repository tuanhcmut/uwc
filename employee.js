const employees = new Map();
function fetchAllEmployees(){
fetch('./employee.json')
.then((response) => response.json())
.then((json) => {
    for (i of json){
        employees.set(i.userid,i);   
    }
}); 
}
function loadAllEmployees(){
    sessionStorage.getItem("employees").forEach((value, key) => {
        employees.set(value, key);
    })
}
function Employee(id, phone,email,fullName, role, group, status, account, vehicle = null, tasks = null){
    return {
        id : id, 
        phone: phone,
        email: email,
        fullName: fullName,
        role: role,
        group: group,
        status:status,
        account : account,
        vehicle: vehicle,
        tasks : tasks
    }
}
function getEmployeeById(id){
    return employees.get(id);
}
function getEmployeeList () {
    return list();
}
function selectEmployee(eId){
    if (getSelectedEmployees().includes(eId)) return alert("Nhân viên "+ eId + " đã được thêm trước đó");
    else if (!document.getElementById(employees.get(eId).role).checked)  return alert("Nhân viên "+ eId + " đã chọn có vai trò Janitor hoặc Collector không tương thích");
    var temp = document.getElementById("employeeSelect");
    var option = document.createElement("option");
      option.text = 'Employee: '+employees.get(eId).fullName;
      option.value = eId;
      document.getElementById("collector").disabled = true;
      document.getElementById("janitor").disabled = true;
      temp.add(option);
}
function removeSelectedEmployee(){
        var temp = document.getElementById("employeeSelect");
        temp.remove(temp.selectedIndex);
        if (temp.length == 0){
          document.getElementById("collector").disabled= false;
          document.getElementById("janitor").disabled= false;
        }
}
function getSelectedEmployees(){
        const arr = [];
        var temp = document.getElementById("employeeSelect");
        for (i = 0 ; i < temp.length; i++){
            arr.push(temp.options[i].value);
        }
        return arr;
}
function generateEmployeeTable(){
document.getElementById("table-div").innerHTML= `
    <table id="table_id" class="display">
    <thead>
        <tr>
            <th>ID Nhân viên</th>
            <th>Tên</th>
            <th>Nhóm</th>
            <th>Phương tiện</th>
            <th>ID Phương tiện</th>
            <th>SĐT</th>
            <th>
              <button class="select_all" onclick='alert("not implement yet")'>
                Chọn tất cả
              </button>
            </th>
        </tr>
    </thead>
    <tbody>
    </tbody>
</table>
`
var table = $('#table_id').DataTable( {
    ajax: {
        url: 'employee.json',
        dataSrc: ''
    },
    columnDefs:[ ],
    columns: [
    { data: "userid"},
    { data: "fullName"},
    { 
      data: "group",
      defaultContent: "No group"
    },
    { 
      data: "vehicleId",
      render: function (data) {
        return `<a onClick="getVehicleById('${data}');">${getVehicleById(data).name}</a>`
      }
    },
    { data: "vehicleId"},
    { data: "phone" },
    { data:"userid", 
      render: function (data){
        return `<button class="navigate" onclick="selectEmployee('${data}')">
          Chọn</button>`
      }, 
      orderable:false
    }
  ]
} );
if(params.get("employee")) selectEmployee(params.get("employee"));
}
function generateSelectedEmployeeTable(arr){
    document.getElementById("table-div").innerHTML= `
        <table id="table_id" class="display">
        <thead>
            <tr>
                <th>ID Nhân viên</th>
                <th>Tên</th>
                <th>Nhóm</th>
                <th>Phương tiện</th>
                <th>ID Phương tiện</th>
                <th>SĐT</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
    `
    var table = $('#table_id').DataTable( {
      ajax: {
        url: 'employee.json',
        dataSrc: function(json) {
          return json.filter(function(item){
            return arr.includes(item.userid);         
          });
        }
      },
      columnDefs:[ ],
      columns: [
        { data: "userid"},
        { data: "fullName"},
        { data: "group", defaultContent: "No group"},
        { 
          data: "vehicleId",
          render: function (data) {
            return `<a onClick="getVehicleById('${data}');">${data?getVehicleById(data).name:"Not assigned"}</a>`
          }
        },
        { data: "vehicleId", defaultContent:"No data"},
        { data: "phone" },
        { 
          data:"userid",
          render: function (data){
            return `<button class="navigate" ${(employees.get(data).vehicleId)?"":'style="background-color:red"'}  onclick = "window.open('assign.html?role=${employees.get(data).role}&userid=${data}','mywindow','status=1')">Phân công phương tiện</button>`
          }, 
          orderable:false
        }
      ]
    } );
}