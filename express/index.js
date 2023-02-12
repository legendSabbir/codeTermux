const express = require('express');
const app = express();
const products = require('./data');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  const page = req.query.page || 1;
  const perPage = 20;
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const data = [...products.values()].sort((a, b) => {
    const first = +a.price?.replace(/[,.]/g, "")
    const last = +b.price?.replace(/[,.]/g, "")
    
    return last - first
  }).slice(startIndex, endIndex);
  res.render('index', { data });
});

app.get('/product/:productName', (req, res) => {
  const productName = req.params.productName;
  const product = products.get(productName);
  if (!product) {
    console.log(`Product ${productName} not found.`);
    res.send("Product not found");
  } else {
    res.render('product', { product });
  }
});

app.get("/:a", (req, res) => {
  res.send(req.params.a)
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started on http://localhost:3000');
});