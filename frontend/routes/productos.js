const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_URL = 'http://localhost:3000/api/productos';

// GET - Listar productos
router.get('/', async (req, res) => {
    try {
        const response = await axios.get(API_URL);
        res.render('productos/lista', { productos: response.data });
    } catch (error) {
        console.error('Error al consultar productos:', error);
        res.render('error', { error: 'Error al consultar productos' });
    }
});

// GET - Mostrar formulario para crear un producto
router.get('/nuevo', (req, res) => {
    res.render('productos/nuevo');
});

// POST - Crear nuevo producto
router.post('/nuevo', 
    [
        body('nombreProducto').notEmpty().withMessage('El nombre es obligatorio'),
        body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
        body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
        body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo')
    ],
    async (req, res) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.render('productos/nuevo', { errores: errores.array() });
        }

        try {
            await axios.post(API_URL, req.body);
            req.flash('success_msg', 'Producto creado exitosamente');
            res.redirect('/productos');
        } catch (error) {
            console.error('Error al crear producto:', error);
            res.render('error', { error: 'Error al crear producto' });
        }
});

// POST - Actualizar producto con validación
router.post('/editar/:id', 
    [
        body('nombreProducto').notEmpty().withMessage('El nombre es obligatorio'),
        body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
        body('precio').isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo'),
        body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número entero positivo')
    ],
    async (req, res) => {
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.render('productos/editar', { 
                errores: errores.array(),
                producto: { _id: req.params.id, ...req.body }
            });
        }

        try {
            await axios.put(`${API_URL}/${req.params.id}`, req.body);
            req.flash('success_msg', 'Producto actualizado correctamente');
            res.redirect('/productos');
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            res.render('error', { error: 'Error al actualizar producto' });
        }
});

// POST - Eliminar producto
router.post('/eliminar/:id', async (req, res) => {
    try {
        await axios.delete(`${API_URL}/${req.params.id}`);
        req.flash('success_msg', 'Producto eliminado correctamente');
        res.redirect('/productos');
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.render('error', { error: 'Error al eliminar producto' });
    }
});

module.exports = router;

