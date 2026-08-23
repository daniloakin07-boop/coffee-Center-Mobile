// Rodapé global usado em todas as telas
// Mostra informações de direitos autorais e link rápido para contato.
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Rodape() {
  const router = useRouter();

  return (
    <View style={styles.rodape}>
      <Text style={styles.texto}>® 2026 Coffee Center. Todos os Direitos Reservados</Text>

      <TouchableOpacity onPress={() => router.push('/contato')}>
        <Text style={styles.link}>Entre em Contato</Text>
      </TouchableOpacity>
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