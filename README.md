## Description
A simple library function to transform a string of LESS variables into a JSON key-value pair mapping.

## Install
```npm install less-variables-to-json```

## Usage
Returns a ```Promise```.

```js
const lessVariablesToJson = require('less-variables-to-json');

let json;

// Standard usage
lessVariablesToJson("@primary-color: red;").then((result) => {
    json = result;
});  // json = { "@primary-color": "red" }

// With a projection function to change the name
let nameProjectionFunc = (name) => name.substr(1));
lessVariablesToJson("@primary-color: red;", { nameProjectionFunc }).then((result) => {
    json = result;
};  // json = { "primary-color": "red" }
```

## License
MIT