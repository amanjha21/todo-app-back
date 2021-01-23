
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config()
const PORT=process.env.PORT;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/',require('./users/user'));

app.listen(PORT,()=>console.log(`started on: ${PORT}`));