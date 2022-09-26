import React from 'react'
import styles from '../styles/PizzaCard.module.css'
import Image from 'next/image'

export const PizzaCard = () => {
  return (
    <div className={styles.container}>
        <Image src="/../public/images/pizza_2.jpg" alt='' width="500" height="500" />
        <h1 className={styles.title}>Calabresa</h1>
        <span className={styles.price}>$20.00</span>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        </p>
    </div>
  )
}
