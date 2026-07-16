import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { div } from "motion/react-client";
import { Code, Code2, Monitor, Rocket, Send, X, MessageSquare } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Editor from "@monaco-editor/react";

function WebsiteEditor() {
    const { id } = useParams();
    const [website, setWebsite] = useState(null)
    const [error, setError] = useState("");
    const [code, setCode] = useState("");
    const [message, setMessage] = useState([]);
    const [prompt, setPrompt] = useState("")
    const iframeRef = useRef(null)
    const [updatLoading, setUpdatLoading] = useState(false)
    const [showCode, setShowCode] = useState(false)
    const [showFullPreview, setShowFullPreview] = useState(false)
    const [showChat, setShowChat] = useState(false)
    const [thinkingIndex, setThinkingIndex] = useState(0)
    const thinkingSteps = [
        "understanding your request...",
        "planning layout changes...", "Improveing responsiveness...",
        "Applying animations...",
        "Finalizing changes...",]
    
    const handleUpdate = async () => {
        if (!prompt) return;
        setUpdatLoading(true)
        const text = prompt
        setPrompt("")
        setMessage((m) => [...m, {role: "user", content: prompt}])
        try {
            const result = await axios.post(`${serverUrl}/api/website/update/${id}`, {prompt: text}, {withCredentials: true})
            console.log(result)
            setUpdatLoading(false)
            setMessage((m) => [...m, {role: "ai", content: result.data.message}])
            setCode(result.data.Code)
            
        } catch (error) {
            setUpdatLoading(false)
            console.log(error);
            
        }
    }

    useEffect(() => {
    if (!updatLoading) return;

    const interval = setInterval(() => {
        setThinkingIndex((i) => (i + 1) % thinkingSteps.length);
    }, 1200);

    return () => clearInterval(interval);
}, [updatLoading, thinkingSteps.length]);

    useEffect(() => {
        const handleGetWebsite = async () => {
            try {
                const result = await axios.get(
                    `${serverUrl}/api/website/get-by-id/${id}`,
                    { withCredentials: true }
                );
                    setWebsite(result.data);
                    setCode(result.data.latestCode);
                    setMessage(result.data.conversation);

            } catch (error) {
                console.log(error);
                setError(error.response?.data?.message || "Something went wrong");
                setError(error.response.data.message);
            }
        };

        handleGetWebsite();
    }, [id]);

    useEffect(() => {
    if (!iframeRef.current || !code) return 
       const blob = new Blob([code], {type: "text/html"})  
       const url = URL.createObjectURL(blob)
       iframeRef.current.src = url
       return () => URL.revokeObjectURL(url)
    
}, [code])

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center text-red-400 bg-black">
             {error}
            </div>
        );
    }
    if (!website) {
        return (
            <div className="h-screen flex items-center justify-center text-white bg-black">
             loading...
            </div>
        );
    }

    return (
        <div className="h-screen w-screen flex bg-black text-white overflow-hidden">
            <aside className="hidden lg:flex w-[380px] flex-col border-r border-white/10 bg-black/80">
                <Header/>
                <>
         <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {message.map((m, i)=> (
            <div
             key = {i}
             className={`max-w-[85%] 
                ${ m.role === "user" ? "ml-auto" : "mr-auto"}`}
             >
                <div
                className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed 
                    ${
                        m.role === "user"
                        ? "bg-white text-black"
                        : "bg-white/5 border-white/10 text-zinc-200"
                    }`}
                >
                    {m.content}
                </div>

            </div>
        ))}   

        {updatLoading && <div className="max-w-[85%] mr-auto">
            <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic">
                {thinkingSteps[thinkingIndex]}
                </div>
            </div>}
             
        </div>
         <div className="p-3 border-t border-white/10">
          <div className="flex gap-2">
            <input  placeholder="Describe Changes..." className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white-5 border border-white/10 text-sm outline-none" onChange={(e) => setPrompt(e.target.value)} value={prompt}/>
            <button className="px-4 py-3 bg-white text-black rounded-2xl" disabled = {updatLoading} onClick={handleUpdate}><Send size={14}/></button>

          </div>
            </div> 
        </>
            </aside>

            <div className="flex-1 flex flex-col">
                <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80">
                <span className="text-xs text-zinc-400">Live Preview</span>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-indigo-500 to-purple-500 text-sm font-semibold hover:scale-150 transition"><Rocket size={14}/>Deploy</button>

                    <button className="p-2 lg:hidden" onClick={()=> setShowChat(true)}><MessageSquare size={18}/></button>

                    <button className="p-2" onClick={() => setShowCode(true)} >
                        <Code2 size={18}/>
                    </button>
                    <button className="p-2" onClick={()=> setShowFullPreview(true)}><Monitor size={18}/></button>
                </div>

                </div>
                
                <iframe ref={iframeRef} className="flex-1 w-full bg-white"/>
            </div>

            <AnimatePresence>
                {showChat && (
                    <motion.div
                    initial = {{ y: "100%" }}
                    animate = {{ y: 0 }} 
                    exit = {{ y: "100%" }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col"
                    >
                        <Header onClose={() => setShowChat(false)}/>
                               <>
         <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {message.map((m, i)=> (
            <div
             key = {i}
             className={`max-w-[85%] 
                ${ m.role === "user" ? "ml-auto" : "mr-auto"}`}
             >
                <div
                className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed 
                    ${
                        m.role === "user"
                        ? "bg-white text-black"
                        : "bg-white/5 border-white/10 text-zinc-200"
                    }`}
                >
                    {m.content}
                </div>

            </div>
        ))}   

        {updatLoading && <div className="max-w-[85%] mr-auto">
            <div className="px-4 py-2.5 rounded-2xl text-xs bg-white/5 border border-white/10 text-zinc-400 italic">
                {thinkingSteps[thinkingIndex]}
                </div>
            </div>}
             
        </div>
         <div className="p-3 border-t border-white/10">
          <div className="flex gap-2">
            <input  placeholder="Describe Changes..." className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white-5 border border-white/10 text-sm outline-none" onChange={(e) => setPrompt(e.target.value)} value={prompt}/>
            <button className="px-4 py-3 bg-white text-black rounded-2xl" disabled = {updatLoading} onClick={handleUpdate}><Send size={14}/></button>

          </div>
            </div> 
        </>

                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showCode && (
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    className="fixed  inset-y-0 right-0 w-full lg:w-[45%] z-[9999] bg-bg-[#1e1e1e] flex flex-col"
                  >

                    <div className="h-12 px-4 flex justify-between items-center border-b border-white/10 bg-[#1e1e1e]">
                        <span className="text-sm font-medium">index.html</span>
                        <button onClick={() => setShowCode(false)}><X size={18}/></button>
                    </div>

                    <Editor
                        theme="vs-dark"
                        value={code}
                        language="html"
                        onChange={(v) => setCode(v)}
                    />

                  </motion.div>  
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showFullPreview && (
                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    className="fixed inset-0 z-[9999] bg-black "
                  >
                    <iFrame className="w-full h-full bg-white" srcDoc={code}/>
                    <button className="absolute top-4 right-4 p-2 bg-black/50 rounded-full" onClick={() => setShowFullPreview(false)}><X size={18}/></button>
                    
                  </motion.div>
                )}
            </AnimatePresence>
            
        </div>
        
    );
    function Header({ onClose }) {
  return (
    <div className="h-14 px-4 flex items-center justify-between border-b border-white/10">
      <span className="font-semibold truncate">{website.title}</span>

      {onClose && (
        <button onClick={onClose}>
          <X size={18} color="white" />
        </button>
      )}
    </div>
    ) 
}

}



export default WebsiteEditor;