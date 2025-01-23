const express = require('express');
const app = express();
const routes = require('./routes/routes');

app.use(express.json());  // Para poder procesar JSON en los cuerpos de las peticiones

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API en funcionamiento en el puerto ${PORT}`);
});
