import React, { useMemo, useState } from 'react'

export default function UseMemo() {
    const [count,setCount]=useState(0);
        let cart=[
        {
            product:'iphone5',
            price:5000,
            quantity:5
        },
        {
            product:'iphone6',
            price:6000,
            quantity:6
        },
        {
            product:'iphone7',
            price:7000,
            quantity:7
        }
    ]
    let memo=useMemo(()=>{
        let payment = cart.reduce((accumulator, currentValue)=>{
        return accumulator+currentValue.price*currentValue.quantity
        },0);
        console.log(payment);
    },[payment]);
    const addToCart=()=>{
        let newProduct ={
            product:'iphone7',
            price:7000,
            quantity:2
        }
    }
  return (
    <div>
        giá tiền {memo}
      {/* đây là 1 hook giúp ghi nhớ việc những tính toán */}
      <button onClick={()=>setCount(count+1)}>click</button>
      <button onClick={addToCart}>mua</button>
    </div>
  )
}
