import Image from 'next/image';
import logo from '../assets/ONErpm.png'

export default function ThankYouPage() {
    return (
      <div className="response-container">
        <div className="thank-you">
          <div class="card">
            <Image alt="logo" src={logo} style={{width: "50%", height: "50%", marginBottom: "20px"}}/>
            <h2>Thank You!</h2>
            <p>Your answers have been submitted successfully.</p>
          </div>
        </div>
      </div>
    );
  };