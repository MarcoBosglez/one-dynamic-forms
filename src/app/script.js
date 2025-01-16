// script.js
import formConfig from './form.js';  // Import the form configuration

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const response = await fetch(process.env.HTML_FORM_DATA, {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Error submitting form' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

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

// Adjust the handleSubmit function
function handleSubmit() {
  const formData = {};
  formConfig.forEach((field) => {
    if (field.type.includes("radio")) {
      const selectedOption = document.querySelector(`input[name="${field.id}"]:checked`);
      formData[field.id] = selectedOption ? selectedOption.value : null;
    } else if (field.type !== "iframe") {
      const input = document.getElementById(field.id);
      formData[field.id] = input ? input.value : null;
    }
  });

  // Call your Next.js API
  fetch('/api/submitForm', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .then(data => {
      alert('Form Submitted Successfully!');
      console.log('Success:', data);
    })
    .catch(e => {
      alert('Error. Form was not submitted. Please try again.');
      console.log('Error:', e);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  renderForm(formConfig);

  const submitButton = document.getElementById("submit-form");
  submitButton.addEventListener("click", handleSubmit);
});
