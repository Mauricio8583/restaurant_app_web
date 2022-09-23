import React, { useState } from 'react'
import styles from '../styles/Featured.module.css'
import Image from 'next/image'

export const Featured = () => {

  const [index, setIndex] = useState(0);

  const images = ["/../public/images/Pizza de Calabresa.jpg", "/../public/images/pizza_2.jpg", "/../public/images/pizza_3.jpg"];

  const handleArrow = (direction) => {
    if(direction === 'l'){
      setIndex(index !== 0 ? index-1 : 2);
    }
    if(direction === 'r'){
      setIndex(index !== 2 ? index+1 : 0);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.arrowContainer} style={{left: 0}} onClick={() => handleArrow("l")}>
      <Image src="/../public/images/arrow_left.png" alt='' layout='fill' />
      </div>
        
        <div className={styles.wrapper} style={{transform: `translateX(${-100*index}vw)`}}>
            
                {images.map((img, i) => (
                  <div className={styles.imgWrapper} key={i}>
                  <Image src={img} layout="fill" alt='' objectFit='contain' />
                  </div>
                ))}
            
            
        </div>
        <div className={styles.arrowContainer} style={{right: 0}} onClick={() => handleArrow("r")}>
        <Image src="/../public/images/arrow_right.png" alt='' layout='fill' />
        </div>
    </div>
  )
}
