import Image from 'next/image';
import React, { useState } from 'react'
import styles from '../../styles/Product.module.css'
import axios from 'axios';

const Product = ({product}) => {

   const [size, setSize] = useState(0);

   return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.imgContainer}>
                <Image src={product.img} alt='' layout='fill' objectFit='contain' />
            </div>
        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>{product.title}</h1>
          <span className={styles.price}>${product.prices[size]}</span>
          <p className={styles.desc}>{product.desc}</p>
          <h3 className={styles.choose}>Choose Your Size</h3>
          <div className={styles.sizeChoosing}>
            <div className={styles.size} onClick={()=> setSize(0)}>
              <Image src='/../public/images/size.png' alt='' layout='fill' />
              <span className={styles.number}>Small</span>
            </div>
            <div className={styles.size} onClick={()=> setSize(1)}>
              <Image src='/../public/images/size.png' alt='' layout='fill' />
              <span className={styles.number}>Medium</span>

            </div>
            <div className={styles.size} onClick={()=> setSize(2)}>
              <Image src='/../public/images/size.png' alt='' layout='fill' />
              <span className={styles.number}>Large</span>
            </div>
          </div>
          <h3 className={styles.choose}>Choose Aditional Ingredients</h3>
          <div className={styles.ingredients}>
            <div className={styles.option}>
              <input type="checkbox" id='double' name='double' className={styles.checkbox} />
              <label htmlFor='double'>Double Ingredients</label>
            </div>
            <div className={styles.option}>
              <input type="checkbox" id='cheese' name='cheese' className={styles.checkbox} />
              <label htmlFor='chesse'>Extra Cheese</label>
            </div>
            <div className={styles.option}>
              <input type="checkbox" id='spicy' name='spicy' className={styles.checkbox} />
              <label htmlFor='spicy'>Spicy Sauce</label>
            </div>
            <div className={styles.option}>
              <input type="checkbox" id='garlic' name='garlic' className={styles.checkbox} />
              <label htmlFor='garlic'>Garclic Sauce</label>
            </div>
          </div>
          <div className={styles.add}>
            <input type="number" defaultValue={1} className={styles.quantity} />
            <button className={styles.addButton}>Add to Cart</button>
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