import { useState } from "react";
import DecryptedText from "./DecryptedText";
import LetterGlitch from "./components/LetterGlitch";
import "./App.css";

function App() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", year: "" });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Submitted successfully!");
        setForm({ name: "", email: "", phone: "", year: "" });
      } else {
        setStatus(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Network error");
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <LetterGlitch
          glitchColors={["#ff932eff", "#1900ffff", "#36353eff", "#191d27ff"]}
          glitchSpeed={100}
          centerVignette={true}
          outerVignette={true}
          smooth={false}
        />
      </div>

      {/* Foreground */}
      <div className="relative z-10 flex flex-col items-center gap-4 h-full w-full mt-10">
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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Name */}
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@student.keiseruniversity.edu"
              className="px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            {/* Phone */}
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+1 234 567 890"
              className="px-4 py-2 rounded-full bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            {/* Year */}
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              className="appearance-none w-full px-4 py-2 rounded-full bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="" disabled>Select your year</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            </select>

            {/* Submit */}
            <button
              type="submit"
              className="mt-4 px-6 py-2 rounded-full bg-orange-500 text-white font-bold hover:bg-orange-600 transition-colors"
            >
              Submit
            </button>
          </form>

          {/* Status message */}
          {status && <p className="text-white mt-4">{status}</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
