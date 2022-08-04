const util = require("util");
const postcss = require("postcss");
const { ruleList, defaultRules } = require("./src/features.js");
const config = require("./config");
const buildClass = require("./src/utils/build-class.js");

module.exports = (opts = {}) => {
  const options = Object.assign(config, opts);
  const directions = ["bottom", "left", "right", "top", "all", "x", "y"];
  const rules = defaultRules();
  return {
    postcssPlugin: "postcss-functional-css",
    Once(root) {
      root.walkComments((comment) => {
        // console.log("feature", options);
        if (ruleList.includes(comment.text)) {
          if (options.globalStyles) {
            if (comment.text === "margin" || comment.text === "padding") {
              directions.forEach((direction) => {
                buildClass({
                  node: comment.parent,
                  options,
                  featureName: comment.text,
                  direction,
                });
              });
            } else {
              buildClass({
                node: comment.parent,
                options,
                featureName: comment.text,
                values: rules[comment.text],
              });
            }
          }

          if (options.mediaQueries.length) {
            options.mediaQueries.forEach((media) => {
              const atRule = postcss.atRule({
                name: "media",
                params: media.params,
              });

              const prefix = media.prefix || "";
              const prefixSeparator = media.prefixSeparator || "";
              const classNamePrefix = prefix + prefixSeparator;

              if (comment.text === "margin" || comment.text === "padding") {
                directions.forEach((direction) => {
                  buildClass({
                    node: atRule,
                    options,
                    featureName: comment.text,
                    classNamePrefix,
                    direction,
                  });
                });
              } else {
                buildClass({
                  node: atRule,
                  options,
                  featureName: comment.text,
                  classNamePrefix,
                  values: rules[comment.text],
                });
              }
              comment.parent.append(atRule);
            });
          }
        }

        // build all
        if (comment.text === "postcss-functional-css") {
          if (options.globalStyles) {
            ruleList.forEach((feature) => {
              if (feature === "margin" || feature === "padding") {
                directions.forEach((direction) => {
                  buildClass({
                    node: comment.parent,
                    options,
                    featureName: feature,
                    direction,
                  });
                });
              } else {
                buildClass({
                  node: comment.parent,
                  options,
                  featureName: feature,
                  values: rules[feature],
                });
              }
            });
          }

          if (options.mediaQueries.length) {
            options.mediaQueries.forEach((media) => {
              const atRule = postcss.atRule({
                name: "media",
                params: media.params,
              });

              const prefix = media.prefix || "";
              const prefixSeparator = media.prefixSeparator || "";
              const classNamePrefix = prefix + prefixSeparator;
              ruleList.forEach((feature) => {
                if (feature === "margin" || feature === "padding") {
                  directions.forEach((direction) => {
                    buildClass({
                      node: atRule,
                      options,
                      featureName: feature,
                      classNamePrefix,
                      direction,
                    });
                  });
                } else {
                  buildClass({
                    node: atRule,
                    options,
                    featureName: feature,
                    classNamePrefix,
                    values: rules[feature],
                  });
                }
              });
              comment.parent.append(atRule);
            });
          }
        }
      });
    },
  };
};

module.exports.postcss = true;
