<p><a target="_blank" href="https://app.eraser.io/workspace/Kh2JVlTYyjY3wwjbBSSI" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

# BALIGEN SERVER
## Api Specification [USER]
> register `POST /api/users/register`
auth `public`

**request body**

```
{
  username: string,
  password: string,
  name: string
}
```
**success response (200)**

```
{
  data: {
    username: string,
    name: string
  }
}
```
**error response (400)**

```
{
  errors: "username min 3 \password min 8 \etc"
}
```
> login `POST /api/users/login`
auth `public`

**request body**

```
{
  username: string,
  password: string
}
```
**success response (200)**

```
{
  data: {
    accessToken: string
  }
}
```
**error response (400)**

```
{
  errors: "username min 3 \password min 8 \etc"
}
```
> get `GET /api/users/current`
auth `bearer token`

**success response (200)**

```
{
  data: {
    username: string,
    name: string,
    address: string,
    ...
  }
}
```
> update `PATCH /api/users/current`
auth `bearer token`

**request body**

```
{
  username: string?,
  password: string?,
  ...
}
```
**success response (200)**

```
{
  data: {
    username: string
  }
}
```
**error response (400)**

```
{
  errors: "name min 3 \address min 8 \etc"
}
```
> logout `DELETE /api/users/current`
auth `bearer token`

**success response (200)**

```
{
  data: {
    username: string
  }
}
```


## Api Specification [DESTINATION]
> get `GET /api/destinations/:slug`

**success response (200)**

```json
{
  "data": {
    "name": "..."
  }
}
```

> get all `GET /api/destinations`

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

> favorite `POST /api/destinations/:slug/favorite` auth `bearer token`

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

> unfavorite `DELETE /api/destinations/:slug/unfavorite`

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

> comment `POST /api/destinations/:slug/comment`

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

> uncomment `DELETE /api/destinations/:slug/uncomment`

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
> get `GET /api/cultures/:id`

**success response (200)**

```json
{
  "data": {
    "name": "..."
  }
}
```
> get all `GET /api/cultures`

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

> favorite `POST /api/cultures/:slug/favorite` auth `bearer token`

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

> unfavorite `DELETE /api/cultures/:slug/unfavorite`

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

> comment `POST /api/cultures/:slug/comment`

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

> uncomment `DELETE /api/cultures/:slug/uncomment`

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
