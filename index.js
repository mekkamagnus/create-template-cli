#!/usr/bin/env node

import copy from "copy-template-dir";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const vars = { name: `master-mekael` };
const inDir = path.join(__dirname, `template`);
const outDir = path.join(process.cwd(), `output`);

console.log(outDir);

copy(inDir, outDir, vars, (err, createdFiles) => {
  if (err) throw err;
  createdFiles.forEach((filePath) => console.log(`Created ${filePath}`));
  console.log("done!");
});
