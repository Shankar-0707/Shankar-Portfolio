"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function ClientWrapper({ children }) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
     
      

     

      

      {/* PAGE CONTENT */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}
