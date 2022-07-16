# Serverless Framework Node HTTP API on AWS

This project demonstrates how to make a simple HTTP API with Node.js running on AWS Lambda and API Gateway using the Serverless Framework.

The purpose of this API is to translate JSON keys from responses provided by the Star Wars API into Spanish. 

## Example

For the following endpoint https://swapi.py4e.com/api/planets/1/ its response would be the following:

```
  {
    "name": "Tatooine", 
    "rotation_period": "23", 
    "orbital_period": "304", 
    "diameter": "10465", 
    "climate": "arid", 
    "gravity": "1 standard", 
    "terrain": "desert", 
    "surface_water": "1", 
    "population": "200000", 
    "residents": [
        "https://swapi.py4e.com/api/people/1/", 
        "https://swapi.py4e.com/api/people/2/", 
        "https://swapi.py4e.com/api/people/4/", 
        "https://swapi.py4e.com/api/people/6/", 
        "https://swapi.py4e.com/api/people/7/", 
        "https://swapi.py4e.com/api/people/8/", 
        "https://swapi.py4e.com/api/people/9/", 
        "https://swapi.py4e.com/api/people/11/", 
        "https://swapi.py4e.com/api/people/43/", 
        "https://swapi.py4e.com/api/people/62/"
    ], 
    "films": [
        "https://swapi.py4e.com/api/films/1/", 
        "https://swapi.py4e.com/api/films/3/", 
        "https://swapi.py4e.com/api/films/4/", 
        "https://swapi.py4e.com/api/films/5/", 
        "https://swapi.py4e.com/api/films/6/"
    ], 
    "created": "2014-12-09T13:50:49.641000Z", 
    "edited": "2014-12-20T20:58:18.411000Z", 
    "url": "https://swapi.py4e.com/api/planets/1/"
}
```

We want to translate each key of this JSON into Spanish, so the output would be the following:

```
{
  "nombre": "Tatooine",
  "período_de_rotación": "23",
  "periodo orbital": "304",
  "diámetro": "10465",
  "climatizado": "arid",
  "gravedad": "1 standard",
  "terreno": "desert",
  "Superficie del agua": "1",
  "población": "200000",
  "residentes": [
    "https://swapi.py4e.com/api/people/1/",
    "https://swapi.py4e.com/api/people/2/",
    "https://swapi.py4e.com/api/people/4/",
    "https://swapi.py4e.com/api/people/6/",
    "https://swapi.py4e.com/api/people/7/",
    "https://swapi.py4e.com/api/people/8/",
    "https://swapi.py4e.com/api/people/9/",
    "https://swapi.py4e.com/api/people/11/",
    "https://swapi.py4e.com/api/people/43/",
    "https://swapi.py4e.com/api/people/62/"
  ],
  "Película (s": [
    "https://swapi.py4e.com/api/films/1/",
    "https://swapi.py4e.com/api/films/3/",
    "https://swapi.py4e.com/api/films/4/",
    "https://swapi.py4e.com/api/films/5/",
    "https://swapi.py4e.com/api/films/6/"
  ],
  "creado": "2014-12-09T13:50:49.641000Z",
  "editado": "2014-12-20T20:58:18.411000Z",
  "URL": "https://swapi.py4e.com/api/planets/1/"
}
```

## Usage

### Testing

Clone this project in your local machine. Make sure to have git installed.

```
$ git clone https://github.com/BadinhoCornejo/sw-translate.git
```
```
$ cd sw-translate
```

Install all dependencies

```
$ npm install 
```

Install jest globally 

```
$ npm install -g jest
```

Running tests 

```
$ jest 
```

### Deployment

```
$ serverless deploy
```

After deploying, you should see output similar to:

```bash
Deploying aws-node-http-api-project to stage dev (us-west-2)

✔ Service deployed to stack aws-node-http-api-project-dev (152s)

endpoints:
  POST - https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/translate
  GET - https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/translate/{id}
functions:
  addTranslation: sw-translate-dev-addTranslation (19 MB)
  getTranslation: sw-translate-dev-getTranslation (19 MB)
```

_Note_: In current form, after deployment, your API is public and can be invoked by anyone. For production deployments, you might want to configure an authorizer. For details on how to do that, refer to [http event docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway/).

### Invocation

After successful deployment, you can call the created application via HTTP using Postman or any other API platform:

### **Adding a new translation**

To add a new translation use the following endpoint:

```
POST https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/translate
```

The body should be the following:

```
{
  "endpoint": "planets/1"
}
```

Where the endpoint field should be the endpoint part of the URL of the resource to translate. E.g. https://swapi.py4e.com/api/planets/1

The endpoint should be

```
planets/1
```

The response should provide the following body:

```
{
  "status": 200,
  "body": {
    "id": "1d62d6dd-40e1-45b8-be48-2b022e7050f7"
  }
}
```

Where the ***id*** field should be the one to use when retrieving the data of the endpoint related to the proper translation.

_Note_: Make sure to save this ***id*** you'll need it later.


### ***Getting a translation for a given endpoint***

In the previous example, we used the POST method to add an endpoint to our history, now we want the data of that endpoint translated into Spanish.

To get a translation we use the following endpoint:

```
GET https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/translate/{id}
```

Where the ***{id}*** should be the one provided by the previous operation.

E.g. https://xxxxxxxxxx.execute-api.us-west-2.amazonaws.com/translate/1d62d6dd-40e1-45b8-be48-2b022e7050f7

The response should look like this:

```
{
    "status": 200,
    "body": {
        "data": {
            "nombre": "Tatooine",
            "período_de_rotación": "23",
            "periodo orbital": "304",
            "diámetro": "10465",
            "climatizado": "arid",
            "gravedad": "1 standard",
            "terreno": "desert",
            "Superficie del agua": "1",
            "población": "200000",
            "residentes": [
                "https://swapi.py4e.com/api/people/1/",
                "https://swapi.py4e.com/api/people/2/",
                "https://swapi.py4e.com/api/people/4/",
                "https://swapi.py4e.com/api/people/6/",
                "https://swapi.py4e.com/api/people/7/",
                "https://swapi.py4e.com/api/people/8/",
                "https://swapi.py4e.com/api/people/9/",
                "https://swapi.py4e.com/api/people/11/",
                "https://swapi.py4e.com/api/people/43/",
                "https://swapi.py4e.com/api/people/62/"
            ],
            "Película (s": [
                "https://swapi.py4e.com/api/films/1/",
                "https://swapi.py4e.com/api/films/3/",
                "https://swapi.py4e.com/api/films/4/",
                "https://swapi.py4e.com/api/films/5/",
                "https://swapi.py4e.com/api/films/6/"
            ],
            "creado": "2014-12-09T13:50:49.641000Z",
            "editado": "2014-12-20T20:58:18.411000Z",
            "URL": "https://swapi.py4e.com/api/planets/1/"
        }
    }
}
```

And that's it! Now we can add what endpoints we want to translate and then get the translation.