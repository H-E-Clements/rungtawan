import React from 'react';
import Image from 'next/image';

function AboutUs() {
  return (
    <div className="w-full h-[500px] flex justify-center items-center">
      <div className="w-250 h-[400px] rounded-xl flex items-center px-12 relative"> 
        
        <div className="relative w-1/2 h-full">
          
          <div className="absolute bottom-[-20px] left-0 w-[220px] h-[280px] z-10">
            <Image
              src="/photos/about/about-statue2.jpg"
              alt="About us image 1"
              fill
              className="object-cover rounded-2xl shadow-xl"
            />
          </div>

          <div className="absolute top-[-20px] left-[120px] w-[220px] h-[280px] z-20">
            <Image
              src="/photos/about/about-kung.jpg"
              alt="About us image 2"
              fill
              className="object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>

        <div className="w-1/2 text-white pl-8">
			<h1 className="text-4xl font-bold text-emerald-900">Who are we?</h1>
			<p className="mt-4 opacity-90 text-gray-800">
				Traditional Thai massage is an ancient healing art that has been practised in Thailand for centuries. It focuses on releasing tension, improving flexibility, 
				and restoring the body’s natural balance through rhythmic pressure and guided movement.
			</p>
			<br />
			<p className="opacity-90 text-gray-800">
				Our therapist trained in Thailand, where she learned authentic techniques rooted in this long-standing tradition. 
				Bringing this knowledge and experience to every treatment, she combines professional expertise with a personal, 
				caring approach to help clients relax, recover, and feel their best.
			</p>
        </div>
        
      </div>
    </div>
  );
}

export default AboutUs;