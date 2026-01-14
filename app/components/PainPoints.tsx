'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './PainPoints.module.css';
import { BarChart3, RefreshCw, Scale, ClipboardList, Clock, Brain } from 'lucide-react';

const painPoints = [
    {
        icon: <BarChart3 className={styles.icon} />,
        title: 'Tenggelam Dalam Data',
        description: 'Setiap hari menerima puluhan laporan, email, dan report dari berbagai divisi. Tapi bingung mencari polanya. Mana yang urgent? Mana yang penting? Data menumpuk, insight tidak muncul.'
    },
    {
        icon: <RefreshCw className={styles.icon} />,
        title: 'Problem Yang Sama Terus Berulang',
        description: 'Masalah yang sama muncul lagi dan lagi. Sudah meeting berkali-kali, tapi hanya membenahi gejalanya saja. Akar masalahnya tidak pernah tersentuh karena tidak tahu cara mengurainya secara sistematis.'
    },
    {
        icon: <Scale className={styles.icon} />,
        title: 'Keputusan Sulit Tanpa Kejelasan',
        description: 'Harus pilih antara Vendor A atau B, Kandidat X atau Y, Strategi P atau Q. Merasa keputusan yang diambil masih based on "feeling" karena tidak ada framework objektif untuk menimbangnya.'
    },
    {
        icon: <ClipboardList className={styles.icon} />,
        title: 'Rencana Strategis Hanya di Kertas',
        description: 'Sudah bikin strategic plan bagus di awal tahun. Tapi pas mau eksekusi, bingung mulai dari mana. Tidak ada langkah-langkah konkret yang jelas. Akhirnya jalan di tempat.'
    },
    {
        icon: <Clock className={styles.icon} />,
        title: 'Waktu Habis untuk Hal Administratif',
        description: '80% waktu Anda habis untuk urusan teknis, meeting tanpa hasil, dan firefighting masalah harian. Tidak ada waktu untuk berpikir strategis dan mengembangkan tim.'
    },
    {
        icon: <Brain className={styles.icon} />,
        title: 'Merasa Ketinggalan Zaman AI',
        description: 'Semua orang bicara AI. Tapi Anda tidak tahu harus mulai dari mana. Takut kelihatan gaptek, tapi juga bingung bagaimana AI bisa benar-benar membantu pekerjaan executive sehari-hari.'
    }
];

export default function PainPoints() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className={styles.section} ref={ref} id="about">
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2>Apakah Ini Yang Anda Rasakan Setiap Hari?</h2>
                    <p>Tantangan yang dihadapi executive modern dalam mengelola bisnis di era digital</p>
                </motion.div>

                <div className={styles.grid}>
                    {painPoints.map((point, index) => (
                        <motion.div
                            key={index}
                            className={styles.card}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <div className={styles.iconWrapper}>
                                {point.icon}
                            </div>
                            <h3>{point.title}</h3>
                            <p>{point.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
