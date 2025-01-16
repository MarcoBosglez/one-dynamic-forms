"use client"
import { useState } from 'react';
import formConfig from './form';

const Form = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwul6VoJwhv8ceXrHVWj2kSyXhdV1DnPW9NIyyaFTsNDvmRhNh0EDoegRIfkHbxme8J/exec';

    try {
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json'
        }
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
  );
};

export default Script;
