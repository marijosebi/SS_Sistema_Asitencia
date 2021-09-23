//periodController.js
//Import Period Model

Period = require('./model');
//For index
exports.index = function (req, res) {
    Period.get(function (err, period) {
        console.log(req.body)
        if (err)
            res.json({
                status: "error",
                message: err.message
            });
        res.json({
            status: "success",
            message: "Got Period Successfully!",
            data: period       
        });
    });
};
//For creating new period
exports.add = function (req, res) {
    var period = new Period();
    console.log(req.body)

    period.id = req.body.id;
    period.date= req.body.date;

//Save and check error
    period.save(function (err) {
       if (err)
            res.json({
                status: "error",
                message: err
            });
res.json({
            message: "New Period Added!",
            data: period
        });
    });
};
// View Period
exports.view = function (req, res) {
    Period.findById(req.params._id, function (err, period) {
        if (err)
            res.send(err);
        res.json({
            message: 'Period Details',
            data: period
        });
    });
};
// Update Period
exports.update = function (req, res) {
    Period.findById(req.params._id, function (err, period) {
        if (err)
            res.send(err);
            period.id = req.body.id;
            period.date= req.body.date;
//save and check errors
        period.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Period Updated Successfully",
                data: period
            });
        });
    });
};
// Delete Period
exports.delete = function (req, res) {
    console.log(req.params)
    Period.deleteOne({
        _id: req.params._id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Period Deleted'
        })
    })
}