// app/(tabs)/detalhes.js
// Tela de Detalhes — exibe informações completas do item selecionado.
// Equivalente à tela de detalhes do projeto TechEduca (Aula 11).
// Recebe os dados via parâmetros usando useLocalSearchParams.

import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import Topo from '../../components/Topo';
import Rodape from '../../components/Rodape';
import { API_URL } from '../../config';

export default function Detalhes() {
  // useLocalSearchParams captura os parâmetros enviados pela tela cardapio.js
  // Cada parâmetro corresponde a uma propriedade do item do cardápio
  const {
    titulo,
    descricao,
    preco,
    ingredientes,
    origem,
    tempoPreparo,
    categoria,
    nivel,
  } = useLocalSearchParams();

  // useRouter permite navegação programática (ex: voltar à tela anterior)
  const router = useRouter();

  // ============================================================
  // VERIFICAÇÃO DE LOGIN AO ABRIR A TELA
  // Equivalente ao padrão usado no cardapio.js
  // ============================================================
  useEffect(() => {
    verificarLogin();
  }, []);

  async function verificarLogin() {
    try {
      const resposta = await fetch(`${API_URL}/me`, {
        credentials: 'include',
      });
      if (!resposta.ok) {
        Alert.alert(
          'Acesso Restrito',
          'Você precisa fazer login para acessar os detalhes!',
          [{ text: 'Fazer Login', onPress: () => router.replace('/login') }]
        );
      }
    } catch {
      // Servidor offline — exibe detalhes sem autenticação
      console.log('Servidor offline — exibindo detalhes localmente.');
    }
  }

  return (
    <ScrollView style={styles.tela} showsVerticalScrollIndicator={false}>

      {/* CABEÇALHO */}
      <Topo />

      {/* CONTEÚDO PRINCIPAL */}
      <View style={styles.container}>

        {/* BOTÃO VOLTAR */}
        <TouchableOpacity style={styles.btnVoltar} onPress={() => router.back()}>
          <Text style={styles.btnVoltarTexto}>← Voltar ao Cardápio</Text>
        </TouchableOpacity>

        {/* EMOJI DECORATIVO */}
        <Text style={styles.emoji}></Text>

        {/* TÍTULO DO ITEM */}
        <Text style={styles.titulo}>{titulo}</Text>

        {/* PREÇO EM DESTAQUE */}
        <View style={styles.precoBox}>
          <Text style={styles.preco}>R$ {preco}</Text>
        </View>

        {/* DESCRIÇÃO COMPLETA */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}> Descrição</Text>
          <Text style={styles.secaoTexto}>{descricao}</Text>
        </View>

        {/* INGREDIENTES */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}> Ingredientes</Text>
          <Text style={styles.secaoTexto}>{ingredientes}</Text>
        </View>

        {/* INFORMAÇÕES ADICIONAIS */}
        <View style={styles.infoGrid}>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}> Origem</Text>
            <Text style={styles.infoValor}>{origem}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}> Preparo</Text>
            <Text style={styles.infoValor}>{tempoPreparo}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}> Categoria</Text>
            <Text style={styles.infoValor}>{categoria}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}> Nível</Text>
            <Text style={styles.infoValor}>{nivel}</Text>
          </View>

        </View>

        {/* BOTÃO VOLTAR (parte de baixo) */}
        <TouchableOpacity style={styles.btnVoltarBaixo} onPress={() => router.back()}>
          <Text style={styles.btnVoltarBaixoTexto}>← Voltar ao Cardápio</Text>
        </TouchableOpacity>

      </View>

      {/* RODAPÉ */}
      <Rodape />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#1a0f08',
  },
  container: {
    padding: 20,
    alignItems: 'center',
  },

  // BOTÃO VOLTAR (topo)
  btnVoltar: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  btnVoltarTexto: {
    color: '#c8922a',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // EMOJI
  emoji: {
    fontSize: 64,
    marginBottom: 12,
  },

  // TÍTULO
  titulo: {
    color: '#c8922a',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },

  // PREÇO
  precoBox: {
    backgroundColor: '#2e1a0e',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#c8922a',
  },
  preco: {
    color: '#c8922a',
    fontSize: 22,
    fontWeight: 'bold',
  },

  // SEÇÕES (descrição, ingredientes)
  secao: {
    backgroundColor: '#2e1a0e',
    borderRadius: 8,
    padding: 16,
    marginBottom: 14,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  secaoTitulo: {
    color: '#c8922a',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  secaoTexto: {
    color: '#f0e6d0',
    fontSize: 14,
    lineHeight: 22,
  },

  // GRID DE INFORMAÇÕES
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    width: '100%',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
  infoItem: {
    backgroundColor: '#2e1a0e',
    borderRadius: 8,
    padding: 14,
    width: '47%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  infoLabel: {
    color: '#c8922a',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  infoValor: {
    color: '#f0e6d0',
    fontSize: 13,
    lineHeight: 20,
  },

  // BOTÃO VOLTAR (rodapé)
  btnVoltarBaixo: {
    backgroundColor: '#c8922a',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  btnVoltarBaixoTexto: {
    color: '#1a0f08',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
