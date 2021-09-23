//elementController.js
//Import Constancy Model

Constancy = require('./model');
//For index
exports.index = function (req, res) {
    Constancy.get(function (err, element) {
        console.log(req.body)
        if (err)
            res.json({
                status: "error",
                message: err.message
            });
        res.json({
            status: "success",
            message: "Got Constancy Successfully!",
            data: element
        });
    });
};
//For creating new element
exports.add = function (req, res) {
    var element = new Constancy();
    console.log(req.body)

    element.date = req.body.date;
    element.events = req.body.events;
    element.expedite = req.body.expedite;
    element.assistent = req.body.assistent;
    element.type = req.body.type;
    element.invoice = req.body.invoice;

    //Save and check error
    element.save(function (err) {
        if (err) {
            res.json({
                status: "error",
                message: err
            });
            console.log(err)
        }
        else
            res.json({
                message: "New Constancy Added!",
                data: element
            });
    });
};
// View Constancy
exports.view = function (req, res) {
    Constancy
        .findOne({invoice: req.params.invoice})
     .populate({
            path: 'events',
            populate: { path: 'period organizer.unit organizer.department organizer.area' },
            select: 'title location period schedule code '
        })
        .populate({
            path: 'assistent',
            select: 'information.name user type'
        })
      /* .populate({
            path: 'expedite.unit',
            select: 'code'
        })
        .populate({
            path: 'expedite.department',
            select: 'code'
        })
        .populate('expedite.area')*/
        .then(user => {
            res.json({
                status: "success",
                message: "Got Constancy Successfully!",
                data: user
            });
        });
};

exports.last = function (req, res) {
    var n=new RegExp(`^[${req.body.code}\/[0-9]*\/${req.body.year}$`, "ig")
    console.log(n)
    console.log(req.params)
    console.log(req.body)
    Constancy
        .countDocuments({"invoice":n},
        function (err, count) {
            res.json(count) 
          });
};

// Update Constancy
exports.update = function (req, res) {
    Constancy.findById(req.params._id, function (err, element) {
        if (err)
            res.send(err);
        element.name = req.body.name;
        element.code = req.body.code;
        element.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Constancy Updated Successfully",
                data: element
            });
        });
    });
};
exports.filter = function (req, res) {
    Constancy.find({'assistent': req.params.user}).sort({'invoice': 1})
        .populate({
            path: 'events',
            populate: { path: 'period organizer.area' },
            select: 'title location period schedule code '
        })
        .populate({
            path: 'assistent',
            select: 'information.name user type'
        })
        .exec(function (err, events) {
            if (err)
                res.json(err)
            res.json({
                message: "",
                data: events
            });
        })

};
// Delete Constancy
exports.delete = function (req, res) {
    console.log(req.params)
    Constancy.deleteOne({
        _id: req.params._id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Constancy Deleted'
        })
    })
}