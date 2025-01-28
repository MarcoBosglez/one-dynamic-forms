// form.js
export default [
    {
      "type": "text",
      "label": "Territorio",
      "placeholder": "Localización del ad",
      "id": "territory"
    },
    {
      "type": "text",
      "label": "Artista",
      "placeholder": "Nombre del Artista",
      "id": "artist_name"
    },
    {
      "type": "text",
      "label": "ID",
      "placeholder": "ID del Artista",
      "id": "artist_id"
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
      "type": "radio",
      "label": "Tipo de Anuncio",
      "options": ["Audio", "Banner", "Imagen"],
      "id": "ad_type_radio"
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
      "src": process.env.IMAGE_DIMENSION_CHECK,
      "id": "iframe"
    }
]
  