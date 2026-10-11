import React from 'react'
import { BsArrowUpRight, BsRobot } from 'react-icons/bs'

const Footer = () => (
  <footer className='border-t border-stone-200 bg-white px-6 py-14 text-sm text-stone-500'>
    <div className='mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between'>
      <div>
        <div className='mb-4 flex items-center gap-3 text-stone-900'><span className='flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 text-white'><BsRobot /></span><span className='font-bold tracking-tight'>MockMate</span></div>
        <p className='max-w-sm leading-6'>Practice the conversation before it matters. Built for clearer answers and calmer interviews.</p>
      </div>
      <div className='flex items-center gap-5 text-xs font-bold uppercase tracking-[0.16em]'><a href='#features' className='transition hover:text-orange-600'>Features</a><a href='#planning' className='transition hover:text-orange-600'>Practice</a><a href='#pricing' className='transition hover:text-orange-600'>Credits</a><a href='#' className='flex items-center gap-2 text-stone-900 transition hover:text-orange-600'>Back to top <BsArrowUpRight /></a></div>
    </div>
    <div className='mx-auto mt-12 max-w-6xl border-t border-stone-100 pt-5 text-xs text-stone-400'>© {new Date().getFullYear()} MockMate. Practice with intention.</div>
  </footer>
)

export default Footer
