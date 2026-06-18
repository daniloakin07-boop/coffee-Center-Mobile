// Carrega as variáveis de ambiente ANTES de qualquer outra coisa
require("dotenv").config();
const express = require("express"); // Framework principal
const cors = require("cors"); // Controle de origens
const session = require("express-session"); // Gerenciamento de sessões
const bcrypt = require("bcryptjs"); // Criptografia de senhas
const conexao = require("./db.js"); // Pool de conexões MySQL

// Cria a instância do servidor Express
const app = express();

// Lista de origens permitidas para acessar a API
    const listOrigins = [
        "http://localhost:8081", // Expo no computador
        "http://localhost:5501", // Live Server do VS Code
        "http://127.0.0.1:5501", // Variação do Live Server
        "https://rickjordan20.github.io" // Deploy no GitHub Pages
    ];
    app.use(cors({
        origin: listOrigins, // Só aceita requisições dessas origens
        credentials: true, // Permite envio de cookies de sessão
        methods: ["GET","POST","PUT","DELETE","OPTIONS"], // Métodos HTTP permitidos
        allowedHeaders: ["Content-Type","Authorization"] // Cabeçalhos aceitos
    }));

// Configurações da API
app.use(express.json()); // Habilita leitura de dados JSON no corpo das requisições
app.use(express.urlencoded({ extended: true }));


// Configuração do objeto sessão
const sessionConfig = {
    secret: process.env.SESSION_SECRET, // Chave secreta para assinar o COOKIE
    resave: false, // Não salva a sessão se não houve mudanças
    saveUninitialized: false, // Não cria sessão para usuários não logados
    name: 'coffeecenter.sid', // Nome personalizado para o cookie da sessão
    cookie : {
        httpOnly: true, // Impede acesso ao cookie via JavaScript (segurança)
        maxAge: 1000*60*60 // Tempo de vida: 1 hora em milisegundos
    }
};

// Ambiente Local X Produção
if(process.env.NODE_ENV==="production"){
    // Em produção (HTTPS): configurações mais rígidas
    app.set("trust proxy",1); // Confia no proxy do servidor (Render,Railway..)
    sessionConfig.cookie.sameSite="none"; // Permite cookie entre domínios diferentes
    sessionConfig.cookie.secure = true; // Cookie só trafega em HTTPS
} else {
    // Em desenvolvimento (HTTP local): configuração mais permissiva
    sessionConfig.cookie.sameSite="lax"; // Proteção moderada CSRF
    sessionConfig.cookie.secure = false; // Aceita HTTP (localhost não tem HTTPS)
};

app.use(session(sessionConfig)); // Aplica a configuração de sessão

// Primeira Rota (PRINCIPAL)
app.get("/",(req,res)=>{
    // O primeiro parametro é o caminho, o segundo é a função de callback
    // req - objeto com os dados da requisição (vem do servidor)
    // res - objeto para enviar a resposta (vai para o user/site/app)
    res.send("API Coffee Center Mobile funcionando"); 
});

// Rota de Cadastro
app.post("/cadastro", async (req,res) => {
    try{ 
        // 1 - Extrai os campos enviados no corpo da requisição (JSON)
        const{nome,email,senha} = req.body
        console.log(req.body);
        
        // 2 - Verifica se algum campo obrigatório está vazio
        if(!nome || !email || !senha){
            return res.status(400).json({erro: "Preencha todos os campos"})
        }

        // 3 - Consulta o banco: já existe usuário com esse e-mail
        const [rows]  = await conexao.execute(
            "SELECT id FROM tb_clientes WHERE email=?", [email]
        );

        if(rows.length>0){
            return res.status(409).json({erro:"E-mail já cadastrado"})
        };

        // 4 - Criptografa a senha (10 = fator de custo hash)
        const senhaHash = await bcrypt.hash(senha,10);

        // 5 - Insere um novo cliente no banco com senha criptografada

        const sql = `INSERT INTO tb_clientes
                    (nome,email,senha)
                    VALUES(?,?,?)`
        conexao.execute(sql,[nome,email,senhaHash])
        res.json({mensagem: "Cliente cadastrado com sucesso"}); 
        
    } catch(erro){
        console.log(erro);
        res.status(500).json({erro: "Erro ao cadastrar cliente!"})
    }
})

// Rota de Login
app.post("/login",async (req,res)=>{
    try{
        const {email,senha} = req.body || {};
        
        if(!email || !senha){
            return res.status(400).json({erro: "Preencha todos os campos"})
        }

        const sql = `SELECT * FROM tb_clientes
                    WHERE email=?`

        const [resultado] = await conexao.execute(sql,[email])

        
        if(resultado.length === 0){
            return res.status(401).json({mensagem: "Usuário ou senha inválidos!"})
        }

        const cliente = resultado[0]    
            // pega o primeiro e único resultado do SQL
        
        const senhaCorreta = await bcrypt.compare(senha,cliente.senha) 
            //compara a senha que o cliente informou com a senha criptografada do banco

        
        if(!senhaCorreta){
            // senha hash for diferente da senha digitada
            return res.status(401).json({erro: "Senha inválida"});
            // 401 - acesso não autorizado
        };
    
        res.json({mensagem: "Login realizado com sucesso!"});
    
    } catch(erro){
        console.log("Erro no Login: ",erro)
        res.status(500).json({erro: "Erro ao realizar login"})
    }
})

// Rota de Contato
app.post("/contato",async (req,res)=>{
    try{
        const {nome, email, mensagem} = req.body

        if(!nome || !email || !mensagem){
            return res.status(400).json({erro: "Preencha todos os campos"});
        }

        const sql = `INSERT INTO tb_mensagem(nome,email,mensagem)
                    VALUES(?,?,?)`
                    
        await conexao.execute(sql,[nome,email,mensagem])
        res.json({mensagem: "Mensagem enviada com sucesso!"});

    } catch(erro){
        res.status(500).json({erro:"Erro ao enviar mensagem"});
    }

})

// Iniciando o Servidor na porta 3000
app.listen(3000,()=>{
    console.log("Servidor rodando na porta 3000");
})