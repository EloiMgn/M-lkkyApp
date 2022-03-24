import Skittle from './Skittle/Skittle';
import './Skittles.scss'

const Skittles = ({color}) => {
  console.log(color);
  return (
    <div className='select' style={{backgroundColor: `${color}`}}>
      <div className='select__top'>
        <Skittle frontValue={7}/>
        <Skittle frontValue={9}/>
        <Skittle frontValue={8}/>
      </div>
      <div className='select__middleTop'>
        <Skittle frontValue={5}/>
        <Skittle frontValue={11}/>
        <Skittle frontValue={12}/>
        <Skittle frontValue={6}/>
      </div>
      <div className='select__middleBottom'>
        <Skittle frontValue={3}/>
        <Skittle frontValue={10}/>
        <Skittle frontValue={4}/>
      </div>
      <div className='select__bottom'>
        <Skittle frontValue={1}/>
        <Skittle frontValue={2}/>
      </div>
    </div>
  )
}

export default Skittles