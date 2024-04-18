import React from 'react'

const Footer = () => {
  return (
      <div className='bg-purple-200 flex justify-center items-center px-4 h-14 text-blue-600 font-semibold'>

          <div className='gap-10'>Created by Aarav Mody </div>
          <div className='h-8 gap-10'><lord-icon
    src="https://cdn.lordicon.com/biobqpgs.json"
    trigger="morph"
    state="morph-glitter"
    colors="primary:#e83a30,secondary:#ebe6ef,tertiary:#ffc738,quaternary:#f9c9c0,quinary:#f24c00"
    >
</lord-icon>
          </div>
      </div>
  )
}

export default Footer