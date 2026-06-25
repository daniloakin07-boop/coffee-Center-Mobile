// app/(tabs)/cardapio.js
// Tela do Cardápio — equivalente ao cardapio.html do projeto web.
// Usa FlatList para renderizar os itens dinamicamente (Aulas 10-11).
// Inclui imagens reais com require(), campo de busca com filtro e verificação de login.

import { View, Text, FlatList, TextInput, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router';
import Topo from '../../components/Topo';
import Rodape from '../../components/Rodape';
import { isLoggedIn } from '../../auth';

// ============================================================
// DADOS DO CARDÁPIO
// Array de objetos com todas as informações de cada item.
// As imagens usam require() 

// ============================================================
const cardapioData = [
  {
    id: '1',
    titulo: 'Café Expresso',
    img: require('../../assets/images/inekehuizing-coffee-3727673_1920.jpg'),
    descricao: 'Café forte e aromático preparado na hora',
    descricaoCompleta:
      'O Café Expresso é preparado com grãos selecionados, extraídos sob alta pressão para garantir uma bebida intensa, encorpada e aromática. Perfeito para quem aprecia o café em sua forma mais pura e genuína.',
    preco: 6.50,
    ingredientes: 'Grãos de café arábica selecionados, água filtrada',
    origem: 'Brasil - Minas Gerais',
    tempoPreparo: '2 minutos',
    categoria: 'Cafés Quentes',
    nivel: 'Intensidade alta',
  },
  {
    id: '2',
    titulo: 'Cappuccino',
    img: require('../../assets/images/grafmex-coffee-3120757_1920.jpg'),
    descricao: 'Mistura cremosa de café, leite e chocolate',
    descricaoCompleta:
      'O Cappuccino é uma harmoniosa combinação de espresso, leite vaporizado e espuma de leite cremosa, finalizado com um toque de chocolate em pó. Uma experiência equilibrada e reconfortante.',
    preco: 9.90,
    ingredientes: 'Café espresso, leite integral, espuma de leite, chocolate em pó',
    origem: 'Brasil - São Paulo',
    tempoPreparo: '4 minutos',
    categoria: 'Cafés Especiais',
    nivel: 'Intensidade média',
  },
  {
    id: '3',
    titulo: 'Latte',
    img: require('../../assets/images/villacafe-latte.jpg'),
    descricao: 'Café suave com bastante leite vaporizado',
    descricaoCompleta:
      'O Latte é uma bebida suave que combina uma dose de espresso com uma generosa quantidade de leite vaporizado. Cremoso, equilibrado e delicado — a opção perfeita para quem prefere o café mais suave.',
    preco: 10.50,
    ingredientes: 'Café espresso, leite integral vaporizado, espuma de leite leve',
    origem: 'Etiópia - Sidama',
    tempoPreparo: '4 minutos',
    categoria: 'Cafés Especiais',
    nivel: 'Intensidade baixa',
  },
  {
    id: '4',
    titulo: 'Mocha',
    img: require('../../assets/images/juno1412-coffee-5981681_1920.jpg'),
    descricao: 'Combinação deliciosa de café e chocolate',
    descricaoCompleta:
      'O Mocha é uma fusão de café espresso com chocolate amargo de primeira qualidade, coberto por uma generosa camada de espuma de leite. Uma experiência indulgente para amantes de café e chocolate.',
    preco: 11.90,
    ingredientes: 'Café espresso, chocolate amargo premium, leite vaporizado, espuma de leite',
    origem: 'Colômbia - Huila',
    tempoPreparo: '5 minutos',
    categoria: 'Cafés Especiais',
    nivel: 'Intensidade média-alta',
  },
  {
    id: '5',
    titulo: 'Pão de Queijo',
    img: require('../../assets/images/craveiro6-pao-de-queijo-4968507_1920.jpg'),
    descricao: 'Tradicional pão de queijo quentinho',
    descricaoCompleta:
      'Nosso Pão de Queijo é feito com polvilho azedo, queijo meia-cura e ingredientes frescos selecionados. Servido quentinho, com casca levemente crocante e interior macio e puxento.',
    preco: 5.50,
    ingredientes: 'Polvilho azedo, queijo meia-cura, ovos, leite, óleo, sal',
    origem: 'Receita Mineira Tradicional',
    tempoPreparo: '15 minutos',
    categoria: 'Salgados',
    nivel: 'Clássico brasileiro',
  },
  {
    id: '6',
    titulo: 'Croissant',
    img: require('../../assets/images/photowill-bread-4077812_1920.jpg'),
    descricao: 'Massa folhada leve e crocante',
    descricaoCompleta:
      'Nosso Croissant é preparado artesanalmente com manteiga francesa de alta qualidade. Massa folhada com camadas delicadas, exterior dourado e crocante, interior macio e amanteigado.',
    preco: 8.00,
    ingredientes: 'Farinha de trigo, manteiga francesa, açúcar, sal, fermento, leite',
    origem: 'Receita Francesa Clássica',
    tempoPreparo: '20 minutos',
    categoria: 'Salgados e Pães',
    nivel: 'Clássico francês',
  },
  {
    id: '7',
    titulo: 'Cheesecake',
    img: require('../../assets/images/teddybear78-dessert-2366485_1920.jpg'),
    descricao: 'Sobremesa cremosa com calda de frutas vermelhas',
    descricaoCompleta:
      'Nossa Cheesecake é preparada com cream cheese de alta qualidade, base de biscoito amanteigado e finalizada com uma generosa calda de frutas vermelhas frescas. Cremosa, equilibrada e irresistível.',
    preco: 12.90,
    ingredientes: 'Cream cheese, açúcar, ovos, biscoito, manteiga, frutas vermelhas, gelatina',
    origem: 'Receita New York Style',
    tempoPreparo: 'Disponível no momento',
    categoria: 'Sobremesas',
    nivel: 'Clássico americano',
  },
];

// ============================================================
// COMPONENTE PRINCIPAL
// ============================================================
export default function Cardapio() {
  // Estado da busca — armazena o texto digitado pelo usuário
  const [busca, setBusca] = useState('');

  const router = useRouter();

  // Verificação de login ao abrir a tela
  // Equivalente ao bloco <script> no cardapio.html
  useEffect(() => {
    verificarLogin();
  }, []);

  function verificarLogin() {
    if (!isLoggedIn()) {
      Alert.alert(
        'Acesso Restrito',
        'Você precisa fazer login para acessar o cardápio!',
        [{ text: 'Fazer Login', onPress: () => router.replace('/login') }]
      );
      router.replace('/login');
    }
  }

  // Filtro de busca — atualiza conforme o usuário digita (Aula 10)
  const cardapioFiltrado = cardapioData.filter((item) =>
    item.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  // Função que renderiza cada card do cardápio na FlatList
  function renderItem({ item }) {
    return (
      <View style={styles.item}>

        {/* IMAGEM DO ITEM */}
        <Image source={item.img} style={styles.itemImagem} />

        {/* INFORMAÇÕES DO ITEM */}
        <Text style={styles.itemTitulo}>{item.titulo}</Text>
        <Text style={styles.itemDescricao}>{item.descricao}</Text>
        <Text style={styles.itemPreco}>R$ {item.preco.toFixed(2)}</Text>

        {/* BOTÃO VER DETALHES — passa parâmetros para a tela detalhes.js */}
        <Link
          href={{
            pathname: '/detalhes',
            params: {
              titulo: item.titulo,
              descricao: item.descricaoCompleta,
              preco: item.preco.toFixed(2),
              ingredientes: item.ingredientes,
              origem: item.origem,
              tempoPreparo: item.tempoPreparo,
              categoria: item.categoria,
              nivel: item.nivel,
            },
          }}
          asChild
        >
          <TouchableOpacity style={styles.btnVerDetalhes}>
            <Text style={styles.btnVerDetalhesTexto}>Ver detalhes</Text>
          </TouchableOpacity>
        </Link>

      </View>
    );
  }

  // ============================================================
  // RENDERIZAÇÃO COM FLATLIST
  // ============================================================
  return (
    <FlatList
      style={styles.tela}
      data={cardapioFiltrado}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}

      ListHeaderComponent={
        <View>
          <Topo />
          <View style={styles.cabecalho}>
            <Text style={styles.titulo}>Nosso Cardápio</Text>

            {/* CAMPO DE BUSCA */}
            <TextInput
              style={styles.busca}
              placeholder="Buscar no cardápio..."
              placeholderTextColor="#a89070"
              value={busca}
              onChangeText={setBusca}
            />
          </View>
        </View>
      }

      ListEmptyComponent={
        <Text style={styles.vazio}>Nenhum item encontrado para "{busca}".</Text>
      }

      ListFooterComponent={<Rodape />}
      contentContainerStyle={{ backgroundColor: '#1a0f08' }}
    />
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: '#1a0f08',
  },
  cabecalho: {
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    color: '#c8922a',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  // CAMPO DE BUSCA
  busca: {
    backgroundColor: '#2e1a0e',
    color: '#f0e6d0',
    borderWidth: 1,
    borderColor: '#c8922a',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    fontSize: 15,
    width: '100%',
    marginBottom: 10,
  },

  // CARD DE ITEM
  item: {
    backgroundColor: '#2e1a0e',
    marginHorizontal: 20,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    overflow: 'hidden',
  },

  // IMAGEM
  itemImagem: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },

  // TEXTOS DO CARD
  itemTitulo: {
    color: '#c8922a',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginHorizontal: 16,
    textAlign: 'center',
  },
  itemDescricao: {
    color: '#f0e6d0',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    marginTop: 6,
    marginHorizontal: 16,
  },
  itemPreco: {
    color: '#c8922a',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },

  // BOTÃO VER DETALHES
  btnVerDetalhes: {
    backgroundColor: '#c8922a',
    margin: 16,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  btnVerDetalhesTexto: {
    color: '#1a0f08',
    fontWeight: 'bold',
    fontSize: 14,
  },

  // LISTA VAZIA
  vazio: {
    color: '#a89070',
    textAlign: 'center',
    marginTop: 30,
    fontSize: 15,
    padding: 20,
  },
});
