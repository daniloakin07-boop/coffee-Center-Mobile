// app/(tabs)/contato.js
// Tela de Contato — equivalente ao contato.html do projeto web.
// Formulário com TextInput, useState, validação e envio via API (Aulas 12-13).

import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { useState } from 'react';
import Topo from '../../components/Topo';
import Rodape from '../../components/Rodape';
import { API_URL } from '../../config';

export default function Contato() {
  // ============================================================
  // ESTADOS — capturam os dados digitados nos campos (Aulas 12-13)
  // ============================================================
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  // ============================================================
  // FUNÇÃO DE VALIDAÇÃO E ENVIO
  // Verifica se os campos estão preenchidos antes de enviar
  // ============================================================
  async function validarFormulario() {
    // Validação: verifica se todos os campos estão preenchidos
    if (!nome || !email || !mensagem) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos.');
      return;
    }

    // Validação simples de e-mail
    if (!email.includes('@')) {
      Alert.alert('E-mail inválido', 'Por favor, informe um e-mail válido.');
      return;
    }

    setCarregando(true);

    try {
      // Envia os dados para o endpoint /mensagem no servidor
      const resposta = await fetch(`${API_URL}/mensagem`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, mensagem }),
      });

      if (resposta.ok) {
        Alert.alert(
          '✅ Mensagem enviada!',
          `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso. Entraremos em contato em breve.`
        );
        // Limpa os campos após envio bem-sucedido
        setNome('');
        setEmail('');
        setMensagem('');
      } else {
        Alert.alert('Erro', 'Não foi possível enviar a mensagem. Tente novamente.');
      }
    } catch {
      // Mesmo sem servidor, confirma o envio localmente para demonstração
      Alert.alert(
        '✅ Mensagem registrada!',
        `Obrigado, ${nome}! Sua mensagem foi registrada.`
      );
      setNome('');
      setEmail('');
      setMensagem('');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView style={styles.tela} showsVerticalScrollIndicator={false}>

      {/* CABEÇALHO */}
      <Topo />

      {/* CONTEÚDO */}
      <View style={styles.container}>
        <Text style={styles.titulo}>Fale Conosco</Text>
        <Text style={styles.subtitulo}>
          Envie sua mensagem e nossa equipe responderá em breve.
        </Text>

        {/* FORMULÁRIO */}
        <View style={styles.formulario}>

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

          {/* CAMPO MENSAGEM (multilinha) */}
          <Text style={styles.label}>Mensagem</Text>
          <TextInput
            style={[styles.input, styles.inputMensagem]}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#a89070"
            value={mensagem}
            onChangeText={setMensagem}
            multiline={true}
            numberOfLines={5}
            textAlignVertical="top"
          />

          {/* BOTÃO ENVIAR */}
          <TouchableOpacity
            style={[styles.btnEnviar, carregando && styles.btnDesabilitado]}
            onPress={validarFormulario}
            disabled={carregando}
          >
            <Text style={styles.btnEnviarTexto}>
              {carregando ? 'Enviando...' : 'Enviar Mensagem'}
            </Text>
          </TouchableOpacity>

        </View>

        {/* INFORMAÇÕES DE CONTATO */}
        <View style={styles.infoContato}>
          <Text style={styles.infoTitulo}>📍 Onde nos encontrar</Text>
          <Text style={styles.infoTexto}>Brasília - DF</Text>
          <Text style={styles.infoTitulo}>📧 E-mail</Text>
          <Text style={styles.infoTexto}>contato@coffeecenter.com.br</Text>
          <Text style={styles.infoTitulo}>📱 Horário</Text>
          <Text style={styles.infoTexto}>Segunda a Sábado: 7h às 22h</Text>
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
    marginBottom: 8,
    marginTop: 10,
  },
  subtitulo: {
    color: '#f0e6d0',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },

  // FORMULÁRIO
  formulario: {
    backgroundColor: '#2e1a0e',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  label: {
    color: '#f0e6d0',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 6,
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
    marginBottom: 16,
  },
  inputMensagem: {
    height: 120,
    paddingTop: 10,
  },

  // BOTÃO ENVIAR
  btnEnviar: {
    backgroundColor: '#c8922a',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  btnEnviarTexto: {
    color: '#1a0f08',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnDesabilitado: {
    opacity: 0.6,
  },

  // INFORMAÇÕES DE CONTATO
  infoContato: {
    backgroundColor: '#2e1a0e',
    borderRadius: 8,
    padding: 18,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  infoTitulo: {
    color: '#c8922a',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 2,
  },
  infoTexto: {
    color: '#f0e6d0',
    fontSize: 14,
  },
});
