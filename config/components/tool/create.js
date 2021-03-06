#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const beautify = require('js-beautify');
const components = require('../components.config.js');

// create index.js
let indexContent = '// !!! This file will be generated by ./tool/create.js auto\n\n';
let umdContent = '// !!! This file will be generated by ./tool/create.js auto\n\n';

components.forEach((component) => {
  indexContent += `import ${component} from './${component}';\n`;
  umdContent += `import ${component} from '../../scaffold/src/components/${component}';\n`;
});

indexContent += '\nexport default {\n';
umdContent += '\nexport default {\n';

components.forEach((component) => {
  indexContent += `${component},\n`;
  umdContent += `${component},\n`;
});

indexContent += '};\n';
umdContent += '};\n';

fs.writeFileSync(
  path.join(__dirname, '../index.js'),
  beautify(indexContent, { indent_size: 2, end_with_newline: true })
);
fs.writeFileSync(
  path.join(__dirname, '../umd.js'),
  beautify(umdContent, { indent_size: 2, end_with_newline: true })
);
