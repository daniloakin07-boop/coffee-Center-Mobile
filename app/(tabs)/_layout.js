// app/(tabs)/_layout.js
// Layout do grupo de telas principais.
// Usa Stack sem cabeçalho padrão — a navegação é feita pelo
// componente Topo (menu personalizado) presente em cada tela.

import { Stack } from 'expo-router';

export default function TabsLayout() {
  // O grupo recebe suas rotas por meio dos arquivos existentes nesta pasta.
  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
