'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Introduction.module.css';
import { ArrowRight } from 'lucide-react';

export default function Introduction() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className={styles.section} ref={ref} id="solution">
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.questionWrapper}>
                        <h3 className={styles.question}>Apakah Anda ingin tahu solusinya?</h3>
                        <div className={styles.questionDivider}></div>
                    </div>

                    <h2 className={styles.title}>Inilah Solusinya:</h2>
                    <p className={styles.description}>
                        <strong>Executive Strategic Leadership with AI</strong> adalah program praktis 2 hari yang dirancang khusus untuk <strong>EXECUTIVE</strong> yang ingin menggunakan AI sebagai <strong>ASSISTANT STRATEGIS</strong> — bukan untuk coding atau hal teknis, tapi untuk <strong>MENINGKATKAN KUALITAS KEPUTUSAN ANDA</strong> dalam waktu yang jauh lebih cepat.
                    </p>

                    <div className={styles.ctaWrapper}>
                        <button className="btn btn-primary" onClick={() => document.getElementById('pillars')?.scrollIntoView({ behavior: 'smooth' })}>
                            Pelajari 4 Skill Strategisnya
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
