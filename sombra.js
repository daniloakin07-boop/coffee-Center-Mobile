// sombra.js
// Helper de sombra compatível com Web e nativo (iOS/Android).
// No modo Web, o React Native Web tenta converter shadowColor/shadowOffset/
// shadowOpacity/shadowRadius automaticamente para CSS, e em algumas versões
// essa conversão quebra com "Failed to set an indexed property [0] on
// 'CSSStyleDeclaration'". Por isso, no Web usamos boxShadow diretamente,
// e no nativo usamos as propriedades de sombra normais.

import { Platform } from 'react-native';

export function sombra({ elevation = 3, offsetY = 2, opacity = 0.3, radius = 4, cor = '#000' } = {}) {
  return Platform.select({
    web: {
      boxShadow: `0px ${offsetY}px ${radius}px rgba(0,0,0,${opacity})`,
    },
    default: {
      elevation,
      shadowColor: cor,
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
  });
}