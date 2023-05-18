import { v4 as uuidv4 } from 'uuid';

export const links = [
  { to: '/', label: 'Перелік тестів', exact: true, id: uuidv4() },
  { to: 'auth', label: 'Авторизація', exact: false, id: uuidv4() },
  { to: 'quiz-creator', label: 'Створити тест', exact: false, id: uuidv4() },
];
