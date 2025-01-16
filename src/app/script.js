import form from './form.js';
const formConfig = form

// Google Sheets Script URL
const scriptURL = process.env.HTML_FORM_DATA

// Function to render the form
function renderForm(config) {
  const formBuilder = document.getElementById("form-builder");

  config.forEach((field) => {
    const fieldContainer = document.createElement("div");
    fieldContainer.classList.add("form-field");

    if (field.type === "iframe") {
      const iframeLabel = document.createElement("label");
      iframeLabel.textContent = field.label;

      const iframe = document.createElement("iframe");
      iframe.src = field.src;
      iframe.width = "100%";
      iframe.height = "315";
      iframe.style.border = "none";

      fieldContainer.appendChild(iframeLabel);
      fieldContainer.appendChild(iframe);
    } else {
      const label = document.createElement("label");
      label.textContent = field.label;

      let input;
      if (field.type.includes("radio")) {
        input = document.createElement("div");
        field.options.forEach((option) => {
          const radioWrapper = document.createElement("div");

          const radioInput = document.createElement("input");
          radioInput.type = "radio";
          radioInput.name = field.id;
          radioInput.value = option;

          const radioLabel = document.createElement("label");
          radioLabel.textContent = option;

          radioWrapper.appendChild(radioInput);
          radioWrapper.appendChild(radioLabel);
          input.appendChild(radioWrapper);
        });
      } else {
        input = document.createElement("input");
        input.type = field.type;
        input.placeholder = field.placeholder || "";
        input.id = field.id;
      }

      fieldContainer.appendChild(label);
      fieldContainer.appendChild(input);
    }

    formBuilder.appendChild(fieldContainer);
  });
}
// Function to handle form submission
function handleSubmit() {
  const formData = {};
  formConfig.forEach((field) => {
    if (field.type.includes("radio")) {
      const selectedOption = document.querySelector(
        `input[name="${field.id}"]:checked`
      );
      formData[field.id] = selectedOption ? selectedOption.value : null;
    } else if (field.type !== "iframe") {
      const input = document.getElementById(field.id);
      formData[field.id] = input ? input.value : null;
    }
  });

  const {
    territory,           // Territorio
    artist_name,         // Artista
    artist_id,           // ID
    single,              // Sencillo
    playlist_link,       // Link de la Playlist
    ad_type_radio,       // Tipo de Anuncio
    age_range,           // Rango de Edad
    gender_radio,        // Género
    language,            // Lenguaje
    genre,               // Género Musical
    playlist_type,       // Tipo de Playlist
  } = formData;

  // Here you can integrate the Google Sheets API
  // Example: send formData to your backend or API endpoint
  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify({
      territory,           // Territorio
      artist_name,         // Artista
      artist_id,           // ID
      single,              // Sencillo
      playlist_link,       // Link de la Playlist
      ad_type_radio,       // Tipo de Anuncio
      age_range,           // Rango de Edad
      gender_radio,        // Género
      language,            // Lenguaje
      genre,               // Género Musical
      playlist_type,       // Tipo de Playlist
    })  // Ensure the body is stringified
  })
  .then(response => response.json()) 
  .then(data => {
    alert('Form Submitted Successfully!')
    console.log('Success:', data)
  })
  .catch(e => {
    alert('Error. Form was not submitted. Please try again.')
    console.log('Error', e)
  })
}

// Render the form on page load
document.addEventListener("DOMContentLoaded", () => {
  renderForm(formConfig);

  const submitButton = document.getElementById("submit-form");
  submitButton.addEventListener("click", handleSubmit);
});
