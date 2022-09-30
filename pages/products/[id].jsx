import Image from 'next/image';
import React, { useState } from 'react'
import styles from '../../styles/Product.module.css'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../redux/cartSlice';

const Product = ({product}) => {

   const [size, setSize] = useState(0);
   const [price, setPrice] = useState(product.prices[0]);
   const [extras, setExtras] = useState([]);
   const [quantity, setQuantity] = useState(1);
   const dispatch = useDispatch();

   const changePrice = (number) => {
    setPrice(price + number);
   }

   
   const handlePriceBySize = (sizeIndex) => {
    const difference = product.prices[sizeIndex] - product.prices[size];
    setSize(sizeIndex);
    changePrice(difference);

   }

   const handleChangeExtrasValues = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      setExtras((prev) => [...prev, option]);
    }
    else{
      changePrice(-option.price);
      setExtras(extras.filter((extra) => extra._id !== option.id));
    }

   }

   const handleAddToCart = () => {
    dispatch(addProduct({...product, extras, price, quantity }))
   }
   

   return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.imgContainer}>
                <Image src={product.img} alt='' layout='fill' objectFit='contain' />
            </div>
        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>{product.title}</h1>
          <span className={styles.price}>${price}</span>
          <p className={styles.desc}>{product.desc}</p>
          <h3 className={styles.choose}>Choose Your Size</h3>
          <div className={styles.sizeChoosing}>
            <div className={styles.size} onClick={()=> handlePriceBySize(0)}>
              <Image src='/../public/images/size.png' alt='' layout='fill' />
              <span className={styles.number}>Small</span>
            </div>
            <div className={styles.size} onClick={()=> handlePriceBySize(1)}>
              <Image src='/../public/images/size.png' alt='' layout='fill' />
              <span className={styles.number}>Medium</span>

            </div>
            <div className={styles.size} onClick={()=> handlePriceBySize(2)}>
              <Image src='/../public/images/size.png' alt='' layout='fill' />
              <span className={styles.number}>Large</span>
            </div>
          </div>
          <h3 className={styles.choose}>Choose Aditional Ingredients</h3>
          <div className={styles.ingredients}>
            {product.extras.map((option) => (
              <div className={styles.option} key={option._id}>
              <input type="checkbox" id={option.text} name={option.text} className={styles.checkbox} onChange={(e) => handleChangeExtrasValues(e, option)} />
              <label htmlFor={option.text}>{option.text}</label>
            </div>
            ))}
            
          </div>
          <div className={styles.add}>
            <input type="number" defaultValue={1} className={styles.quantity} onChange={(e) => setQuantity(e.target.value)} />
            <button className={styles.addButton} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
    </div>
  )
}

export default Product

export const getServerSideProps = async ({params}) => {
 
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
  return {
    props: {
      product: res.data
    }
  }
  
}