import Image from 'next/image'
import React from 'react'
import styles from '../styles/Footer.module.css'

export const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.items}>
        <Image src="/../public/images/bg.jpg" alt='' layout='fill' objectFit='cover' />
      </div>
      <div className={styles.items}>
      <div className={styles.card}>
        <h2 className={styles.motto}>
          The Best Pizza on Town!!
        </h2>
      </div>
      <div className={styles.card}>
        <h1 className={styles.title}>Find your Restaurant</h1>
        <p className={styles.text}>
          1654, R Nove.
          <br /> New York, 2444.
          <br /> (602) 867-1010.
        </p>
        <p className={styles.text}>
          12904, R Oito.
          <br /> New York, 989898.
          <br /> (602) 867-1000.
        </p>
        <p className={styles.text}>
          16782, R Dois.
          <br /> New York, 2000.
          <br /> (602) 333-1210.
        </p>
        <p className={styles.text}>
          1654, R Dez.
          <br /> New York, 2222.
          <br /> (602) 867-1111.
        </p>
      </div>
      <div className={styles.card}>
        <h1 className={styles.title}>Working Hours</h1>
        <p className={styles.text}>
          Monday Until Friday 
          <br /> 9:00 - 22:00
          </p>
          <p className={styles.text}>
          Saturdar - Sunday 
          <br /> 12:00 - 24:00
          </p>        
        </div>        
      </div>
    </div>
  )
}
