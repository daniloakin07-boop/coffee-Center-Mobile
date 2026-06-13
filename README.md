# ☕ Coffee Center Mobile

Aplicativo mobile do **Coffee Center** — Café de Especialidade.  
Desenvolvido com **React Native** e **Expo**, como projeto prático da UC8 – Desenvolvimento de Aplicações Mobile.

---

## 📱 Sobre o Projeto

Este app é a versão mobile do site Coffee Center, adaptado para smartphones com React Native e Expo Router. O projeto aplica todos os conceitos trabalhados nas aulas da UC8:

- Componentes React Native (View, Text, Image, TouchableOpacity, ScrollView)
- Estilização com StyleSheet e Flexbox
- Navegação entre telas com Expo Router
- Listas dinâmicas com FlatList
- Passagem de parâmetros entre telas (useLocalSearchParams)
- Formulários com TextInput e useState
- Validação de dados e mensagens de feedback
- Integração com API REST (Node.js + Express)

---

## 🗂️ Estrutura do Projeto

```
coffee-center-mobile/
├── app/
│   ├── _layout.js              # Layout raiz (Stack + StatusBar)
│   └── (tabs)/
│       ├── _layout.js          # Layout do grupo de telas
│       ├── index.js            # Tela Inicial (Home)
│       ├── cardapio.js         # Cardápio com FlatList e busca
│       ├── detalhes.js         # Detalhes do item (useLocalSearchParams)
│       ├── sobre.js            # Sobre o Coffee Center
│       ├── contato.js          # Formulário de contato
│       ├── login.js            # Login com autenticação
│       └── cadastro.js         # Cadastro de novo usuário
├── components/
│   ├── Topo.js                 # Cabeçalho reutilizável (logo + menu)
│   └── Rodape.js               # Rodapé reutilizável
├── config.js                   # ⚠️ URL do servidor (altere o IP aqui)
├── package.json
├── app.json
└── babel.config.js
```

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|---|---|---|
| React Native | 0.76 | Framework mobile |
| Expo | ~52.0.0 | Plataforma de desenvolvimento |
| Expo Router | ~4.0.0 | Navegação entre telas |
| JavaScript | ES2022 | Linguagem de programação |

---

## ✅ Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Expo Go](https://expo.dev/go) no seu celular **ou** um emulador Android/iOS

---

## 🚀 Como Rodar o Projeto

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure o IP do servidor

Abra o arquivo `config.js` e substitua o IP pelo IP da sua máquina na rede:

```js
// Windows: execute "ipconfig" no CMD
// Mac/Linux: execute "ifconfig" no terminal
export const API_URL = 'http://SEU_IP_AQUI:3000';

// Emulador Android: use "http://10.0.2.2:3000"
```

### 3. Inicie o servidor backend

Na pasta do projeto **web** (coffee-center), execute:

```bash
node server.js
```

### 4. Inicie o app mobile

```bash
npm start
```

Escaneie o QR Code com o **Expo Go** no celular, ou pressione:
- `a` para abrir no emulador Android
- `i` para abrir no simulador iOS
- `w` para abrir no navegador

---

## 📲 Telas do Aplicativo

| Tela | Arquivo | Descrição |
|---|---|---|
| Início | `index.js` | Hero com botões e cards de destaque |
| Cardápio | `cardapio.js` | Lista com FlatList + filtro de busca |
| Detalhes | `detalhes.js` | Informações completas do item |
| Sobre | `sobre.js` | História, missão e valores |
| Contato | `contato.js` | Formulário com validação |
| Login | `login.js` | Autenticação de usuário |
| Cadastro | `cadastro.js` | Criação de nova conta |

---

## 🔗 Endpoints do Backend (server.js)

| Método | Rota | Descrição |
|---|---|---|
| POST | `/cadastro` | Cria novo usuário |
| POST | `/login` | Autentica e inicia sessão |
| GET | `/me` | Verifica sessão ativa |
| POST | `/logout` | Encerra a sessão |
| POST | `/mensagem` | Recebe mensagem de contato |

---

## 🎨 Paleta de Cores

| Nome | Hex | Uso |
|---|---|---|
| Fundo | `#1a0f08` | Background principal |
| Card / Header | `#2e1a0e` | Cards, topo e rodapé |
| Destaque | `#c8922a` | Botões, títulos e acentos |
| Texto claro | `#f0e6d0` | Texto principal |
| Texto suave | `#a89070` | Placeholders e textos secundários |

---

## 👨‍💻 Desenvolvedor

Projeto desenvolvido como atividade avaliativa da  
**UC8 – Desenvolvimento de Aplicações Mobile**  
Senac DF — 2026
