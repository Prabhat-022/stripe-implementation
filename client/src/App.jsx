import StripeCheckout from 'react-stripe-checkout';
import { useState } from 'react';

const App = () => {

  const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY; // Accessing the environment variable
  console.log(stripeKey);


  const [product, setProduct] = useState({
    name: 'prabhat',
    price: 10,
    description: 'hello world',
    productBy: 'facebook'
  })
  const makePayment = (token) => {
    console.log(token);
    alert('Payment Successful');
    const body = {
      token,
      product
    }
    const headers = {
      'Content-Type': 'application/json'
    }
    return fetch('http://localhost:5000/payment', {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    }).then(res => res.json())
      .catch(err => console.log(err))
  }

  return (
    <div>
      <h1>Product</h1>
      <StripeCheckout
        stripeKey={stripeKey}
        token={makePayment}
        billingAddress
        shippingAddress
        amount={product.price * 100}
        name={product.name}
        description={product.description}
        image='https://i.imgur.com/4YdSd3A.png'
      >
        <button>Pay</button>
      </StripeCheckout>

    </div>
  )
}

export default App
