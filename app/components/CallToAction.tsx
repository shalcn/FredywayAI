'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './CallToAction.module.css';
import { Sparkles } from 'lucide-react';

export default function CallToAction() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className={styles.section} ref={ref}>
            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className={styles.sparkleWrapper}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Sparkles className={styles.sparkleIcon} />
                    </motion.div>

                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Anda Mau Tau Solusinya?
                    </motion.h2>

                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Temukan bagaimana <span className="gradient-text">AI dapat menjadi asisten strategis Anda</span> untuk menyelesaikan semua tantangan tersebut — tanpa perlu jadi programmer atau tech expert.
                    </motion.p>

                    <motion.button
                        className={`btn btn-primary ${styles.ctaButton}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        onClick={() => {
                            document.getElementById('event-details')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                    >
                        Ya, Saya Mau Tau! →
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
