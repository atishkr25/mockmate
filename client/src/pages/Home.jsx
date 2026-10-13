import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  BsArrowUpRight,
  BsBarChart,
  BsCheck2,
  BsClock,
  BsFileEarmarkText,
  BsMic,
  BsRobot,
  BsShieldCheck,
  BsStars,
} from 'react-icons/bs'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AuthModel from '../components/AuthModel'
import evalImg from '../assets/ai-ans.png'
import resumeImg from '../assets/resume.png'
import pdfImg from '../assets/pdf.png'
import analyticsImg from '../assets/history.png'
import { useTransitionNavigate } from '../services/transitionProvider'

const processSteps = [
  ['01', <BsRobot />, 'Set the brief', 'Choose a role, experience level, and interview mode for your next opportunity.'],
  ['02', <BsMic />, 'Meet your interviewer', 'Answer naturally with your voice while the session keeps the pressure realistic.'],
  ['03', <BsBarChart />, 'Read the signal', 'Get useful feedback on confidence, communication, correctness, and performance.'],
]

const capabilities = [
  [evalImg, <BsBarChart />, 'Evaluate', 'Feedback that sounds like a coach, not a scorecard.', 'Every answer is reviewed for clarity, confidence, communication, and correctness.', 'orange'],
  [resumeImg, <BsFileEarmarkText />, 'Personalize', 'Bring your real experience into the room.', 'Upload a resume and practice questions shaped around your projects and skills.', 'blue'],
  [pdfImg, <BsFileEarmarkText />, 'Reflect', 'Leave each session with something useful.', 'Download a clear report with strengths, weak spots, and practical next steps.', 'violet'],
  [analyticsImg, <BsBarChart />, 'Improve', 'Make progress visible over time.', 'Return to your interview history and see how your performance changes.', 'green'],
]

