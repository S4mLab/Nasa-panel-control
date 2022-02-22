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

so the error is in the `planets.controllers`

something went wrong with the datatype conversion

### your analytics?

at first, I thought it would be some kind of problems between the request in the frontend and the APIs in the back. But when I use Postman to send the reqest `GET /launch` and `GET /` to the server. It return the html page of the launch page so the api in the server received and responsed properly

## Models

`Models` are constructors compiled from Schema definitions.
An instance of model is a document
Models will create and read documents from mongodb

when you called...

```javascript
mongoose.model('', schema);
```

on a schema, it will compile a model for you

the 1st arg is the singular name of the collection your model is for
Mongoose will automatically check the plural, lowercased version of your model,

> `Launch` model is for `launches` collection in mongodb

### connect launches to the db

. how to connect mongo to your schema and how to interact with it

. need to find a way to insert launch data to mongodb

create updateLaunch to find/create a launch

### how to check that the input destination planet is in planet collection

1. need to planet model to find the document
2.
3. compare the input planet name with

## throw

to use the build-in error obj,

```javascript
throw new Error('got an error');
```

to create new error

`throw` statement will throws a user-defined exception.

### how to increment the launch

find the lastest launch from the launches collection

### now that you finish the scheduling launch, wat to do?

the schedule launch in the launch model file, the layer inteact with data in db

need to import it to controller so that it can be invoked
