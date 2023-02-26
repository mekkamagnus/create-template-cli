import enquirerPackage from 'enquirer';
const { Input } = enquirerPackage;

const prompt = ({ message, hint, initial }) => {
  return new Input({
    message,
    hint,
    initial,
  }).run();
};

export default prompt;
