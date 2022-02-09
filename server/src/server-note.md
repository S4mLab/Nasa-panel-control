need to make the `PORT` in `server.js` configurable to make it defaults to `8080`
but at the same time, the admin can specify which port it can run on as an enviromental variable?

but why should we do this?

the benefit of doing this is that we can separate our server from the express code
we gonna have a separate file call `app.js` which has all express code

========================

### what is your expected outcome?

The GET `/launch` and `GET /` should return the html launch page

### what actual happened/ what is the problem?

`GET /launch` & `GET /` returns dark blank theme
however, when send the request from `Postman` to those 2 URLs, it reutnrs the launch html page

in the broswer launch page, in the console, we get
`TypeError: t.map is not a function`

in React, when

### your analytics?

at first, I thought it would be some kind of problems between the request in the frontend and the APIs in the back. But when I use Postman to send the reqest `GET /launch` and `GET /` to the server. It return the html page of the launch page so the api in the server received and responsed properly
