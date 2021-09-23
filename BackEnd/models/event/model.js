var mongoose = require('mongoose');
const Schema = mongoose.Schema;
//schema
const Assistent = require('../assistent/model');
const Period = require('../catalogues/period/model');
const Area = require('../catalogues/area/model');
const Unit = require('../catalogues/unit/model');
const Department = require('../catalogues/department/model');
var Info= require('../information/model');
var eventSchema = mongoose.Schema({
    title:{type: String, required: [true, 'Campo obligatorio']},
    description:{type: String},
    location:{type: String, required: [true, 'Campo obligatorio']},
    schedule:[
        {
            date:{type: Date, required: [true, 'Campo obligatorio']},
            duration:{type: Number, required: [true, 'Campo obligatorio']},
            assistence:{
                internal:[
                    {
                        register:{type: Date, required: [true, 'Campo obligatorio']},
                        assistent:{type: Schema.Types.ObjectId, ref: Assistent},
                    }],
                    external: [{assistent:Object, register: {type: Date}}]
            }
        }
    ],
    period:{ type: Schema.Types.ObjectId, ref: Period ,required: [true, 'Campo obligatorio']},
    
      
    organizer:{
        unit:{ type: Schema.Types.ObjectId, ref: Unit ,required: [true, 'Campo obligatorio']},
        department:{ type: Schema.Types.ObjectId, ref: Department,required: [true, 'Campo obligatorio']},
        area:{ type: Schema.Types.ObjectId, ref: Area ,required: [true, 'Campo obligatorio']},

    }
    
});


var collection = 'events'

// Export User Model
var Event = module.exports = mongoose.model('Event', eventSchema,collection);
module.exports.get = function (callback, limit) {
   Event.find(callback).limit(limit); 
}