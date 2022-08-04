const fs = require("fs");

const ruleList = [
  "alignContent",
  "alignItems",
  "alignSelf",
  "display",
  "flex",
  "flexDirection",
  "flexWrap",
  "float",
  "fontSize",
  "fontWeight",
  "height",
  "justifyContent",
  "lineHeight",
  "margin",
  "maxHeight",
  "minHeight",
  "objectFit",
  "opacity",
  "padding",
  "position",
  "textAlignment",
  "textSize",
  "textTransform",
  "visibility",
  "zIndex",
];
// const featuresImport = (list) => {
//   let features = {};
//   list.forEach((feature) => {
//     const featureKebab = feature
//       .replace(/([a-z])([A-Z])/g, "$1-$2")
//       .toLowerCase();
//     features[feature] = require(`${__dirname}/features/${featureKebab}`);
//   });
//   return features;
// };
const defaultRules = () => {
  let features = {};
  ruleList.forEach((feature) => {
    const featureKebab = feature
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();
    const path = `./rules/${featureKebab}-rules`;
    const pathTest = fs.existsSync(
      `${__dirname}/rules/${featureKebab}-rules.js`
    );
    if (pathTest) {
      features[feature] = require(path);
    }
  });
  return features;
};

module.exports = {
  ruleList,
  defaultRules,
};
