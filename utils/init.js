import welcome from 'cli-welcome';
import packageJSON from './../package.json' assert { type: 'json' };
import unhandled from 'cli-handle-unhandled';

export default () => {
  unhandled();
  welcome({
    title: packageJSON.name,
    tagline: `A rapid prototyping tool by Mekael Turner`,
    description: packageJSON.description,
    version: packageJSON.version,
    bgColor: `#AFE1AF`,
    color: `#FFFFFF`,
    bold: true,
    clear: true,
  });
};
