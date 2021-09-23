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
            else
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
    element.name = req.body.name;
    element.manager = req.body.manager;
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
            else
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
            else
            element.name = req.body.name;
            element.manager = req.body.manager;
    if(req.file)
    element.logo=   {
        data: req.file.path,
        contentType: 'image/png'
    }
        element.save(function (err) {
            if (err)
                res.json(err);
                else
            res.json({
                message: "Element Updated Successfully",
                data: element
            });
        });
    });
};
// Delete Element
exports.delete = function (req, res) {
    Element.deleteOne({
        _id: req.params._id
    }, function (err, contact) {
        if (err)
            res.send(err)
            else
        res.json({
            status: "success",
            message: 'Element Deleted'
        })
    })
}