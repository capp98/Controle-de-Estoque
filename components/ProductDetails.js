// // ProductDetails.js

// import React, { useEffect, useState } from 'react';

// const ProductDetails = ({ productId }) => {
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       const response = await fetch(`/api/${productId}`);
//       const productData = await response.json();
//       setProduct(productData);
//     };

//     fetchProductDetails();
//   }, [productId]);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Detalhes do Produto</h2>
//       <p>ID: {product.id}</p>
//       <p>Nome: {product.name}</p>
//       <p>Marca: {product.brand}</p>
//       <p>Preço: {product.price}</p>
//       <p>Preço no Cartão: {product.cardPrice}</p>
//       <p>Descrição: {product.description}</p>
//     </div>
//   );
// };

// export default ProductDetails;
