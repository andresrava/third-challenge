const Event = require('./../models/eventModel');
const APIFeatures = require('./../utils/apiFeatures');

exports.getAllEvents = async (req, res) => {
    try {
      // EXECUTE QUERY
      const features = new APIFeatures(Event.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const events = await features.query;
  
      // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results:events.length,
        data: {
          events
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };

  exports.createEvent = async (req, res) => {
    try {
      // const newTour = new Tour({})
      // newTour.save()
  
      const newEvent = await Event.create(req.body);
  
      res.status(201).json({
        status: 'success',
        data: {
          event: newEvent
        }
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err
      });
    }
  };  

  exports.getEvent = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      // Tour.findOne({ _id: req.params.id })
  
      res.status(200).json({
        status: 'success',
        data: {
          event
        }
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err
      });
    }
  };