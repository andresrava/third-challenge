const Event = require('./../models/eventModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const slugify = require('slugify');

// Función para filtrar la lista
const filterByDay = (events, day) => {
  console.log("Entré a la función");
  console.log(events);
  console.log(day);
  const filtredEvents = new[Event];
  console.log("creé el array");
  console.log("Entré a FilterByDay! ")
  for (let event of events) {
    console.log("Evento: " + event)
    if (event.dateTime.day === day)
      filtredEvents.push(event);
  }
  return filtredEvents;
}



exports.getAllEvents = async (req, res) => {
    try {
      // EXECUTE QUERY
      const features = new APIFeatures(Event.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      
      // const dayOfTheWeek = slugify(req.query.dayOfTheWeek, { lower: true });
      
      const events = await features.query;
      // console.log("Los eventos son: ");
      // console.log(events);
      // console.log(dayOfTheWeek);
    // if (dayOfTheWeek) {
    //     //Filtro los eventos
    //     console.log("Entré al if");
    //     events = filterByDay(events, dayOfTheWeek);

    //   }  
      // console.log("Pasé el if");
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

  // exports.getEvent = async (req, res) => {
  //   try {
  //     const event = await Event.findById(req.params.id);
  
  //     res.status(200).json({
  //       status: 'success',
  //       data: {
  //         event
  //       }
  //     });
  //   } catch (err) {
  //     res.status(404).json({
  //       status: 'fail',
  //       message: err
  //     });
  //   }
  // };
  exports.getEvent = catchAsync(async (req, res) => {
      const event = await Event.findById(req.params.id);
  
      res.status(200).json({
        status: 'success',
        data: {
          event
        }
      });
  });

  exports.deleteEvent = catchAsync(async (req, res, next) => {
    const event = await Event.findByIdAndDelete(req.params.id);
  
    if (!event) {
      return next(new AppError('No event found with that ID', 404));
    }
  
    res.status(204).json({
      status: 'success',
      data: null
    });
  });

  // exports.getEventByDow = catchAsync(async (req, res, next) => {
  //   const day = req.params.dow;
  //   console.log("the day is: " + day);
  //   res.status(204).json({
  //   status: 'success',
  //   data: day
  // });
  // })
  