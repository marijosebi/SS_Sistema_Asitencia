//Import Department Model

Department = require('./model');
//For index
exports.index = function (req, res) {
    Department.get(function (err, element) {
        if (err)
            res.json({
                status: "error",
                message: err.message
            });
        else {
            res.json({
                status: "success",
                message: "Got Department Successfully! ",
                data: element
            });
        }
    });
};
//For creating new element
exports.add = function (req, res) {
    var element = new Department();
    console.log(req.files)

    element.name = req.body.name;
    element.code = req.body.code;
    element.areas = req.body.areas;
    element.manager = req.body.manager;
    if (req.files)
    {
        element.logo = {
            data: req.files[0].path,
            contentType: 'image/png'
        };
        element.stamp = {
            data: req.files[1].path,
            contentType: 'image/png'
        };
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
                message: "New Department Added!",
                data: element
            });

    });
};
// View Department
exports.view = function (req, res) {
    Department.findById(req.params._id, function (err, element) {
        if (err)
            res.send(err);
        else
            res.json({
                message: 'Department Details',
                data: element
            });
    });
};
// Update Department
exports.update = function (req, res) {
    Department.findById(req.params._id, function (err, element) {
        if (err)
            res.send(err);

        element.name = req.body.name;
        element.code = req.body.code;
        element.areas = req.body.areas;
        element.manager = req.body.manager;
        if (req.files)
        {
            element.logo = {
                data: req.files[0].path,
                contentType: 'image/png'
            };
            element.stamp = {
                data: req.files[1].path,
                contentType: 'image/png'
            };
        }

        element.save(function (err) {
            if (err)
                res.json(err)
            else
                res.json({
                    message: "Department Updated Successfully",
                    data: element
                });
        });
    });
};
// Delete Department
exports.delete = function (req, res) {
    console.log(req.params)
    Department.deleteOne({
        _id: req.params._id
    }, function (err, contact) {
        if (err)
            res.send(err)
        else
            res.json({
                status: "success",
                message: 'Department Deleted'
            })
    })
}