'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import styles from './EventDetails.module.css';
import { Calendar, MapPin, Clock, AlertTriangle, Sparkles } from 'lucide-react';
import { landingDataRef } from '@/lib/firebase';
import { onValue } from 'firebase/database';

export default function EventDetails() {
    const [eventData, setEventData] = useState({
        date: '24 - 25 Februari 2026',
        time: '09:00 - 16:00 WIB',
        location: 'Hotel Grand Mercure, Kemayoran, Jakarta',
        earlyBirdDate: '1 Februari 2026'
    });

    useEffect(() => {
        // Set up real-time listener
        const unsubscribe = onValue(landingDataRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setEventData(data);
            }
        }, (error) => {
            console.error('Failed to load event data via real-time listener', error);
        });

        // Clean up listener on unmount
        return () => unsubscribe();
    }, []);

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className={styles.section} ref={ref} id="event-details">
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.badge}>
                        <Sparkles size={18} />
                        <span>Program Eksklusif</span>
                    </div>
                    <h2>Executive Strategic Leadership with AI</h2>
                    <p className={styles.subtitle}>Program 2 Hari Intensif untuk Executive yang Ingin Menguasai AI sebagai Alat Booster untuk Analisa Data, Problem Solving, Decision Making & Strategic Planning</p>
                </motion.div>

                <motion.div
                    className={styles.eventInfo}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <div className={styles.infoCard}>
                        <Calendar className={styles.icon} />
                        <div>
                            <div className={styles.infoLabel}>Tanggal</div>
                            <div className={styles.infoValue}>{eventData.date}</div>
                        </div>
                    </div>
                    <div className={styles.infoCard}>
                        <MapPin className={styles.icon} />
                        <div>
                            <div className={styles.infoLabel}>Lokasi</div>
                            <div className={styles.infoValue}>{eventData.location}</div>
                        </div>
                    </div>
                    <div className={styles.infoCard}>
                        <Clock className={styles.icon} />
                        <div>
                            <div className={styles.infoLabel}>Waktu</div>
                            <div className={styles.infoValue}>{eventData.time}</div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className={styles.urgency}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <AlertTriangle size={20} />
                    <span><strong>Early Bird berakhir {eventData.earlyBirdDate || '1 Februari 2026'}</strong> • Kuota terbatas 30 peserta</span>
                </motion.div>

                <motion.div
                    className={styles.ctaButtons}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <button className="btn btn-primary" onClick={() => {
                        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        Daftar Sekarang - Hemat Rp 1.5 Juta
                    </button>
                    <button className="btn btn-secondary" onClick={() => {
                        document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        Lihat Detail Program
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
