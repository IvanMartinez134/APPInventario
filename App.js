const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const personaRoutes = require('./routes/persona.routes');
const productoRoutes = require('./routes/producto.routes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api/personas', personaRoutes);
app.use('/api/productos', productoRoutes);

mongoose.connect('mongodb+srv://20233tn134:Diegoivan286@ivan-5b.og3l0.mongodb.net/inventario-db?retryWrites=true&w=majority&appName=Ivan-5B', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Conexion exitosa a la base de datos a MongoDB');
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`))
})
.catch((err) => console.log('Error al conectar en MongoDB', err));

//'mongodb+srv://20233tn134:Diegoivan286@ivan-5b.og3l0.mongodb.net/inventario-db?retryWrites=true&w=majority&appName=Ivan-5B', { useNewUrlParser: true, useUnifiedTopology: true }