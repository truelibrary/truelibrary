import { motion } from "framer-motion";
import classes from "./PageTransition.module.css";

const PageTransition = (Component: React.ComponentType) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className={classes.container}
  >
    <Component />
  </motion.div>
);

export default PageTransition;
