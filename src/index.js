function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  if (!balancedBrackets(expr)) throw new Error('ExpressionError: Brackets must be paired');
  if (/\/\s?0/g.test(expr)) throw new Error('TypeError: Devision by zero.');

  // const func = new Function('return ' + expr);
  // const result = func();

  // return result;

  return evalRPN(toRPN(expr));
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

function clean(arr) {
  return arr.filter(x => x !== '');
}

function isNumeric(input) {
  return !isNaN(parseFloat(input)) && isFinite(input);
}

function toRPN(expr) {
  let rpn = '';
  const operatorsStack = [];
  const operators = {
    '/': {
      precedence: 3
    },
    '*': {
      precedence: 3
    },
    '+': {
      precedence: 2
    },
    '-': {
      precedence: 2
    }
  };

  let exprArray = clean(expr.replace(/\s+/g, '').split(/([\+\-\*\/\^\(\)])/));

  for (let i = 0; i < exprArray.length; i++) {
    const token = exprArray[i];

    if (isNumeric(token)) {
      rpn += token + ' ';
    } else if ('*/+-'.indexOf(token) !== -1) {
      const o1 = token;
      let o2 = operatorsStack[operatorsStack.length - 1];

      while ('*/+-'.indexOf(o2) !== -1 && operators[o1].precedence <= operators[o2].precedence) {
        rpn += operatorsStack.pop() + ' ';
        o2 = operatorsStack[operatorsStack.length - 1];
      }

      operatorsStack.push(o1);
    } else if (token === '(') {
      operatorsStack.push(token);
    } else if (token === ')') {
      while (operatorsStack[operatorsStack.length - 1] !== '(') {
        rpn += operatorsStack.pop() + ' ';
      }
      operatorsStack.pop();
    }
  }
  while (operatorsStack.length > 0) {
    rpn += operatorsStack.pop() + ' ';
  }

  return rpn.trim();
}

function evalRPN(rpn) {
  const resultStack = [];
  const rpnArray = rpn.split(' ');
  for (let i = 0; i < rpnArray.length; i++) {
    if (isNumeric(rpnArray[i])) {
      resultStack.push(rpnArray[i]);
    } else {
      const a = resultStack.pop();
      const b = resultStack.pop();

      if (rpnArray[i] === '+') {
        resultStack.push(Number(a) + Number(b));
      } else if (rpnArray[i] === '-') {
        resultStack.push(Number(b) - Number(a));
      } else if (rpnArray[i] === '*') {
        resultStack.push(Number(a) * Number(b));
      } else if (rpnArray[i] === '/') {
        resultStack.push(Number(b) / Number(a));
      }
    }
  }

  if (resultStack.length > 1) return 'error';
  else return resultStack.pop();
}

module.exports = {
  expressionCalculator
};
