import React from 'react'
import Email from '/email.png'
import Phone from '/phone-call.png'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="px-4 pb-8 pt-6 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-white/70 bg-white/85 px-6 py-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur sm:px-8">
        <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
              Contact Details
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
              Available for project collaboration, and web development opportunities.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Phone
              </p>
              <div className="mt-3 flex items-center gap-3">
                <img src={Phone} alt="Phone icon" className="h-7 w-7 object-contain" />
                <p className="text-sm text-slate-700">+63 99 425 86519</p>
              </div>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                Email
              </p>
              <div className="mt-3 flex items-center gap-3">
                <img src={Email} alt="Email icon" className="h-7 w-7 object-contain" />
                <p className="break-all text-sm text-slate-700">edgarrodilorosa@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] bg-[linear-gradient(180deg,_#0f172a_0%,_#1e293b_55%,_#334155_100%)] px-5 py-4 text-center shadow-[0_18px_40px_rgba(15,23,42,0.18)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300/90">
              Portfolio
            </p>
            <p className="mt-2 text-sm text-white">&copy; {currentYear} Edgar Orosa</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
