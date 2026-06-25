// app/(tabs)/index.js
// Tela Inicial — equivalente ao index.html do projeto web.
// Contém: seção hero com botões e cards de destaque.
//react-native e tudo que esta dentro do return é o que vai ser renderizado na tela do app, o resto é apenas estilização
//stylee sheet é o que contem todos os estilos que a gente usa é literalmente uma lista


import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Topo from '../../components/Topo';
import Rodape from '../../components/Rodape';

export default function Inicio() {
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
          <Link href="/cardapio" asChild>
            <TouchableOpacity style={styles.btnPrimario}>
              <Text style={styles.btnPrimarioTexto}>Ver Cardápio</Text>
            </TouchableOpacity>
          </Link>

          <Link href="/sobre" asChild>
            <TouchableOpacity style={styles.btnSecundario}>
              <Text style={styles.btnSecundarioTexto}>Saiba Mais</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      {/* CARDS DE DESTAQUE */}
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
    elevation: 3,        // sombra no Android
    shadowColor: '#000', // sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
