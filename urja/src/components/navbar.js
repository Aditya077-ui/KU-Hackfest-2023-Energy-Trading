import React, { useState, useEffect } from 'react'
//import { ethers } from "ethers"
// import { AiOutlineMenu } from 'react-icons/ai'
// import { IoClose } from 'react-icons/io5'
// import navLinks from '@/Data/navLinks'
import {Link} from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { parentVariants, childVariants } from '../Animations/common'
import {
    mobileContainer,
    mobileFlexContainer,
    mobileLinkVariants,
} from '../Animations/mobilenav'
import "./navbar.css";
function Navbar() {
    const [nav, setNav] = useState(false)


    const toggleNav = () => {
        setNav((prev) => {
            return !prev
        })
    }
    const styles = {
        btn: 'px-5 rounded-md font-medium border-indigo-600 py-2 bg-indigo-600 hover:bg-indigo-700 hover:border-indigo-700',
        navLink: 'hover:text-indigo-600 duration-200 ease-in-out',
        mobileNavLink:
            'hover:text-indigo-600 duration-200 ease-in-out border-b border-white  text-center',
    }

    return (
        <>
            <nav className='fixed top-0 w-full z-50 p-4 bg-white shadow-xl'>
                <div className='container mx-auto max-w-6xl relative'>
                    <motion.div
                        variants={parentVariants}
                        initial='hidden'
                        animate='show'
                        className='navbarContent'
                    >
                        <motion.h1
                            variants={childVariants}
                            className='text-2xl font-bold uppercase text-transparent bg-clip-text bg-black nav-logo'
                        >
                            <img src={require('./Asset.png')} alt="Urja Logo" className='logoImage'/>
                            <Link href="/"><span className=''>Urja</span></Link>
                        </motion.h1>
                        <motion.h1
                            variants={childVariants}
                            className='text-2xl font-bold text-transparent bg-clip-text bg-black'
                        >
                            <span className=''>Energy Trading</span> Marketplace
                        </motion.h1>
                        <motion.div
                            variants={childVariants}
                            className='lg:hidden'
                            onClick={toggleNav}
                        >
                        </motion.div>
                        <AnimatePresence>
                            {nav && (
                                <motion.div
                                    variants={mobileContainer}
                                    initial='hidden'
                                    animate='show'
                                    exit='hidden'
                                    className='absolute top-14 bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 z-50 w-full px-28 py-8 rounded-lg'
                                >
                                    <motion.div
                                        variants={mobileFlexContainer}
                                        className='flex flex-col items-center space-y-6 '
                                    >
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </nav>
        </>
    )
}

export default Navbar