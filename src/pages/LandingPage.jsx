import React from 'react';
// import { motion } from 'framer-motion';
import { AboutRakz, Assistance, GamePackages, Introduction, KnowledgeTest } from 'src/sections/home';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  // Define fade-in and hover animation variants
  // const fadeInVariants = {
  //   hidden: { opacity: 0, y: 20 },
  //   visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  // };

  // const hoverVariants = {
  //   scale: 1.05,
  //   transition: { duration: 0.3 },
  // };
  const navigate = useNavigate();

  return (
    <>
      {/* <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariants}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={hoverVariants}
      > */}
      <div
        style={{
          backgroundImage: 'linear-gradient(315deg, #6fceed 0%, #dde84a 74%)',
          // padding: '1rem',
          color: 'white',
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          fontFamily: 'Nutino Kufi Arabic, sans-serif',
          borderRadius: '200px',
        }}
      >
        <Introduction
          // on BrowseClick scroll to GamePackages
          onBrowseClick={() => {
            window.scrollTo({ top: 2400, behavior: 'smooth' });
          }}
          // on CreateClick scroll to Assistance
          onCreateClick={() => {
            navigate('/start-game');
          }}
        />
      </div>
      {/* </motion.div> */}

      {/* <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariants}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={hoverVariants}
      > */}
      <div
        style={{
          padding: '20px',
          margin: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
        }}
      >
        <AboutRakz />
      </div>
      {/* </motion.div> */}

      {/* <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariants}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={hoverVariants}
      > */}
      <KnowledgeTest />
      {/* </motion.div> */}
      {/* 
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariants}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={hoverVariants}
      > */}
      <GamePackages />
      {/* </motion.div> */}

      {/* <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeInVariants}
        viewport={{ once: true, amount: 0.2 }}
        whileHover={hoverVariants}
      > */}
      <Assistance />
      {/* </motion.div> */}
    </>
  );
}

export default LandingPage;
