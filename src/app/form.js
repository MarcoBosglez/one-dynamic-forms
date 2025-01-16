// form.js
export default [
    {
      "type": "territory",
      "label": "Territorio",
      "placeholder": "Localización del ad",
      "id": "territory"
    },
    {
      "type": "artist_name",
      "label": "Artista",
      "placeholder": "Nombre del Artista",
      "id": "artist_name"
    },
    {
      "type": "artist_id",
      "label": "ID",
      "placeholder": "ID del Artista",
      "id": "artist_id"
    },
    {
      "type": "single",
      "label": "Sencillo",
      "placeholder": "Nombre del Sencillo",
      "id": "single"
    },
    {
      "type": "playlist_link",
      "label": "Link de la Playlist",
      "placeholder": "Eg. spotify.com/artist/album/xxxx",
      "id": "playlist_link"
    },
    {
      "type": "ad_type_radio",
      "label": "Tipo de Anuncio",
      "options": ["Audio", "Banner", "Imagen"],
      "id": "ad_type_radio"
    },
    {
      "type": "age_range",
      "label": "Rango de Edad",
      "placeholder": "Eg. 12-17, +18",
      "id": "age_range"
    },
    {
      "type": "gender_radio",
      "label": "Género",
      "options": ["Hombre", "Mujer", "Otro", "Deseo No Especificar"],
      "id": "gender_radio"
    },
    {
      "type": "language",
      "label": "Lenguaje",
      "placeholder": "Eg. English, Español, Português",
      "id": "language"
    },
    {
      "type": "genre",
      "label": "Género Musical",
      "placeholder": "Eg. Rap en Español, Trap, Reggaeton",
      "id": "genre"
    },
    {
      "type": "playlist_type",
      "label": "Tipo de Playlist",
      "placeholder": "Mood de la Playlist",
      "id": "playlist_type"
    },
    {
      "type": "iframe",
      "label": "Link con Assets",
      "src": process.env.IMAGE_DIMENSION_CHECK,
      "id": "iframe1"
    }
]
  