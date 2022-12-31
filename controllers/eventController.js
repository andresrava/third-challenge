const Event = require("./../models/eventModel");
const APIFeatures = require("./../utils/apiFeatures");
const AppError = require("./../utils/appError");
const catchAsync = require("./../utils/catchAsync");
const slugify = require("slugify");

// Función para sacar el día de la semana

const days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

const day = (date) => {
  // console.log("el dateEvent es: " + dateEvent)
  return days[date.getDay()];
};

exports.getAllEvents = async (req, res) => {
  console.log("Entré a getAllEvents");
  try {
    console.log("Now I'm here...");
    // EXECUTE QUERY
    const features = new APIFeatures(Event.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const events = await features.query;
    if (req.query.dayOfTheWeek) {
      const dayOfTheWeek = slugify(req.query.dayOfTheWeek, { lower: true });
      const numberDay = days.indexOf(dayOfTheWeek);
      const filtredEvents = events.filter(
        (event) => event.dateTime.getDay() === numberDay
      );
      res.status(200).json({
        status: "success",
        results: filtredEvents.length,
        data: {
          filtredEvents,
        },
      });
    } else if (req.query.id) {
      console.log("Entré al getAllEvents c/id");
      const event = await Event.findById(req.query.id);
      res.status(200).json({
        status: "success",
        data: {
          event,
        },
      });
    } else {
      // SEND RESPONSE
      console.log("Por acá ando");
      const events = await features.query;
      res.status(200).json({
        status: "success",
        results: events.length,
        data: {
          events,
        },
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.createEvent = async (req, res) => {
  console.log("Entré a createEvent");
  try {
    const newEvent = await Event.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        event: newEvent,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

exports.getEvent = catchAsync(async (req, res) => {
  console.log("Entré a getEvent");
  try {
    const event = await Event.findById(req.params.id);

    res.status(200).json({
      status: "success",
      data: {
        event,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
});

// exports.deleteEvent = catchAsync(async (req, res, next) => {
//   const event = await Event.findByIdAndDelete(req.params.id);

//   if (!event) {
//     return next(new AppError('No event found with that ID', 404));
//   }

//   res.status(204).json({
//     status: 'success',
//     data: null
//   });
// });

exports.deleteEvent = catchAsync(async (req, res, next) => {
  HTMLFormControlsCollection.log("Entré a delete!!!");
  if (req.query.dayOfTheWeek) {
    const features = new APIFeatures(Event.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const events = await features.query;
    const dayOfTheWeek = slugify(req.query.dayOfTheWeek, { lower: true });
    const numberDay = days.indexOf(dayOfTheWeek);
    const filtredEvents = events.filter(
      (event) => event.dateTime.getDay() === numberDay
    );
    for (let event of filtredEvents) {
      await Event.findByIdAndDelete(event.id);
    }
  }
  if (req.query.id) {
    console.log("Entré al if!!! tiene ID");
    const event = await Event.findByIdAndDelete(req.query.id);
    if (!event) {
      return next(new AppError("No event found with that ID", 404));
    }
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
