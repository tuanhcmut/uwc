const accounts = new Map();
function fetchAllAccounts() {
fetch('./account.json')
.then((response) => response.json())
.then((json) => {
    for (i of json)
        accounts.set(i.userid,i);
}); 
}
function Account(id, password, role){
    return {
        id : id,
        password: password,
        role: role,
    }
}
//console.log(accounts);