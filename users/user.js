const express = require('express');
const router = express.Router();
const mysql = require('../modules/mysql');



//show table content
router.get('/',(req,res)=>{       

mysql.query("SELECT * FROM todo ORDER BY id", function (err, result, fields) {
  if (err) throw err;
  res.json(result);
});
})

//show task with id
router.get('/:id',(req,res)=>{       
  let sql = `SELECT * FROM todo WHERE id = '${req.params.id}'`;
  mysql.query(sql, function (err, result, fields) {
    if (err) throw err;
    if(result.length ==0){
    res.status(400);
    res.send(`no task created with id = ${req.params.id}`);
    }else{
    res.json(result);
  }
  });
  })


//add item to table
router.post('/add',(req,res)=>{
  //check for empty fields
if(req.body.id && req.body.task){

  //check if the id already exists
  mysql.query(`SELECT * FROM todo WHERE id = '${req.body.id}'`, function (err, result, fields) {
    if(result.length !==0){
//if already rxists
    res.status(400);
    res.send(`id = ${req.body.id}, already exists`);

    }else{
  //if doesnot exist
let sql = `INSERT INTO todo (id, task) VALUES ('${req.body.id}', '${req.body.task}')`;
  mysql.query(sql, function (err, result) {
    if (err) throw err;
    res.status(201);
    res.send("1 record inserted");
  });
}
})}
  else{
    //id or task is empty
    res.status(400);
    res.send('both id and task fields are required');
  }
})


 //delete item from table with id
router.delete('/delete/:id',(req,res)=>{
 let sql = `DELETE FROM todo WHERE id = '${req.params.id}'`;
    mysql.query(sql, function (err, result) {
      if (err) throw err;
      res.status(200);
      res.send(`${result.affectedRows} record/s deleted`);
    });
  })

  //update item in table with id
  router.put('/update/:id',(req,res)=>{
    if(req.body.task){
    let sql = `UPDATE todo SET task = '${req.body.task}' WHERE id = '${req.params.id}'`;
       mysql.query(sql, function (err, result) {
         if (err) throw err;
         res.status(200);
         res.send(`${result.affectedRows} record/s updated`);
       });}
       else{
        res.status(400);
        res.send('task fields is required');
       }
     })

  module.exports = router;