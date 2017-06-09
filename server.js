/*********************************************************************************
*  WEB322 –Assignment02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: ______________________ Student ID: ______________ Date: ________________
*
*  Online (Heroku) Link: ________________________________________________________
*
********************************************************************************/ 
var express = require("express");
var app = express();
var path = require("path");
var data_service = require("./data-service.js");

var HTTP_PORT = process.env.PORT || 8080;

// setup a 'route' to listen on the default url path (http://localhost)
app.get("/", function(req,res){
   //res.send("Hello World<br /><a href='/about'>Go to the about page</a>");
   res.sendFile(path.join(__dirname + "/views/home.html"));
});

// setup another route to listen on /about
app.get("/about", function(req,res){
  res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/employees", function(req,res){

    if(req.query.status){
      data_service.getEmployeesByStatus(req.query.status).then(function(data){
        res.json(data);
      }).cath(function(err){
        res.json(err);
      });
    }else if(req.query.department){
      data_service.getEmployeesByDepartment(req.query.department).then(function(data){
        res.json(data);
      }).catch(function(err){
        res.json(err);
      });
    }else if(req.query.manager){
      console.log("manager");
      data_service.getEmployeesByManager(req.query.manager).then(function(data){
        res.json(data);
      }).catch(function(err){
        rss.json(err);
      })
    }else{
      data_service.getAllEmployees().then(function(data){
        res.json(data);
      }).catch(function(err){
        res.json(err);
      });
    }
});


app.get("/employees/:num", function(req,res){
  data_service.getEmployeeByNum(req.params.num).then(function(data){
    res.json(data);
  }).catch(function(err){
      res.json(err);
  });
});

app.get("/managers", function(req,res){
      data_service.getManagers().then(function(data){
        res.json(data);
      }).catch(function(err){
        res.json(err);
      });
});

app.get("/departments", function(req,res){
      data_service.getDepartments().then(function(data){
        res.json(data);
      }).catch(function(err){
        res.json(err);
      });
});

app.use(function(req, res) {
  res.status(404).send("Sorry!!!!!!!>>>Page Not Found! <<<:(");
});

app.listen(HTTP_PORT, function(res,req){
  console.log("Website listen on port 8080");
  data_service.initialize().then(function(data){
      console.log(data)
    }).catch(function(err){
      console.log(err);
    });
});

app.use(express.static('public'));
