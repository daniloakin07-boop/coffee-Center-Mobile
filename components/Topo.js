// components/Topo.js
// Cabeçalho reutilizável com logo e menu de navegação.
// Equivalente ao <header class="topo"> do projeto web.

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, usePathname } from 'expo-router';

export default function Topo() {
  // usePathname retorna a rota atual — usada para destacar o item ativo no menu
  const pathname = usePathname();

  return (
    <View style={styles.topo}>

      {/* LOGO */}
      <Link href="/" asChild>
        <TouchableOpacity>
          <Text style={styles.logo}>
            Coffee<Text style={styles.logoDestaque}>Center</Text>
          </Text>
        </TouchableOpacity>
      </Link>

      {/* MENU DE NAVEGAÇÃO */}
      <View style={styles.menu}>

        <Link href="/" asChild>
          <TouchableOpacity>
            <Text style={[styles.menuItem, pathname === '/' && styles.menuItemAtivo]}>
              Início
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/cardapio" asChild>
          <TouchableOpacity>
            <Text style={[styles.menuItem, pathname === '/cardapio' && styles.menuItemAtivo]}>
              Cardápio
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/sobre" asChild>
          <TouchableOpacity>
            <Text style={[styles.menuItem, pathname === '/sobre' && styles.menuItemAtivo]}>
              Sobre
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/contato" asChild>
          <TouchableOpacity>
            <Text style={[styles.menuItem, pathname === '/contato' && styles.menuItemAtivo]}>
              Contato
            </Text>
          </TouchableOpacity>
        </Link>

        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text style={[styles.menuItem, pathname === '/login' && styles.menuItemAtivo]}>
              Login
            </Text>
          </TouchableOpacity>
        </Link>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topo: {
    backgroundColor: '#2e1a0e',
    paddingTop: 45,       // espaço para a barra de status do celular
    paddingBottom: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  logo: {
    color: '#f0e6d0',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  logoDestaque: {
    color: '#c8922a',
  },
  menu: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  menuItem: {
    color: '#f0e6d0',
    fontWeight: 'bold',
    fontSize: 14,
  },
  menuItemAtivo: {
    color: '#c8922a',
  },
});
