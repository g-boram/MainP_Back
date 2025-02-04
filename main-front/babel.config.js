module.exports = {
  presets: [
    "@babel/preset-env",
    "@babel/preset-react", // React 프로젝트라면
    "@emotion/babel-preset-css-prop", // Emotion 프리셋 추가
  ],
  plugins: ["@emotion/babel-plugin"],
};
