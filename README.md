# second_challenge

Api for mannaging scheduled events and users

Use:
**_For user signUp:
send POST request to "3000/api/v1/users/signUp"
with body (for example):
{
"firstName": "string",
"lastName": "string",
"birthDate": "2022-11-10",
"city": "string",
"country": "string",
"email": "string",
"password": "string",
"confirmPassword": "string"
}
_**For user signIn:
send POST request to "3000/api/v1/users/signIn"
with body (for example):
{
"email": "examplemail@something.com",
"password": "1234passw"
}
**_For create new event:
send POST request to "3000/api/v1/events"
with body (for example):
[{
"description": "Example description",
"dateTime": "2022-11-17T10:33:21.321Z",
"createdAt": "2022-11-15T10:33:21.321Z"
}]
_**For list all the events:
send GET request to "3000/api/v1/events"

\*\*\*For list events by day of the week:
send GET request to (for example): "3000/api/v1/events?dayOfTheWeek=thursday"

\*\*\*For get event by ID:
send GET request to (for example) : "3000/api/v1/events?id=6373b3781671ce43e6430b46"

\_\*\* For delete event by ID:
send DELETE request to (for example): "3000/api/v1/events?id=6373b3c77667ad46a27fcde4"

\_\*\* For delete events by day of the week:
send DELETE request to (for example): "3000/api/v1/events?id=6373b3c77667ad46a27fcde4"
