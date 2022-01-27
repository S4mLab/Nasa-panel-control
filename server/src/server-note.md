need to make the `PORT` in `server.js` configurable to make it defaults to `8080`
but at the same time, the admin can specify which port it can run on as an enviromental variable?

but why should we do this?

the benefit of doing this is that we can separate our server from the express code
we gonna have a separate file call `app.js` which has all express code
