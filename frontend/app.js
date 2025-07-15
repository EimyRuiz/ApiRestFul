const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar sesiones y flash antes de las rutas
app.use(session({
    secret: 'educan_secret',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

// Variables globales para las vistas
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

const productosRouter = require('./routes/productos');
app.use('/productos', productosRouter);

app.get('/', (req, res) => {
    res.redirect('/productos');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Frontend corriendo en http://localhost:${PORT}`);
});
