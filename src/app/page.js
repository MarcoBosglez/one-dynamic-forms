"use client"
import * as React from 'react';
import Image from "next/image";
import { useState } from 'react';
import formConfig from './form';
import logo from './assets/ONErpm.png'
import Input from '@mui/joy/Input';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function Home() {
  const [formData, setFormData] = useState({});
  console.log(process.env.HTML_FORM_DATA)
  const scriptURL = `${process.env.HTML_FORM_DATA}`;

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        mode: 'no-cors',
      });
      const data = await response.json();
      alert('Form Submitted Successfully!');
      console.log('Success:', data);
    } catch (error) {
      alert('Error. Form was not submitted. Please try again.');
      console.log('Error:', error);
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
            />
          ) : field.type === 'radio' ? (
            <FormControl>
              <RadioGroup
                
              >
              {field.options.map((option) => (
                <FormControlLabel 
                  type="radio"
                  id={field.id}
                  name={field.id}
                  value={option} 
                  control={<Radio/>} 
                  label={option} 
                  onChange={handleChange}
                  required
                />
              ))}
              </RadioGroup>
            </FormControl>
          ) : field.type === 'radioss' ? (
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
