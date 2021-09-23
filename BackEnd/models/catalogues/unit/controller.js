//elementController.js
//Import Unit Model

Unit = require('./model');
//For index
exports.index = function (req, res) {
    Unit.find({})
    .populate("programs")
    .populate("departments")
    .populate({
        path: 'departments',
        populate: { path: 'department' },
    //    select: 'name code departments '
    })
    .then(user => {
        if (!user) {
            res.status(404).send();
        }
        res.json({
            status: "success",
            message: "Got Event Successfully!",
            data: user
        });
    }).catch((e) => {
        res.status(400).send(e);
    });


};
//For creating new element
exports.add = function (req, res) {
    var element = new Unit();
    console.log(req.body)

    element.name = req.body.name;
    element.code= req.body.code;
    element.departments= req.body.departments;
    element.programs= req.body.programs;
    if(req.file)
    element.logo=   {
        data: req.file.path,
        contentType: 'image/png'
    }
    

//Save and check error
    element.save(function (err) {
       if (err)
            res.json({
                status: "error",
                message: err
            });
            else
res.json({
            message: "New Unit Added!",
            data: element
        });
    });
};

// View Unit
exports.view = function (req, res) {
    Unit.findById(req.params._id, function (err, element) {
        if (err)
            res.send(err);
        res.json({
            message: 'Unit Details',
            data: element
        });
    });
};
// Update Unit
exports.update = function (req, res) {
    Unit.findById(req.params._id, function (err, element) {
        if (err)
            res.send(err);
            else
            element.name = req.body.name;
    element.code= req.body.code;
    element.departments= req.body.departments;
    element.programs= req.body.programs;
    if(req.file)
    element.logo=   {
        data: req.file.path,
        contentType: 'image/png'
    }
    
        element.save(function (err) {
            if (err)
                res.json(err)
                else
            res.json({
                message: "Unit Updated Successfully",
                data: element
            });
        });
    });
};
// Delete Unit
exports.delete = function (req, res) {
    console.log(req.params)
    Unit.deleteOne({
        _id: req.params._id
    }, function (err, contact) {
        if (err)
            res.send(err)
            else
        res.json({
            status: "success",
            message: 'Unit Deleted'
        })
    })
}