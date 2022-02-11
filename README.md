# wiki-api
This is a Wikipedia like RESTful API. I have built this out as a project while learning Node.js from Angela Yu's development bootcamp. I watch her lectures, try to understand them and build out the functionality on my own. If I get stuck somewhere, I try to figure it out on my own and if I'm not able to figure it out, I re-watch the lecture to figure it out. I have also added a few functionality of my own such as status codes, response headers etc., and have followed the RESTful API conventions to handle request and send responses.

# Documentation
Server endpoint: https://hayagreev-wiki-api.herokuapp.com

# /
```
GET:
    Redirects to the README page of this application in my github repo.
```

# /articles
```
GET: 
    Returns all the articles present in the database
    Status codes: 200, 404, 500
    Accepted request headers: content-type: application/json or application/x-www-form-urlencoded
    Response header: content-type: application/json
    Required Request payload: None
    Sample response: 
        200: {
                "All articles": [
                    {
                        "title": "REST",
                        "content": "REST is short for REpresentational State Transfer. IIt's an architectural style for designing APIs."
                        },
                    {
                        "title": "API",
                        "content": "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
                    }
                ]
             }, 

        404: {
                "message": "No Articles found"
             }

POST: 
    Creates a new article with the given title and content in the request payload
    Status codes: 201, 400, 500
    Accepted request headers: content-type: application/json or application/x-www-form-urlencoded
    Response header: content-type: application/json
    Required Request payload: title, content
    Sample response: 
        201: {
                "message": "Successfully added API."
             },

        400: {
                "error": "content missing from request body."
             }

DELETE: 
    Deletes all the articles
    Status codes: 200, 500
    Accepted request headers: content-type: application/json or application/x-www-form-urlencoded
    Response header: content-type: application/json
    Required Request payload: None
    Sample response: 
        200: {
                "message": "Deleted all articles successfully."
             }

```

# /articles/{specific-article-title}
```
GET: 
    Returns an article matching the article title passed in the request parameter
    Status codes: 200, 404, 500
    Accepted request headers: content-type: application/json or application/x-www-form-urlencoded
    Response header: content-type: application/json
    Required Request payload: None
    Sample response: 
        200: {
                "requested article": {
                    "title": "REST",
                    "content": "REST is short for REpresentational State Transfer. It's an architectural style for designing APIs."
                }
             }, 

        404: {
                "message": "No article matching mongoose found."
             }

PUT: 
    Updates the article with the given title and content in the request payload. If only title is passed in the request payload, the content field will be removed from the document. Liekwise for content.
    Status codes: 200, 400, 404, 500
    Accepted request headers: content-type: application/json or application/x-www-form-urlencoded
    Response header: content-type: application/json
    Required Request payload: title, content
    Sample response: 
        200: {
                "message": "Successfully updated article."
             },

        400: {
                "error": "The request body should not be empty."
             },
            
        404: {
                "message": "No article matching REST found."
             }
PATCH: 
    Updates the article with the given title and content in the request payload. If only title is passed in the request payload, the content field will be untouched. Only the title field will be updated. Liekwise for content.
    Status codes: 200, 400, 404, 500
    Accepted request headers: content-type: application/json or application/x-www-form-urlencoded
    Response header: content-type: application/json
    Required Request payload: title(optional), content(optional) but both cannot be empty
    Sample response: 
        200: {
                "message": "Successfully updated article."
             },

        400: {
                "error": "The request body should not be empty."
             },
            
        404: {
                "message": "No article matching DOM found."
             }

DELETE: 
    Deletes the article corresponding to the requested title
    Status codes: 200, 404, 500
    Accepted request headers: content-type: application/json or application/x-www-form-urlencoded
    Response header: content-type: application/json
    Required Request payload: None
    Sample response: 
        200: {
                "message": "Deleted API sucessfully."
             },
        
        404: {
                "error": "No article matching REST found."
             }
```