import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/ProductRead.module.css';
import Link from 'next/link';

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/read');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Erro ao buscar os produtos:', error);
      }
    }

    fetchProducts();
  }, []);

  // Função para filtrar os produtos com base no nome
  const filterProducts = (product) => {
    return product.name.toLowerCase().includes(filter.toLowerCase());
  };

  // Função para atualizar o estado do filtro
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Renderização dos produtos filtrados
  const filteredProducts = products.filter(filterProducts);

  const handleProductClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  return (
    <div>
      <input
        type="text"
        className={styles.inputField}
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filtrar por nome"
      />
      <Link href="/productAdd">Adicionar</Link>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>*</th>
            <th>Nome</th>
            <th>Marca</th>
            <th>Preço</th>
            <th>Preço no Cartão</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {/* {products.map((product) => (
            <tr className={product.name} key={product.id}>
              <td>
                <button onClick={() => handleProductClick(product.id)}>
                  Ver Detalhes
                </button>
              </td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.price}</td>
              <td>{product.cardPrice}</td>
              <td>{product.description}</td>
            </tr>
          ))} */}
          {/* Renderização dos produtos filtrados */}
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>
                <button onClick={() => handleProductClick(product.id)}>
                  Ver Detalhes
                </button>
              </td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.price}</td>
              <td>{product.cardPrice}</td>
              <td>{product.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// export async function GetStaticProps() {
//   try {
//     const response = await fetch(
//       'https://nextjsibj94r-bzrk--3000--77657b1e.local-credentialless.webcontainer.io/api/read'
//     );
//     const data = await response.json();
//     console.log(data);
//   } catch (er) {
//     console.log(er);
//   }
//   return { props: { prods: data } };
// }
