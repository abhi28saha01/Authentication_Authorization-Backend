const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useUnifiedTopology : true,
        useNewUrlParser : true
    })
    .then(() => console.log('Database Connection is Successful'))
    .catch((err) => {
        console.log(err);
        console.log('Database Connection is Not Successful');
        process.exit(1);
    })
}