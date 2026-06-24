import React, { useState } from "react";
import { motion } from "motion/react";
import LoginModal from "../components/LoginModal.jsx";


function Home () {

  const highlights = [
    "✨ AI-Powered Website Generation",
    "📱 Fully Responsive",
    "🔒 Secure & Reliable"
  ]

  const [openLogin, setOpenlogin] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#404040] text-white overflow-hidden">
     <motion.div
     initial = {{y:-40, opacity:0}}
     animate = {{y: 0, opacity: 1}}
     transition = {{duration: 0.5}}
     className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-lg font-semibold">
            Genweb.ai
          </div>
          <div className="flex items-center gap-5">
            <div className="hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer">
              Pricing
            </div>

            <button className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm"
            onClick={() => setOpenlogin(true)}
            >
              Get Started
            </button>

          </div>
        </div>
    
        </motion.div>   

        <section className="pt-44 pb-32 px-6 text-center">
          <motion.h1 
          initial = {{opacity: 0, y: 40 }}
          animate = {{opacity: 1, y: 0}}
          className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            Bulid stunning Website <br/>
            <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> With AI </span>
          </motion.h1>

          <motion.p 
          initial = {{opacity: 0, y: 20 }}
          animate = {{opacity: 1, y: 0}}
          className="mt-8 max-w-2xl mx-auto text-zinc-400 text-lg "
          >
            Describe It. Build It. Launch It.
            Turn your ideas into beautiful, high-converting, and fully responsive websites instantly. No code, no templates-just pure AI magic delivering production-ready results in seconds.
          </motion.p>

          <button className="px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition mt-10"> Get Started</button>
        </section>

        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className = "grid grid-cols-1 md:grid-cols-3 gap-10">
            {highlights.map((h, i ) => (
              <motion.div  key = {i}
                initial = {{opacity: 0, y: 40}}
                whileInView = {{opacity: 1, y: 0}}
                className = "rounded-2xl bg-white/5 border border-white/10 p-10">
               
                <h1 className="text-xl font-semibold mb-3">{h}</h1>
                <p className="text-sm text-zinc-400 ">
                  Describe your idea in plain English and watch AI create a beautiful, fully responsive website in seconds
                </p>
              </motion.div>
            ))}
          </div>

        </section>

        <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} GenWeb.Ai
        </footer>

        {
         openLogin && (
          <LoginModal
         open={openLogin}
           onClose={() => setOpenlogin(false)}
       />
        )
        }
    </div>
  )
}
export default Home