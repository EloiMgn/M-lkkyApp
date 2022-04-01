import { useDispatch } from 'react-redux';
import './QuantityPicker.scss'

const QuantityPicker = ({quantity, setQuantity}) => {
  const dispatch = useDispatch()


const handleIncrement = () => {
  dispatch({type: "resetSkittles"})
  if(quantity === 0){
    setQuantity(2)
  } else if (quantity >= 2) {
    setQuantity(quantity+1)
  }

}

const handleDecrement = () => {
  if (quantity > 2) {
    setQuantity(quantity-1)
  } else setQuantity(0)
}

return (
    <div className="quantity-input">
      {quantity>0 &&
      <button className="quantity-input__modifier quantity-input__modifier--left" onClick={handleDecrement}>
        &mdash;
      </button>}
      
      <input className="quantity-input__screen" type="text" value={`${quantity} quilles`} readOnly/>
      {quantity<12 &&
      <button className="quantity-input__modifier quantity-input__modifier--right" onClick={handleIncrement}>
        &#xff0b;
      </button> }
    </div>  
  );
}

export default QuantityPicker
