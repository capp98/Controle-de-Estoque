import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/ProductAdd.module.css';

const ProductAdd = () => {
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    price: '',
    cardPrice: '',
    description: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      router.push('/');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Adicionar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Nome:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Marca:</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Preço:</label>
          <input
            type="text"
            name="price"
            value={product.price}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Preço no Cartão:</label>
          <input
            type="text"
            name="cardPrice"
            value={product.cardPrice}
            onChange={handleChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Descrição:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className={styles.textArea}
          ></textarea>
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.addButton}>
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductAdd;
