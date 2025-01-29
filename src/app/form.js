// form.js
export default [
    {
      "type": "text",
      "label": "Artista",
      "placeholder": "Nombre del Artista",
      "id": "artist_name"
    },
    {
      "type": "text",
      "label": "ID del Artista",
      "placeholder": "ID del Artista",
      "id": "artist_id"
    },
    {
      "type": "text",
      "label": "Territorio",
      "placeholder": "Localización del anuncio",
      "id": "territory"
    },
    {
      "type": "text",
      "label": "Sencillo",
      "placeholder": "Nombre del Sencillo",
      "id": "single"
    },
    {
      "type": "text",
      "label": "Link de la Playlist",
      "placeholder": "Eg. spotify.com/artist/album/xxxx",
      "id": "playlist_link"
    },
    {
      "type": "text",
      "label": "Rango de Edad",
      "placeholder": "Eg. 12-17, +18",
      "id": "age_range"
    },
    {
      "type": "radio",
      "label": "Género",
      "options": ["Hombre", "Mujer", "Otro", "Deseo No Especificar"],
      "id": "gender_radio"
    },
    {
      "type": "text",
      "label": "Lenguaje",
      "placeholder": "Eg. English, Español, Português",
      "id": "language"
    },
    {
      "type": "text",
      "label": "Género Musical",
      "placeholder": "Eg. Rap en Español, Trap, Reggaeton",
      "id": "genre"
    },
    {
      "type": "text",
      "label": "Tipo de Playlist",
      "placeholder": "Mood de la Playlist",
      "id": "playlist_type"
    },
    {
      "type": "iframe",
      "label": "Tipo de Anuncio",
      "src": process.env.NEXT_PUBLIC_IMAGE_DIMENSION_CHECK,
      "id": "iframe"
    }
]
  