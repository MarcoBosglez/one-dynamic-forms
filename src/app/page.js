"use client"
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter  } from 'next/navigation';

import Image from 'next/image';
import logo from './assets/ONErpm.png'

import Input from '@mui/joy/Input';
import formConfig from './form';

export default function Home() {
  // Set router to navigate pages
  const router = useRouter();

  // State to manage form data
  const [formData, setFormData] = useState({});

  // State to track iframe validation status
  const [isValid, setIsValid] = useState(false);

  // Retrieve form submission URL from environment variables
  const scriptURL = `${process.env.HTML_FORM_DATA}`;

  /**
   * Handles input changes and updates form state.
   * @param {Object} event - The event object from input change.
   */
  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
    router.push('/thank-you');
  };
  
  /**
   * Handles form submission and sends data to the backend.
   * @param {Object} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isValid) {
      try {
        const response = await fetch(scriptURL, {
          method: 'POST',
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        router.push('/thank-you');
      } catch (error) {
        alert('Error. Form was not submitted. Please try again.');
        console.log('Error:', error);
      }
    } else {
      alert('Submitted files were not validated. Please follow upload instructions and try again.');
    }
  };

  // Effect to listen for messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      // Ensure message comes from trusted source
      if (!(event.origin?.includes("script.googleusercontent.com"))) return;

      if (event.data?.status) {
        setIsValid(event.data?.status);
        setFormData((prevData) => ({
          ...prevData,
          "savedFolder": event.data?.savedFolder,
          "savedFolder": event.data?.adType
        }));
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <div>
      <header>
        <Image alt="logo" src={logo}/>
        <br/>
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
