//elementController.js
//Import Assistent Model

Assistent = require('./model');
//For index
exports.index = function (req, res) {
    Assistent.get(function (err, element) {
        console.log(req.body)
        if (err)
            res.json({
                status: "error",
                message: err.message
            });
            else
        res.json({
            status: "success",
            message: "Got Assistent Successfully!",
            data: element       
        });
    });
};
//For creating new element
exports.add = function (req, res) {
    var element = new Assistent();
    console.log(req.body)

    element.type = req.body.type;
    
//Save and check error
    element.save(function (err) {
       if (err)
            res.json({
                status: "error",
                message: err
            });
            else
res.json({
            message: "New Assistent Added!",
            data: element
        });
    });
};
// View Assistent
exports.view = function (req, res) {
    Assistent.findById(req.params._id, function (err, element) {
        if (err)
            res.send(err);
            else
        res.json({
            message: 'Assistent Details',
            data: element
        });
    });
};
// Update Assistent
exports.update = function (req, res) {
    Assistent.findById(req.params._id, function (err, element) {
        if (err)
            res.send(err);
            element.type = req.body.type;
        element.save(function (err) {
            if (err)
                res.json(err)
                else
            res.json({
                message: "Assistent Updated Successfully",
                data: element
            });
        });
    });
};
// Delete Assistent
exports.delete = function (req, res) {
    console.log(req.params)
    Assistent.deleteOne({
        _id: req.params._id
    }, function (err, contact) {
        if (err)
            res.send(err)
            else
        res.json({
            status: "success",
            message: 'Assistent Deleted'
        })
    })
}