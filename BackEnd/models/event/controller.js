//eventController.js
//Import Event Model

const { exists } = require('../user/model');

Event = require('./model');
User = require('./../user/model');
//For index
exports.index = function (req, res) {
    Event.find({}, 'type title location description state.assistent code schedule.date schedule.duration', { assistents: 0 })
        .populate("organizer.unit", 'name code')
        .populate("organizer.department", 'name code')
        .populate("organizer.area")
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

}

exports.last = function (req, res) {
    var n = new RegExp(`^[${req.body.code}\/[0-9]*\/E-${req.body.year}$`, "ig")
    console.log(n)
    console.log(req.params)
    console.log(req.body)
    Event
        .countDocuments({ "code": n },
            function (err, count) {
                res.json(count)
            });
};

//For creating new event

exports.add = function (req, res) {
    var event = new Event();
    console.log(req.body)
    event.title = req.body.title;
    event.description = req.body.description;
    event.location = req.body.location;
    event.schedule = req.body.schedule;
    event.period = req.body.period;
    event.assistence = req.body.assistence;
    event.organizer = req.body.organizer;

    //Save and check error
    event.save(function (err) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            message: "New Event Added!",
            data: event
        });
    });
};
// View Event
exports.view = function (req, res) {

    Event
        .findOne({ _id: req.params._id })
        .populate("period")
        .populate("organizer.unit", 'name code')
        .populate("organizer.department", 'name code')
        .populate("organizer.area")
        .then(user => {
            res.json(user);
        });

};
exports.byCode = function (req, res) {
    console.log(req.params.code)
    Event
        .findOne({ "code": req.params.code }, "title location code state.assistent schedule.date schedule.duration schedule.state.assistent")
        .then(user => {
            if (!user) {
                res.status(404).send();
            } else {
                res.json({
                    status: "success",
                    message: "Got Event Successfully!",
                    data: user
                });
            }
        }).catch((e) => {
            res.status(400).send(e);
        });

};

exports.byExternalName = function (req, res) {
    console.log(req.body)
    Event
        .findOne({ 'external.name.firstname': req.body.name.firstname, 'external.name.lastname': req.body.name.lastname, 'external.name.name': req.body.name.name })
        .then(user => {
            if (!user) {
                res.status(404).send();
            } else {
                user.length != 0 ?
                    res.json({
                        status: 200,
                        message: "Exists",
                        data: true
                    }) : res.json({
                        status: 100,
                        message: "Not exists",
                        data: false
                    });
            }
        }).catch((e) => {
            res.status(400).send(e);
        });

};



// Update Event
exports.update = function (req, res) {
    Event.findById(req.params._id, function (err, event) {
        if (err)
            res.send(err);

        event.title = req.body.title;
        event.description = req.body.description;
        event.location = req.body.location;
        event.schedule = req.body.schedule;
        event.period = req.body.period;
        event.assistence = req.body.assistence;
        event.organizer = req.body.organizer;
        //save and check errors
        event.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Event Updated Successfully",
                data: event
            });
        });
    });
};
// Delete Event
exports.delete = function (req, res) {
    console.log(req.params)
    Event.deleteOne({
        _id: req.params._id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Event Deleted'
        })
    })
};
exports.deleteAssistent = function (req, res) {
    console.log(req.body)
    console.log(req.params)
    Event.findByIdAndUpdate(
        req.body.event, { $pull: { "assistents.assistent": { _id: req.params.user } } }, { safe: true, upsert: true },
        function (err, node) {
            if (err)
                res.send(err)
            res.json({
                status: "success",
                message: 'Event Deleted',
                data: node
            })
        })
};


// View Event
exports.filter = function (req, res) {
    Event.find({
        'assistents.assistent': req.params.user
    }, { assistents: 0 })
        .populate("period", 'code')
        .populate({
            path: 'organizer.unit',
            populate: { path: 'departments.department departments.areas.area' },
            select: 'name code departments '
        })
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

exports.addAssistent = function (req, res) {
    console.log(req.body)
    //Checar si ya esta registrado en las asistencias
    Event.find({ '_id': req.body.event, "assistents.assistent": req.body.user }, "code").then(user => {
        user.length ?
            //SI
            res.json({
                status: 200,
                data: true,
                message: 'Registro exitoso'
            })
            :
            //NO
            Event.updateOne({
                _id: req.body.event
            },
                {
                    $addToSet: {
                        'assistance.internal': {
                            $each: [{ assistent: req.body.user, register: new Date() }]
                        }
                    }
                }).then(response => res.json({
                    status: 200,
                    data: true,
                    message: 'Registro exitoso'
                })).catch((e) => {
                    res.status(400).send(e);
                    console.log(e)
                });


    }).catch((e) => {
        res.status(400).send(e);
        console.log(e)
    });


};


exports.addAssistentExternal = function (req, res) {
    console.log(req.body)
    //Checar si ya esta registrado en las asistencias
    Event
        .findOne({ 'external.name.firstname': req.body.assistent.name.firstname, 'external.name.lastname': req.body.assistent.name.lastname, 'external.name.name': req.body.assistent.name.name })
        .then(user => {
            if (user) {

                console.log('Ok')

                res.json({
                    status: 200,
                    message: "Exists",
                    data: true
                });
            } else { //NO
                console.log('Agregar')
                Event.updateOne({
                    _id: req.body.event
                },
                    {
                        $addToSet: {
                            'assistance.external': {
                                $each: [{ assistent: req.body.assistent, register: new Date() }]
                            }
                        }
                    }).then(response => res.json({
                        status: 200,
                        data: req.body.assistent,
                        message: 'Registro exitoso'
                    })).catch((e) => {
                        console.log(e)
                        res.status(400).send(e);

                    });

            }
        }).catch((e) => {
            console.log(e)
            res.status(400).send(e);

        });


};


exports.exists = function (req, res) {
    Event.find({
        'assistents.assistent': req.params.user
    }, "assistents").then(user => {
        if (!user) {
            res.status(404).send();
        }
        else {
            user.length ?
                res.json({
                    status: 200,
                    data: false
                }) : res.json({
                    status: 200,
                    data: true
                });
            ;
        }
    }).catch((e) => {
        res.status(400).send(e);
    });

};