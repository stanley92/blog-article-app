## Blog Article

### Object Schema

```
title: String (required)
content: String (required)
```
## How to use the API

### URL

### CREATE   

```
POST /article
```
Example payload:

```javascript
    {
      "title": "Blog A",
      "content": "This is content for Blog A"
    }
```

### READ

```
GET /article/:id

GET /articles
```

### UPDATE
```
PUT /article/:id
```
Example payload:

```javascript
    {
      "title": "Blog A",
      "content": "This is content for Blog A"
    }
```

### DELETE
```
DELETE /article/:id
```

## Prerequisite
* Mongo
* ExpressJS
* Node
* ReactJs

## Setting Up

### Backend Server
```sh
cd server
npm i
npm run dev
```

### Frontend React Client
```sh
cd client
npm i
npm start
```