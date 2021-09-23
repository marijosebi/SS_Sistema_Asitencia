//elementController.js
//Import Element Model

Element = require('./model');
//For index
exports.index = function (req, res) {
    Element.get(function (err, element) {
        console.log(req.body)
        if (err)
            res.json({
                status: "error",
                message: err.message
            });
        res.json({
            status: "success",
            message: "Got Element Successfully!",
            data: element       
        });
    });
};
//For creating new element
exports.add = function (req, res) {
    var element = new Element();
    console.log(req.body)

    element.name = req.body.name;
    element.code= req.body.code;
    

//Save and check error
    element.save(function (err) {
       if (err)
            res.json({
                status: "error",
                message: err
            });
res.json({
            message: "New Element Added!",
            data: element
        });
    });
};
// View Element
exports.view = function (req, res) {
    Element.findById(req.params._id, function (err, element) {
        if (err)
            res.send(err);
        res.json({
            message: 'Element Details',
            data: element
        });
    });
};
// Update Element
exports.update = function (req, res) {
    Element.findById(req.params._id, function (err, element) {
        if (err)
            res.send(err);
            element.name = req.body.name;
    element.code= req.body.code;
        element.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Element Updated Successfully",
                data: element
            });
        });
    });
};
// Delete Element
exports.delete = function (req, res) {
    console.log(req.params)
    Element.deleteOne({
        _id: req.params._id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Element Deleted'
        })
    })
}