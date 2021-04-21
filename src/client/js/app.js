import { onSubmit, onClear } from './formHandler'

const app = async () => {
  const submit = document.getElementById('submit');
  submit.addEventListener('click', onSubmit);

  const clearBtn = document.getElementById('reset-btn');
  clearBtn.addEventListener('click', onClear);
}

export { app };