const { Router } = require('express');
const router = Router();
const Connection = require('./Database');
//JOIN TABLE trabajo
router.get('/join/trabajo/',(req,res) =>{
    const sql = `
    SELECT empleado.Nombre AS Id_Empleado ,trabajo.Codigo_S AS Codigo_S, trabajo.Cobro_Servicio, trabajo.Codigo_P, trabajo.Cobro_Venta, trabajo.Fecha, trabajo.Hora 
    FROM trabajo INNER JOIN empleado ON trabajo.Id_Empleado=empleado.Id;
    `;
    Connection.query(sql,(err,rows,field) =>{
        if(err) res.send("ERROR : "+ err);
        res.json(rows);
    });
});
//JOIN TABLE venta
router.get('/join/venta/',(req,res)=>{
    const sql = 'SELECT inventario.Descripcion, venta.Cantidad, venta.Fecha, venta.Hora FROM venta INNER JOIN inventario ON venta.Codigo = inventario.Codigo;';
    Connection.query(sql,(err,rows,field) =>{
        if(err) res.send("ERROR : " + err);
        res.json(rows);
    });
});
//JOIN TABLE servicio
router.get('/join/servicio/',(req,res)=>{
    const sql = 'SELECT servicios.Descripcion, servicio.Fecha, servicio.Hora FROM servicio INNER JOIN servicios ON servicio.Codigo = servicios.Codigo;';
    Connection.query(sql,(req,res)=>{
        if(err) res.send("ERROR : " + err);
        res.json(rows);
    });
});

//EXPORT MODULES WITH REQUEST
module.exports = router;