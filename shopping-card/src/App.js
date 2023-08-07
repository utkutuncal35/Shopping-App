/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import './App.css'
import Card from './components/card/Card';

function App() {

  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  



  const [product, setProduct] = useState([
    { id:1, price: "1500", stock: "350", image:"image", size: "L", info: "lorem ipsum dolor sit amet", adet: 1},
    { id:2, price: "1000", stock:   "300", image:"image", size: "L", info: "lorem ipsum dolor sit amet", adet: 1},
    { id:3, price: "1200", stock: "25", image:"image", size: "XL", info: "lorem ipsum dolor sit amet", adet: 1},
    { id:4, price: "500", stock: "250", image:"image", size: "S", info: "lorem ipsum dolor sit amet", adet: 1},
    { id:5, price: "50", stock: "50", image:"image", size: "XS", info: "lorem ipsum dolor sit amet", adet:1}
  ]);

  const [basket, setBasket] = useState([]);

  const applyDiscount = () => {
    const discount = 0.2; 
    const calculatedTotalPrice = calculateTotalPrice();
    const newDiscountedPrice = calculatedTotalPrice - calculatedTotalPrice * discount;
    setDiscountedPrice(newDiscountedPrice);
  };

  const calculateTotalPrice = () => {
    return basket.reduce((total, eleman) => total + eleman.price * eleman.adet, 0);
  };

  const handleCheckout = () => {
    setIsCheckout(true);
  };

  const handleCompletePurchase = () => {
    setIsCompleted(true);
  };


  return (
    <div className="App">
     <div className='urunler'>
      {
        product.map((eleman, index) => {
            return (
              <Card onClick={() => {
                const arr = [...basket];
                if(arr.findIndex((ind) => {
                  return eleman.id === ind.id;
                }) === -1)
                {
                  arr.push(eleman)
                  setBasket(arr);
                } else {
                  arr.map((item, adet) => {
                    if(item.id === eleman.id)
                    {
                      return (eleman.adet += 1)
                    }
                    setBasket(arr)
                  })
                  
                }
                console.log(basket);
              }} 
              key={index} 
              price={eleman.price} 
              stock={eleman.stock} 
              image={eleman.image} 
              size={eleman.size} 
              info={eleman.info}/>
            ) 
            
        })
      }
     </div>
     <div className='sepet'>
      <h3>SEPETİM</h3>
      <ul style={{margin:"15px"}}>
        {basket.map((eleman, index) => {
            return <li>
                {eleman.info + "  ----> " + "fiyat: " + eleman.price + " Adet: "}{""}
                <b style={{fontSize: "24px", color: "black"}}>
                  {eleman.adet}  
                </b>               
            </li>
        })}
      </ul>
      {basket.length > 0 ? (
  <div>
    <p style={{ margin: "15px", fontWeight:"bold" }}>
      Toplam Fiyat: {isCheckout ? (discountedPrice || calculateTotalPrice()).toFixed(2) : calculateTotalPrice().toFixed(2)} TL
      {isCheckout && (
        <span style={{ marginLeft: "10px", textDecoration: "line-through", color: "red" }}>
          {calculateTotalPrice().toFixed(2)} TL
        </span>
      )}
    </p>
    {isCheckout ? (
      <>
        <button
          style={{
            borderRadius: "5px",
            margin: "10px",
            padding: "10px 5px 10px 5px",
            backgroundColor: "#f2cbf2",
            color: "black",
            border: "1px solid grey",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={applyDiscount}
        >
          İndirim Yap
        </button>
        <button
          style={{
            borderRadius: "5px",
            margin: "10px",
            padding: "10px 5px 10px 5px",
            backgroundColor: "#f2cbf2",
            color: "black",
            border: "1px solid grey",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={handleCompletePurchase}
        >
          Alışverişi Tamamla
        </button>
      </>
    ) : (
      <>
        <button
          style={{
            borderRadius: "5px",
            margin: "10px",
            padding: "10px 5px 10px 5px",
            backgroundColor: "#f2cbf2",
            color: "black",
            border: "1px solid grey",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={handleCheckout}
        >
          Check-out
        </button>
      </>
    )}
  </div>
) : (
  <h5 style={{ margin: "15px" }}>Sepetinizde ürün bulunmamakta!</h5>
  )}
    {isCompleted && (
        <div>
          <p style={{margin:"10px"}}> --------------------------------------------------------------------------- </p>
          <p style={{margin:"15px", fontWeight:"lighter"}}>Ödeme sayfasına yönlendiriliyorsunuz(Ödendi)... </p>
          <p style={{margin:"15px", fontWeight:"bold", fontSize:"22px"}}>Alışveriş tamamlandı!</p>
          <p style={{margin:"15px", fontWeight:"normal"}}>= Sipariş Özetiniz =</p>
          <ul style={{margin:"15px"}}>
            {basket.map((eleman, index) => (
              <li key={index}>
                {eleman.info + "  ----> " + "Adet: " + eleman.adet + "  ----> " + "indirimli fiyat: " + (eleman.price - eleman.price * 0.2).toFixed(2)}
              </li>
            ))}
          </ul>
          <p style={{margin:"15px", fontWeight:"bold"}}>İndirimli Toplam Fiyat: {discountedPrice.toFixed(2)} TL</p>
        </div>
      )}
    </div>
    </div>
  );
}

export default App;
