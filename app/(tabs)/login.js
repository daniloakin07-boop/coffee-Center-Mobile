// app/(tabs)/login.js
// Tela de Login — equivalente ao login.html do projeto web.
// Implementa: useState, TextInput com value/onChangeText,
// validação com onPress e conexão com a API (Aulas 8-9 e 16).

import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import Topo from '../../components/Topo';
import Rodape from '../../components/Rodape';
import { API_URL } from '../../config';
import { login as loginUser } from '../../auth';

export default function Login() {
  // ============================================================
  // ESTADOS — armazenam os valores dos campos e o feedback (Aula 16)
  // ============================================================
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const router = useRouter();

  // ============================================================
  // FUNÇÃO DE VALIDAÇÃO DO LOGIN (Aula 16)
  // Verifica os campos antes de enviar a requisição ao servidor
  // ============================================================
  async function validarLogin() {
    // Limpa mensagem anterior
    setMensagem('');

    // Validação 1: campos obrigatórios
    if (!email || !senha) {
      setMensagem(' Preencha todos os campos.');
      return;
    }

    // Validação 2: formato do e-mail
    if (!email.includes('@')) {
      setMensagem('Informe um e-mail válido.');
      return;
    }

    setCarregando(true);

    try {
      // Envio da requisição POST para o endpoint /login
      const resposta = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, senha }),
      });

      if (resposta.ok) {
        loginUser();
        setMensagem(' Login realizado com sucesso!');
        // Navega para o cardápio após login bem-sucedido
        setTimeout(() => {
          router.replace('/cardapio');
        }, 1000);
      } else {
        setMensagem(' E-mail ou senha incorretos.');
      }
    } catch {
      setMensagem(' Erro ao conectar com o servidor.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView style={styles.tela} showsVerticalScrollIndicator={false}>

      {/* CABEÇALHO */}
      <Topo />

      {/* ÁREA CENTRALIZADA DE LOGIN */}
      <View style={styles.paginaAuth}>
        <View style={styles.blocoAuth}>

          {/* TÍTULO */}
          <Text style={styles.titulo}>Login</Text>
          <Text style={styles.textoAuth}>
            Entre com seu e-mail e senha para acessar o cardápio
          </Text>

          {/* FORMULÁRIO */}
          <View style={styles.formAuth}>

            {/* CAMPO E-MAIL */}
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail"
              placeholderTextColor="#a89070"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            {/* CAMPO SENHA */}
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              placeholderTextColor="#a89070"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={true}   // Oculta os caracteres digitados
            />

            {/* BOTÃO ENTRAR — aciona validarLogin com onPress */}
            <TouchableOpacity
              style={[styles.btnPrimario, carregando && styles.btnDesabilitado]}
              onPress={validarLogin}
              disabled={carregando}
            >
              <Text style={styles.btnPrimarioTexto}>
                {carregando ? 'Entrando...' : 'Entrar'}
              </Text>
            </TouchableOpacity>

            {/* MENSAGEM DE FEEDBACK (erro ou sucesso) */}
            {mensagem !== '' && (
              <Text style={[
                styles.mensagemAuth,
                mensagem.startsWith('ok') ? styles.mensagemSucesso : styles.mensagemErro
              ]}>
                {mensagem}
              </Text>
            )}

          </View>

          {/* LINK PARA CADASTRO */}
          <View style={styles.linkAuth}>
            <Text style={styles.linkAuthTexto}>Ainda não possui uma conta? </Text>
            <Link href="/cadastro" asChild>
              <TouchableOpacity>
                <Text style={styles.linkAuthLink}>Fazer Cadastro</Text>
              </TouchableOpacity>
            </Link>
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

  // ÁREA DE AUTENTICAÇÃO
  paginaAuth: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 500,
  },
  blocoAuth: {
    backgroundColor: '#2e1a0e',
    borderRadius: 8,
    padding: 28,
    width: '100%',
    maxWidth: 400,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  // TÍTULO
  titulo: {
    color: '#c8922a',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  textoAuth: {
    color: '#a89070',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },

  // FORMULÁRIO
  formAuth: {
    gap: 6,
  },
  label: {
    color: '#f0e6d0',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#1a0f08',
    color: '#f0e6d0',
    borderWidth: 1,
    borderColor: '#c8922a',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    marginBottom: 14,
  },

  // BOTÃO
  btnPrimario: {
    backgroundColor: '#c8922a',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 6,
  },
  btnPrimarioTexto: {
    color: '#1a0f08',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnDesabilitado: {
    opacity: 0.6,
  },

  // MENSAGEM DE FEEDBACK
  mensagemAuth: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 12,
    padding: 8,
    borderRadius: 6,
  },
  mensagemErro: {
    color: '#ff6b6b',
    backgroundColor: '#3d1a1a',
  },
  mensagemSucesso: {
    color: '#6bffb8',
    backgroundColor: '#1a3d2b',
  },

  // LINK PARA CADASTRO
  linkAuth: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  linkAuthTexto: {
    color: '#a89070',
    fontSize: 13,
  },
  linkAuthLink: {
    color: '#c8922a',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
