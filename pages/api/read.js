// pages/api/read.js

import productsData from '../../data/products.json';

export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json(productsData);
  } else {
    res.status(405).json({ message: 'Método não permitido' });
  }
}
