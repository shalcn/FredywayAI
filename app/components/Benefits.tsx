'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Benefits.module.css';
import { CheckCircle2 } from 'lucide-react';

const benefits = [
    'Menganalisa ratusan data kualitatif dalam hitungan menit — tidak lagi tenggelam dalam report yang menumpuk',
    'Menemukan akar masalah dari setiap problem yang berulang, bukan sekadar menyalahkan orang atau sistem',
    'Mengambil keputusan objektif dan terukur dengan matrix yang jelas, tanpa harus bergantung pada "gut feeling"',
    'Menyusun strategic plan eksekutif yang tidak hanya bagus di slide, tapi bisa langsung dijalankan besok',
    'Memahami potensi dan kebutuhan setiap anggota tim secara presisi menggunakan AI analytics',
    'Menghemat 10-15 jam per minggu dari pekerjaan analisa dan administrative yang bisa didelegasikan ke AI',
    'Tampil lebih percaya diri sebagai leader yang menguasai teknologi, bukan ditinggalkan oleh zaman'
];

export default function Benefits() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className={styles.section} ref={ref} id="benefits">
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2>Setelah 2 Hari, Anda Akan Mampu:</h2>
                </motion.div>

                <div className={styles.list}>
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            className={styles.item}
                            initial={{ opacity: 0, x: -30 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <CheckCircle2 className={styles.icon} />
                            <p className={styles.text}>{benefit}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
