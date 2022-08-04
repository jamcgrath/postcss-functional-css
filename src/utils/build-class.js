const camelCase = require("lodash.camelcase");
const generateNodes = require("./generate-nodes");

module.exports = ({
  node,
  options,
  classNamePrefix = "",
  featureName = "",
  values = [],
  direction = "",
}) => {
  const rules = [];
  const configClassName = options.features[featureName].className;

  let rule;
  let unit;
  let className;
  let directionValues;
  let selector;

  if (direction) {
    directionValues = options.features[featureName][direction].values;
    unit = options.features[featureName][direction].unit;
    className =
      options.features[featureName][direction].className ||
      `${featureName}-${direction}`;
    directionValues.forEach((item) => {
      selector = `${classNamePrefix}${className}-${item}`;

      rule = {
        selector: `.${selector}`,
        decls: [],
      };
      switch (direction) {
        case "x":
          rule.decls.push({
            prop: `${featureName}-left`,
            value: `${item}${unit}`,
          });
          rule.decls.push({
            prop: `${featureName}-right`,
            value: `${item}${unit}`,
          });
          break;
        case "y":
          rule.decls.push({
            prop: `${featureName}-bottom`,
            value: `${item}${unit}`,
          });
          rule.decls.push({
            prop: `${featureName}-top`,
            value: `${item}${unit}`,
          });
          break;
        case "all":
          rule.decls.push({
            prop: `${featureName}`,
            value: `${item}${unit}`,
          });
          break;
        default:
          rule.decls.push({
            prop: `${featureName}-${direction}`,
            value: `${item}${unit}`,
          });
      }
      rules.push(rule);
    });
  } else if (options.features[featureName].values) {
    options.features[featureName].values.forEach((item) => {
      const { key, value } = item;
      selector = `${classNamePrefix}${configClassName}-${key}`;
      rule = {
        selector: `.${selector}`,
        decls: [],
      };
      //push decl on to array
      rule.decls.push({
        prop: options.features[featureName].property,
        value,
      });
      rules.push(rule);
      console.log("rules", rules);
    });
  } else {
    className = configClassName ? `${configClassName}-` : "";
    values.forEach((item) => {
      selector = `${classNamePrefix}${className}${item.selector}`;
      rule = {
        selector: `.${selector}`,
        decls: item.decls,
      };
      rules.push(rule);
      console.log(rules.length, rules);
    });
  }

  const nodes = generateNodes(rules);
  node.append(nodes);
};
