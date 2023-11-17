const express = require('express');
const app = express();
const router = require('./routes/userRouter');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth',router);

app.listen(PORT,()=>{
    console.log('App Started at Port : ',PORT);
});

require('./config/database').connect();