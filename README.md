## Description
A simple library function to transform a string of LESS variables into a JSON key-value pair mapping.

## Install
```npm install less-variables-to-json```

## Usage
```js
const lessVariablesToJson = require('less-variables-to-json');

// Standard usage
lessVariablesToJson("@primary-color: red;");  // => { "@primary-color": "red" }

// With a projection function to change the name
let nameProjectionFunc = (name) => name.substr(1));
lessVariablesToJson("@primary-color: red;", { nameProjectionFunc });  // => { "primary-color": "red" }
```

## License
MIT