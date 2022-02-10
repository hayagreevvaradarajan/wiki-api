# wiki-api
This is a Wikipedia like RESTful API. I have built this out as a project while learning Node.js from Angela Yu's development bootcamp. I watch her lectures, try to understand them and build out the functionality on my own. If I get stuck somewhere, I try to figure it out on my own and if I'm not able to figure it out, I re-watch the lecture to figure it out.

# Documentation
Server endpoint: https://hayagreev-wiki-api.herokuapp.com

Paths:
# /articles
```
GET: 
    Returns all the articles present in the database
    Status code: 200
    Response header: content-type: application/json
    Required Request payload: None
    Sample response: 
        {
            "All articles": [
                {
                "_id": "5c18e1892998bdb3b3d355bf",
                "title": "REST",
                "content": "REST is short for REpresentational State Transfer. IIt's an architectural style for designing APIs."
                },
                {
                "_id": "5c139771d79ac8eac11e754a",
                "title": "API",
                "content": "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
                }
            ]
        }
```
# articles/{specific-article-title}