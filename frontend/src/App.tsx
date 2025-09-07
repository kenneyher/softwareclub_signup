import { useState, useEffect } from "react"
import DecryptedText from "./DecryptedText"
import LetterGlitch from "./components/LetterGlitch"
import "./App.css"

function App() {
  return (
    <>
      <div className="relative w-screen h-screen overflow-hidden">
        {/* Background glitch */}
        <div className="absolute inset-0">
          <LetterGlitch
            glitchColors={["#ff932eff", "#1900ffff", "#36353eff", "#191d27ff"]}
            glitchSpeed={100}
            centerVignette={true}
            outerVignette={true}
            smooth={false}
          />
        </div>

        {/* Foreground content */}
        <div className="relative z-10 flex flex-col items-center justify-start gap-4 h-full w-full mt-10">
          <div className="bg-slate-800/10 backdrop-blur-md rounded-full p-8 border border-slate-600/20 shadow-lg">
            <DecryptedText
              text="Welcome to the Software Club"
              speed={80}
              maxIterations={20}
              characters="ABCD1234!?"
              className="revealed"
              revealDirection="start"
              sequential={true}
              parentClassName="all-letters"
              encryptedClassName="encrypted"
              animateOn="view"
            />
          </div>
          <div className="bg-slate-800/10 backdrop-blur-md rounded-2xl p-8 border border-slate-600/20 shadow-lg w-full max-w-md">
            <form className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="name"
                  className="text-white/80 font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  className="px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Student Email */}
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-white/80 font-medium mb-1"
                >
                  Student Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@student.keiseruniversity.edu"
                  className="px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col">
                <label
                  htmlFor="phone"
                  className="text-white/80 font-medium mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+1 234 567 890"
                  className="px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>

              {/* Year Dropdown */}
              <div className="flex flex-col">
                <label
                  htmlFor="year"
                  className="text-white/80 font-medium mb-1"
                >
                  Year
                </label>
                <div className="relative">
                  <select
                    id="year"
                    name="year"
                    className="appearance-none w-full px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="" className="bg-zinc-900/20 text-white disabled:bg-zinc-900 hover:bg-orange-400" disabled selected>
                      Select your year
                    </option>
                    <option value="1" className="bg-zinc-800 text-white hover:bg-blue-600">
                      Freshman
                    </option>
                    <option value="2" className="bg-zinc-800 text-white hover:bg-blue-600">
                      Sophomore
                    </option>
                    <option value="3" className="bg-zinc-800 text-white hover:bg-blue-600">
                      Junior
                    </option>
                    <option value="4" className="bg-zinc-800 text-white hover:bg-blue-600">
                      Senior
                    </option>
                  </select>
                  {/* Custom arrow icon */}
                  <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 px-6 py-2 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
