import axios from 'axios';
import React, { useState } from 'react'
import styles from '../styles/Add.module.css'

const Add = ({setClose}) => {

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [prices, setPrices] = useState([]);
  const [extras, setExtras] = useState(null);
  const [extraOptions, setExtraOptions] = useState([]);

  const handleExtraInput = (e) => {
    setExtras({...extras, [e.target.name]: e.target.value })
  }

  const handleExtra = (e) => {
    setExtraOptions((prev) => [...prev, extras]);
  }

  const changePrice = (e, index) => {
    const currentPrice = prices;
    currentPrice[index] = e.target.value;
    setPrices(currentPrice);
  }

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");
    try{
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/di5sjkuht/image/upload", data);
      const {url} = uploadRes.data;

      const newProduct = {
        title: title,
        img: url,
        desc: desc,
        prices: prices,
        extras: extraOptions
        
      }

      await axios.post("http://localhost:3000/api/products", newProduct);
      setClose(true);
    }catch(err){
      console.log(err);    
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>X</span>
        <h1>Add a new Food</h1>
        <div className={styles.addFood}>
          <label className={styles.chooseLabel}>Choose an Image</label>
          <input type="file" className={styles.imgInput} onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className={styles.addFood}>
          <label className={styles.chooseLabel}>Title</label>
          <input type="text" className={styles.addInput} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className={styles.addFood}>
          <label className={styles.chooseLabel}>Desc</label>
          <input type="text" className={styles.addInput} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div className={styles.addFood}>
          <label className={styles.chooseLabel}>Prices</label>
          <div className={styles.addPrices}>
          <input type="number" placeholder='small' className={`${styles.addInput} ${styles.inputSm}`} onChange={(e) => changePrice(e, 0)} />
          <input type="number" placeholder='medium' className={`${styles.addInput} ${styles.inputSm}`} onChange={(e) => changePrice(e, 1)} />
          <input type="number" placeholder='large' className={`${styles.addInput} ${styles.inputSm}`} onChange={(e) => changePrice(e, 2)} />
          </div>
        </div>
        <div className={styles.addFood}>
          <label className={styles.chooseLabel}>Extras</label>
          <div className={styles.extra}>
            <input type="text" placeholder='item' name='text' onChange={handleExtraInput} className={styles.addInput}  />
            <input type="number" placeholder='price' name='price' onChange={handleExtraInput} className={styles.addInput} />
            <button className={styles.extraButton} onClick={handleExtra}>Add</button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option) => (
              <span key={option.text} className={styles.extraItemSpan}>{option.text}</span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>Create</button>
      </div>
    </div>
  )
}

export default Add