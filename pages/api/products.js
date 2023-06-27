// pages/api/products.js

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

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
      const { name, brand, price } = req.body;
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

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
