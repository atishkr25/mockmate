import React from 'react'
import { motion } from "motion/react"
import {
  FaUserTie,
  FaBriefcase,
  FaFileUpload,
  FaMicrophoneAlt,
  FaChartLine
} from 'react-icons/fa';
import axios from 'axios';
import { serverURL } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

const Step1SetUp = ({onStart}) => {

  const  {userData}  = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [role, setRole] = React.useState("");
  const [experience, setExperience] = React.useState("");
  const [mode, setMode] = React.useState("Technical");
  const [gender, setGender] = React.useState("male");
  const [resumeFile, setResumeFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [skills, setSkills] = React.useState([]);
  const [resumeText, setResumeText] = React.useState("");
  const [analysisDone, setAnalysisDone] = React.useState(false);
  const [analysing, setAnalysing] = React.useState(false);

  const handleUploadResume = async () =>
  {
    if(!resumeFile || analysing) return;
      setAnalysing(true)

      const formdata = new FormData()
      formdata.append("resume", resumeFile);
    try{
      const result = await axios.post(serverURL + "/api/interview/resume", formdata , {withCredentials:true, timeout: 30000})

      console.log(result.data);

      setRole(result.data.role || "");
      setExperience(result.data.experience || "" );
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");
      setAnalysisDone(true);
      setAnalysing(false);

    } catch (error) {
      console.log(error);
      const status = error?.response?.status;
      const serverMessage = error?.response?.data?.message;
      const message = serverMessage || error?.message || "Resume upload failed";
      alert(status ? `Upload failed (${status}): ${message}` : message);
      setAnalysing(false)
      
    }
  }

  const handleStart = async () => {
    if (userData && userData.credits < 50) {
      alert("Insufficient credits. You need at least 50 credits to start an interview. Please upgrade your plan.");
      return;
    }
    setLoading(true);
    try {
      const result = await axios.post(serverURL + "/api/interview/generate-questions", 
        {
        role, experience, mode, resumeText, projects, skills,
      }, {withCredentials:true})
      console.log(result.data);
      if(userData) {
        dispatch(setUserData({...userData , credits:result.data.creditsLeft}))
      }
      setLoading(false);

      onStart({...result.data, username: userData?.username || userData?.name || "", gender})

    } catch (error) {
      console.log(error);
      setLoading(false)
      
    } 
  }

  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6 }}
    className='min-h-screen flex items-center justify-center bg-stone-100 px-4 py-24 sm:px-6'>
      <div className='w-full max-w-5xl overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-xl grid md:grid-cols-2'>
        {/* Left side */}
        <motion.div 
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className='relative bg-stone-900 p-8 text-white sm:p-10 flex flex-col justify-center'>
          <div className='relative z-10'>

          <p className='mb-4 text-xs font-bold uppercase tracking-[0.2em] text-orange-400'>The practice room</p>
          <h2 className='display-serif text-4xl leading-[0.98] text-white mb-5 sm:text-5xl'>
            Start Your AI Interview
          </h2>

          <p className='max-w-md text-sm text-stone-400 mb-8 leading-6'>
            Practice realistic interview scenarios powered by AI. Improve communication, technical depth, and confidence.
          </p>

          <div className='space-y-5'>
            {
              [
                {
                  icon: <FaUserTie className='text-orange-400 text-xl' />,
                  text: "Choose Role & Experience"
                },
                {
                  icon: <FaMicrophoneAlt className='text-orange-400 text-xl' />,
                  text: "Smart Voice Interview"
                },
                {
                  icon: <FaChartLine className='text-orange-400 text-xl' />,
                  text: "Performance Analytics"
                }
              ].map((item,index) => (
                <motion.div 
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className='flex items-center space-x-4 rounded-xl border border-white/10 bg-white/10 p-3.5 cursor-pointer transition hover:bg-white/15'>
                  {item.icon}
                  <span className='text-stone-200 font-medium'>{item.text}</span>
                </motion.div>
              ))
            }
          </div>
          </div>

        </motion.div>

        {/* Right side */}
        <motion.div 
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className='bg-white p-8 sm:p-10'>
          <p className='mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange-600'>Build your session</p>
          <h2 className='display-serif text-4xl leading-none text-stone-900 mb-7'>
            Interview setup
          </h2>

          <div className='space-y-6'>
            <div className='relative'>
              <FaUserTie className='absolute top-4 left-4 text-stone-400' />
              <input 
              type="text" 
              placeholder='Enter role' 
              className='w-full rounded-xl border border-stone-200 bg-white py-3 pl-12 pr-4 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
              onChange={(e) => setRole(e.target.value)} 
              value={role} />
            </div>

            <div className='relative'>
              <FaBriefcase className='absolute top-4 left-4 text-stone-400' />
              <input 
              type="text" 
              placeholder='Experience (e.g. 2 years)' 
              className='w-full rounded-xl border border-stone-200 bg-white py-3 pl-12 pr-4 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
              onChange={(e) => setExperience(e.target.value)} 
              value={experience} />

            </div>

            <select 
              value={mode} 
              onChange={(e) => setMode(e.target.value)}
              className='w-full rounded-xl border border-stone-200 bg-white px-4 py-3 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100'>

              <option value="Technical">Technical Interview</option>
              <option value="HR">HR Interview</option>
              <option value="Managerial">Managerial Interview</option>

              </select>

              {!analysisDone && (
                <motion.div 
                whileHover={{scale: 1.02}}
                onClick={() => document.getElementById("resume-upload").click()}
                className='rounded-2xl border-2 border-dashed border-stone-300 bg-white p-8 text-center cursor-pointer transition hover:border-orange-400 hover:bg-orange-50/40'>
                  <FaFileUpload 
                  className='text-4xl mx-auto text-orange-600 mb-3' />

                  <input 
                  accept='application/pdf'
                  type="file" 
                  id="resume-upload" 
                  className='hidden'
                  onChange={(e) => setResumeFile(e.target.files[0])}
                  />
                  <p 
                  className='text-stone-500 font-medium'>
                  {resumeFile ? resumeFile.name : "Click to upload resume (optional)"}
                  </p>

                  {resumeFile && (
                    <motion.button
                    whileHover={{ scale:1.02 }}
                    onClick={(e) => {e.stopPropagation(); handleUploadResume();}}
                    className='mt-4 rounded-full bg-stone-900 px-5 py-2 text-sm font-bold text-white transition hover:bg-orange-600'>
                      {analysing ? "Analysing..." : "Analyse Resume"}

                    </motion.button>
                  )}

                </motion.div>
              )}

              {analysisDone && (
                <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='space-y-4 rounded-2xl border border-stone-200 bg-white p-5'>
                  <h3
                  className='display-serif text-3xl text-stone-900'>
                    Resume Analysis result
                  </h3>

                  {projects.length >0 &&(
                    <div>
                    <p className='mb-1 font-bold text-stone-700'>Projects:</p>
                    <ul className='list-disc list-inside space-y-1 text-stone-500'>
                      {projects.map((project,index) => (
                        <li key={index}>{project}</li>
                      ))}
                    </ul>
                    </div>
                  )}

                  {skills.length >0 &&(
                    <div>
                    <p className='mb-1 font-bold text-stone-700'>Skills:</p>
                    <div className='flex flex-wrap gap-2'>
                      {skills.map((skill,index) => (
                        <span key={index} className='rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700'>{skill}</span>
                      ))}
                    </div>
                    </div>
                  )}

                </motion.div>
              )}

              {userData && userData.credits < 50 && (
                <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-center text-sm font-medium text-red-500'>
                  Low credits ({userData.credits}). You need at least 50 to start an interview.
                </motion.p>
              )}

              <motion.button 
              onClick={handleStart}
              disabled={!role || !experience || loading || (userData && userData.credits < 50)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className='w-full rounded-full bg-orange-600 py-3 text-lg font-semibold text-white shadow-lg shadow-orange-600/15 transition duration-300 hover:bg-orange-500 disabled:bg-stone-300 disabled:text-stone-500'>
                {loading ? "Starting..." : "Start Interview"}
              </motion.button>
          </div>
        </motion.div>
      </div>
      
    </motion.div>
  )
}

export default Step1SetUp
