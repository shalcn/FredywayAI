'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Hero.module.css';
import { Calendar, MapPin, Clock, Rocket, AlertTriangle } from 'lucide-react';

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
                        </span> AI Bukan Akan Gantikan Anda.
                    </motion.h1>

                    <motion.h2
                        className={styles.subHeading}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        Tapi Leader yang <span className="gradient-text">Pakai AI</span> AKAN Gantikan Leader yang Tidak.
                    </motion.h2>

                    <motion.p
                        className={styles.description}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        Program 2 Hari Intensif untuk Executive yang Ingin Menguasai AI<br />
                        Sebagai <strong>ALAT BOOSTER</strong> untuk Analisa Data, Problem Solving,<br />
                        Decision Making & Strategic Planning
                    </motion.p>

                    <motion.div
                        className={styles.eventInfo}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <div className={styles.infoCard}>
                            <Calendar className={styles.icon} />
                            <div>
                                <div className={styles.infoLabel}>Tanggal</div>
                                <div className={styles.infoValue}>24-25 Februari 2026</div>
                            </div>
                        </div>
                        <div className={styles.infoCard}>
                            <MapPin className={styles.icon} />
                            <div>
                                <div className={styles.infoLabel}>Lokasi</div>
                                <div className={styles.infoValue}>Grand Mercure, Jakarta</div>
                            </div>
                        </div>
                        <div className={styles.infoCard}>
                            <Clock className={styles.icon} />
                            <div>
                                <div className={styles.infoLabel}>Waktu</div>
                                <div className={styles.infoValue}>09:00 - 16:00 WIB</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className={styles.ctaButtons}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        <button className="btn btn-primary" onClick={() => {
                            document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            Daftar Sekarang - Hemat Rp 1.5 Juta
                        </button>
                        <button className="btn btn-secondary" onClick={() => {
                            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            Pelajari Lebih Lanjut
                        </button>
                    </motion.div>

                    <motion.div
                        className={styles.urgency}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 1.2 }}
                    >
                        <AlertTriangle size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> <strong>Early Bird berakhir 1 Februari 2026</strong> • Kuota terbatas 30 peserta
                    </motion.div>
                </motion.div>
            </div>

        </section>
    );
}
