"use client"
import * as React from 'react';
import Image from "next/image";
import { useState } from 'react';
import formConfig from './form';
import logo from './assets/ONErpm.png'
import Input from '@mui/joy/Input';

// TODO REDIRECT TO THANK YOU FOR SUBMITTING PAGE AND REALOAD

export default function Home() {
  const [formData, setFormData] = useState({});
  const scriptURL = `${process.env.HTML_FORM_DATA}`;

  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    console.log(formData)
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    validateIframeContent();

    if (isValid) {
      try {
        const response = await fetch(scriptURL, {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        alert('Form Submitted Successfully!');
        console.log('Success:', data);
      } catch (error) {
        alert('Error. Form was not submitted. Please try again.');
        console.log('Error:', error);
      }
    }
  };

  const validateIframeContent = () => {
    const iframe = document.getElementById("iframe");
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const targetMessage = iframeDoc.querySelector(`div[id="output"] p`);

    console.log('messages', targetMessage?.textContent)

    if (targetMessage?.textContent === "Archivo(s) enviado(s) correctamente") {
      setIsValid(true);
      setFormData((prevData) => ({
        ...prevData,
        "savedFolder": targetMessage?.id
      }));
    }
  };

  return (
    <div>
      <header>
        <Image alt="logo" src={logo} style={{width: "30%", height: "50%"}}/>
        <br/>
        <h1>Forms</h1>
        <p>Las respuestas se grabarán una vez cargue los archivos y envíe este formulario.</p>
        <br/>
        <p style={{color: "red"}}>* Indica una pregunta requerida</p>
      </header>

      <form onSubmit={handleSubmit}>
      {formConfig.map((field) => (
        <div key={field.id} className="form-field">
          <label htmlFor={field.id}>{field.label} <a style={{color: "red"}}>*</a></label>

          {field.type === 'iframe' ? (
            <iframe
              src={field.src}
              id="iframe"
            />
          ) : field.type === 'radio' ? (
            <div>
              {field.options.map((option) => (
                <div key={option}>
                  <input
                    type="radio"
                    id={field.id}
                    name={field.id}
                    value={option}
                    onChange={handleChange}
                    required
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          ) : (
            <Input
              placeholder={field.placeholder}
              sx={{
                '&::before': {
                  border: '1.5px solid var(--Input-focusedHighlight)',
                  transform: 'scaleX(0)',
                  left: '2.5px',
                  right: '2.5px',
                  bottom: 0,
                  top: 'unset',
                  transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                  borderRadius: 0,
                  borderBottomLeftRadius: '64px 20px',
                  borderBottomRightRadius: '64px 20px',
                },
                '&:focus-within::before': {
                  transform: 'scaleX(1)',
                },
              }}
              type={field.type}
              id={field.id}
              value={formData[field.id] || ''}
              onChange={handleChange}
              required
            />
          )}
        </div>
      ))}

      <button type="submit">Submit Form</button>
    </form>

      <footer>
        <p>ONErpm Forms</p>
        <p>© Copyright 2025 ONErpm. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
