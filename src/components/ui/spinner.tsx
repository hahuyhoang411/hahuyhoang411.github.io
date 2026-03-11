import { motion } from "framer-motion";

const Spinner = ({ className = "" }: { className?: string }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="size-8 border-2 border-primary border-t-transparent rounded-full"
    />
  </div>
);

export { Spinner };
