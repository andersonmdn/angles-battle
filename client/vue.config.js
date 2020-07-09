module.exports = {
  devServer: {
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept"
    }
  },
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    // eslint-disable-next-line no-unused-vars
    config.plugin("VuetifyLoaderPlugin").tap(args => [
      {
        // eslint-disable-next-line no-unused-vars
        match(originalTag, { kebabTag, camelTag, path, component }) {
          if (kebabTag.startsWith("core-")) {
            return [
              camelTag,
              `import ${camelTag} from '@/components/core/${camelTag.substring(
                4
              )}.vue'`
            ];
          }
        }
      }
    ]);
  }
};
