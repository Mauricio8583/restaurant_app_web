import React from 'react'
import styles from '../styles/Pizza.module.css'
import { PizzaCard } from './PizzaCard'

export const PizzaList = ({products}) => {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>The Best Pizza in town!!</h1>
        <p className={styles.desc}>
            We serve the best pizza
        </p>

        <div className={styles.wrapper}>
            {products.map((pizza) => (
               <PizzaCard key={pizza._id} pizza={pizza} />
            ))}            
        </div>
    </div>
  )
}
