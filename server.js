/*********************************************************************************
*  WEB322 –Assignment02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source
*  (including 3rd party web sites) or distributed to other students.
*
*  Name: ___Xiaochen Wang__ Student ID: ___015297153_____ Date: ____09-06-2017__
*
*  Online (Heroku) Link:  https://cryptic-waters-33866.herokuapp.com
*
********************************************************************************/
var express = require("express");
var app = express();
var path = require("path");
var data_service = require("./data-service.js");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
    return new Promise (function(res,req){
    data_service.initialize().then(function(data){
      console.log(data)
    }).catch(function(err){
      console.log(err);
    });
});
}

// Load CSS file
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.engine(".hbs", exphbs({
    extname: ".hbs",
    defaultLayout: 'layout',
    helpers: {
        equal: (lvalue, rvalue, options) => {
        if (arguments.length < 3)
            throw new Error("Handlebars Helper equal needs 2 parameters");
        if (lvalue != rvalue) {
            return options.inverse(this);
        } else {
            return options.fn(this);
        }
    }
}}));
app.set("view engine", ".hbs");


// alternative method.
// app.use(express.static(path.join(__dirname, 'public')));

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
   //res.send("Hello World<br /><a href='/about'>Go to the about page</a>");
   res.render("home");
});

// setup another route to listen on /about
app.get("/about", function(req,res){
    res.render("about");
});

app.get("/employees", function(req,res){

    if(req.query.status){
        data_service.getEmployeesByStatus(req.query.status).then(function(data){
            res.render("employeeList",{data:data,title:"Employees"});
        }).catch(function(err){
            res.render("employeeList", {data: {}, title: "Employees"});
        });
    }else if(req.query.department){
        data_service.getEmployeesByDepartment(req.query.department).then(function(data){
            res.render("employeeList",{data:data,title:"Employees"});
        }).catch(function(err){
            res.render("employeeList", {data: {}, title: "Employees"});
        });
    }else if(req.query.manager){
         data_service.getEmployeesByManager(req.query.manager).then(function(data){
            res.render("employeeList",{data:data,title:"Employees"});
        }).catch(function(err){
            res.render("employeeList", {data: {}, title: "Employees"});
        });
    }else{
         data_service.getAllEmployees().then(function(data){
             res.render("employeeList",{data:data,title:"Employees"});
         }).catch(function(err){
             res.render("employeeList", {data: {}, title: "Employees"});
        });
    }
});

app.get("/employee/:num", function(req,res){
    data_service.getEmployeeByNum(req.params.num).then(function(data){
        res.render("employee",{data:data})
    }).catch(function(err){
        res.status(404).send("Sorry!!!!!!!>>>Page Not Found! <<<:(");
    });
});

app.get("/managers", function(req,res){
    data_service.getManagers().then(function(data){
        res.render("employeeList", {data: data, title: "Employees (Managers)"});
    }).catch(function(err){
        res.render("employeeList", {data: {}, title: "Employees {Managers}"});
    });
});

app.get("/departments", function(req,res){
      data_service.getDepartments().then(function(data){
          res.render("departmentList", {data: data, title: "Department"});
      }).catch(function(err){
          res.render("departmentList",{data: {}, title: "Department"});
      });
});

app.get("/employees/add", function(req,res){
    res.render("addEmployee");
    
});

app.post("/employees/add", function(req,res){
    data_service.addEmployee(req.body).then(function(data){
        res.redirect("/employees");
        
    }).catch(function(err){
        console.log(err);
    })
    console.log(req.body);
});

app.post("/employees/update", (req, res) => {
    console.log(req.body);
    res.redirect("/employees");
});

app.use(function(req, res) {
  res.status(404).send("Sorry!!!!!!!>>>Page Not Found! <<<:(");
});

app.listen(HTTP_PORT, onHttpStart);

//Alternative solution for app.listen method.
// app.listen(HTTP_PORT, function(res,req){
//   console.log("Express http server listening on: " + HTTP_PORT);
//   data_service.initialize().then(function(data){
//       console.log(data)
//     }).catch(function(err){
//       console.log(err);
//     });
// });