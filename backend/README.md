<p><a target="_blank" href="https://app.eraser.io/workspace/Kh2JVlTYyjY3wwjbBSSI" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

# BALIGEN SERVER
## Api Specification [USER]
> register `POST /users/register`
auth `public`

**request body**

```json
{
  "username": "...",
  "password": "...",
  "name": "..." 
}
```
**success response (200)**

```json
{
  "data": {
    "username": "string",
    "name": "string"
  }
}
```
**error response (400)**

```json
{
  "errors": "username min 3 password min 8 etc"
}
```
> login `POST /users/login`
auth `public`

**request body**

```json
{
  "username": "string",
  "password": "string"
}
```
**success response (200)**

```json
{
  "data": {
    "accessToken": "string"
  }
}
```
**error response (400)**

```json
{
  "errors": "username min 3 password min 8 etc"
}
```
> get `GET /users/current`
auth `bearer token`

**success response (200)**

```json
{
  "data": {
    "username": "string",
    "name": "string",
    "address": "string"
  }
}
```
> update `PATCH /users/current`
auth `bearer token`

**request body**

```json
{
  "username": "string",
  "password": "string"
}
```
**success response (200)**

```json
{
  "data": {
    "username": "string"
  }
}
```
**error response (400)**

```json
{
  "errors": "name min 3 address min 8 etc"
}
```
> logout `DELETE /users/current`
auth `bearer token`

**success response (200)**

```json
{
  "data": {
    "username": "string"
  }
}
```


## Api Specification [DESTINATION]
> get `GET /destinations/:slug`

**success response (200)**

```json
{
  "data": {
    "name": "..."
  }
}
```

> get all `GET /destinations`

**success response (200)**

```json
{
  "data": [
    {
      "name": "..."
    },
    {
      "name": "..."
    }
  ]
}
```

> favorite `POST /destinations/:slug/favorite` auth `bearer token`

**req body**

```json
{
  "username": "...",
  "destinationSlug": "..."
}
```

**res success (200)**

```json
{
  "data": {
    "destination": true
  }
}
```

**res success (403)**

```json
{
  "errors": "..."
}
```

> unfavorite `DELETE /destinations/:slug/unfavorite`

**req body**

```json
{
  "username": "...",
  "destinationSlug": "..."
}
```

**res success (200)**

```json
{
  "data": {
    "destination": true
  }
}
```

**res error (403)**

```json
{
  "errors": "..."
}
```

> comment `POST /destinations/:slug/comment`

**req body**

```json
{
  "parentId": "...",
  "username": "...",
  "destinationSlug": "...",
  "body": "..."
}
```

**res success (200)**

```json
{
  "data": {
    "id": "..."
  }
}
```

**res error (403)**

```json
{
  "errors": "..."
}
```

> uncomment `DELETE /destinations/:slug/uncomment`

**req body**

```json
{
  "id": "...",
  "username": "...",
  "destinationSlug": "..."
}
```

**res success (200)**

```json
{
  "data": {
    "id": "..."
  }
}
```

**res error (403)**

```json
{
  "errors": "..."
}
```




## Api Specification [CULTURE]
> get `GET /cultures/:id`

**success response (200)**

```json
{
  "data": {
    "name": "..."
  }
}
```
> get all `GET /cultures`

**success response (200)**

```json
{
  "data": [
    {
      "name": "..."
    },
    {
      "name": "..."
    }
  ]
}
```

> favorite `POST /cultures/:slug/favorite` auth `bearer token`

**req body**

```json
{
  "username": "...",
  "cultureSlug": "..."
}
```

**res success (200)**

```json
{
  "data": {
    "culture": true
  }
}
```

**res success (403)**

```json
{
  "errors": "..."
}
```

> unfavorite `DELETE /cultures/:slug/unfavorite`

**req body**

```json
{
  "username": "...",
  "cultureSlug": "..."
}
```

**res success (200)**

```json
{
  "data": {
    "culture": true
  }
}
```

**res error (403)**

```json
{
  "errors": "..."
}
```

> comment `POST /cultures/:slug/comment`

**req body**

```json
{
  "parentId": "...",
  "username": "...",
  "cultureSlug": "...",
  "body": "..."
}
```

**res success (200)**

```json
{
  "data": {
    "id": "..."
  }
}
```

**res error (403)**

```json
{
  "errors": "..."
}
```

> uncomment `DELETE /cultures/:slug/uncomment`

**req body**

```json
{
  "id": "...",
  "username": "...",
  "cultureSlug": "..."
}
```

**res success (200)**

```json
{
  "data": {
    "id": "..."
  }
}
```

**res error (403)**

```json
{
  "errors": "..."
}
```
