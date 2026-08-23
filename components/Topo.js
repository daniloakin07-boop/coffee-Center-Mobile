// components/Topo.js
// Cabeçalho reutilizável com logo e menu de navegação.
// Equivalente ao <header class="topo"> do projeto web.

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { isLoggedIn } from '../auth';

export default function Topo() {
  // usePathname retorna a rota atual — usada para destacar o item ativo no menu
  const pathname = usePathname();
  const router = useRouter();

  return (
    <View style={styles.topo}>

      {/* LOGO */}
      <TouchableOpacity onPress={() => router.push('/')}>
        <Text style={styles.logo}>
          Coffee<Text style={styles.logoDestaque}>Center</Text>
        </Text>
      </TouchableOpacity>

      {/* MENU DE NAVEGAÇÃO */}
      <View style={styles.menu}>

        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={[styles.menuItem, pathname === '/' && styles.menuItemAtivo]}>
            Início
          </Text>
        </TouchableOpacity>

        {/* Se não estiver logado, direciona o usuário para a tela de login */}
        <TouchableOpacity onPress={() => router.push(isLoggedIn() ? '/cardapio' : '/login')}>
          <Text style={[styles.menuItem, pathname === '/cardapio' && styles.menuItemAtivo]}>
            Cardápio
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/sobre')}>
          <Text style={[styles.menuItem, pathname === '/sobre' && styles.menuItemAtivo]}>
            Sobre
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/contato')}>
          <Text style={[styles.menuItem, pathname === '/contato' && styles.menuItemAtivo]}>
            Contato
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={[styles.menuItem, pathname === '/login' && styles.menuItemAtivo]}>
            Login
          </Text>
        </TouchableOpacity>

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