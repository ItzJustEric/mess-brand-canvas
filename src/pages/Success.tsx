import React from 'react';

// Success page shown after successful Stripe payment
export default function Success() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4em' }}>
      <h1>Thank you for your purchase!</h1>
      <p>Your payment was successful. You will receive a confirmation email soon.</p>
      {/*
        Customize this page for order details, customer support, etc.
        You can fetch order info from your backend here if needed.
      */}
    </div>
  );
} 