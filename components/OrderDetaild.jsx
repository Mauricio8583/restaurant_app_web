import React, { useState } from 'react'
import styles from '../styles/OrderDetaild.module.css'

export const OrderDetaild = ({total, createOrder}) => {

   const [customer, setCustomer] = useState("");
   const [address, setAddress] = useState("");

   const handleClickCash = () => {
    createOrder({customer, address, total, payment: 0});    
   }

  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <h1 className={styles.title}>You will pay $12 after delivery</h1>
            <div className={styles.item}>
                <lable className={styles.label}>Name</lable>
                <input type="text" placeholder='Jonh doe' className={styles.input} onChange={(e) => setCustomer(e.target.value)} />
            </div>
            <div className={styles.item}>
                <lable className={styles.label}>Address</lable>
                <input type="text" placeholder='Jonh doe' className={styles.input} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <button className={styles.button} onClick={handleClickCash}>Order</button>
        </div>
    </div>
  )
}
