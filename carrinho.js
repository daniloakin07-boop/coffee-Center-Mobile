// carrinho.js
// Módulo do carrinho de compras — equivalente ao Js/carrinho.js do projeto web.
// Usa AsyncStorage no lugar de localStorage (React Native não tem localStorage).
// Todas as funções são assíncronas — sempre use await ao chamá-las.

import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_CARRINHO = 'carrinhoCoffeeCenter';

export async function pegarCarrinho() {
  // AsyncStorage devolve texto; por isso o valor salvo precisa ser convertido
  // novamente para o array de produtos usado pelos componentes.
  const dados = await AsyncStorage.getItem(CHAVE_CARRINHO);
  return dados ? JSON.parse(dados) : [];
}

export async function salvarCarrinho(carrinho) {
  // JSON permite persistir o array mesmo quando o aplicativo é fechado.
  await AsyncStorage.setItem(CHAVE_CARRINHO, JSON.stringify(carrinho));
}

// produto: item do cardapioData (precisa ter id, titulo, preco)
export async function adicionarCarrinho(produto) {
  // Primeiro lê o estado atual para preservar itens adicionados anteriormente.
  const carrinho = await pegarCarrinho();
  const existe = carrinho.find((item) => item.id === produto.id);

  if (existe) {
    // O mesmo produto ocupa uma única linha e tem apenas a quantidade aumentada.
    existe.quantidade++;
  } else {
    // Somente os dados necessários ao pedido são persistidos, sem a imagem local.
    carrinho.push({
      id: produto.id,
      nome: produto.titulo,
      preco: produto.preco,
      quantidade: 1,
    });
  }

  await salvarCarrinho(carrinho);
  return produto.titulo;
}

export async function removerCarrinho(id) {
  // filter cria uma nova lista sem o produto selecionado.
  let carrinho = await pegarCarrinho();
  carrinho = carrinho.filter((item) => item.id !== id);
  await salvarCarrinho(carrinho);
}

export async function aumentarQuantidade(id) {
  // Localiza o produto e incrementa sua quantidade, se ele ainda existir.
  const carrinho = await pegarCarrinho();
  const item = carrinho.find((produto) => produto.id === id);

  if (item) {
    item.quantidade++;
    await salvarCarrinho(carrinho);
  }
}

export async function diminuirQuantidade(id) {
  // A redução também remove o item quando a quantidade chega a zero.
  let carrinho = await pegarCarrinho();
  const item = carrinho.find((produto) => produto.id === id);

  if (item) {
    item.quantidade--;

    if (item.quantidade <= 0) {
      carrinho = carrinho.filter((produto) => produto.id !== id);
    }

    await salvarCarrinho(carrinho);
  }
}

export async function calcularTotal() {
  // Soma preço unitário vezes quantidade de cada linha do carrinho.
  const carrinho = await pegarCarrinho();
  return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
}

export async function quantidadeItens() {
  // Retorna a soma das unidades, usada no contador exibido pelo Topo.
  const carrinho = await pegarCarrinho();
  return carrinho.reduce((total, item) => total + item.quantidade, 0);
}

export async function limparCarrinho() {
  // Remove a chave inteira para voltar ao estado inicial de carrinho vazio.
  await AsyncStorage.removeItem(CHAVE_CARRINHO);
}