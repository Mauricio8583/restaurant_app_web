import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { Featured } from '../components/Featured'
import { PizzaList } from '../components/PizzaList'
import styles from '../styles/Home.module.css'

export default function Home({products}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Food Restaurant</title>
        <meta name="description" content="Best Restaurant in Town" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Featured />
      <PizzaList products={products} />

    </div>
  )
}

export const getServerSideProps = async () => {
 
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      products: res.data
    }
  }
  
}