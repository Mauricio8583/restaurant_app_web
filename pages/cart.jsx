import Image from 'next/image'
import React from 'react'
import styles from '../styles/Cart.module.css'
import { useDispatch, useSelector } from 'react-redux'

const cart = () => {

   const dispatch = useDispatch();
   const cartFromRedux = useSelector((state) => state.cart);

  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <table className={styles.table}>
                <tr className={styles.tr}>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Extras</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
                
                {cartFromRedux.products.map((product) => (
                   <tr className={styles.tr} key={product._id}>
                    <td>
                        <div className={styles.imgContainer}>
                            <Image src={product.img} alt='' layout='fill' objectFit='cover' />
                        </div>
                        
                    </td>
                    <td>
                       <span className={styles.name}>{product.title}</span>
                    </td>
                    <td>
                        <span className={styles.extras}>
                            {product.extras.map((extras) => (
                                <span key={extras._id}>{extras.text}</span>
                            ))}
                        </span>
                    </td>
                    <td>
                        <span className={styles.price}>
                            ${product.price}
                        </span>
                    </td>
                    <td>
                        <span className={styles.quantity}>
                            {product.quantity}
                        </span>
                    </td>
                    <td>
                        <span className={styles.total}>
                            ${product.price * product.quantity}
                        </span>
                    </td>
                    </tr>
                ))}
                
                
            </table>
        </div>
        <div className={styles.right}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>CART TOTAL</h2>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Subtotal: </b> ${cartFromRedux.total}
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Discount: </b> $00.0
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Total: </b> ${cartFromRedux.total}
                </div>
                <button className={styles.checkoutButton}>CHECKOUT NOW</button>
            </div>
        </div>
    </div>
  )
}
export default cart