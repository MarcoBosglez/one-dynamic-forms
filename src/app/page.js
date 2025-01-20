"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from 'react';
import formConfig from './form';

export default function Home() {
  const [formData, setFormData] = useState({});
  const scriptURL = `https://script.google.com/macros/s/${process.env.HTML_FORM_DATA}/exec`;

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
    <div className={styles.page}>
      <header>
        Custom Form Builder
      </header>

      <form onSubmit={handleSubmit}>
      {formConfig.map((field) => (
        <div key={field.id} className="form-field">
          <label htmlFor={field.id}>{field.label}</label>

          {field.type === 'iframe' ? (
            <iframe
              src={field.src}
              width="100%"
              height="315"
              style={{ border: 'none' }}
            />
          ) : field.type.includes('radio') ? (
            <div>
              {field.options.map((option) => (
                <div key={option}>
                  <input
                    type="radio"
                    id={field.id}
                    name={field.id}
                    value={option}
                    onChange={handleChange}
                  />
                  <label>{option}</label>
                </div>
              ))}
            </div>
          ) : (
            <input
              type={field.type}
              id={field.id}
              placeholder={field.placeholder}
              value={formData[field.id] || ''}
              onChange={handleChange}
            />
          )}
        </div>
      ))}

      <button type="submit">Submit Form</button>
    </form>

      <footer className={styles.footer}>
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
