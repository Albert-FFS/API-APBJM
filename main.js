const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('cors');
//SETTING
app.set('port',process.env.PORT || 3000);
app.set('json spaces',2);
//MIDLEWARE
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
//ROUTES
app.use(require('./Routes/main'));
//STARTING SERVER
app.listen(app.get('port'),()=>{
    console.log(`Conectado desde ${app.get('port')}`);
});