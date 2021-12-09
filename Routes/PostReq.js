const { Router } = require('express');
const con = require('./Database');
const router = Router();
const Connection = require('./Database');
//INSERT INTO empleados
router.post('/post/empleado/',(req,res) =>{
    const {Nombre,Apellidos} = req.body;
    console.log(Nombre+"--"+Apellidos);
    const Fecha = GetDate();
    Connection.query('INSERT INTO empleado (Nombre,Apellidos,Empezo) VALUE (?,?,?)',[Nombre,Apellidos,Fecha],(err,rows,field)=>{
        if(err) res.send("ERROR : "+err);
        console.log(err);
    });
});
//INSERT INTO inventario
router.post('/post/inventario/',(req,res) =>{
    const {Codigo,Descripcion,Precio} = req.body;
    Connection.query('INSERT INTO inventario (Codigo,Descripcion,Precio,Stock) VALUE (?,?,?,0)',[Codigo,Descripcion,Precio],(err,rows,field)=>{
        if(err) res.send("ERROR : "+err);
        console.log(field);
    });
});
//INSERT INTO servicios
router.post('/post/servicios',(req,res) =>{
    const {Codigo,Descripcion,Precio} = req.body;
    Connection.query('INSERT INTO servicios (Codigo,Descripcion,Precio) VALUE (?,?,?)',[Codigo,Descripcion,Precio],(err,rows,field)=>{
        if(err) res.send("ERROR : "+err);
        console.log(rows);
    });
});
//INSERT INTO trabajo WITH SERVICE & PRODUCT
router.post('/post/trabajo/w2/',(req,res) =>{
    const {IdE,CodigoS,CobroS,CodigoP,CobroP,Cantidad} = req.body;
    const Fecha =GetDate();
    const Hora= GetTime();
    InsertIntoServicio(res,CodigoS,Fecha,Hora);
    InsertIntoVenta(res,CodigoP,Cantidad,Fecha,Hora);
    Connection.query('SELECT Folio FROM servicio WHERE Fecha=? AND Hora=?',[Fecha,Hora],(err,row,field)=>{
        if(err) res.send("n1 ERROR : "+err);
        Connection.query('SELECT Folio FROM venta WHERE Fecha=? AND Hora=?',[Fecha,Hora],(_err,_row,_field)=>{
            if(err) res.send("n2 ERROR : "+_err);
            const sql ='INSERT INTO trabajo (Id_Empleado,Folio_Servicio,Cobro_Servicio,Folio_Venta,Cobro_Venta,Fecha,Hora,Codigo_P,Codigo_S) VALUES(?,?,?,?,?,?,?,?,?)';
            Connection.query(sql,[IdE,row[0].Folio,CobroS,_row[0].Folio,CobroP,Fecha,Hora,CodigoP,CodigoS],(__err,__row,__field)=>{
                if(err) res.send("n3 ERROR : "+__err); 
                console.log('INSERTADO CORRECTAMENTE');    
            });
        });
    });
});
//INSERT INTO trabajo WITH SERVICE 
router.post('/post/trabajo/ws/',(req,res) =>{
    const {IdE,CodigoS,CobroS} = req.body;
    const Fecha =GetDate();
    const Hora= GetTime();
    InsertIntoServicio(res,CodigoS,Fecha,Hora);
    Connection.query('SELECT Folio FROM servicio WHERE Fecha=? AND Hora=?',[Fecha,Hora],(err,row,field)=>{
        if(err) res.send("n1 ERROR : "+err);
        const sql ='INSERT INTO trabajo (Id_Empleado,Folio_Servicio,Cobro_Servicio,Fecha,Hora,Codigo_S) VALUES(?,?,?,?,?,?)';
        Connection.query(sql,[IdE,row[0].Folio,CobroS,Fecha,Hora,CodigoS],(_err,_row,_field)=>{
            if(err) res.send("n2 ERROR : "+_err); 
            console.log('INSERTADO CORRECTAMENTE'); 
        });
    });
});
//INSERT INTO trabajo WITH  PRODUCT
router.post('/post/trabajo/wp/',(req,res) =>{
    const {IdE,CodigoP,CobroP,Cantidad} = req.body;
    const Fecha =GetDate();
    const Hora= GetTime();
    InsertIntoVenta(res,CodigoP,Cantidad,Fecha,Hora);
    Connection.query('SELECT Folio FROM venta WHERE Fecha=? AND Hora=?',[Fecha,Hora],(err,row,field)=>{
        if(err) res.send("n1 ERROR : "+err);
        const sql ='INSERT INTO trabajo (Id_Empleado,Folio_Venta,Cobro_Venta,Fecha,Hora,Codigo_P) VALUES(?,?,?,?,?,?)';
        Connection.query(sql,[IdE,row[0].Folio,CobroP,Fecha,Hora,CodigoP],(_err,_row,_field)=>{
            if(err) res.send("n2 ERROR : "+_err); 
            console.log('INSERTADO CORRECTAMENTE'); 
        });
    });
});
//INSERT INTO compra
router.post('/post/compra/',(req,res) =>{
    const {Codigo,Cantidad} = req.body;
    const Fecha = GetDate();
    const Hora = GetTime();
    Connection.query('INSERT INTO compra (Codigo,Cantidad,Fecha,Hora) VALUES (?,?,?,?)',[Codigo,Cantidad,Fecha,Hora],(err,rows,field)=>{
        if(err) res.send("ERROR :" + err);
        console.log(Cantidad);
        UpdateStock(Codigo,Cantidad);
        res.send("Listo");
    });
});
//AUXILIAR FUNCTION
function GetDate() {
    const Now = new Date();
    return `${Now.getFullYear()}-${Now.getMonth()+1}-${Now.getDate()}`;
}
function GetTime(){
    const Now = new Date();
    return `${Now.getHours()}:${Now.getMinutes()}:${Now.getSeconds()}`;
}
function InsertIntoServicio(res,code,date,time){
    Connection.query(`INSERT INTO servicio (Codigo,Fecha,Hora) VALUE (?,?,?)`,[code,date,time],(error,row,fields)=>{
        if(error) res.send(`ERROR IN servicio:${error}`);
    });
}
function InsertIntoVenta(res,code,num,date,time){
    Connection.query(`INSERT INTO venta (Codigo,Cantidad,Fecha,Hora) VALUE (?,?,?,?)`,[code,num,date,time],(error,row,fields)=>{
        if(error) res.send(`ERROR IN venta:${error}`);
        UpdateStock(code,((num)*-1))
    });
}
function UpdateStock(Code,Num) {
    Connection.query('SELECT Stock FROM inventario WHERE Codigo=?',[Code],(err,rows,field)=>{
        if(err) res.send("ERROR :"+err);
        let NewStock = parseInt(Num) + parseInt(rows[0].Stock);
        Connection.query('UPDATE inventario SET Stock=? WHERE Codigo=?',[NewStock,Code],(_err,_rows,_field)=>{
            if(_err) res.send("ERROR :"+_err);
        });
    });
}
//MODULE EXPORTS
module.exports = router;