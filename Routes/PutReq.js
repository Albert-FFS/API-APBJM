const { Router } = require('express');
const router = Router();
const Connection = require('./Database');
//PUT ALL COLUMNS ON ALL TABLES 
router.put('/put/:tabla/:value',(req,res)=>{
    const {tabla,value} = req.params;
    const {columns,values} = req.body;
    let SQL = `UPDATE ${tabla} SET ${arrayRoad(columns)} WHERE  ${checkThisColumn(tabla)} ='${value}'`;
    Connection.query(SQL,values,(err,rows,fields) =>{
        if(err) res.send("ERROR: "+ err);
        res.send("Actualizado");
    });
});
//auxiliar functions
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
function arrayRoad(columns){
    let text ='';
    for (let i = 0; i < columns.length; i++) {
        if(i == (columns.length-1)){
            text= text + ` ${columns[i]} = ? `;
        }else{
            text= text + ` ${columns[i]} = ? ,`;
        }
    }
    return text;
}
function TypeDateOnArray(value) {
    let data;
    if((typeof value)==='string'){
        data="'"+value+"'" ;
        console.log(data);
        return  data; 
    }else{
        data =`${value}`;
        return data; 
    }
}
//MODULE EXPORTS 
module.exports = router;