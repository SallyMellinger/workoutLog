require('dotenv').config();

var express = require('express');
var app = express();
var user = require('./controllers/usercontroller')
var logTest = require('./controllers/logtestcontroller')
var sequelize = require('./db')
sequelize.sync();

app.use(express.json());
app.use(require('./middleware/headers'));
app.use('/api/user', user);

app.use(require('./middleware/validate-session'));
app.use('/logtest', logTest)

app.listen(3001, function(){
    console.log('App is running')
});
