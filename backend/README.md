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


## Api Specificatuib [DESTINATION]
> get `GET /api/destinations/:id`

> get all `GET /api/destinations`

> favorite `POST /api/destinations/:id/favorite`

> unfavorite `DELETE /api/destinations/:id/unfavorite`

> comment `POST /api/destinations/:id/comment`

> uncomment `DELETE /api/destinations/:id/uncomment`



## Api Specificatuib [CULTURE]
> get `GET /api/cultures/:id`

> get all `GET /api/cultures`

> favorite `POST /api/cultures/:id/favorite`

> unfavorite `DELETE /api/cultures/:id/unfavorite`

> comment `POST /api/cultures/:id/comment`

> uncomment `DELETE /api/cultures/:id/uncomment` 
