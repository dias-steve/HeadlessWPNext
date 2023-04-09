import React, { ReactNode } from 'react'
import { motion } from "framer-motion";




function AnimatedPage({children, exitHome}:{children: ReactNode, exitHome: boolean} ) {
    const transition ={
        duration: 0.7,
        ease:[0.6,0.01,0.05,0.9]
    }
    const animations = {
        initial:{ y: 100, opacity: 0 },
        animate:{ y: 0, opacity: 1, transition:{delay:0.2, ...transition} },
        exit:exitHome? { opacity: 0, transition:{delay:0.2, ...transition}} :
        { y:100, opacity: 0, transition:{delay:0.2, ...transition}},
    }
  return (

    <motion.div  variants={animations} initial="initial" animate='animate' exit="exit" >
      {children}
    </motion.div>

  )
}

export default AnimatedPage
