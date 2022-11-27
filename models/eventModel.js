const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const eventSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'An event must have a description'],
    },
    dateTime: {
        type: Date,
        required: [true, 'An event must have a time and date'],
    },
    createdAt: {
        type: Date,
        required: [true, 'An event must have a time of creation'],
    }
  }
);



// DOCUMENT MIDDLEWARE: runs before .save() and .create()
eventSchema.pre('save', function(next) {
  this.slug = slugify(this.description, { lower: true });
  next();
});


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;