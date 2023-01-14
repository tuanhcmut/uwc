if (window.location.pathname == "/uwc/" || window.location.pathname.includes("index")) 
        if (sessionStorage.getItem("userid") window.location.replace("task.html");
function matchPassword(account) {
    return (account.userid === "000001" && account.password === "12345678");
}
function login(username, password){
    fetch('./account.json')
    .then((response) => response.json())
    .then((json) => {
        account = json.find(({ userid }) => userid === username);
        if (account.password === password){
            sessionStorage.setItem("userid",username);
            sessionStorage.setItem("role",account.role);
            // loadDataFromFile();
            // saveDataToSessionStorage();
            //alert("Login suceesful");
            window.location.replace("task.html");
        }
        else alert("Wrong account");
    }); 
}
function loginAs(){
    let selectDemoAccount =  document.getElementById("accountSelect");
    let userid = selectDemoAccount.value;
    fetch('./account.json')
    .then((response) => response.json())
    .then((json) => {
        return login(userid,json.find(({ userid }) => userid === userid).password);
    }); 
}
function logOut(){
    if (!sessionStorage.getItem("userid"))
        return alert("Log in first!");
    sessionStorage.removeItem("userid");
    sessionStorage.removeItem("role");
    clearAllMap();
    clearData();
    alert("Log out successful");
    window.location.replace("index.html");
}
function loadOptions(){
let selectDemoAccount =  document.getElementById("accountSelect");
fetch('./account.json')
.then((response) => response.json())
.then((json) => {
    for (i of json){
        var option = document.createElement("option");
        option.text = i.role + " ("+ i.userid + ")";
        option.value = i.userid;
        selectDemoAccount.add(option);
    }
});
}
 

function getCurrentUserId(){
    return sessionStorage.getItem("userid");
}
function getCurrentUserRole(){
    return sessionStorage.getItem("role");
}
function clearAllMap(){
    employees.clear();
    mcps.clear();
    tasks.clear();
    vehicles.clear();
}
function clearData(){
    sessionStorage.removeItem("employees");
    sessionStorage.removeItem("mcps");
    sessionStorage.removeItem("tasks");
    sessionStorage.removeItem("vehicles");
}
function loadDataFromFile (){
    fetchAllEmployees();
    fetchAllMcps();
    fetchAllTasks();
    fetchAllVehicles();
    return true;
  }
function saveDataToSessionStorage(){
    //must be strigify to json string because of sessionStorage type not allowed
    sessionStorage.setItem("employees",employees);
    sessionStorage.setItem("vehicles",employees);
    sessionStorage.setItem("tasks",tasks);
    sessionStorage.setItem("mcps",mcps);
}
function loadDataFromSessionStorage(){
    loadAllEmployees();
    loadAllMcps();
    loadAllTasks();
    loadAllVehicles();
}
