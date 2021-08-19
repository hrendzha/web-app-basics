const express = require('express');
const exhbs = require('express-handlebars');
const products = require('./products.json');

const PORT = process.env.PORT || 4444;

const app = express();

app.use(express.static('public'));
app.set('view engine', 'hbs');
app.engine(
    'hbs',
    exhbs({
        extname: 'hbs',
    }),
);

app.get('/', (req, res) => {
    res.render('home', {
        pageTitle: 'Home',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        pageTitle: 'About',
    });
});

app.get('/products', (req, res) => {
    res.render('products', {
        products,
        cssFileName: 'products',
        pageTitle: 'Products',
    });
});

app.get('/product/:productId', (req, res) => {
    const product = products.find(product => product.id === req.params.productId);

    res.render('product', {
        product,
        pageTitle: `${product.name}`,
    });
});

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});
