// Create by Xiaochen Wang

var fs = require("fs");

var employess = [];
var departments = [];

module.exports.initialize = function(){
    return new Promise(function(resolve,reject){
        try{
            fs.readFile('./data/employees.json', function(err, data){
                if(err) throw err;
                employess = JSON.parse(data);
            });
            fs.readFile('./data/departments.json', function(err,data){
                if(err) throw err;
                departments = JSON.parse(data);
            });
        }catch(ex){
            reject("Unable to read file!");
        }
        resolve("Success!");
    });
}
// alternative solution for initialize JSON file:
// module.exports.initialize = function(){
//     return new Promise(function (resolve,reject){
//         fs.readFile('./data/departments.json', function(err,data){
//             if(err){
//                 reject("Can Not Open Employees.json File");
//             }else{
//                 employess = JSON.parse(data);

//                 fs.readFile('./data/employees.json', function(err,data){
//                     if(err){
//                         reject("Can Not Open Department.json File ");
//                     }else{
//                         departments = JSON.parse(data);
//                     }
//                 });
//             }
//         });
//     });
// }

module.exports.getAllEmployees = function(){
    var arryAllEmployees=[];
    return new Promise(function(resolve,reject){
        if(employess.length==0){
            reject("No Results Returned!");
        }else{
            for (var i = 0; i < employess.length; i++) {
                arryAllEmployees.push(employess[i]);
            }
        }
        resolve(arryAllEmployees);
    })
}


module.exports.getEmployeesByStatus = function(status){
    var arryByStatus = [];
    return new Promise(function(resolve,reject){
        if(employess.length == 0){
            reject("No Results Returned!");
        }else{
            for(let i = 0; i < employess.length; i++){
                if(employess[i].status == status){
                    arryByStatus.push(employess[i]);
                }
            }
        }
        resolve(arryByStatus);
    });
}

module.exports.getEmployeesByDepartment = function(department){
    var arryByDepartment = [];
    return new Promise(function(resolve,reject){
        if(employess.length == 0){
            reject("No Result Returned!");
        }else{
            for(let i = 0; i < employess.length; i++){
                if(employess[i].department == department){
                    arryByDepartment.push(employess[i]);
                }
            }
        }
        resolve(arryByDepartment);
    });
}

module.exports.getEmployeesByManager = function(manager) {
    var arryByManager = [];
    return new Promise(function(resolve,reject){
        if(employess.length == 0){
            reject("No Result Returned!");
        }else{
            for(let j = 0; j < employess.length; j++){
                if(employess[j].employeeManagerNum == manager){
                    arryByManager.push(employess[j]);
                }
            }
        }
        resolve(arryByManager);
     });
}

module.exports.getEmployeeByNum = function(num) {
    var arryEmployeeNum = [];
    return new Promise(function(resolve,reject){
        if(employess.length == 0){
            reject("No Result Returned!");
        }else{
            for(let j = 0; j < employess.length; j++){
                if(employess[j].employeeNum == num){
                    arryEmployeeNum.push(employess[j]);
                }
            }
        }
        resolve(arryEmployeeNum);
     });
}

module.exports.getManagers = function() {
    var arryGetManagers = [];
    return new Promise(function(resolve,reject){
        if(employess.length == 0){
            reject("No Result Returned!");
        }else{
            for (var q = 0; q < employess.length; q++) {
                 if (employess[q].isManager == true) {
                    arryGetManagers.push(employess[q]);       
                 }
            }
        }
        resolve(arryGetManagers);
     });
}

module.exports.getDepartments = function() {
    var arryGetDepartments = [];
    return new Promise(function(resolve,reject){
        if(employess.length == 0){
            reject("No Result Returned!");
        }else{
            for (var v = 0; v < departments.length; v++) {
                arryGetDepartments.push(departments[v]);       
            }
        }
        resolve(arryGetDepartments);
     });
}



