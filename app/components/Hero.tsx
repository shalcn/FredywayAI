'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Hero.module.css';
import { Rocket } from 'lucide-react';

export default function Hero() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className={styles.hero} ref={ref}>
            <div className={styles.background}>
                <img
                    src="/images/uploaded_image_0_1768389051108.png"
                    alt="AI Technology Background"
                    className={styles.bgImage}
                />
                <div className={styles.overlay}></div>
            </div>

            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className={styles.mainHeading}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <span className={styles.rocketWrapper}>
                            <Rocket className={styles.rocketIconInner} />
                        </span> Leader Tanpa AI Akan Tertinggal
                    </motion.h1>

                    <motion.h2
                        className={styles.subHeading}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        4 Skill Kritis yang Sekarang Bisa Diselesaikan <span className="gradient-text">10x Lebih Cepat</span>
                    </motion.h2>

                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Transformasi dari Executive yang KEWALAHAN menjadi Leader yang MENGUASAI Data, Keputusan, dan Strategi dengan Bantuan&nbsp;AI
                    </motion.p>

                    <motion.div
                        className={styles.ctaButtons}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <button className="btn btn-primary" onClick={() => {
                            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            Amankan Slot Anda & Mulai Bertransformasi
                        </button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
