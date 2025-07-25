import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { items, customerInfo } = req.body;
  
  // Map cart items to Stripe line items
  const line_items = items.map(item => ({
    price_data: {
      currency: 'usd',
      product_data: { name: item.name },
      unit_amount: Math.round(item.price * 100), // price in cents
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // Support multiple payment methods
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      
      // Configure customer information collection
      customer_email: customerInfo?.email, // Prefill email if provided
      billing_address_collection: 'required', // Collect billing address
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'JP'], // Restrict to supported countries
      },
      
      // Prefill shipping information if provided
      ...(customerInfo && {
        customer_creation: 'always',
      }),
      
      // Add metadata for order tracking
      metadata: {
        customer_name: customerInfo?.name || '',
        customer_email: customerInfo?.email || '',
        customer_phone: customerInfo?.phone || '',
        order_type: 'mess_brand_purchase',
      },
      
      // Configure payment behavior
      payment_intent_data: {
        capture_method: 'automatic',
        setup_future_usage: 'off_session', // Allow future payments if needed
      },
    });
    
    res.status(200).json({ id: session.id });
  } catch (err) {
    console.error('Stripe session error:', err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
