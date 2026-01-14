'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Facilitator.module.css';
import { CheckCircle2 } from 'lucide-react';

export default function Facilitator() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className={styles.section} ref={ref} id="facilitator">
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2>Difasilitasi Oleh</h2>
                </motion.div>

                <motion.div
                    className={styles.facilitatorCard}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className={styles.imageWrapper}>
                        <img
                            src="/images/uploaded_image_2_1768389051108.PNG"
                            alt="Dr. Freddy Liong"
                            className={styles.facilitatorImage}
                        />
                        <div className={styles.imageBadge}>
                            <img
                                src="/images/LOGO BUNDAR.PNG"
                                alt="Freddway Logo"
                                className={styles.badgeLogo}
                            />
                        </div>
                    </div>

                    <div className={styles.content}>
                        <h3>Dr. Freddy Liong, MBA, CBA, ACMC</h3>
                        <p className={styles.title}>Founder Freddway Coaching & Consulting</p>

                        <div className={styles.credentials}>
                            <div className={styles.credItem}>
                                <CheckCircle2 className={styles.checkIcon} />
                                <span>25+ tahun pengalaman melatih lebih dari 500 perusahaan korporat di Indonesia</span>
                            </div>
                            <div className={styles.credItem}>
                                <CheckCircle2 className={styles.checkIcon} />
                                <span>Certified Behavior Analyst & Associate Certified Meta Coach</span>
                            </div>
                            <div className={styles.credItem}>
                                <CheckCircle2 className={styles.checkIcon} />
                                <span>Doktoral in Leadership</span>
                            </div>
                            <div className={styles.credItem}>
                                <CheckCircle2 className={styles.checkIcon} />
                                <span>Spesialis Leadership Development, Family Business Consulting & Strategic Planning</span>
                            </div>
                            <div className={styles.credItem}>
                                <CheckCircle2 className={styles.checkIcon} />
                                <span>Pioneer dalam mengintegrasikan AI dengan praktik kepemimpinan tradisional</span>
                            </div>
                            <div className={styles.credItem}>
                                <CheckCircle2 className={styles.checkIcon} />
                                <span>Praktisi yang mengajar dari pengalaman nyata, bukan teori semata</span>
                            </div>
                        </div>

                        <div className={styles.quote}>
                            <div className={styles.quoteIcon}>"</div>
                            <p>
                                Dalam 5 tahun ke depan, perbedaan antara leader yang sukses dan yang tertinggal bukan soal siapa yang lebih pintar atau lebih berpengalaman. Tapi siapa yang lebih cepat beradaptasi menggunakan AI sebagai alat untuk memperkuat kepemimpinan mereka.
                            </p>
                            <div className={styles.quoteAuthor}>— Dr. Freddy Liong, MBA, CBA, ACMC</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
