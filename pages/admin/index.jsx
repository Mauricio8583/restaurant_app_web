import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import styles from '../../styles/AdminIndex.module.css'

const index = ({products, orders}) => {

    const [productList, setProductList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ["preparing", "on the way", "delivered"];

   const handleDelete = async (id) => {
      
    try{
        const res = await axios.delete("http://localhost:3000/api/products/" + id);
        setProductList(productList.filter((product) => product !== id));
    }catch(err){
        console.log(err)
    }
   }

   const handleStatus = async (id) => {

    const targetOrder = orderList.filter((order) => order._id !== id)[0];
    const currentStatus = targetOrder.status;

    try{
        const res = await axios.put("http://localhost:3000/api/orders/" + id, {status: currentStatus + 1});
        setOrderList([res.data, ...orderList.filter((order) => order._id !== id)]);

    }catch(err){
        console.log(err)
    }
   }

  return (
    <div className={styles.container}>
        <div className={styles.products}>
            <h1 className={styles.productsTitle}>Products</h1>
            <table className={styles.productsTable}>
                <tbody>
                    <tr className={styles.productsTableTitles}>
                        <th>Image</th>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </tbody>
                
                    {productList.map((product) => (
                        <tbody>
                        <tr className={styles.productsTableInfo} key={product._id}>
                        <td><Image src={product.img} alt='' width={50} height={50} objectFit="cover" /></td>
                        <td>{product._id}</td>
                        <td>{product.title}</td>
                        <td>${product.prices[0]}</td>
                        <td>
                            <button className={styles.buttons}>Edit</button>
                            <button className={styles.buttons} onClick={() => handleDelete(product._id)}>Delete</button>
                        </td>
                    </tr>
                    </tbody>
                    ))}
                
            </table>
        </div>
        <div className={styles.orders}>
            <h1 className={styles.ordersTitle}>Orders</h1>
            <table className={styles.ordersTable}>
                <tbody>
                    <tr className={styles.ordersTableTitles}>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </tbody>
                {orderList.map((order) => (
                    <tbody>
                    <tr className={styles.ordersTableInfo} key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.customer}</td>
                        <td>$ {order.total}</td>
                        <td>{order.status}</td>
                        <td>{order.payment === 0 ? (<span>Cash</span>) : (<span>Paid</span>)}</td>
                        <td>
                            <button className={styles.buttons} onClick={() => handleStatus(order._id)}>Next Stage</button>
                            
                        </td>
                    </tr>
                </tbody>
                ))}
            </table>
        </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
    const myCookie = context.req?.cookies || "";

    if(myCookie.token !== process.env.TOKEN){
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false
            }
        }
    }

    const productRes = await axios.get("http://localhost:3000/api/products");
    const orderRes = await axios.get("http://localhost:3000/api/orders");

    return {
        props: {
            products: productRes.data,
            orders: orderRes.data
        }
}
}

export default index
