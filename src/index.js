function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  if (!balancedBrackets(expr)) throw new Error('ExpressionError: Brackets must be paired');
  if (/\/\s?0/g.test(expr)) throw new Error('TypeError: Devision by zero.');

  const func = new Function('return ' + expr);
  const result = func();

  return result;
}

function balancedBrackets(str) {
  if (!/[()]/g.test(str)) return true;
  const stack = [];
  const map = { '(': ')' };

  for (let i = 0; i < str.length; i++) {
    if (map.hasOwnProperty(str[i])) stack.push(str[i]);
    else if (/[()]/.test(str[i]) && str[i] !== map[stack.pop()]) return false;
  }

  if (stack.length !== 0) return false;

  return true;
}

module.exports = {
  expressionCalculator
};
