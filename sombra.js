// sombra.js
// Helper de sombra compatível com Web e nativo (iOS/Android).
//
// Uma sombra é um efeito visual que escurece suavemente a área abaixo ou ao
// redor de um componente. Ela cria a sensação de profundidade, fazendo cards
// e caixas parecerem separados do fundo da tela.
// No modo Web, o React Native Web tenta converter shadowColor/shadowOffset/
// shadowOpacity/shadowRadius automaticamente para CSS, e em algumas versões
// essa conversão quebra com "Failed to set an indexed property [0] on
// 'CSSStyleDeclaration'". Por isso, no Web usamos boxShadow diretamente,
// e no nativo usamos as propriedades de sombra normais.

import { Platform } from 'react-native';

export function sombra({ elevation = 3, offsetY = 2, opacity = 0.3, radius = 4, cor = '#000' } = {}) {
  // elevation controla a altura aparente no Android.
  // offsetY desloca a sombra para baixo; valores maiores deixam o efeito mais
  // evidente na parte inferior do componente.
  // opacity controla a transparência e radius controla o quanto ela fica suave.
  // cor define a cor da sombra nas plataformas nativas.

  // Platform.select escolhe o formato compatível com cada plataforma.
  return Platform.select({
    web: {
      // No navegador, boxShadow reúne deslocamento, desfoque e transparência
      // em uma única propriedade CSS.
      boxShadow: `0px ${offsetY}px ${radius}px rgba(0,0,0,${opacity})`,
    },
    default: {
      // No iOS e Android, React Native usa propriedades separadas para montar
      // o mesmo efeito visual.
      elevation,
      shadowColor: cor,
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
  });
}