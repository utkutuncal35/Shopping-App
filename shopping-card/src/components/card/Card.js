import React from 'react'
import './card.css'
import CardImage from '../carImage/CardImage.js'
import Info from '../info/Info.js'
import Price from '../price/Price.js'
import Size from '../size/Size.js'
import Stock from '../stock/Stock.js'

function Card({image, info, price, size, stock, onClick}) {
  return (
    <div className='card' onClick={onClick}>
        <div className='card-body'>
           <CardImage image={image}/>
           <Info info={info}/>
           <Price price={price}/>
           <Size size={size}/>
           <Stock stock={stock}/>
        </div>
    </div>
  )
}

export default Card