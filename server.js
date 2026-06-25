require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const conexao = require("./db.js");

const app = express();

const listOrigins = [
    "http://localhost:8081",
    "http://localhost:5501",
    "http://127.0.0.1:5501",
    "https://rickjordan20.github.io"
];

app.use(cors({
    origin: listOrigins,
    credentials: true,
    methods: ["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'coffeecenter.sid',
    cookie: {
        httpOnly: true,
        maxAge: 1000*60*60
    }
};

if(process.env.NODE_ENV === "production"){
    app.set("trust proxy", 1);
    sessionConfig.cookie.sameSite = "none";
    sessionConfig.cookie.secure = true;
} else {
    sessionConfig.cookie.sameSite = "lax";
    sessionConfig.cookie.secure = false;
}

app.use(session(sessionConfig));

// Rota principal
app.get("/", (req, res) => {
    res.send("API Coffee Center Mobile funcionando");
});

// Rota de Cadastro
app.post("/cadastro", async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        console.log(req.body);

        if (!nome || !email || !senha) {
            return res.status(400).json({ erro: "Preencha todos os campos" });
        }

        const [rows] = await conexao.execute(
            "SELECT id FROM usuarios WHERE email=?", [email]
        );

        if (rows.length > 0) {
            return res.status(409).json({ erro: "E-mail já cadastrado" });
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const sql = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;
        await conexao.execute(sql, [nome, email, senhaHash]);

        res.json({ mensagem: "Cadastro realizado com sucesso!" });

    } catch (erro) {
        console.log(erro);
        res.status(500).json({ erro: "Erro ao cadastrar usuário!" });
    }
});

// Rota de Login
app.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body || {};

        if (!email || !senha) {
            return res.status(400).json({ erro: "Preencha todos os campos" });
        }

        const sql = `SELECT * FROM usuarios WHERE email=?`;
        const [resultado] = await conexao.execute(sql, [email]);

        if (resultado.length === 0) {
            return res.status(401).json({ erro: "Usuário ou senha inválidos!" });
        }

        const usuario = resultado[0];

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ erro: "Usuário ou senha inválidos!" });
        }

        res.json({ mensagem: "Login realizado com sucesso!" });

    } catch (erro) {
        console.log("Erro no Login: ", erro);
        res.status(500).json({ erro: "Erro ao realizar login" });
    }
});

// Rota de Mensagem (Fale Conosco)
app.post("/mensagem", async (req, res) => {
    try {
        const { nome, email, mensagem } = req.body;

        if (!nome || !email || !mensagem) {
            return res.status(400).json({ erro: "Preencha todos os campos" });
        }

        const sql = `INSERT INTO mensagens (nome, email, mensagem) VALUES (?, ?, ?)`;
        await conexao.execute(sql, [nome, email, mensagem]);

        res.json({ mensagem: "Mensagem enviada com sucesso!" });

    } catch (erro) {
        console.log(erro);
        res.status(500).json({ erro: "Erro ao enviar mensagem" });
    }
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});