import Image from 'next/image';
import React, { useState } from 'react'
import styles from '../../styles/Product.module.css'

const Product = () => {

   const [size, setSize] = useState(0);

   const pizza = {
    id: 1,
    img: '/../public/images/pizza_2.jpg',
    name: "4 queijos",
    price: [19.9, 23.9, 27.9],
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
   };

  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.imgContainer}>
                <Image src={pizza.img} alt='' layout='fill' objectFit='contain' />
            </div>
        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>{pizza.name}</h1>
          <span className={styles.price}>${pizza.price[size]}</span>
          <p className={styles.desc}>{pizza.desc}</p>
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