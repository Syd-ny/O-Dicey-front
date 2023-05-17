# Formats pour utilisation API

## Users

### /api/users/[id]/characters

Il faudrait que l'id du character soit présent

```json
[
  {
    "name": "Tanyag(orc)",
    "picture": "https://via.placeholder.com/450x300.png/0044ff?text=1+nisi",
    "stats": [],
    "inventory": null,
    "notes": null,
    "updatedAt": null,
    "createdAt": "2021-04-07T00:00:00+02:00",
    "game": {
      "name": "Et qui nam ab."
    }
  },
  {
    "name": "Roneter(humain)",
    "picture": "https://via.placeholder.com/450x300.png/005544?text=1+ea",
    "stats": [],
    "inventory": null,
    "notes": null,
    "updatedAt": null,
    "createdAt": "1981-02-19T00:00:00+01:00",
    "game": {
      "name": "Et qui nam ab."
    }
  }
]
```


## Characters

### Routes GET et PUT

La route GET renvoie trop d'infos pour les objets `user` et `game`

#### /api/characters/[id] GET

```json
{
  "id": 21,
  "name": "Orrode(orc)",
  "picture": "https://via.placeholder.com/450x300.png/0000ff?text=1+unde",
  "stats": [],
  "inventory": null,
  "notes": null,
  "updatedAt": null,
  "createdAt": "2019-01-18T00:00:00+01:00",
  "user": {
    "id": 53,
    "login": "Prof. Oral Willms Jr.",
    "picture": "https://picsum.photos/id/157/300/500"
  },
  "game": {
    "id": 30,
    "name": "Animi quia dolorum recusandae.",
    "status": 1,
    "updatedAt": null,
    "createdAt": "1987-04-03T00:00:00+02:00"
  }
}
```

#### /api/characters/[id] PUT, PATCH

```json
{
  "id": 21,
  "name": "Orrode(orc)",
  "picture": "https://via.placeholder.com/450x300.png/0000ff?text=1+unde",
  "stats": [],
  "inventory": null,
  "notes": null,
  "updatedAt": null,
  "createdAt": "2019-01-18T00:00:00+01:00",
  "user": {
    "id": 53
  },
  "game": {
    "id": 30
  }
}
```
