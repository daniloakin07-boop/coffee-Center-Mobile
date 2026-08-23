// app/(tabs)/index.js
// Tela Inicial — equivalente ao index.html do projeto web.
// Contém: seção hero com botões e cards de destaque.
// O JSX dentro do return define o que aparece na tela; a StyleSheet abaixo
// reúne os estilos usados por cada parte visual do componente.


import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Topo from '../../components/Topo';
import Rodape from '../../components/Rodape';
import { sombra } from '../../sombra';

// Tela inicial do app com destaque para o cardápio e informações rápidas.
export default function Inicio() {
  // O router é usado pelos botões para trocar de tela sem recarregar o app.
  const router = useRouter();
  return (
    <ScrollView style={styles.tela} showsVerticalScrollIndicator={false}>

      {/* CABEÇALHO */}
      <Topo />

      {/* SEÇÃO HERO */}
      <View style={styles.hero}>
        <Text style={styles.heroTitulo}>
          O melhor café direto pra sua xícara 
        </Text>
        <Text style={styles.heroTexto}>
          Grãos selecionados, torras artesanais e blends exclusivos para quem leva o café a sério.
        </Text>

        {/* BOTÕES DE AÇÃO */}
        <View style={styles.botoes}>
        {/* Botão para ir para o cardápio */}
          <TouchableOpacity style={styles.btnPrimario} onPress={() => router.push('/cardapio')}>
            <Text style={styles.btnPrimarioTexto}>Ver Cardápio</Text>
          </TouchableOpacity>

        {/* Botão para a página sobre a empresa */}
          <TouchableOpacity style={styles.btnSecundario} onPress={() => router.push('/sobre')}>
            <Text style={styles.btnSecundarioTexto}>Saiba Mais</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* CARDS DE DESTAQUE */}
      {/* Conteúdo institucional resumido para apresentar a proposta da cafeteria. */}
      <View style={styles.cards}>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}> Grãos Especiais</Text>
          <Text style={styles.cardTexto}>
            Cafés single origin de fazendas certificadas no Brasil, Etiópia e Colômbia.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}> Torra Artesanal</Text>
          <Text style={styles.cardTexto}>
            Cada lote torrado com cuidado para revelar o melhor aroma e sabor do grão.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitulo}> Assinatura Mensal</Text>
          <Text style={styles.cardTexto}>
            Receba em casa os melhores blends da temporada com curadoria dos nossos baristas.
          </Text>
        </View>

      </View>

      {/* RODAPÉ */}
      <Rodape />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // TELA PRINCIPAL
  tela: {
    flex: 1,
    backgroundColor: '#1a0f08',
  },

  // HERO
  hero: {
    backgroundColor: '#2e1a0e',
    padding: 40,
    alignItems: 'center',
  },
  heroTitulo: {
    color: '#c8922a',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 34,
  },
  heroTexto: {
    color: '#f0e6d0',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 28,
  },

  // BOTÕES
  botoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  btnPrimario: {
    backgroundColor: '#c8922a',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  btnPrimarioTexto: {
    color: '#1a0f08',
    fontWeight: 'bold',
    fontSize: 15,
  },
  btnSecundario: {
    backgroundColor: '#1a0f08',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#c8922a',
  },
  btnSecundarioTexto: {
    color: '#c8922a',
    fontWeight: 'bold',
    fontSize: 15,
  },

  // CARDS DE DESTAQUE
  cards: {
    padding: 20,
    gap: 15,
  },
  card: {
    backgroundColor: '#2e1a0e',
    padding: 20,
    borderRadius: 8,
    ...sombra(),
  },
  cardTitulo: {
    color: '#c8922a',
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardTexto: {
    color: '#f0e6d0',
    fontSize: 14,
    lineHeight: 22,
  },
});