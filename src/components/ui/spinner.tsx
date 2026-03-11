import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const Spinner = ({ className }: { className?: string }) => (
  <div role="status" className={cn("flex justify-center items-center", className)}>
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="size-8 border-2 border-primary border-t-transparent rounded-full"
    />
    <span className="sr-only">Loading…</span>
  </div>
);

export { Spinner };
