const con = require('../config/db');

const cadastrar = async ({ usuarioId, local, tipoResiduo, nivelRisco, status }) => {
    const [resultado] = await con.query(
        "INSERT INTO ocorrencia (usuarioId, local, tipoResiduo, nivelRisco, status) VALUES (?, ?, ?, ?, ?);",
        [usuarioId, local, tipoResiduo, nivelRisco || 'Medio', status || 'Novo']
    );
    return { id: resultado.insertId, usuarioId, local, tipoResiduo, nivelRisco, status };
};

const listar = async () => {
    const [resultado] = await con.query(
        `SELECT o.id, o.usuarioId, u.nome AS nomeUsuario, o.local, o.tipoResiduo, o.nivelRisco, o.data, o.status 
         FROM ocorrencia o 
         INNER JOIN usuario u ON o.usuarioId = u.id;`
    );
    return resultado;
};

const alterar = async (dados, id) => {
    const [resultado] = await con.query(
        "UPDATE ocorrencia SET ? WHERE id = ?",
        [dados, id]
    );
    return resultado;
};

const excluir = async (id) => {
    const [resultado] = await con.query(
        "DELETE FROM ocorrencia WHERE id = ?",
        [id]
    );
    return resultado;
};

module.exports = { cadastrar, listar, alterar, excluir };
