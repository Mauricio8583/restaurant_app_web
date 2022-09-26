import React from 'react'
import styles from '../styles/Pizza.module.css'
import { PizzaCard } from './PizzaCard'

export const PizzaList = () => {
  return (
    <div className={styles.container}>
        <h1 className={styles.title}>The Best Pizza in town!!</h1>
        <p className={styles.desc}>
            We serve the best pizza
        </p>

        <div className={styles.wrapper}>
            <PizzaCard />
            <PizzaCard />
            <PizzaCard />
            <PizzaCard />
            <PizzaCard />
            <PizzaCard />
            <PizzaCard />
            <PizzaCard />
        </div>
    </div>
  )
}
