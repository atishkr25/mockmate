import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BsArrowUpRight, BsCoin, BsRobot } from 'react-icons/bs'
import { FaUserAstronaut } from 'react-icons/fa'
import { HiOutlineLogout } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverURL } from '../App.jsx'
import { setUserData } from '../redux/userSlice'
import AuthModel from './AuthModel.jsx'

function Navbar() {
  const { userData } = useSelector((state) => state.user)
  const [showAuth, setShowAuth] = React.useState(false)
  const [openMenu, setOpenMenu] = React.useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await axios.post(serverURL + '/api/auth/logout', {}, { withCredentials: true })
      dispatch(setUserData(null))
      setOpenMenu(null)
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <>
      <header className='fixed left-1/2 top-5 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2'>
        <nav className='flex h-[4.5rem] items-center justify-between rounded-full border border-white/10 bg-stone-950/95 px-3 shadow-2xl backdrop-blur-xl sm:px-4'>
          <button onClick={() => navigate('/')} className='group flex items-center gap-3 text-left'>
            <span className='flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-stone-900 shadow-lg transition duration-700 group-hover:rotate-[360deg]'><BsRobot /></span>
            <span className='hidden font-bold tracking-tight text-white sm:block'>MockMate</span>
          </button>

          <div className='hidden items-center gap-1 md:flex'>
            {[['Features', '#features'], ['Practice', '#planning'], ['Credits', '#pricing']].map(([label, href]) => <a key={label} href={href} className='rounded-full px-4 py-2 text-sm font-medium text-stone-400 transition hover:bg-white/10 hover:text-white'>{label}</a>)}
          </div>

          <div className='flex items-center gap-2'>
            {userData ? <>
              <button onClick={() => setOpenMenu(openMenu === 'credits' ? null : 'credits')} className='flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-xs font-bold text-stone-200 transition hover:bg-white/15'><BsCoin className='text-orange-400' />{userData.credits || 0}</button>
              <button onClick={() => setOpenMenu(openMenu === 'user' ? null : 'user')} className='flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-sm font-bold text-white transition hover:bg-orange-500'>{userData?.name?.slice(0, 1).toUpperCase() || <FaUserAstronaut />}</button>
            </> : <button onClick={() => setShowAuth(true)} className='group flex items-center gap-2 rounded-full bg-orange-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-orange-500'>Sign in <BsArrowUpRight className='transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5' /></button>}
          </div>

          {openMenu === 'credits' && <div className='absolute right-16 top-[4.8rem] w-60 rounded-2xl border border-stone-200 bg-white p-4 text-stone-900 shadow-2xl'><p className='text-sm font-bold'>You have {userData?.credits || 0} credits</p><p className='mt-1 text-xs leading-5 text-stone-500'>Use 50 credits to start a complete interview.</p><button onClick={() => navigate('/pricing')} className='mt-4 w-full rounded-xl bg-stone-900 py-2.5 text-xs font-bold text-white transition hover:bg-orange-600'>Get more credits</button></div>}
          {openMenu === 'user' && <div className='absolute right-2 top-[4.8rem] w-52 rounded-2xl border border-stone-200 bg-white p-4 text-stone-900 shadow-2xl'><p className='mb-3 truncate text-sm font-bold'>{userData?.name}</p><button onClick={() => navigate('/history')} className='block w-full rounded-lg px-2 py-2 text-left text-xs font-semibold text-stone-500 transition hover:bg-stone-50 hover:text-stone-900'>Interview history</button><button onClick={handleLogout} className='flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-xs font-semibold text-red-500 transition hover:bg-red-50'><HiOutlineLogout /> Log out</button></div>}
        </nav>
      </header>
      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
    </>
  )
}

export default Navbar
