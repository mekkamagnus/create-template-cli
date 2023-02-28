#!/usr/bin/env node --no-warnings
// --inspect-brk or --inspect
import copy from 'copy-template-dir';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import chalk from 'chalk';
import alert from 'cli-alerts';
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

  const authorName = await ask({
    message: 'CLI authorName?',
  });
  const authorEmail = await ask({
    message: 'CLI authorEmail?',
  });
  const authorUrl = await ask({
    message: 'CLI authorUrl?',
  });
  const license = await ask({
    message: 'CLI license?',
    initial: 'UNLICENSED',
  });
  // handleError(`INPUT`, error);
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const vars = {
    name,
    description,
    version,
    authorName,
    authorEmail,
    authorUrl,
    license,
  };

  const outDir = vars.name;
  const inDirPath = path.join(__dirname, `template`);
  const outDirPath = path.join(process.cwd(), outDir);

  copy(inDirPath, outDirPath, vars, (err, createdFiles) => {
    if (err) throw err;
    console.log();
    console.log(
      chalk.dim(
        `Creating files in ${chalk.green(`./${outDir}`)} directory: \n`,
      ),
    );
    createdFiles.forEach(filePath => {
      const fileName = path.basename(filePath);
      console.log(`${chalk.green(`CREATED`)} ${fileName}`);
    });
    alert({
      type: `success`,
      name: `ALL DONE`,
      msg: `\n\n${createdFiles.length} files created in ${chalk.green(
        `./${outDir}`,
      )}`,
    });
  });
})();
