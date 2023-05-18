import styles from './Input.module.css';

const Input = (props) => {
  const {
    inputLabel,
    inputType,
    onChangeInput,
    placeholder,
    autocomplete,
    value,
    errorMessage,
    inputMessage,
    valid,
    tached,
  } = props;

  const htmlFor = `${inputType}-${Math.round(Math.random() * 100)}`;

  return (
    <div className={styles.input}>
      <label htmlFor={htmlFor}> {inputLabel} </label>
      <input
        className={!valid && tached ? styles.invalid : null}
        type={inputType}
        id={htmlFor}
        onChange={onChangeInput}
        placeholder={placeholder}
        value={value}
        autoComplete={autocomplete}
      />

      {!valid && tached ? (
        <span style={{ color: '#f01f30' }}>{errorMessage}</span>
      ) : (
        <span style={{ color: '#858585' }}>{inputMessage}</span>
      )}
    </div>
  );
};

export default Input;
