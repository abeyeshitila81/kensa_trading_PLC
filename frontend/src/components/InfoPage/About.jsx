import React from 'react'

export default function About() {
  return (
    <section className='bg-gray-300 h-[calc(100vh-120px)]'>
        <div className='w-3/4 mx-auto '>
            <div>
              <h1 className='text-center font-extrabold text-3xl text-sky-500 py-5'>About Us</h1>
              <p>There are multiple ways to generate lorem ipsum text in VS Code. For example, 
                you can use the built-in Emmet extension. Open an HTML file, start typing loremand click on the option. If you need to generate a longer block of text, use lorem*N, e.g. lorem*2.
                 If you need to generate N words of lorem ipsum, use loremN. For example,lorem10generates 10 w...</p>
            </div>
           
        </div>
    </section>
  )
}
