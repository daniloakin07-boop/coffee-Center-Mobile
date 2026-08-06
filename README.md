# Café Central — Mobile 

Aplicativo mobile do sistema Café Central, desenvolvido em React Native com Expo Router como parte do projeto integrador da Unidade Curricular UC8 – Desenvolver Aplicações Mobile (Senac-DF). Consome a mesma API back-end da versão web.

> Para a versão web do projeto (backend + frontend), veja o [README-web.md](./README-web.md).

## Objetivo do Projeto

Oferecer, via aplicativo mobile, acesso às funcionalidades do sistema de gestão da cafeteria (cardápio, pedidos, usuários e demais funcionalidades do domínio), consumindo a API já existente do projeto Café Central.

## Tecnologias Utilizadas

- React Native 0.76
- Expo Router 4
- `FlatList` para listagens
- `useLocalSearchParams` para navegação com parâmetros de rota
- Assets estáticos de imagem
- Consumo da API Node.js/Express (Render) usada também pela versão web

## Integrantes da Equipe

- [Nome completo] – [função/responsabilidade]
- [Nome completo] – [função/responsabilidade]
- [Nome completo] – [função/responsabilidade]

> Preencher com os integrantes reais da equipe antes da entrega.

## Requisitos para Execução

- [Node.js](https://nodejs.org/) v18 ou superior
- npm (instalado junto com o Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- App **Expo Go** instalado no celular (Android/iOS) ou um emulador configurado
- Git

## Passo a Passo para Instalar e Executar

### 1. Clonar o repositório
```bash
git clone <URL_DO_REPOSITORIO>
cd cafe-central/mobile
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar a URL da API
Verifique o arquivo de configuração (ex.: `.env` ou arquivo de constantes) e aponte para a URL da API já publicada no Render, ou para o endereço local do backend (`http://localhost:3000`) caso esteja rodando a API na mesma máquina.

### 4. Iniciar o app
```bash
npx expo start
```
Escaneie o QR Code exibido no terminal com o app **Expo Go** (Android/iOS) ou pressione `a`/`i` no terminal para abrir em um emulador Android/iOS.

## Estrutura de Telas

O aplicativo possui 8 telas, navegadas via Expo Router, com listagens (`FlatList`) e navegação com parâmetros (`useLocalSearchParams`).

## Organização do Projeto (parte Mobile)

```
cafe-central/
├── backend/          # API consumida pelo app (ver README-web.md)
├── frontend/         # Versão web (ver README-web.md)
├── mobile/           # Aplicativo React Native + Expo Router
│   ├── app/          # Telas (Expo Router)
│   └── assets/        # Imagens estáticas
├── README-web.md
├── README-mobile.md
└── CHANGELOG.md
```

## Observações Técnicas

- Evite acentos em nomes de arquivos dentro do projeto mobile — já causaram erros no Metro Bundler em versões anteriores.

## Documentação Complementar

Consulte o `CHANGELOG.md` para o histórico de versões, correções e melhorias implementadas ao longo do projeto e da manutenção pós-entrega.