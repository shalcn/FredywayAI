'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './FourPillars.module.css';
import { BarChart3, Search, Zap, Target, CheckCircle2, ArrowRight } from 'lucide-react';

const pillars = [
    {
        number: '1',
        title: 'ANALISA DATA dengan AI',
        subtitle: 'Mengubah Informasi Berantakan Jadi Insight Tajam',
        points: [
            'Cara analisa laporan kualitatif dari puluhan supervisor dalam 5 menit',
            'Menemukan pola keluhan pelanggan dari ratusan chat WhatsApp',
            'Identifikasi tren kinerja tim tanpa harus baca satu per satu',
            'Template prompt siap pakai untuk berbagai jenis data'
        ],
        icon: <BarChart3 />
    },
    {
        number: '2',
        title: 'PROBLEM SOLVING dengan AI',
        subtitle: 'Temukan Akar Masalah, Bukan Sekadar Gejala',
        points: [
            'Teknik 5 Whys menggunakan AI untuk root cause analysis',
            'Teknik fishbone menggunakan AI untuk menemukan klasifikasi penyebab masalah',
            'Framework untuk mengatasi masalah berulang secara permanen'
        ],
        icon: <Search />
    },
    {
        number: '3',
        title: 'DECISION MAKING dengan AI',
        subtitle: 'Putuskan dengan Data, Bukan Perasaan',
        points: [
            'Matriks perbandingan objektif untuk memilih vendor, kandidat, berbagai keputusan atau opsi kebijakan hanya dalam hitungan menit saja',
            'Identifikasi blind spot dan risiko tersembunyi dalam keputusan Anda',
            'Teknik Impact vs Effort untuk menentukan quick wins'
        ],
        icon: <Zap />
    },
    {
        number: '4',
        title: 'STRATEGIC PLANNING dengan AI',
        subtitle: 'Dari Konsep Abstrak ke Action Plan Konkret',
        points: [
            'Menyusun monthly and weekly plan secara terintegrasi dengan dasar risk management yang jelas memakai bantuan AI',
            'Performance strategy untuk boost produktivitas tim'
        ],
        icon: <Target />
    }
];

export default function FourPillars() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className={styles.section} ref={ref} id="pillars">
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <span className={styles.tagline}>FITUR & VALUE YANG DIDAPAT</span>
                    <h2>Kuasai AI untuk <span className="gradient-text">4 Skill Kepemimpinan Eksekutif</span></h2>
                </motion.div>

                <div className={styles.pillarsContainer}>
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={index}
                            className={styles.pillarCard}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                            <div className={styles.pillarNumber}>{pillar.number}</div>
                            <div className={styles.pillarIcon}>{pillar.icon}</div>
                            <h3>{pillar.title}</h3>
                            <p className={styles.subtitle}>{pillar.subtitle}</p>
                            <ul className={styles.pointsList}>
                                {pillar.points.map((point, idx) => (
                                    <li key={idx}>
                                        <CheckCircle2 className={styles.checkmark} />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className={styles.bonus}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    <div className={styles.bonusTag}>
                        BONUS
                    </div>
                    <h3>Talent Analytics with AI</h3>
                    <div className={styles.bonusContent}>
                        <p>
                            <CheckCircle2 size={20} className={styles.bonusIcon} />
                            <strong>Employee Psychological Capital Scale (PsyCap)</strong> – mengukur tingkat hope, efficacy, resilience, dan optimism karyawan untuk memetakan daya juang, ketahanan mental, dan kesiapan menghadapi tekanan kerja.
                        </p>
                        <p>
                            <CheckCircle2 size={20} className={styles.bonusIcon} />
                            <strong>Workplace Communication Skills Scale (WCSS)</strong> – menilai kualitas komunikasi kerja karyawan (kejelasan pesan, active listening, asertivitas, dan kolaborasi) untuk mengidentifikasi gap komunikasi yang memicu miskom dan konflik.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
