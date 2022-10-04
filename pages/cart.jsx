import Image from 'next/image'
import React, { useState } from 'react'
import styles from '../styles/Cart.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from 'axios';
import { useRouter } from 'next/router';
import { reset } from '../redux/cartSlice';
import { OrderDetaild } from '../components/OrderDetaild';




const cart = () => {

   const dispatch = useDispatch();
   const cartFromRedux = useSelector((state) => state.cart);
   const [open, setOpen] = useState(false);
   const [cash, setCash] = useState(false);
   const router = useRouter();

   const createOrder = async (data) => {
    try{
        const res = await axios.post("http://localhost:3000/api/orders", data);
        if(res.status === 201) router.push("/orders/" + res.data._id);
        dispatch(reset());       

     }catch(err){
        console.log(err);
    }
   }

   // This values are the props in the UI
   const amount = cartFromRedux.total;
   const currency = "USD";
   const style = {"layout":"vertical"};

   const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        const shipping = details.purchase_units[0].shipping;
                        createOrder({
                            customer: shipping.name.full_name,
                            address: shipping.address.address_line_1,
                            total: amount,
                            payment: 1

                        })
                    });
                }}
            />
        </>
    );
}

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
                
                {open ? (
                    <div className={styles.paymentMethods}>
                        <button className={styles.paymentButton} onClick={() => setCash(true)}>CASH ON DELIVERY</button>
                        <PayPalScriptProvider
                    options={{
                        "client-id": "AYwOaKKlUu1xzBrMF_GIReRrO7nSHemkwRhvZ5np_CCLUCS5CuNs2kCGT1IFzz5P3dTmWEJtUS3kVPIo",
                        components: "buttons",
                        currency: "USD",
                        "disable-funding": "credit,card,p24"
                    }}
                    >
                    <ButtonWrapper
                        currency={currency}
                        showSpinner={false}
                    />
                    </PayPalScriptProvider>
                    </div>
                ) : (
                    <button className={styles.checkoutButton} onClick={() => setOpen(true)}>CHECKOUT NOW</button>
                )}
                
		
            </div>
        </div>
        {cash && (
            <OrderDetaild total={cartFromRedux.total} createOrder={createOrder} />
        )}
    </div>
  )
}
export default cart