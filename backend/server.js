const express = require('express');
const router = express.Router();
const app = express();
var mysql = require('mysql');
const bodyParser = require('body-parser');
var sha1 = require('sha1');
var cors = require('cors');
const { response } = require('express');
app.use(cors());
/////////////////////// D A T A B A S E /////////////////////////
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port:3306,
    password: "aseds",
    database: "consulting_app",
  });
////////////////////////////////////////////////////////////////

////////////////////// A P I ///////////////////////////////////

//---------------   ADMIN   ---------------------------------------------------------------------------//

router.get('/clients',(req,res) =>{
    sql='SELECT * FROM clients;'
        con.query(sql, function (err, result) {
          if (err) throw err;
          res.send(JSON.stringify(result));
        });
});

router.get('/consultants',(req,res) =>{
  sql='SELECT * FROM consultants;'
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result));
      });
});

router.post('/consultants',(req, res) =>{
  
    var email = req.body.consultantEmail;
	  var password = sha1(req.body.consultantPassword);          
    var name = req.body.consultantName;
    var field = req.body.consultantField;
    var price = req.body.consultantPrice;
     
    sql= "INSERT INTO consultants(consultantEmail,consultantName,consultantPassword,consultantField,consultantPrice) VALUES(\'"+email+"\','"+name+"',\'"+password+"\','"+field+"\','"+price+"\'); ";
    //res.send(sql);
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.status(201).json({message:'INSERTED'});
    });
 });    

 router.post('/login',(req,res) =>{
  
  var email=req.body.email;
  var password=sha1(req.body.password);
    
   sql1="SELECT * FROM consulting_app.consultants WHERE consultantEmail='"+email+"' And consultantPassword='"+password+"'";
   sql2="SELECT * FROM consulting_app.clients WHERE clientEmail='"+email+"' And clientPassword='"+password+"' ";
   sql3="SELECT * FROM consulting_app.admins WHERE adminEmail='"+email+"' AND adminPassword='"+password+"'";
  

    con.query(sql1, function (err, result) {
        if (err) throw err;
        if(result.length >0){
          //var token=jwt.sign({result},"secret");
          //var id=result[0].id;
            var id=result[0].consultantID;
            var name=result[0].consultantName;
            var user='consultant';
            res.json({id, name , user});
          
          
        }
        else{
          con.query(sql2, function (err, result) {
            if (err) throw err;
            if(result.length >0){
              //var token=jwt.sign({result},"secret");
              //var id=result[0].id;
              var id=result[0].clientID;
              var name=result[0].clientName;
              var user='client';
              res.json({id, name , user});
            }
            else{
              con.query(sql3, function (err, result) {
                if (err) throw err;
                if(result.length >0){
                  //var token=jwt.sign({result},"secret");
                  //var id=result[0].id;
                  var id=result[0].adminID;
                  var name=result[0].adminName;
                  var user='admin';
                  res.json({id, name , user});
                }
                else{res.sendStatus(404);}
              });
            }
          });
        }
    });
  
});

//-------------------------------  CLIENT  ------------------------------------------------------------

router.post('/reservation/:consultant_id/:client_id',(req, res) =>{
  
  var day = req.body.day;
  var time = req.body.time;          
  var consultant_id = req.params.consultant_id;
  var client_id = req.params.client_id;
   
  sql= "INSERT INTO reservation(day,time,consultant_id,client_id) VALUES(\'"+day+"\','"+time+"',\'"+consultant_id+"\','"+client_id+"\'); ";
  //res.send(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(201).json({message:'INSERTED'});
  });
});

//--------------------------  CONSULTANT  -------------------------------------------------------------------

router.post('/availability/:consultant_id',(req, res) =>{
  var consultant_id= req.params.consultant_id;
  var day1='Monday';
  var day2='Tuesday';
  var day3="Wednesday";
  var day4='Thirsday';
  var day5='Friday';
  var availability='no';
 

  sql= "INSERT INTO availability(consultant_id,day,one,two,three,four) VALUES(\'"+consultant_id+"\','"+day1+"',\'"+availability+"\','"+availability+"',\'"+availability+"',\'"+availability+"\'),(\'"+consultant_id+"\','"+day2+"',\'"+availability+"\','"+availability+"',\'"+availability+"',\'"+availability+"\'),(\'"+consultant_id+"\','"+day3+"',\'"+availability+"\','"+availability+"',\'"+availability+"',\'"+availability+"\'),(\'"+consultant_id+"\','"+day4+"',\'"+availability+"\','"+availability+"',\'"+availability+"',\'"+availability+"\'),(\'"+consultant_id+"\','"+day5+"',\'"+availability+"\','"+availability+"',\'"+availability+"',\'"+availability+"\'); ";
  //res.send(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(201).json({message:'INSERTED'});
  });

});


router.patch('/availability/one/:consultant_id/:day',(req,res) =>{
  var consultant_id= req.params.consultant_id;
  var day= req.params.day;
  var one= req.body.one;

  sql="UPDATE availability SET one='"+one+"' WHERE consultant_id='"+consultant_id+"' AND day='"+day+"'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});
router.patch('/availability/one/:consultant_id/:day',(req,res) =>{
  var consultant_id= req.params.consultant_id;
  var day= req.params.day;
  var two= req.body.two;

  sql="UPDATE availability SET one='"+two+"' WHERE consultant_id='"+consultant_id+"' AND day='"+day+"'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});
router.patch('/availability/one/:consultant_id/:day',(req,res) =>{
  var consultant_id= req.params.consultant_id;
  var day= req.params.day;
  var three= req.body.three;

  sql="UPDATE availability SET one='"+three+"' WHERE consultant_id='"+consultant_id+"' AND day='"+day+"'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});
router.patch('/availability/one/:consultant_id/:day',(req,res) =>{
  var consultant_id= req.params.consultant_id;
  var day= req.params.day;
  var four= req.body.four;

  sql="UPDATE availability SET one='"+four+"' WHERE consultant_id='"+consultant_id+"' AND day='"+day+"'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
});
router.post('/signup',(req, res) =>{

  var userName = req.body.clientName;
  var email = req.body.clientEmail;
  var password = sha1(req.body.clientPassword); 
  var confirmPassword = sha1(req.body.confirmClientPassword);         

  if (password == confirmPassword){
    sql1="SELECT * FROM consulting_app.clients WHERE clientEmail='"+email+"' And clientPassword='"+password+"' ";
    con.query(sql1, function (err, result) {
      if (err) throw err;
        if(result.length >0){
          res.json({message:"This user already exists"});
          
          
        }
        else{
          sql2= "INSERT INTO clients(clientEmail,clientName,clientPassword) VALUES(\'"+email+"\','"+userName+"',\'"+password+"\'); ";
          //res.send(sql);
          con.query(sql2, function (err, result) {
          if (err) throw err;
          res.status(201).json({message:'INSERTED'});
          
          });
        }
      }); 

    }
  else{
    res.status(401).json({message:'Passwords are not matching'});
    
  }
}); 
///////////////////////////////////////////////////////////////

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', router);

app.listen(process.env.port || 5000);
console.log('Web Server is listening at port '+ (process.env.port || 5000));
