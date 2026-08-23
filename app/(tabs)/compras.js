// app/(tabs)/compras.js
// Tela do Carrinho — equivalente ao carrinho.html do projeto web.
// Reaproveita a mesma rota POST /pedido do backend (nenhuma mudança no server.js foi necessária).

import { View, Text, FlatList, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import Topo from '../../components/Topo';
import Rodape from '../../components/Rodape';
import { API_URL } from '../../config';
import { sombra } from '../../sombra';
import { cardapioData } from './cardapio';
import {
  pegarCarrinho,
  aumentarQuantidade,
  diminuirQuantidade,
  removerCarrinho,
  calcularTotal,
  limparCarrinho,
} from '../../carrinho';

export default function Compras() {
  const [itens, setItens] = useState([]);
  const [total, setTotal] = useState(0);
  const [numeroPedido, setNumeroPedido] = useState(null);
  const router = useRouter();

  // Recarrega o carrinho toda vez que a tela ganha foco
  // (ex: usuário adicionou um item no cardápio e voltou pra cá)
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  async function carregar() {
    const carrinho = await pegarCarrinho();
    setItens(carrinho);
    setTotal(await calcularTotal());
  }

  // Busca a imagem do produto no cardápio pelo id (não guardamos a imagem no
  // AsyncStorage — só id, nome, preço e quantidade — porque require() não é
  // serializável em JSON de forma confiável)
  function imagemDoItem(id) {
    const produto = cardapioData.find((p) => p.id === id);
    return produto ? produto.img : null;
  }

  async function handleAumentar(id) {
    await aumentarQuantidade(id);
    carregar();
  }

  async function handleDiminuir(id) {
    await diminuirQuantidade(id);
    carregar();
  }

  async function handleRemover(id) {
    await removerCarrinho(id);
    carregar();
  }

  function handleLimpar() {
    Alert.alert('Limpar Carrinho', 'Deseja limpar o carrinho?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Limpar',
        style: 'destructive',
        onPress: async () => {
          await limparCarrinho();
          setNumeroPedido(null);
          carregar();
        },
      },
    ]);
  }

  async function handleFinalizar() {
    if (itens.length === 0) {
      Alert.alert('Carrinho vazio', 'Adicione itens antes de finalizar.');
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/pedido`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ itens }),
      });

      if (resposta.status === 401) {
        Alert.alert('Faça login', 'Você precisa estar logado para finalizar o pedido.', [
          { text: 'OK', onPress: () => router.replace('/login') },
        ]);
        return;
      }

      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        Alert.alert('Erro', dados.erro || 'Erro ao finalizar o pedido.');
        return;
      }

      await limparCarrinho();
      setNumeroPedido(dados.numeroPedido);
      carregar();
    } catch {
      Alert.alert(
        'Sem conexão',
        'Não foi possível conectar ao servidor. Verifique sua internet e tente novamente.'
      );
    }
  }

  function renderItem({ item }) {
    const imagem = imagemDoItem(item.id);

    return (
      <View style={styles.produto}>
        {imagem && <Image source={imagem} style={styles.produtoImagem} />}

        <View style={{ flex: 1 }}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.preco}>R$ {item.preco.toFixed(2)}</Text>

          <View style={styles.quantidadeLinha}>
            <TouchableOpacity style={styles.qtdBtn} onPress={() => handleDiminuir(item.id)}>
              <Text style={styles.qtdBtnTexto}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtdValor}>{item.quantidade}</Text>
            <TouchableOpacity style={styles.qtdBtn} onPress={() => handleAumentar(item.id)}>
              <Text style={styles.qtdBtnTexto}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.rodapeItem}>
            <Text style={styles.subtotal}>
              R$ {(item.preco * item.quantidade).toFixed(2)}
            </Text>
            <TouchableOpacity onPress={() => handleRemover(item.id)}>
              <Text style={styles.removerTexto}>Remover</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.tela}
      data={itens}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: '#1a0f08' }}
      ListHeaderComponent={
        <View>
          <Topo />
          <Text style={styles.titulo}>Seu Carrinho</Text>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.vazioBox}>
          <Text style={styles.vazio}>Seu carrinho está vazio.</Text>
          <TouchableOpacity style={styles.btnContinuarVazio} onPress={() => router.push('/cardapio')}>
            <Text style={styles.btnContinuarVazioTexto}>Ver Cardápio</Text>
          </TouchableOpacity>
        </View>
      }
      ListFooterComponent={
        <View style={styles.resumo}>
          {itens.length > 0 && (
            <View style={styles.resumoCaixa}>
              <View style={styles.resumoLinha}>
                <Text style={styles.resumoLabel}>Total</Text>
                <Text style={styles.resumoValor}>R$ {total.toFixed(2)}</Text>
              </View>

              <TouchableOpacity style={styles.btnFinalizar} onPress={handleFinalizar}>
                <Text style={styles.btnFinalizarTexto}>Finalizar Pedido</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnContinuar} onPress={() => router.push('/cardapio')}>
                <Text style={styles.btnContinuarTexto}>Continuar Comprando</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnLimpar} onPress={handleLimpar}>
                <Text style={styles.btnLimparTexto}>Limpar Carrinho</Text>
              </TouchableOpacity>
            </View>
          )}

          {numeroPedido !== null && (
            <View style={styles.confirmacao}>
              <Text style={styles.confirmacaoTitulo}>Pedido Confirmado!</Text>
              <Text style={styles.confirmacaoNumero}>{numeroPedido}</Text>
              <Text style={styles.confirmacaoTexto}>
                Por gentileza, ao final da refeição, passe no caixa informando esse número para
                efetuar o pagamento.
              </Text>
              <TouchableOpacity style={styles.btnContinuar} onPress={() => router.push('/cardapio')}>
                <Text style={styles.btnContinuarTexto}>Voltar ao Cardápio</Text>
              </TouchableOpacity>
            </View>
          )}

          <Rodape />
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#1a0f08' },
  titulo: {
    color: '#c8922a',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },

  // CARRINHO VAZIO
  vazioBox: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  vazio: {
    color: '#a89070',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 20,
  },
  btnContinuarVazio: {
    backgroundColor: '#c8922a',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  btnContinuarVazioTexto: {
    color: '#1a0f08',
    fontWeight: 'bold',
    fontSize: 15,
  },

  // CARD DO PRODUTO
  produto: {
    flexDirection: 'row',
    backgroundColor: '#2e1a0e',
    marginHorizontal: 20,
    marginBottom: 14,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    ...sombra({ elevation: 2, offsetY: 1, opacity: 0.25, radius: 3 }),
  },
  produtoImagem: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 14,
    resizeMode: 'cover',
  },
  nome: { color: '#f0e6d0', fontSize: 16, fontWeight: 'bold' },
  preco: { color: '#d8c6a8', fontSize: 13, marginTop: 2 },
  quantidadeLinha: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 10 },
  qtdBtn: {
    width: 26,
    height: 26,
    borderWidth: 1,
    borderColor: '#c8922a',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtdBtnTexto: { color: '#c8922a', fontWeight: 'bold', fontSize: 15 },
  qtdValor: { color: '#f0e6d0', fontSize: 14, minWidth: 18, textAlign: 'center' },
  rodapeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  subtotal: { color: '#c8922a', fontWeight: 'bold', fontSize: 14 },
  removerTexto: { color: '#e06a6a', fontSize: 12, fontWeight: 'bold' },

  // RESUMO
  resumo: { paddingHorizontal: 20, marginTop: 6 },
  resumoCaixa: {
    backgroundColor: '#2e1a0e',
    borderRadius: 10,
    padding: 18,
    marginBottom: 20,
    ...sombra({ elevation: 2, offsetY: 1, opacity: 0.25, radius: 3 }),
  },
  resumoLinha: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#4a2f1c',
    paddingBottom: 14,
    marginBottom: 14,
  },
  resumoLabel: { color: '#f0e6d0', fontSize: 18, fontWeight: 'bold' },
  resumoValor: { color: '#c8922a', fontSize: 18, fontWeight: 'bold' },
  btnFinalizar: {
    backgroundColor: '#c8922a',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnFinalizarTexto: { color: '#1a0f08', fontWeight: 'bold', fontSize: 16 },
  btnContinuar: {
    borderWidth: 2,
    borderColor: '#c8922a',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnContinuarTexto: { color: '#c8922a', fontWeight: 'bold', fontSize: 14 },
  btnLimpar: {
    borderWidth: 2,
    borderColor: '#a33636',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnLimparTexto: { color: '#a33636', fontWeight: 'bold', fontSize: 14 },

  // CONFIRMAÇÃO DO PEDIDO
  confirmacao: {
    backgroundColor: '#2e1a0e',
    borderWidth: 2,
    borderColor: '#c8922a',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  confirmacaoTitulo: { color: '#c8922a', fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  confirmacaoNumero: { color: '#c8922a', fontSize: 40, fontWeight: 'bold', marginVertical: 6 },
  confirmacaoTexto: {
    color: '#d8c6a8',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
});