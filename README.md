# Coffee Center Mobile

Aplicativo mobile do **Coffee Center** — Café de Especialidade.  
Desenvolvido com **React Native** e **Expo**, como projeto prático da UC8 – Desenvolvimento de Aplicações Mobile.

---

## Sobre o Projeto

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

##  Estrutura do Projeto

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

## Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Expo Go](https://expo.dev/go) no seu celular **ou** um emulador Android/iOS
]]