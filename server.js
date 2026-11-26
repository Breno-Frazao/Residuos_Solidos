const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const usuarioRoutes = require('./src/routers/usuario.routers');
const ocorrenciaRoutes = require('./src/routers/ocorrencia.routers');

app.use('/usuario', usuarioRoutes);
app.use('/ocorrencia', ocorrenciaRoutes);

app.listen(3000, () => {
    console.log('Servidor online na porta 3000');
});
