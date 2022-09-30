import React from 'react'
import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import Link from 'next/link'

export const Navbar = () => {

  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container} >
      <div className={styles.items}>
        <div className={styles.callButton}>
          <Image src="/../public/images/phone.png" alt='' width="32" height="32" />          
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>
            ORDER NOW
          </div>
          <div className={styles.text}>
            012 345 789
          </div>

        </div>
      </div>
      <div className={styles.items}>
        <ul className={styles.list}>
          <li className={styles.listItem}>Homepage</li>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <h1 style={{width: "120px", height: "69px", color: 'white', marginBottom: "40px", marginLeft: "10px" }}>Food Order</h1>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contacts</li>
        </ul>
      </div>
      <Link href="/cart">
       <div className={styles.items}>
        <div className={styles.cart}>
        <Image src="/../public/images/cart.png" alt="" width="30px" height="30px" />
        <div className={styles.counter}>{quantity}</div>
        </div>
       </div>      
      </Link>
    </div>
  )
}
