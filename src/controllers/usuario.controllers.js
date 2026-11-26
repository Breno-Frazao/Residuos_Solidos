const usuarioModel = require('../models/usuario.model');

const cadastrar = async (req, res) => {
    try {
        const usuario = await usuarioModel.cadastrar(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const listar = async (req, res) => {
    try {
        const resposta = await usuarioModel.listar();
        res.status(200).json(resposta).end();
    } catch (error) {
        res.status(500).json({ error: error.message }).end();
    }
};

const alterar = async (req, res) => {
    try {
        const resposta = await usuarioModel.alterar(req.body, req.params.id);
        if (resposta.affectedRows == 1) {
            res.status(200).json({ message: "Usuário atualizado com sucesso" }).end();
        } else {
            res.status(404).json({ error: "Usuário não encontrado" }).end();
        }
    } catch (error) {
        res.status(500).json({ error: error.message }).end();
    }
};

const excluir = async (req, res) => {
    try {
        const resposta = await usuarioModel.excluir(req.params.id);
        if (resposta.affectedRows == 1) {
            res.status(200).json({ message: "Usuário excluído com sucesso" }).end();
        } else {
            res.status(404).json({ error: "Usuário não encontrado" }).end();
        }
    } catch (error) {
        res.status(500).json({ error: "Não é possível excluir usuário com ocorrências vinculadas" }).end();
    }
};

const login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const resposta = await usuarioModel.login(email, senha);
        if (resposta.length > 0) {
            res.status(200).json({ message: "Login realizado", usuario: resposta[0] });
        } else {
            res.status(401).json({ error: "E-mail ou senha inválidos" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { cadastrar, listar, alterar, excluir, login };
