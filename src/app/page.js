"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from 'react';
import {formConfig} from "./form.js"

const Index = () => {
  useEffect(() => {
    // This script will render the form and handle form submission
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.onload = () => {
      // Here, you can put any initialization you need after loading the Google API script
    };
    document.body.appendChild(script);

    const script2 = document.createElement('script');
    script2.src = '/script.js';
    script2.type = 'module';
    document.body.appendChild(script2);
  }, []);
};

export default function Home() {
  return (
    <div className={styles.page}>
      <header>
        Custom Form Builder
      </header>

      <main className={styles.main}>
        <div id="form-builder">
        </div>

        <button id="submit-form">Submit Form</button>
      </main>

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
