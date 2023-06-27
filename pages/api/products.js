// pages/api/products.js

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import productsData from '../../data/products.json';

const filePath = join(process.cwd(), 'data', 'products.json');

const getProducts = () => {
  const fileData = readFileSync(filePath, 'utf8');
  return JSON.parse(fileData);
};

const saveProducts = (products) => {
  writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf8');
};

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      const products = getProducts();
      res.status(200).json(products);

      break;

    case 'POST':
      const { name, serviceType, brand, price, cardPrice, imageURL } = req.body;
      const newProduct = {
        id: Date.now().toString(),
        name,
        serviceType,
        brand,
        price,
        cardPrice,
        imageURL,
      };
      const updatedProducts = [...getProducts(), newProduct];
      saveProducts(updatedProducts);
      res.status(201).json(newProduct);
      break;
    case 'PUT':
      const productsJson = path.join(process.cwd(), 'data/products.json');

      const updatedProduct = req.body;

      if (updatedProduct.id !== -1) {
        productsData[updatedProduct.id] = updatedProduct;

        fs.writeFileSync(productsJson, JSON.stringify(productsData, null, 2));

        res
          .status(200)
          .json({ success: true, message: 'Product updated successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Product not found' });
      }

      break;

    case 'DELETE':
      // Lógica para excluir um produto
      console.log('estou no DELETE ');
      const { id } = req.query;

      // Carrega os dados do arquivo JSON
      const productsData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Encontre o índice do produto no array de produtos
      const productIndex = productsData.findIndex(
        (product) => product.id === id
      );

      // Verifique se o produto foi encontrado
      if (productIndex !== -1) {
        // Remova o produto do array de produtos
        productsData.splice(productIndex, 1);

        // Salve os dados atualizados de volta no arquivo JSON
        fs.writeFileSync(filePath, JSON.stringify(productsData, null, 2));

        res.status(200).json({ message: 'Produto excluído com sucesso.' });
      } else {
        res.status(404).json({ message: 'Produto não encontrado.' });
      }

      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);

      break;
  }
}
