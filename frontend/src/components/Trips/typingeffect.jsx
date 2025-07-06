
import Typewriter from "typewriter-effect";

export default function TypingEffect({title , className}) {
  return (
   
        <div className="w-full">
      <div className= {`flex justify-center items-start ${className} text-black text-2xl font-mono w-full`}>
        <div className="relative w-full">
          <span className="invisible">{title}</span> 
          <div className="absolute top-0 left-0 w-full overflow-hidden">
            <Typewriter
              options={{
                strings: [title],
                autoStart: true,
                loop: true,
                delay: 80,
                deleteSpeed: 30,
              }}
            />
          </div>
        </div>
      </div>
    </div>
      

  );
}
