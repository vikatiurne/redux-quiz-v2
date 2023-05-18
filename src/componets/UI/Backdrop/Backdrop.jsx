import styles from './Backdrop.module.css'

const Backdrop = ({onclick}) => {
  return (
    <div className={styles.backdrop} onClick={onclick}></div>
  )
}

export default Backdrop