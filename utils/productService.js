// const fs = require('fs');
// const path = require('path');

// const dataFilePath = path.join(__dirname, 'products.json');

// // Função para ler o arquivo JSON de produtos
// const readProductsFromFile = () => {
//   try {
//     const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
//     console.log('oi');
//     return JSON.parse(jsonData);
//   } catch (error) {
//     console.error('Erro ao ler o arquivo de produtos:', error);
//     return [];
//   }
// };

// // Função para escrever no arquivo JSON de produtos
// const writeProductsToFile = (products) => {
//   try {
//     fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
//   } catch (error) {
//     console.error('Erro ao escrever no arquivo de produtos:', error);
//   }
// };

// // Função para criar um novo produto
// exports.createProduct = (product) => {
//   const products = readProductsFromFile();
//   products.push(product);
//   writeProductsToFile(products);
// };

// // Função para ler todos os produtos
// exports.readProducts = () => {
//   return readProductsFromFile();
// };

// // Função para atualizar um produto existente
// exports.updateProduct = (id, updatedProduct) => {
//   const products = readProductsFromFile();
//   const index = products.findIndex((product) => product.id === id);
//   if (index !== -1) {
//     products[index] = { ...products[index], ...updatedProduct };
//     writeProductsToFile(products);
//   }
// };

// // Função para excluir um produto
// exports.deleteProduct = (id) => {
//   const products = readProductsFromFile();
//   const filteredProducts = products.filter((product) => product.id !== id);
//   writeProductsToFile(filteredProducts);
// };
