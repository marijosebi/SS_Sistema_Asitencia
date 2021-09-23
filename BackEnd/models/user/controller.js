//userController.js
//Import User Model

User = require('./model');

//For index
exports.index = function (req, res) {

    User.find({}, { pass: 0 },{ skip: 10, limit: 5 })
        // .populate("period")
        //.populate("organizer")
        .then(user => {
            if (!user) {
                res.status(404).send();
            }
            res.json({
                status: "success",
                message: "Got User Successfully!",
                data: user
            });
        }).catch((e) => {
            res.status(400).send(e);
        });
};
//For creating new user
exports.add = function (req, res) {
    var user = new User();
    console.log(req.body)
    user.user = req.body.user;
    user.password = req.body.pass;
    user.type = req.body.type;
    user.state = req.body.state;
    user.information = req.body.info;
    user.save(function (err) {
        if (err)
            res.json({
                status:100,
                message: err.message
            });
        else
            res.json({
                status:200,
                message: "New User Added!",
                data: user
            });
    });
};

exports.change = function (req, res) {
    console.log(req.body);
    console.log(req.params);
    User.findOneAndUpdate({ _id: req.params._id },
        {password: req.body.pass }, {
        new: true
    },
        function (err, doc) {
            if (err) { res.send(err) }
            else {
                res.send(doc);
            }
        })
};

// View User
exports.view = function (req, res) {
    User
        .findOne({ _id: req.params._id }, { password: 0 })
        .populate(
        {
            path: 'information.unit',
            select: 'name'
        })
        .populate("information.program")
        //.populate("organizer")// key to populate
        .then(user => {
            res.json({
                status: "success",
                message: "Got User Successfully!",
                data: user
            });
        });

    
};
// Update User
exports.update = function (req, res) {
    User.findById(req.params._id, function (err, user) {
        if (err)
            res.send(err);
        user.user = req.body.user;
        user.pass = req.body.pass;
        user.type = req.body.type;
        user.state = req.body.state;
        //save and check errors
        user.save(function (err) {
            if (err)
                res.json(err)
            else
                res.json({
                    message: "User Updated Successfully",
                    data: user
                });
        });
    });
};
exports.filter = function (req, res) {
  
    User.find({ 'type': req.params.type}, { pass: 0 },{ skip: 10, limit: 5 })
        // .populate("period")
        //.populate("organizer")
        .then(user => {
            if (!user) {
                res.status(404).send();
            }
            res.json({
                status: "success",
                message: "Got User Successfully!",
                data: user
            });
        }).catch((e) => {
            res.status(400).send(e);
        });

};

exports.byUser = function (req, res) {
  
    User.find({ 'user': req.params.user},"information.name user type")

        .then(user => {
            
                user.length ?
            res.json({
                status: 200,
                message: "Got User Successfully!",
                data: user
            }):
            res.json({
                status: 100,
                message: "User not found"
            });
   
        }).catch((e) => {
            res.status(400).send(e);
        });

};
// Delete User
exports.delete = function (req, res) {
    console.log(req.params)
    User.deleteOne({
        _id: req.params._id
    }, function (err, contact) {
        if (err)
            res.send(err)
        else
            res.json({
                status: "success",
                message: 'User Deleted'
            })
    })
}