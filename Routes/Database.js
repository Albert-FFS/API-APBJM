const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "apbjs"
});
con.connect(function(err) {
    if(err) throw err;
    console.log("Conexion Establecida");
});
module.exports = con;