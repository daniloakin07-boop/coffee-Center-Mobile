// app/_layout.js
// Layout raiz do aplicativo — configura o Stack navigator principal
// e a barra de status com o tema do Coffee Center

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      {/* Barra de status com estilo claro (ícones brancos) */}
      <StatusBar style="light" backgroundColor="#1a0f08" />

      {/* Stack navigator sem cabeçalho padrão — cada tela terá seu próprio topo */}
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
