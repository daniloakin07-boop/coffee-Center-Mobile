// Configuração do Babel para o projeto Expo
// O Expo usa este arquivo para compilar o código JavaScript do app.
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
