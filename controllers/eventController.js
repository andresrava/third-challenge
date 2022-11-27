const Event = require('./../models/eventModel');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const slugify = require('slugify');

// Función para sacar el día de la semana

const days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  
const day = (date) => {
  console.log("el dateEvent es: " + dateEvent)
  return days[ date.getDay() ]; 
}


// Función para filtrar la lista
const filterByDay = (events, day) => {
  console.log("Entré a la función");
  console.log(events);
  console.log(day);
  const filtredEvents = [];
  console.log(filtredEvents)
  console.log("creé el array");
  for (let event of events) {
    console.log("Evento: " + event)
    console.log("dateTime: " + event.dateTime.getDay());
    if (event.dateTime.day === days)
      filtredEvents.push(event);
  }
  console.log(filtredEvents)
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
      
      
      const events = await features.query;
      console.log("Los eventos son: ");
      console.log(events);
      console.log("El coso es: " + req.query.dayOfTheWeek)
      if (req.query.dayOfTheWeek){
        const dayOfTheWeek = slugify(req.query.dayOfTheWeek, { lower: true });
        console.log(dayOfTheWeek);
          //Filtro los eventos
          console.log("Entré al if");
          const numberDay = days.indexOf(dayOfTheWeek);
          console.log(events[0].dateTime);
          const filtredEvents = events.filter(event => (event.dateTime.getDay() === numberDay));
          console.log("Filtred Elements: " + filtredEvents);
          res.status(200).json({
            status: 'success',
            results:filtredEvents.length,
            data: {
              filtredEvents
            }
          }); 
        } else {
      console.log("Pasé el if");
        // SEND RESPONSE
      res.status(200).json({
        status: 'success',
        results:events.length,
        data: {
          events
        }
      });
    }
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
  