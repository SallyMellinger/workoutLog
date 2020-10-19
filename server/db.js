const Sequelize = require('sequelize');

const sequelize = new Sequelize('workout_log_db', 'postgres', 'OpenTheDoor123!', {
        host: 'localhost',
        dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to workoutlog postgres database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;