const { Router } = require('express');
const router = Router();
const Connection = require('./Database');

//GET ALL
router.get('/get/:table/',(req,res)=>{
    const {table} = req.params;
    Connection.query(`SELECT * FROM ${table}`,(err,rows,fields) =>{
        if(err) res.send("ERROR: "+ err);
        res.json(rows);
    });
});
//GET table WHERE key = value
router.get('/get/:table/:value',(req,res)=>{
    const {table,value} = req.params;
    Connection.query(`SELECT * FROM ${table} WHERE ${checkThisColumn(table)}=?`,[value],(err,rows,fields) =>{
        if(err) res.send("ERROR: "+ err);
        res.json(rows);
    });
});
//Get col/s FROM table
router.get('/getx/:table/',(req,res)=>{
    const {cols} = req.body;
    const {table} = req.params;
    Connection.query(`SELECT ${nameColumns(cols)} FROM ${table} `,(err,rows,fields) =>{
        if(err) res.send(`ERROR: ${err}`);
        res.json(rows);
    });
});
//Get col/s FROM table WHERE col = value
router.get('/getx/:table/:value',(req,res)=>{
    const {cols} = req.body;  
    const {table,value} = req.params;
    Connection.query(`SELECT ${nameColumns(cols)} FROM ${table} WHERE ${checkThisColumn(table)} = ?`,[value],(err,rows,fields) =>{
        if(err) res.send(`ERROR: ${err}`);
        res.json(rows);
    });
});
//auxiliar functions
function nameColumns(array) {
    let columns = "";
    for (let x = 0; x < array.length; x++) {
        if(x===(array.length -1)){
           columns = columns + array[x] ;
        }else{
           columns = columns + array[x] +",";
        }
   }
   return columns;
}
function checkThisColumn(table) {
    let Col = "";
    switch(table){
        case 'empleado':    Col= 'Id'; break;
        case 'trabajo':     Col= 'Id'; break;
        case 'compra':      Col= 'Folio'; break;
        case 'venta':       Col= 'Folio'; break;
        case 'servicio':    Col= 'Folio'; break;
        case 'inventario':  Col= 'Codigo'; break;
        case 'servicios':   Col= 'Codigo'; break;
    }
    return Col;
}
//EXPORT MODULES WITH REQUEST
module.exports = router;
