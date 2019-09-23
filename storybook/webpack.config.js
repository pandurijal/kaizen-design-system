const extensions = [".ts", ".tsx"]

const excludeExternalModules = rule => ({
  exclude: /node_modules\/(?!(\@cultureamp|\@kaizen)).*/,
  ...rule,
})

const babelRule = {
  test: /\.(j|t)sx?$/,
  use: [
    {
      loader: require.resolve("babel-loader"),
      options: require("../package.json").babel,
    },
  ],
}

const imagesRule = {
  test: [/\.jpe?g$/, /\.png$/],
  loader: "file-loader",
  options: {
    name: "[name].[hash:8].[ext]",
  },
}

const preprocessorLoaders = [
  {
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      plugins: () => [
        require("postcss-flexbugs-fixes"),
        require("postcss-preset-env")({
          autoprefixer: { flexbox: "no-2009" },
          stage: 3,
        }),
      ],
    },
  },
  {
    loader: "sass-loader",
    options: {
      sourceMap: true,
    },
  },
]

const stylesRule = {
  test: /\.s?css$/,
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        importLoaders: preprocessorLoaders.length,
        sourceMap: true,
        modules: {
          localIdentName: "[folder]-[name]__[local]--[hash:base64:5]",
        },
      },
    },
    ...preprocessorLoaders,
  ],
}

const svgsRule = {
  test: /\.svg$/,
  use: [
    {
      loader: "svg-sprite-loader",
      options: {
        symbolId: "ca-icon-[name]",
      },
    },
  ],
}

const rules = [babelRule, stylesRule, imagesRule, svgsRule].map(
  excludeExternalModules
)

const removeSvgFromTest = rule => {
  if (rule.test.toString().includes("svg")) {
    const test = rule.test
      .toString()
      .replace("svg|", "")
      .replace(/\//g, "")
    return { ...rule, test: new RegExp(test) }
  } else {
    return rule
  }
}

module.exports = ({ config }) => {
  // Storybook's base config applies file-loader to svgs
  config.module.rules = config.module.rules.map(removeSvgFromTest)
  config.module.rules.push(...rules)
  config.resolve.extensions.push(...extensions)
  return config
}
