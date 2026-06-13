// app/(tabs)/sobre.js
// Tela Sobre — equivalente ao sobre.html do projeto web.
// Apresenta a história, missão e valores do Coffee Center.
// Construída seguindo o mesmo padrão da tela inicial (Aula 16).

import { ScrollView, View, Text, StyleSheet } from 'react-native';
import Topo from '../../components/Topo';
import Rodape from '../../components/Rodape';

export default function Sobre() {
  return (
    <ScrollView style={styles.tela} showsVerticalScrollIndicator={false}>

      {/* CABEÇALHO */}
      <Topo />

      {/* CONTEÚDO */}
      <View style={styles.container}>

        {/* TÍTULO PRINCIPAL */}
        <Text style={styles.titulo}>Sobre o Coffee Center</Text>
        <Text style={styles.subtitulo}>
          O Coffee Center é uma cafeteria dedicada a oferecer cafés especiais focados em qualidade e experiência.
        </Text>

        {/* NOSSA HISTÓRIA */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>☕ Nossa História</Text>
          <Text style={styles.secaoTexto}>
            Fundada com a paixão pelo café especial, a Coffee Center nasceu do desejo de conectar pessoas através de uma xícara bem preparada. Buscamos unir tradição e inovação para proporcionar momentos únicos aos nossos clientes.
          </Text>
        </View>

        {/* NOSSA MISSÃO */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>🎯 Nossa Missão</Text>
          <Text style={styles.secaoTexto}>
            Transformar cada xícara em uma experiência única por meio do café especial, com atendimento humanizado e um ambiente acolhedor que faz você querer voltar sempre.
          </Text>
        </View>

        {/* NOSSA VISÃO */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>🔭 Nossa Visão</Text>
          <Text style={styles.secaoTexto}>
            Ser reconhecida como referência em qualidade, inovação e excelência no mercado de cafeterias, levando o melhor do café especial a cada cliente.
          </Text>
        </View>

        {/* NOSSOS VALORES */}
        <View style={styles.secao}>
          <Text style={styles.secaoTitulo}>💎 Nossos Valores</Text>

          <View style={styles.valorItem}>
            <Text style={styles.valorBullet}>•</Text>
            <Text style={styles.valorTexto}>
              <Text style={styles.valorNegrito}>Qualidade</Text> — em cada produto e serviço oferecido
            </Text>
          </View>

          <View style={styles.valorItem}>
            <Text style={styles.valorBullet}>•</Text>
            <Text style={styles.valorTexto}>
              <Text style={styles.valorNegrito}>Sustentabilidade</Text> — grãos de origem responsável
            </Text>
          </View>

          <View style={styles.valorItem}>
            <Text style={styles.valorBullet}>•</Text>
            <Text style={styles.valorTexto}>
              <Text style={styles.valorNegrito}>Transparência</Text> — honestidade com clientes e parceiros
            </Text>
          </View>

          <View style={styles.valorItem}>
            <Text style={styles.valorBullet}>•</Text>
            <Text style={styles.valorTexto}>
              <Text style={styles.valorNegrito}>Inovação</Text> — sempre buscando o melhor para você
            </Text>
          </View>

          <View style={styles.valorItem}>
            <Text style={styles.valorBullet}>•</Text>
            <Text style={styles.valorTexto}>
              <Text style={styles.valorNegrito}>Ética</Text> — respeito a todos os envolvidos
            </Text>
          </View>

        </View>

        {/* DIFERENCIAIS */}
        <View style={styles.diferenciais}>
          <Text style={styles.secaoTitulo}>⭐ Nossos Diferenciais</Text>
          <View style={styles.diferencialGrid}>

            <View style={styles.diferencialItem}>
              <Text style={styles.diferencialEmoji}>🌱</Text>
              <Text style={styles.diferencialTexto}>Grãos Selecionados</Text>
            </View>

            <View style={styles.diferencialItem}>
              <Text style={styles.diferencialEmoji}>👨‍🍳</Text>
              <Text style={styles.diferencialTexto}>Equipe Treinada</Text>
            </View>

            <View style={styles.diferencialItem}>
              <Text style={styles.diferencialEmoji}>🏠</Text>
              <Text style={styles.diferencialTexto}>Ambiente Confortável</Text>
            </View>

            <View style={styles.diferencialItem}>
              <Text style={styles.diferencialEmoji}>🤝</Text>
              <Text style={styles.diferencialTexto}>Atendimento Personalizado</Text>
            </View>

          </View>
        </View>

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
  },

  // TÍTULO
  titulo: {
    color: '#c8922a',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 10,
  },
  subtitulo: {
    color: '#f0e6d0',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },

  // SEÇÕES
  secao: {
    backgroundColor: '#2e1a0e',
    borderRadius: 8,
    padding: 18,
    marginBottom: 14,
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
    marginBottom: 10,
  },
  secaoTexto: {
    color: '#f0e6d0',
    fontSize: 14,
    lineHeight: 22,
  },

  // VALORES (lista com bullet)
  valorItem: {
    flexDirection: 'row',
    marginBottom: 8,
    gap: 8,
  },
  valorBullet: {
    color: '#c8922a',
    fontSize: 16,
    fontWeight: 'bold',
  },
  valorTexto: {
    color: '#f0e6d0',
    fontSize: 14,
    lineHeight: 22,
    flex: 1,
  },
  valorNegrito: {
    color: '#c8922a',
    fontWeight: 'bold',
  },

  // DIFERENCIAIS
  diferenciais: {
    backgroundColor: '#2e1a0e',
    borderRadius: 8,
    padding: 18,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  diferencialGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    marginTop: 6,
  },
  diferencialItem: {
    width: '45%',
    alignItems: 'center',
    backgroundColor: '#1a0f08',
    borderRadius: 8,
    padding: 14,
  },
  diferencialEmoji: {
    fontSize: 30,
    marginBottom: 6,
  },
  diferencialTexto: {
    color: '#f0e6d0',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
});
