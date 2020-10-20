var router = require('express').Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var LogTestModel = sequelize.import('../models/logtest');

//GET ALL ITEMS FOR INDIVIDUAL USER
router.get('/', function (req, res){
    var userid = req.user.id;

    LogTestModel
    .findAll({
        where: { owner_id: userid}
    })
    .then(
        function findAllSuccess(data){
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

//CREATE WORKOUT LOG

router.post('/', function (req, res) {
   let description = req.body.logtestdata.description;
   let definition = req.body.logtestdata.definition;
   let result = req.body.logtestdata.result;
   let owner = req.user.id;

    LogTestModel
        .create({
            description: description,
            definition: definition,
            result: result,
            owner_id: owner
        })
        .then(
            function createSuccess(logtestdata){
                res.json({
                    logtestdata: logtestdata
                });
            },
            function createError(err){
                res.send(500, err.message);
            }
        );
});

//GET SINGLE ITEM FOR INDIVIDUAL USER
router.get('/:id', function(req, res){
    var data = req.params.id;
    var userid = req.user.id;

    LogTestModel
    .findOne({
        where: { id: data, owner_id: userid }
    }).then(
        function findOneSuccess(data) {
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message);
        }
    )
})

//DELETE ITEM FOR INDIVIDUAL USER

router.delete('/:id', function (req, res){
    var data = req.params.id;
    var userid = req.user.id;

    LogTestModel
    .destroy({
        where: { id: data, owner_id: userid }
    }).then(
        function deleteLogSuccess(data){
            res.send("you removed a log");
        },
        function deleteLogError(err){
            res.send(500, err.message);
        }
    );
});

//UPDATE ITEM FOR INDIVIDUAL USER

router.put('/:id', function(req, res){
    var data = req.params.id;
    var userid = req.user.id;

    var newDescription = req.body.logtestdata.description;
    let newDefinition = req.body.logtestdata.definition;
    let newResult = req.body.logtestdata.result;

    LogTestModel
        .update({
            description: newDescription,
            definition: newDefinition,
            result: newResult
        },
        {where: {id: data,
        owner_id: userid}
    }
        ).then(
            function updateSuccess(updatedLog){
                res.json({
                    updatedLog: {
                        description: newDescription,
                        definition: newDefinition,
                        result: newResult
                    }
                });
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
});

module.exports = router;