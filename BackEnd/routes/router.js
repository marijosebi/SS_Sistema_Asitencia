//routes.js
//initialize express router
let router = require('express').Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/')
    },
    filename: (req, file, cb) => {
        cb(null,  Date.now() + file.originalname );
    }
});
var upload = multer({ storage: storage });
//Se puede limitar el tamaño del archivo
//Se puede filtar los tipos de archivos
//set default API response
router.get('/', function(req, res,next) {
    res.json({
        status: 'API Works',
        message: 'Welcome to Rest API'
    });
});
//Import user Controller
var userController = require('../models/user/controller');
var unitController = require('../models/catalogues/unit/controller');
var assistentController = require('../models/assistent/controller');
var eventController = require('../models/event/controller');
var periodController = require('../models/catalogues/period/controller');
var departmentController = require('../models/catalogues/department/controller');
var constancyController = require('../models/constancy/controller');
var programController = require('../models/catalogues/program/controller');
var areaController = require('../models/catalogues/area/controller');
//var assistentController = require('../models/assistent/controller');


// user routes
router.route('/user')
    .get(userController.index)
    .post(userController.add);
router.route('/user-searcher/:user')
    .get(userController.byUser)

router.route('/user-filtered/:type')
    .get(userController.filter);

router.route('/user/:_id')
    .get(userController.view)
    .patch(userController.update)
    .put(userController.update)
    .delete(userController.delete);

router.route('/changepass/:_id')
    .put(userController.change);

// event routes
router.route('/event')
    .get(eventController.index)
    .post(eventController.add);

router.route('/event/:_id')
    .get(eventController.view)
    .patch(eventController.update)
    .put(eventController.update)
    .delete(eventController.delete);

router.route('/event-searcher/:code')
    .get(eventController.byCode)
router.route('/event-searcher-external')
    .get(eventController.byExternalName)

router.route('/events/:user')
    .get(eventController.filter)
    .post(eventController.deleteAssistent)

router.route('/register-assistence/')
    .post(eventController.addAssistent)
router.route('/register-assistence-external/')
    .post(eventController.addAssistentExternal)

router.route('/e-last')
    .post(eventController.last)

router.route('/event-user-exists/:user')
    .get(eventController.exists)
// period routes
router.route('/period')
    .get(periodController.index)
    .post(periodController.add);

router.route('/period/:_id')
    .get(periodController.view)
    .patch(periodController.update)
    .put(periodController.update)
    .delete(periodController.delete);

// unit routes
router.route('/unit')
    .get(unitController.index)
    .post(unitController.add);

router.route('/unit/:_id')
    .get(unitController.view)
    .patch(unitController.update)
    .put(unitController.update)
    .delete(unitController.delete);

router.route('/assistent')
    .get(assistentController.index)
    .post(assistentController.add);

router.route('/assistent/:_id')
    .get(assistentController.view)
    .patch(assistentController.update)
    .put(assistentController.update)
    .delete(assistentController.delete);

    // department routes
router.route('/department')
    .get(departmentController.index)
    .post(upload.array('images'),departmentController.add);
    
router.route('/department/:_id')
    .get(departmentController.view)
    .patch(upload.array('images'),departmentController.update)
    .put(upload.array('images'),departmentController.update)
    .delete(departmentController.delete);

        // constancy routes
router.route('/constancy')
    .get(constancyController.index)
    .post(constancyController.add);
router.route('/c-last')
    .post(constancyController.last)
        
router.route('/constancy/:invoice')
    .get(constancyController.view)
    .patch(constancyController.update)
    .put(constancyController.update)
    .delete(constancyController.delete);

router.route('/constancy-filter/:user')
    .get(constancyController.filter)

router.route('/program')
    .get(programController.index)
    .post(programController.add);
        
router.route('/program/:_id')
    .get(programController.view)
    .patch(programController.update)
    .put(programController.update)
    .delete(programController.delete);

router.route('/area')
    .get(areaController.index)
    .post(upload.single('image'),areaController.add);
        
router.route('/area/:_id')
    .get(areaController.view)
    .patch(upload.single('image'),areaController.update)
    .put(upload.single('image'),areaController.update)
    .delete(areaController.delete);

//Export API routes
module.exports = router;

