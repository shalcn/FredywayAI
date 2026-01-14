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
        <section className={styles.section} ref={ref}>
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className={styles.title}>Inilah Solusinya:</h2>
                    <p className={styles.description}>
                        <strong>Executive Strategic Leadership with AI</strong> adalah program praktis 2 hari yang dirancang khusus untuk <strong>EXECUTIVE</strong> yang ingin menggunakan AI sebagai <strong>ASSISTANT STRATEGIS</strong> — bukan untuk coding atau hal teknis, tapi untuk <strong>MENINGKATKAN KUALITAS KEPUTUSAN ANDA</strong> dalam waktu yang jauh lebih cepat.
                    </p>

                    <div className={styles.pillarLink}>
                        Anda akan belajar menggunakan AI untuk <span className="gradient-text">4 Pilar Kepemimpinan Eksekutif</span>:
                        <br />
                        <div className={styles.pillarFlow}>
                            Analisa Data <ArrowRight size={20} className={styles.arrowIcon} />
                            Problem Solving <ArrowRight size={20} className={styles.arrowIcon} />
                            Decision Making <ArrowRight size={20} className={styles.arrowIcon} />
                            Strategic Planning
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
