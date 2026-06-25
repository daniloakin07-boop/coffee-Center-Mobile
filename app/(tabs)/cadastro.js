// app/(tabs)/cadastro.js
// Tela de Cadastro — equivalente ao cadastro.html do projeto web.
// Implementa: useState, TextInput com value/onChangeText,
// validação de senha, confirmação e conexão com a API (Aulas 8-9 e 16).

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

export default function Cadastro() {
  // ============================================================
  // ESTADOS — capturam cada campo do formulário (Aula 16)
  // ============================================================
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const router = useRouter();

  // ============================================================
  // FUNÇÃO DE VALIDAÇÃO DO CADASTRO (Aula 16)
  // Realiza todas as verificações antes de enviar ao servidor
  // ============================================================
  async function validarCadastro() {
    // Limpa mensagem anterior
    setMensagem('');

    // Validação 1: campos obrigatórios
    if (!nome || !email || !senha || !confirmarSenha) {
      setMensagem(' Preencha todos os campos.');
      return;
    }

    // Validação 2: formato do e-mail
    if (!email.includes('@')) {
      setMensagem(' Informe um e-mail válido.');
      return;
    }

    // Validação 3: tamanho mínimo da senha
    if (senha.length < 6) {
      setMensagem(' A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    // Validação 4: senhas coincidem
    if (senha !== confirmarSenha) {
      setMensagem(' As senhas não coincidem.');
      return;
    }

    setCarregando(true);

    try {
      // Envio da requisição POST para o endpoint /cadastro
      const resposta = await fetch(`${API_URL}/cadastro`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (resposta.ok) {
        setMensagem(' Cadastro realizado! Redirecionando...');
        // Navega para o login após cadastro bem-sucedido
        setTimeout(() => {
          router.replace('/login');
        }, 1500);
      } else {
        const dados = await resposta.json();
        setMensagem(` ${dados.erro || 'Erro ao realizar cadastro.'}`);
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

      {/* ÁREA CENTRALIZADA DE CADASTRO */}
      <View style={styles.paginaAuth}>
        <View style={styles.blocoAuth}>

          {/* TÍTULO */}
          <Text style={styles.titulo}>Cadastro</Text>
          <Text style={styles.textoAuth}>
            Crie sua conta para acessar o cardápio completo
          </Text>

          {/* FORMULÁRIO */}
          <View style={styles.formAuth}>

            {/* CAMPO NOME */}
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              placeholderTextColor="#a89070"
              value={nome}
              onChangeText={setNome}
            />

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
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#a89070"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={true}
            />

            {/* CAMPO CONFIRMAR SENHA */}
            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Repita a senha"
              placeholderTextColor="#a89070"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
              secureTextEntry={true}
            />

            {/* BOTÃO CADASTRAR — aciona validarCadastro com onPress */}
            <TouchableOpacity
              style={[styles.btnPrimario, carregando && styles.btnDesabilitado]}
              onPress={validarCadastro}
              disabled={carregando}
            >
              <Text style={styles.btnPrimarioTexto}>
                {carregando ? 'Cadastrando...' : 'Cadastrar'}
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

          {/* LINK PARA LOGIN */}
          <View style={styles.linkAuth}>
            <Text style={styles.linkAuthTexto}>Já possui uma conta? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text style={styles.linkAuthLink}>Fazer Login</Text>
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
    paddingVertical: 30,
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

  // LINK PARA LOGIN
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
