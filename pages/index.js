import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import Add from '../components/Add'
import AddButton from '../components/AddButton'
import { Featured } from '../components/Featured'
import { PizzaList } from '../components/PizzaList'
import styles from '../styles/Home.module.css'

export default function Home({products, isAdmin}) {

  const [close, setClose] = useState(true);

  return (
    <div className={styles.container}>
      <Head>
        <title>Food Restaurant</title>
        <meta name="description" content="Best Restaurant in Town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Featured />
      {isAdmin && <AddButton setClose={setClose} />}
      <PizzaList products={products} />
      {!close && <Add setClose={setClose} />}

    </div>
  )
}

export const getServerSideProps = async (context) => {
  const myCookie = context.req?.cookies || "";
  let isAdmin = false;
  
  if(myCookie.token === process.env.TOKEN){
    isAdmin = true;
  }

  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      products: res.data,
      isAdmin: isAdmin
    }
  }
  
}