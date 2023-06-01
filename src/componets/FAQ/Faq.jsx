import React from 'react';
import {RiDeleteBin6Line,RiEdit2Fill} from 'react-icons/ri'

import styles from './Faq.module.css';

const Faq = () => {
  return (
    <div className={styles.rules}>
      <h1>Правила</h1>
      <div className={styles.rulesWrapper}>
       <div className={styles.text}>
          <p>
            Це сайт, на якому Ви можете перевірити свої знання на різні теми 🏆.
          </p>
          <br />
          <p>
            Якщо перелік тестів Вам здається замалим, Ви маєте можливість
            зареєструватися та створювати власні тести,вибравши в меню опцію "Створити тест" 💪.
          </p>
          <br />
          <p>
            Для створених Вами тестів, на сторінці зі списком з'являться кнопки
            видалення <RiDeleteBin6Line />  та редагування(змінити назву
            тесту, або додати питання)  <RiEdit2Fill/>. Всередені Вашого тесту також з'являться
            кнопки видалення та редагування окремого питання.
          </p>
          <br />
        </div>
        <span>
          <b>Бажаю приємно та з користю провести час!</b>
        </span>
      </div>
    </div>
  );
};

export default Faq;
