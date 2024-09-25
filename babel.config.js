// module.exports = {
//   presets: [
//     "@babel/preset-env",
//     "@babel/preset-react",
//     "@babel/preset-typescript",
//   ],
//   plugins: [
//     [
//       "babel-plugin-import",
//       {
//         libraryName: "@mui/material",
//         libraryDirectory: "",
//         camel2DashComponentName: false,
//       },
//       "core",
//     ],
//     [
//       "babel-plugin-import",
//       {
//         libraryName: "@mui/icons-material",
//         libraryDirectory: "",
//         camel2DashComponentName: false,
//       },
//       "icons",
//     ],
//     [
//       "@babel/plugin-transform-react-jsx",
//       {
//         runtime: "automatic",
//       },
//     ],
//   ],
// };

module.exports = {
  presets: [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      {
        runtime: "automatic", // Enables the new JSX transform
      },
    ],
    "@babel/preset-typescript",
  ],
};
