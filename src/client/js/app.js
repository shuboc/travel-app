import { formHandler } from './formHandler'

const app = async () => {
  const submit = document.getElementById('submit');
  submit.addEventListener('click', formHandler);
}

export { app };