const { Router } = require('express');
const router = Router();
const Connection = require('./Database');
const xls = require('excel4node');
function CrearArchivo(){
}
function HojaTrabajo(libro){
    let hoja = libro.addWorkSheet('Trabajo');
    Connection.query('SELECT * FROM traabajo',(err,row)=>{
        
    });
}
router.get('/download/',(req,res)=>{
    // let libro = new xls.Workbook();
    // let Trabajo = HojaTrabajo(libro);
    // Connection.query('',(err,rows)=>{
// 
    // });
    res.download('./Routes/File/qr.jpg');
});
module.exports = router;