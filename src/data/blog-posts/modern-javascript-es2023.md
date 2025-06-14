
---
title: "Modern JavaScript: ES2023 Features"
date: "2023-12-20"
excerpt: "Discover the latest JavaScript features and how they can improve your code quality and development experience."
readTime: "6 min read"
tags: ["JavaScript", "ES2023", "Web Development"]
---

# Modern JavaScript: ES2023 Features

JavaScript continues to evolve with new features that make our code more expressive and efficient. Let's explore some of the most exciting ES2023 features.

## Array.prototype.findLast() and findLastIndex()

These methods allow you to search arrays from the end:

```javascript
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];

// Find the last even number
const lastEven = numbers.findLast(n => n % 2 === 0);
console.log(lastEven); // 2

// Find the index of the last even number
const lastEvenIndex = numbers.findLastIndex(n => n % 2 === 0);
console.log(lastEvenIndex); // 7
```

## Array.prototype.toReversed()

Create a new reversed array without mutating the original:

```javascript
const original = [1, 2, 3, 4, 5];
const reversed = original.toReversed();

console.log(original); // [1, 2, 3, 4, 5]
console.log(reversed); // [5, 4, 3, 2, 1]
```

## Hashbang Grammar

You can now use hashbang (`#!`) at the beginning of JavaScript files for better CLI integration:

```javascript
#!/usr/bin/env node

console.log("Hello from a JavaScript CLI tool!");
```

## Conclusion

These new features make JavaScript more powerful and developer-friendly. While browser support is still rolling out, you can start using many of these features today with modern tooling and transpilation.

Stay tuned for more JavaScript updates, and happy coding!
