import React from 'react'
import { motion } from 'framer-motion'

export default function Loading() {

  return (
    <motion.div className='loading'
        animate={{y: '-2vw'}}
        transition={{
            repeat: Infinity,
            repeatType: "reverse",
            type: "tween",
            duration: 1,
            repeatDelay: 0.025
        }}
        >
        Loading
        <motion.div
            animate={{y: '-2vw'}}
            transition={{
                repeat: Infinity,
                repeatType: "reverse",
                type: "tween",
                duration: 0.25,
                repeatDelay: 0.025
            }}
        >.</motion.div>

        <motion.div
            animate={{y: '-2vw'}}
            transition={{
                repeat: Infinity,
                repeatType: "reverse",
                type: "tween",
                duration: 0.25,
                delay: 0.05,
                repeatDelay: 0.025
            }}
        >.</motion.div>

        <motion.div
            animate={{y: '-2vw'}}
            transition={{
                repeat: Infinity,
                repeatType: "reverse",
                type: "tween",
                duration: 0.25,
                delay: 0.075,
                repeatDelay: 0.025
            }}
        >.</motion.div>

    </motion.div>
  )
}
