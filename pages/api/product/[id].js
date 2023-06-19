// pages/api/[productId].js

import fs from 'fs';
import productsData from '../../../data/products.json';
import path from 'path';

export default function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  const productIndex = productsData.findIndex((product) => product.id == id);

  switch (method) {
    case 'PUT':
      const productsJson = path.join(process.cwd(), 'data/products.json');

      const updatedProduct = req.body;

      if (productIndex !== -1) {
        productsData[productIndex] = updatedProduct;

        fs.writeFileSync(productsJson, JSON.stringify(productsData, null, 2));

        res
          .status(200)
          .json({ success: true, message: 'Product updated successfully' });
      } else {
        res.status(404).json({ success: false, message: 'Product not found' });
      }
      break;

    default:
      try {
        res.status(200).json(productsData[productIndex]);
      } catch (er) {
        res.status(404).json({ message: 'Product not found :' });
      }

      // res.status(405).json({ success: false, message: 'Method not allowed' });

      break;
  }
}
