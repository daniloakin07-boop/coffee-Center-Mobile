// components/Topo.js
// Cabeçalho reutilizável com logo e menu de navegação.
// Equivalente ao <header class="topo"> do projeto web.

import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter, usePathname, useFocusEffect } from 'expo-router';
import { useState, useCallback } from 'react';
import { isLoggedIn } from '../auth';
import { quantidadeItens } from '../carrinho';

export default function Topo() {
  // usePathname retorna a rota atual — usada para destacar o item ativo no menu
  const pathname = usePathname();
  const router = useRouter();
  const [qtdCarrinho, setQtdCarrinho] = useState(0);

  // Atualiza o contador toda vez que essa tela (ou qualquer tela que use o Topo) ganha foco
  useFocusEffect(
    useCallback(() => {
      quantidadeItens().then(setQtdCarrinho);
    }, [])
  );

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

        {/* ÍCONE DO CARRINHO */}
        <TouchableOpacity onPress={() => router.push('/compras')} style={styles.carrinhoWrap}>
          <Image
            source={require('../assets/images/image-1787454516539.png')}
            style={styles.carrinhoIcone}
          />
          {qtdCarrinho > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeTexto}>{qtdCarrinho}</Text>
            </View>
          )}
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
    alignItems: 'center',
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

  // ÍCONE DO CARRINHO
  carrinhoWrap: {
    position: 'relative',
  },
  carrinhoIcone: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -10,
    backgroundColor: '#c8922a',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeTexto: {
    color: '#1a0f08',
    fontSize: 11,
    fontWeight: 'bold',
  },
});