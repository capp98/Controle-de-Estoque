// pages/products/[id].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from '../../styles/ProductDetail.module.css';

const ProductDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product/${id}`);
        const data = await response.json();
        setProduct(data);
        setEditedProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleEditButtonClick = () => {
    setIsEditable(true);
  };

  const handleDelete = async () => {
    try {
      console.log('estou deletando essa budega ' + id);

      const response = await fetch(`/api/products`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Falha ao excluir o produto');
      }
      router.push('/'); // Redirecionar para a página de listagem de produtos
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
    console.log('Saving edited product:', editedProduct);

    // After saving, you can update the product state or redirect to a different page
    setProduct(editedProduct);
    setIsEditable(false);

    try {
      const response = await fetch(`/api/product/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProduct),
      });

      if (response.ok) {
        // Atualização bem-sucedida
        console.log('Produto atualizado com sucesso');
        // Faça qualquer ação adicional que você deseja realizar após a atualização
      } else {
        // Trate erros de atualização
        console.log('Erro ao atualizar o produto');
      }
    } catch (error) {
      console.log('Erro na solicitação', error);
    }
  };

  if (!product) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Detalhes do Produto</h2>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={product.imageURL}
          alt="Imagem do Produto"
        />
      </div>
      <p className={styles.field}></p>
      <p className={styles.field}>
        <span className={styles.label}>URL da imagem:</span>{' '}
        <input
          type="text"
          className={`${styles.inputField} ${
            isEditable ? styles.editable : ''
          }`}
          name="imageURL"
          value={editedProduct.imageURL}
          onChange={handleInputChange}
          readOnly={!isEditable}
        />
      </p>
      <p className={styles.field}>
        <span className={styles.label}>Tipo de Serviço:</span>{' '}
        <input
          type="text"
          className={`${styles.inputField} ${
            isEditable ? styles.editable : ''
          }`}
          name="name"
          value={editedProduct.serviceType}
          onChange={handleInputChange}
          readOnly={!isEditable}
        />
      </p>
      <p className={styles.field}>
        <span className={styles.label}>Nome:</span>{' '}
        <input
          type="text"
          className={`${styles.inputField} ${
            isEditable ? styles.editable : ''
          }`}
          name="name"
          value={editedProduct.name}
          onChange={handleInputChange}
          readOnly={!isEditable}
        />
      </p>
      <p className={styles.field}>
        <span className={styles.label}>Marca:</span>{' '}
        <input
          type="text"
          className={`${styles.inputField} ${
            isEditable ? styles.editable : ''
          }`}
          name="brand"
          value={editedProduct.brand}
          onChange={handleInputChange}
          readOnly={!isEditable}
        />
      </p>
      <p className={styles.field}>
        <span className={styles.label}>Preço:</span>{' '}
        <input
          type="text"
          className={`${styles.inputField} ${
            isEditable ? styles.editable : ''
          }`}
          name="price"
          value={editedProduct.price}
          onChange={handleInputChange}
          readOnly={!isEditable}
        />
      </p>
      <p className={styles.field}>
        <span className={styles.label}>Preço no Cartão:</span>{' '}
        <input
          type="text"
          className={`${styles.inputField} ${
            isEditable ? styles.editable : ''
          }`}
          name="cardPrice"
          value={editedProduct.cardPrice}
          onChange={handleInputChange}
          readOnly={!isEditable}
        />
      </p>
      <div className={styles.descriptionField}>
        <span className={styles.label}>Descrição:</span>{' '}
        <textarea
          className={`${styles.inputField} ${styles.textArea} ${
            isEditable ? styles.editable : ''
          }`}
          name="description"
          value={editedProduct.description}
          onChange={handleInputChange}
          readOnly={!isEditable}
        />
      </div>
      <div className={styles.buttonContainer}>
        {isEditable ? (
          <button className={styles.saveButton} onClick={handleSave}>
            Save
          </button>
        ) : (
          <button className={styles.editButton} onClick={handleEditButtonClick}>
            Edit
          </button>
        )}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={handleDelete}>Excluir</button>
      </div>
      <Link href="/" className={styles.buttonContainer}>
        <button>Voltar</button>
      </Link>
    </div>
  );
};

export default ProductDetail;
