const express = require('express');
const app = express();
//SUB-ROUTES
app.use(require('./GetReq'));
app.use(require('./GetJoinReq'));
app.use(require('./PostReq'));
app.use(require('./PutReq'));
app.use(require('./DeleteReq'));
app.use(require('./Excel'));
 
//MODULE EXPORTS
module.exports = app;