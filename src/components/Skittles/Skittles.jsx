import Skittle from './Skittle/Skittle';
import './Skittles.scss';

const Skittles = ({color, setQuantity, disabled}) => {
  return (
    <div className='select' >
      <div className='select__top'>
        <Skittle frontValue={7} color={color} setQuantity={setQuantity} disabled={disabled? true : false}/>
        <Skittle frontValue={9} color={color} setQuantity={setQuantity} disabled={disabled? true : false}/>
        <Skittle frontValue={8} color={color} setQuantity={setQuantity} disabled={disabled? true : false}/>
      </div>
      <div className='select__middleTop'>
        <Skittle frontValue={5} color={color} setQuantity={setQuantity} disabled={disabled? true : false}/>
        <Skittle frontValue={11} color={color} setQuantity={setQuantity} disabled={disabled? true : false}/>
        <Skittle frontValue={12} color={color} setQuantity={setQuantity} disabled={disabled? true : false}/>
        <Skittle frontValue={6} color={color} setQuantity={setQuantity} disabled={disabled? true : false}/>
      </div>
      <div className='select__middleBottom'>
        <Skittle frontValue={3} color={color} setQuantity={setQuantity} disabled={disabled? true : false}/>
        <Skittle frontValue={10} color={color} setQuantity={setQuantity} disabled={disabled? true : false}/>
        <Skittle frontValue={4} color={color} setQuantity={setQuantity} disabled={disabled? true : false}/>
      </div>
      <div className='select__bottom'>
        <Skittle frontValue={1} color={color} setQuantity={setQuantity} disabled={disabled? true : false}/>
        <Skittle frontValue={2} color={color} setQuantity={setQuantity} disabled={disabled? true : false}/>
      </div>
    </div>
  );
};

export default Skittles;