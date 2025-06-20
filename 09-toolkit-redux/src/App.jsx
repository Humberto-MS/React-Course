import reactLogo from './assets/react.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment, incrementByAmount } from './store';

function App() {

  const { counter } = useSelector ( state => state.counter );
  const dispatch = useDispatch();

  return (
    <>
      <img 
        src={reactLogo} 
        className='App-logo' 
        alt="logo" 
      />
      
      <p>count is {counter}</p>
      
      <button 
        type='button' 
        onClick={ () => dispatch ( increment() ) }>
        Increment
      </button>
      
      <button 
        type='button' 
        onClick={ () => dispatch ( decrement() ) }>
        Decrement
      </button>
      
      <button 
        type='button' 
        onClick={ () => dispatch ( incrementByAmount(2) ) }>
        Increment By 2
      </button>
    </>
  )
}

export default App
