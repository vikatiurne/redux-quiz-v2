import {v4 as uuidv4} from 'uuid'



const Select = (props) => {
   const {value,label,onchange,optionsAnswer}=props
    const htmlFor = `${label}-${Math.round(Math.random() * 100)}`;
  return (
    <>
    <label htmlFor={htmlFor}>{label}</label>
    <select value={value} onChange={onchange} id={htmlFor}>
      <option defaultValue={value}>{value}</option>
              {optionsAnswer.map(option=>{
            return <option key={uuidv4()} value={option.text}>{option.text}</option>
        })}
    </select>
    </>
  )
}

export default Select