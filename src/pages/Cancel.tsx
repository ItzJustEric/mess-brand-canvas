import React from 'react';

// Cancel page shown if user cancels Stripe payment
export default function Cancel() {
  return (
    <div style={{ textAlign: 'center', marginTop: '4em' }}>
      <h1>Payment Cancelled</h1>
      <p>Your payment was not completed. You can try again or contact support if you need help.</p>
      {/*
        Customize this page for retry options, support links, etc.
      */}
    </div>
  );
} 