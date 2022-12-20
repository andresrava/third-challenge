const eventController = require('../controllers/eventController');
test('Listo todos los eventos', () => {
    expect(eventController.getAllEvents()).toBe(
        {"status":"success","results":2,"data":{"events":[{"_id":"638755cd42461a2844f807b7","description":"Primer prueba","dateTime":"2022-11-29T10:33:21.321Z","createdAt":"2022-11-15T10:33:21.321Z"},{"_id":"638755f442461a2844f807bb","description":"Tercera prueba","dateTime":"2022-12-01T10:33:21.321Z","createdAt":"2022-11-15T10:33:21.321Z"}]}}
        // {status: 'success',
        // results:2,
        // data: [{
        //             "_id": "638755cd42461a2844f807b7",
        //             "description": "Primer prueba",
        //             "dateTime": "2022-11-29T10:33:21.321Z",
        //             "createdAt": "2022-11-15T10:33:21.321Z"
        //         },
        //         {
        //             "_id": "638755f442461a2844f807bb",
        //             "description": "Tercera prueba",
        //             "dateTime": "2022-12-01T10:33:21.321Z",
        //             "createdAt": "2022-11-15T10:33:21.321Z"
        //         },
        //     ]
            
           
        // }
    
    )
    });