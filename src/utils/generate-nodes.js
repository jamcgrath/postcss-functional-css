const postcss = require("postcss");

module.exports = (rules) => {
  const newRules = [];
  rules.forEach((rule) => {
    const newRule = postcss.rule({
      selector: rule.selector,
    });
    if (Array.isArray(rule.decls)) {
      rule.decls.forEach((decl) => {
        const { prop, value } = decl;
        newRule.append(
          postcss.decl({
            prop,
            value,
          })
        );
      });
    } else {
      for (const prop in rule.decls) {
        newRule.append(
          postcss.decl({
            prop,
            value: rule.decls[prop],
          })
        );
      }
    }

    newRules.push(newRule);
  });

  return newRules;
};
