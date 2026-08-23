// Carrega as credenciais do banco a partir das variáveis de ambiente.
require("dotenv").config();
const mysql = require("mysql2/promise");

// Pool mantém conexões reutilizáveis e evita abrir uma conexão nova a cada rota.
const conexao = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    // O provedor do banco exige conexão criptografada.
    // A validação do certificado é desativada porque o certificado não é
    // fornecido separadamente neste ambiente de hospedagem.
    ssl: {
        rejectUnauthorized: false
    }
});

// Exporta o pool para que o servidor possa executar consultas SQL.
module.exports = conexao;