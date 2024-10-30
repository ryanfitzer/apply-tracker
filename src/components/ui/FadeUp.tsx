import { motion, useInView } from "framer-motion";

import { useRef } from "react";

const FadeUp = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <motion.div
            ref={ref}
            variants={{
                hidden: { opacity: 0, y: 25 },
                show: { opacity: 1, y: 0 }
            }}
            initial={false}
            animate={isInView ? "show" : "hidden"}
            transition={{
                duration: 0.5,
                delay: 0.2,
                ease: "easeOut"
            }}
        >
            {children}
        </motion.div>
    );
};

export default FadeUp;
