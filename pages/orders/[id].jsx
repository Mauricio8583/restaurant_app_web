import React from 'react'
import styles from '../../styles/Order.module.css'
import Image from 'next/image'
import axios from 'axios';

const Order = ({order}) => {

   const status = order.status;

   const statusClass = (index) => {
    if(index - status < 1){
        return styles.done
    }
    if(index - status === 1){
        return styles.inProgress
    }
    if(index - status > 1){
        return styles.undone
    }
   }

  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <div className={styles.row}>
            <table className={styles.table}>
                <tr className={styles.tr}>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Address</th>
                    <th>Total</th>
                </tr>
                <tr>
                    <td>
                        <div className={styles.id}>
                            {order._id}                            
                        </div>
                        
                    </td>
                    <td>
                       <span className={styles.customerName}>{order.customer}</span>
                    </td>
                    <td>
                        <span className={styles.address}>
                            {order.address}                            
                        </span>
                    </td>
                    
                    
                    <td>
                        <span className={styles.total}>
                            {order.total}
                        </span>
                    </td>
                </tr>
                
            </table>
            </div>
            <div className={styles.row}>
                <div className={statusClass(0)}>
                    <Image src="/../public/images/paid.png" alt='' width={30} height={30} />
                    <span>Payment</span>
                    <div className={styles.checkedIcon}>
                        <Image src="/../public/images/checked.png" alt='' width={20} height={20} />
                    </div>
                </div>
                <div className={statusClass(1)}>
                    <Image src="/../public/images/bake.png" alt='' width={30} height={30} />
                    <span>Preparing</span>
                    <div className={styles.checkedIcon}>
                        <Image src="/../public/images/checked.png" alt='' width={20} height={20} />
                    </div>
                </div>
                <div className={statusClass(2)}>
                    <Image src="/../public/images/bike.png" alt='' width={30} height={30} />
                    <span>On the Way</span>
                    <div className={styles.checkedIcon}>
                        <Image src="/../public/images/checked.png" alt='' width={20} height={20} className={styles.checkedIcon} />
                    </div>
                </div>
                <div className={statusClass(3)}>
                    <Image src="/../public/images/delivered.png" alt='' width={30} height={30} />
                    <span>Delivered</span>
                    <div className={styles.checkedIcon}>
                        <Image src="/../public/images/checked.png" alt='' width={20} height={20} className={styles.checkedIcon} />
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.right}>
        <div className={styles.wrapper}>
                <h2 className={styles.title}>CART TOTAL</h2>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Subtotal: </b> ${order.total}
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Discount: </b> $00.0
                </div>
                <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Total: </b> ${order.total}
                </div>
                <button disabled className={styles.statusButton}>PAID!</button>
            </div>
        </div>        
    </div>
  )
}

export default Order

export const getServerSideProps = async ({params}) => {
 
    const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
    return {
      props: {
        order: res.data
      }
    }
    
  }