const { Router } = require('express');
const router = Router();
const Connection = require('./Database');
//DELETE FROM table WHERE key = value
router.delete('/delete/:table/:value',(req,res)=>{
    const {table,value} = req.params;
    Connection.query(`DELETE FROM ${table} WHERE ${checkThisColumn(table)}=?`,[value],(err,rows,fields) =>{
        if(err) res.send("ERROR: "+ err);
        res.send("Ha sido eliminado");
    });
});
//AUXILIAR FUNCTION
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
//EXPORT MODULES
module.exports = router;