function Home() {
  const [showAuth, setShowAuth] = React.useState(false)
  const { userData } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const navigateWithTransition = useTransitionNavigate()

  const goTo = (path) => {
    if (!userData) {
      setShowAuth(true)
      return
    }
    navigateWithTransition(path)
  }

  return (
    <div className='min-h-screen overflow-hidden bg-stone-50 text-stone-900'>
      <Navbar />
      <main>
        <section className='relative flex min-h-[780px] items-center overflow-hidden px-6 pb-16 pt-36 sm:pt-40'>
          <div className='home-glow pointer-events-none absolute left-1/2 top-8 h-[520px] w-[760px] -translate-x-1/2' />
          <div className='mx-auto w-full max-w-7xl'>
            <div className='relative z-10 mx-auto max-w-4xl text-center'>
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className='mb-7 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500 shadow-sm'>
                <BsStars className='text-orange-600' /> AI interview practice, with a point of view
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className='display-serif text-6xl leading-[0.92] text-stone-900 sm:text-8xl'>
                Find your answer<br /><span className='italic text-stone-500'>before the interview.</span>
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.18 }} className='mx-auto mt-8 max-w-2xl text-base leading-7 text-stone-500 sm:text-lg'>
                MockMate turns preparation into a realistic conversation. Practice out loud, get useful feedback, and walk into the real room with less noise in your head.
              </motion.p>
              <div className='mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row'>
                <button onClick={() => goTo('/interview')} className='group inline-flex items-center gap-3 rounded-full bg-stone-900 px-7 py-3.5 text-sm font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-orange-600'>Start an interview <BsArrowUpRight className='transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5' /></button>
                <button onClick={() => goTo('/history')} className='inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white px-7 py-3.5 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-100'>Review your progress</button>
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 42 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className='relative mx-auto mt-20 max-w-6xl'>
              <div className='absolute -inset-6 rounded-[3rem] bg-orange-200/20 blur-3xl' />
              <div className='relative overflow-hidden rounded-t-[2rem] border border-stone-200 bg-white p-2 shadow-2xl sm:p-3'>
                <div className='overflow-hidden rounded-[1.35rem] border border-stone-200 bg-stone-50'>
                  <div className='flex items-center gap-2 border-b border-stone-200 bg-white px-4 py-3'><span className='h-2.5 w-2.5 rounded-full bg-red-300' /><span className='h-2.5 w-2.5 rounded-full bg-yellow-300' /><span className='h-2.5 w-2.5 rounded-full bg-green-300' /><div className='mx-auto hidden rounded-md border border-stone-200 bg-stone-50 px-4 py-1 text-[10px] font-medium text-stone-400 sm:block'>mockmate / live-session</div></div>
                  <div className='home-grid grid min-h-[360px] grid-cols-12 p-3 sm:min-h-[480px] sm:p-5'>
                    <aside className='col-span-3 hidden flex-col border-r border-stone-200 pr-4 sm:flex'>
                      <div className='mb-8 flex items-center gap-2 px-2'><div className='flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white'><BsRobot /></div><span className='text-xs font-bold text-stone-700'>MockMate</span></div>
                      <div className='space-y-1 text-xs font-semibold text-stone-500'><div className='rounded-lg bg-white px-3 py-2 text-stone-900 shadow-sm'>Interview room</div><div className='px-3 py-2'>History</div><div className='px-3 py-2'>Your reports</div></div>
                      <div className='mt-auto rounded-xl bg-stone-900 p-3 text-white'><div className='mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-stone-400'><BsShieldCheck /> Private session</div><p className='text-xs leading-5 text-stone-300'>Your practice stays focused on your next move.</p></div>
                    </aside>
                    <div className='col-span-12 flex flex-col px-2 sm:col-span-9 sm:px-6'>
                      <div className='mb-6 flex items-start justify-between'><div><p className='mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-orange-600'>Live practice</p><h2 className='display-serif text-3xl text-stone-900 sm:text-4xl'>Tell me about your last project.</h2><p className='mt-2 text-xs text-stone-500'>Question 2 of 5 · Product design · Medium</p></div><div className='soft-float hidden h-14 w-14 items-center justify-center rounded-full border border-orange-200 bg-orange-50 text-sm font-bold text-orange-700 sm:flex'>01:24</div></div>
                      <div className='grid flex-1 grid-cols-1 gap-4 md:grid-cols-5'>
                        <div className='relative flex min-h-[180px] items-center justify-center overflow-hidden rounded-2xl bg-stone-900 md:col-span-3'><div className='absolute h-40 w-40 rounded-full bg-orange-500/20 blur-3xl' /><div className='relative text-center text-white'><div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-2xl'><BsMic /></div><p className='text-sm font-semibold'>Listening for your answer</p><div className='mt-4 flex items-center justify-center gap-1'>{[18, 32, 24, 42, 28, 20, 36, 24, 16].map((height, index) => <span key={index} className='w-1 rounded-full bg-orange-400' style={{ height }} />)}</div></div></div>
                        <div className='flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-4 md:col-span-2'><div><div className='mb-5 flex items-center justify-between'><span className='text-xs font-bold text-stone-700'>Session signal</span><span className='rounded-full bg-green-50 px-2 py-1 text-[10px] font-bold text-green-700'>On track</span></div><div className='space-y-4'>{[['Confidence', '82%', 'bg-orange-500'], ['Clarity', '76%', 'bg-blue-500'], ['Relevance', '91%', 'bg-green-500']].map(([label, value, color]) => <div key={label}><div className='mb-1 flex justify-between text-[11px] font-semibold text-stone-500'><span>{label}</span><span>{value}</span></div><div className='h-1.5 rounded-full bg-stone-100'><div className={`h-full rounded-full ${color}`} style={{ width: value }} /></div></div>)}</div></div><p className='mt-6 border-t border-stone-100 pt-3 text-[10px] leading-4 text-stone-400'>Feedback appears after every answer.</p></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className='border-y border-stone-200 bg-white px-6 py-8'><div className='mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4 text-center text-xs font-bold uppercase tracking-[0.16em] text-stone-400 sm:justify-between'><span className='flex items-center gap-2'><BsMic className='text-orange-600' /> Voice-first</span><span className='flex items-center gap-2'><BsClock className='text-blue-600' /> Real pressure</span><span className='flex items-center gap-2'><BsBarChart className='text-green-600' /> Useful signal</span><span className='flex items-center gap-2'><BsShieldCheck className='text-violet-600' /> Private by design</span></div></section>

        <section id='features' className='px-6 py-24 sm:py-32'><div className='mx-auto max-w-6xl'><div className='mb-14 max-w-2xl'><p className='mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-600'>The practice room</p><h2 className='display-serif text-5xl leading-none text-stone-900 sm:text-6xl'>A better kind of preparation.</h2><p className='mt-5 text-base leading-7 text-stone-500'>The goal is not to sound rehearsed. It is to understand what comes through when the answer is yours.</p></div><div className='grid gap-6 md:grid-cols-2'>{capabilities.map(([image, icon, label, title, text, tone], index) => <motion.article key={title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className='group overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl'><div className='grid items-center gap-5 rounded-[1.35rem] bg-stone-50 p-5 sm:grid-cols-2 sm:p-6'><div className='overflow-hidden rounded-xl border border-stone-200 bg-white'><img src={image} alt={title} className='h-48 w-full object-contain transition duration-500 group-hover:scale-105' /></div><div><div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${tone === 'orange' ? 'bg-orange-100 text-orange-600' : tone === 'blue' ? 'bg-blue-100 text-blue-600' : tone === 'violet' ? 'bg-violet-100 text-violet-600' : 'bg-green-100 text-green-600'}`}>{icon}</div><p className='mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400'>{label}</p><h3 className='display-serif text-3xl leading-none text-stone-900'>{title}</h3><p className='mt-4 text-sm leading-6 text-stone-500'>{text}</p></div></div></motion.article>)}</div></div></section>

        <section id='planning' className='home-grid border-y border-stone-200 bg-stone-100 px-6 py-24 sm:py-32'><div className='mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]'><div><p className='mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-600'>Three small rituals</p><h2 className='display-serif text-5xl leading-none text-stone-900 sm:text-6xl'>Practice with intention.</h2><p className='mt-6 max-w-md text-base leading-7 text-stone-500'>A focused loop for the days when “I should prepare” needs to become an actual session.</p><button onClick={() => goTo('/interview')} className='group mt-8 inline-flex items-center gap-3 border-b-2 border-stone-900 pb-2 text-sm font-bold text-stone-900 transition hover:border-orange-600 hover:text-orange-600'>Open the interview room <BsArrowUpRight className='transition group-hover:translate-x-1 group-hover:-translate-y-1' /></button></div><div className='grid gap-3'>{processSteps.map(([number, icon, title, text], index) => <motion.div key={number} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12 }} className='group flex items-center gap-5 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:border-orange-200 hover:shadow-lg sm:p-5'><span className='display-serif text-3xl text-stone-300'>{number}</span><div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-stone-900 text-white transition group-hover:bg-orange-600'>{icon}</div><div className='flex-1'><h3 className='font-bold text-stone-900'>{title}</h3><p className='mt-1 text-sm leading-5 text-stone-500'>{text}</p></div><BsArrowUpRight className='hidden text-stone-300 transition group-hover:text-orange-600 sm:block' /></motion.div>)}</div></div></section>

        <section id='credits' className='px-6 py-24 sm:py-32'><div className='mx-auto max-w-5xl rounded-[2rem] bg-stone-900 px-6 py-14 text-white shadow-2xl sm:px-16 sm:py-20'><div className='grid items-center gap-10 md:grid-cols-[1fr_auto]'><div><p className='mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-400'>Start with room to grow</p><h2 className='display-serif text-5xl leading-none sm:text-6xl'>Your next answer is one session away.</h2><p className='mt-5 max-w-xl text-sm leading-6 text-stone-400'>New accounts begin with 150 credits. One complete interview costs 50 credits, so you have space to practice, reflect, and try again.</p></div><button onClick={() => goTo('/interview')} className='group inline-flex items-center justify-center gap-3 rounded-full bg-orange-600 px-7 py-4 text-sm font-bold text-white transition hover:bg-orange-500'>Begin free <BsArrowUpRight className='transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5' /></button></div><div className='mt-12 grid gap-4 border-t border-white/10 pt-7 text-sm text-stone-400 sm:grid-cols-3'><span className='flex items-center gap-2'><BsCheck2 className='text-orange-400' /> 150 starting credits</span><span className='flex items-center gap-2'><BsCheck2 className='text-orange-400' /> Five questions per session</span><span className='flex items-center gap-2'><BsCheck2 className='text-orange-400' /> Downloadable reports</span></div></div></section>
      </main>
      <Footer />
      {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
+    </div>
  )
}

export default Home
