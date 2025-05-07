import React, { useState, useEffect, useRef, useContext, createContext } from 'react';

// Context for cart state
const CartContext = createContext();

const App = () => {
  const [products, setProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setProducts([
      { id: 1, name: 'NexaTone Headsets', oldPrice: 270, price: 110, image: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/headphone/e/j/6/quietcomfort-wireless-noise-cancelling-headphones-bose-original-imagvshaddeftnpy.jpeg?q=90&crop=false' },
      { id: 2, name: 'EchoPulse SoundGear', oldPrice: 155, price: 99, image: 'https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/30948614/2024/11/14/c06dda40-3fcc-4447-9ace-c9a8f484e40a1731578424783-BOULT-AUDIO-Vortex-Bluetooth-True-Wireless-Headphones---Jet--1.jpg' },
      { id: 3, name: 'AudioSculpt Elite', oldPrice: 375, price: 235, image: 'https://www.energysistem.com/cdnassets/products/45305/principal_2000.jpg' },
      { id: 4, name: 'SonoWave Headphones', oldPrice: 295, price: 125, image: 'https://images-cdn.ubuy.co.in/65ef95ab90212d1553760f04-wireless-bluetooth-headphones-over-ear.jpg' }
    ]);

    const saleEndTime = new Date();
    saleEndTime.setHours(saleEndTime.getHours() + 12); // 12-hour countdown

    const timer = setInterval(() => {
      const now = new Date();
      const diff = saleEndTime - now;
      if (diff <= 0) {
        clearInterval(timer);
      } else {
        setTimeLeft({
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      <div style={styles.container}>
        <Header />
        <Countdown timeLeft={timeLeft} />
        <ProductList products={products} />
        <Cart />
      </div>
    </CartContext.Provider>
  );
};

const Header = () => (
  <header style={styles.header}>
    <h1>Black Friday Mega Sale</h1>
    <p>Unbeatable deals. Limited time only!</p>
  </header>
);

const Countdown = ({ timeLeft }) => (
  <div style={styles.countdown}>
    <h2>Hurry! Offer ends in:</h2>
    <p>{`${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}</p>
  </div>
);

const ProductList = ({ products }) => (
  <section style={styles.productList}>
    {products.map((product) => (
      <Product key={product.id} product={product} />
    ))}
  </section>
);

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div style={styles.productCard}>
      <img src={product.image} alt={product.name} style={styles.productImage} />
      <h3>{product.name}</h3>
      <p>
        <span style={styles.oldPrice}>INR {product.oldPrice}</span> <span>INR {product.price}</span>
      </p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

const Cart = () => {
  const { cart } = useContext(CartContext);
  const cartRef = useRef();

  return (
    <aside style={styles.cart} ref={cartRef}>
      <h2>Your Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </aside>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#111',
    color: '#fff',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  countdown: {
    textAlign: 'center',
    margin: '20px 0',
    backgroundColor: '#222',
    padding: '10px',
    borderRadius: '5px'
  },
  productList: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '20px',
  },
  productCard: {
    backgroundColor: '#333',
    padding: '15px',
    borderRadius: '5px',
    width: '200px',
    textAlign: 'center'
  },
  productImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    marginBottom: '10px',
    borderRadius: '4px'
  },
  oldPrice: {
    textDecoration: 'line-through',
    marginRight: '10px',
    color: '#999'
  },
  cart: {
    marginTop: '40px',
    padding: '20px',
    backgroundColor: '#222',
    borderRadius: '5px'
  }
};

export default App;
