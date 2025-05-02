import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { MainApp } from './09-useContext/MainApp'
// import { TodoApp } from './08-useReducer/TodoApp'
// import './08-useReducer/intro-reducer'
// import { Padre } from './07-tarea-memo/Padre'
// import { CallbackHook } from './06-memos/CallbackHook'
// import { MemoHook } from './06-memos/MemoHook'
// import { Memorize } from './06-memos/Memorize'
// import { Layout } from './05-useLayoutEffect/Layout'
// import { FocusScreen } from './04-useRef/FocusScreen'
// import { MultipleCustomHooks } from './03-examples/MultipleCustomHooks'
// import { FormWithCustomHook } from './02-useEffect/FormWithCustomHook'
// import { SimpleForm } from './02-useEffect/SimpleForm'
// import { CounterWithCustomHook } from './01-useState/CounterWithCustomHook'
// import { CounterApp } from './01-useState/CounterApp'
// import { HooksApp } from './HooksApp'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      {/* <HooksApp/> */}
      {/* <CounterApp/> */}
      {/* <CounterWithCustomHook/> */}
      {/* <SimpleForm/> */}
      {/* <FormWithCustomHook/> */}
      {/* <MultipleCustomHooks/> */}
      {/* <FocusScreen/> */}
      {/* <Layout/> */}
      {/* <Memorize/> */}
      {/* <MemoHook/> */}
      {/* <CallbackHook/> */}
      {/* <Padre/> */}
      {/* <TodoApp/> */}
      <MainApp/>
    </StrictMode>
  </BrowserRouter>
)