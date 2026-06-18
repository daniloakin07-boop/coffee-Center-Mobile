
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function Rodape() {
  return (
    <View style={styles.rodape}>
      <Text style={styles.texto}>® 2026 Coffee Center. Todos os Direitos Reservados</Text>

      <Link href="/contato" asChild>
        <TouchableOpacity>
          <Text style={styles.link}>Entre em Contato</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  rodape: {
    backgroundColor: '#2e1a0e',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 6,
  },
  texto: {
    color: '#f0e6d0',
    fontSize: 12,
    textAlign: 'center',
  },
  link: {
    color: '#c8922a',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
