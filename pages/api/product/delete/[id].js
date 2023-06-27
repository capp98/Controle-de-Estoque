// pages/api/products/[id].js
import fs from 'fs';
import path from 'path';

const productsFilePath = path.join(process.cwd(), 'data', 'products.json');

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    // Ler o arquivo JSON
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData);

    // Verificar se o produto existe
    const index = products.findIndex((product) => product.id === Number(id));
    console.log(index);
    if (index === -1) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Remover o produto do array
    products.splice(index, 1);
    console.log(products[111]);

    // Salvar o array atualizado no arquivo JSON
    fs.writeFileSync(productsFilePath, JSON.stringify(products));

    return res.status(200).json({ message: 'Produto excluído com sucesso' });
  }
}
