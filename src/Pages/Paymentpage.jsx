import React from 'react';
import './Paymentpage.css';
import payment_banner from '../Components/Assests/payment_banner.png'

const Paymentpage = () => {
  return (
    <div className="payment-container">
      <div className="payment-header">
        <h3>Payment Process</h3>
        <div>
          <img src={payment_banner} alt="Payment" />
        </div>
        <div>
          <div className="bank-details">
            <h4>Bank Details: PLUS ADVERTISING</h4>
            <p>Tamilnad Mercantile Bank</p>
            <p>A/c No: 229150050800248</p>
            <p>IFSC Code: TMBL0000229</p>
            <p>Branch: Porur</p>
          </div>
          <form className="user-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone No:</label>
              <input type="tel" id="phone" name="phone" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email ID:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Paymentpage;
