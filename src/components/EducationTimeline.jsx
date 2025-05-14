import React from 'react'

const EducationTimeline = () => {
  return (
    <ul className="timeline timeline-vertical text-sm text-slate-800">
  <li>
    <div className="timeline-start timeline-box bg-slate-100"> <span className='font-medium'>Pulanlupa Elementary School.</span> <br /> (2010-2016)</div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-end timeline-box bg-slate-100"> <span className='font-medium'>Las Pinas North National High School (LPNNHS).</span> (2016-2020)</div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-start timeline-box bg-slate-100"> <span className='font-medium'>Holy Rosary Academy of Laspinas City.</span> (2020-2022)</div>
    <hr />
  </li>
  <li>
    <hr />
    <div className="timeline-end timeline-box bg-slate-100"> <span className='font-medium'>Dr.Filemon C. Aguilar Memorial College IT-Campus.</span> (2022-2026)</div>
    <hr />
  </li>
</ul>
  )
}

export default EducationTimeline
