import { useState ,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login , logout} from './store/authSlice'
import './App.css'
import {Header , Footer} from './components'
import {Outlet} from 'react-router-dom'

function App() {

  const [loading , setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout);
      }
    }
    )
    .finally(() => setLoading(false));
  } , [])
  return !loading ?(
    <div className='min-h-screen flex flex-col bg-gray-400'>
    <div className='flex-grow'>
      <Header />
      </div>
      <div className='flex-grow'>
      <main>
        <Outlet />
      </main>
      </div>
      <div className='flex-grow'>
      <Footer />
      </div>
    
  </div>
  ) : null
}

export default App
