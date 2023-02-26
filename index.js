#!/usr/bin/env node --no-warnings --inspect
// --inspect
import copy from 'copy-template-dir';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import init from './utils/init.js';
import ask from './utils/ask.js';
import handleError from 'cli-handle-error';

(async () => {
  init();

  const name = await ask({
    message: 'CLI name?',
    hint: '(use kebab-case only)',
  });
  const description = await ask({
    message: 'CLI description?',
  });
  const version = await ask({
    message: 'CLI version?',
    initial: '0.0.1',
  });

  // handleError(`INPUT`, error);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const vars = {
    name,
    description,
    version,
  };

  const inDir = path.join(__dirname, `template`);
  const outDir = path.join(process.cwd(), vars.name);

  copy(inDir, outDir, vars, (err, createdFiles) => {
    if (err) throw err;
    console.log();
    console.log(`Creating files in ./${vars.name}`);
    createdFiles.forEach(filePath => {
      const fileName = path.basename(filePath);
      console.log(`Created ${fileName}`);
    });
    console.log('done!');
    console.log();
  });
})();
