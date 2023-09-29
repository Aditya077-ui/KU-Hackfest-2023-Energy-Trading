import React from 'react'
import { motion } from 'framer-motion'
import Login from './auth'
import {Link, Navigate, useNavigate} from "react-router-dom"




const Hero = () => {
    const navigate = useNavigate();
    const styles = {
        bgGradient:
            'bg-gradient-to-br to-orange-600/20 via-fuchsia-600/20 from-indigo-600/20',
        btn: 'px-5 rounded-md font-medium border-indigo-600 py-2 bg-indigo-600 hover:bg-indigo-700 hover:border-indigo-700',
    }

    const parentVariants = {
        hidden: { x: -300, opacity: 0 },
        show: {
            x: 0,
            opacity: 1,
            transition: { when: 'beforeChildren', staggerChildren: 0.3 },
        },
    }
    const VideoVariants = {
        hidden: { x: 400, opacity: 0 },
        show: {
            x: 0,
            opacity: 1,
            transition: { delay: 0.5 },
        },
    }
    const childVariants = {
        hidden: { x: -300, opacity: 0 },
        show: {
            x: 0,
            opacity: 1,
        },
    }

   
    const navigateToSignup = () => {
        console.log('hello');
        navigate("/auth");
    }

    return (
        <>
            <section
                className={`py-36 p-4 md:py-52 relative overflow-hidden text-white ${styles.bgGradient}`}
            >
                {/* Backgound */}
                <motion.div
                    variants={parentVariants}
                    initial='hidden'
                    animate='show'
                    className='absolute  inset-0 bg-no-repeat bg-bottom -z-10'
                >
                    <motion.img
                        variants={VideoVariants}
                        src='/images.png'
                        alt=''
                        className='object-cover w-full h-full'
                    />
                </motion.div>
                {/* Content */}
               
                <div className='container max-w-6xl mx-auto'>
                    <div className='flex justify-center items-center'>
                    <motion.div
                        variants={parentVariants}
                        initial='hidden'
                        animate='show'
                        className='flex flex-col space-y-6 items-start'
                    >
                        {/* Heading */}
                        <motion.h1
                            variants={childVariants}
                            className='text-5xl font-bold max-w-lg leading-normal text-black'
                            style={{fontSize:"48px"}}
                        >
                            Solar Energy Trading
                        </motion.h1>
                        {/* Paragraph */}
                        <motion.p variants={childVariants} className='max-w-lg leading-6 text-black' style={{fontSize:"20px"}}>
                            We are a huge marketplace dedicated to connecting great artist of
                            all around the world with their fans and unique token collectors!
                        </motion.p>
                        {/* CTA */}
                        <motion.button variants={childVariants} className={styles.btn} onClick={navigateToSignup} style={{fontSize:"20px"}}>
                            Connect to Metamask
                        </motion.button>
                    </motion.div>
                    
                    </div>
                </div>
                
            </section>
        </>
    )
}

export default Hero