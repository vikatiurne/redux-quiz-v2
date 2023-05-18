import styles from './Button.module.css';

const Button = (props) => {
  const { onclick, children, type, valid, title } = props;

  const classes = [styles.button, styles[type]];

  return (
    <button
      onClick={onclick}
      className={classes.join(' ')}
      disabled={!valid ? true : false}
      title={title}
    >
      {children}
    </button>
  );
};

export default Button;
