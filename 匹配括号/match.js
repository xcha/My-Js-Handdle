function isValidParentheses(s) {
  if (typeof s !== "string") return false;

  const stack = [];
  const pairs = {
    ")": "(",
    "}": "{",
    "]": "[",
  };

  for (let i = 0; i < s.length; i++) {
    const char = s[i];

    // 如果是左括号，入栈
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
    }
    // 如果是右括号
    else if (char === ")" || char === "}" || char === "]") {
      // 栈为空或栈顶不匹配，返回 false
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
    // 忽略其他字符
  }

  // 栈为空说明全部匹配
  return stack.length === 0;
}

// 测试
console.log(isValidParentheses("()")); // true
console.log(isValidParentheses("()[]{}")); // true
console.log(isValidParentheses("(]")); // false
console.log(isValidParentheses("([)]")); // false
console.log(isValidParentheses("{[]}")); // true
console.log(isValidParentheses("((()))")); // true
console.log(isValidParentheses("((())")); // false
