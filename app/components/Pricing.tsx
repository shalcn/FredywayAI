'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Pricing.module.css';
import { CheckCircle2, Clock, Zap, Gem } from 'lucide-react';
import RegisterModal from './RegisterModal';
import { landingDataRef } from '@/lib/firebase';
import { onValue } from 'firebase/database';

export default function Pricing() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventData, setEventData] = useState({
        earlyBirdDate: '1 Februari 2026',
        ebHeader: 'EARLY BIRD BERAKHIR 1 FEBRUARI 2026!',
        ebNormalCard: 'Untuk pendaftaran setelah 1 Februari 2026',
        ebEBCard: 'Bayar Sebelum 1 Februari 2026'
    });

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        // Set up real-time listener
        const unsubscribe = onValue(landingDataRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setEventData({
                    earlyBirdDate: data.earlyBirdDate || '1 Februari 2026',
                    ebHeader: data.ebHeader || 'EARLY BIRD BERAKHIR 1 FEBRUARI 2026!',
                    ebNormalCard: data.ebNormalCard || 'Untuk pendaftaran setelah 1 Februari 2026',
                    ebEBCard: data.ebEBCard || 'Bayar Sebelum 1 Februari 2026'
                });
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <section className={styles.section} ref={ref} id="pricing">
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2>Investasi untuk Masa Depan Kepemimpinan Anda</h2>
                    <p className={styles.urgency}>
                        <Clock size={20} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'text-bottom' }} /> <strong>{eventData.ebHeader.toUpperCase()}</strong> Daftar sekarang dan hemat Rp 1.5 Juta. Kuota terbatas 30 peserta.
                    </p>
                </motion.div>

                <div className={styles.pricingCards}>
                    <motion.div
                        className={styles.pricingCard}
                        initial={{ opacity: 0, x: -50 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className={styles.cardHeader}>
                            <h3>HARGA NORMAL</h3>
                            <p className={styles.cardSubtitle}>{eventData.ebNormalCard}</p>
                        </div>
                        <div className={styles.price}>
                            <span className={styles.currency}>Rp</span>
                            <span className={styles.amount}>6.000.000</span>
                        </div>
                    </motion.div>

                    <motion.div
                        className={`${styles.pricingCard} ${styles.featured}`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className={styles.badge} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Zap size={16} fill="currentColor" /> EARLY BIRD - HEMAT 25%
                        </div>
                        <div className={styles.cardHeader}>
                            <h3>EARLY BIRD</h3>
                            <p className={styles.cardSubtitle}>{eventData.ebEBCard}<br />Hemat Rp 1.500.000 !</p>
                        </div>
                        <div className={styles.price}>
                            <span className={styles.currency}>Rp</span>
                            <span className={styles.amount}>4.500.000</span>
                        </div>
                        <button className="btn btn-primary" style={{
                            width: '100%',
                            marginTop: '2rem',
                            background: '#FFD700',
                            border: 'none',
                            color: '#1a1a1a',
                            fontWeight: '700'
                        }} onClick={() => setIsModalOpen(true)}>
                            Daftar Sekarang
                        </button>
                    </motion.div>
                </div>

                <RegisterModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                <motion.div
                    className={styles.includes}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <h3>

                        Yang Anda Dapatkan:
                    </h3>
                    <div className={styles.includesList}>
                        <div className={styles.includeItem}>
                            <CheckCircle2 />
                            <span>2 Hari Training Intensif (09:00-16:00)</span>
                        </div>
                        <div className={styles.includeItem}>
                            <CheckCircle2 />
                            <span>Modul & Materi Lengkap dalam bentuk Digital</span>
                        </div>
                        <div className={styles.includeItem}>
                            <CheckCircle2 />
                            <span>Template Prompt AI Siap Pakai untuk berbagai situasi & kebutuhan Kepemimpinan</span>
                        </div>
                        <div className={styles.includeItem}>
                            <CheckCircle2 />
                            <span>Certificate of Completion</span>
                        </div>
                        <div className={styles.includeItem}>
                            <CheckCircle2 />
                            <span>Coffee Break & Lunch Setiap Hari</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    className={styles.guarantee}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <h3 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                        <Gem size={28} color="var(--gold-main)" /> Jaminan Kepuasan 100%
                    </h3>
                    <p>
                        Jika setelah Hari Pertama Anda merasa program ini tidak sesuai ekspektasi, Anda bisa meminta <strong>FULL REFUND</strong> tanpa pertanyaan apapun.
                        <br />Kami yakin Anda akan mendapatkan value yang jauh melebihi investasi Anda.
                    </p>
                </motion.div>

                <motion.div
                    className={styles.inhouse}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1 }}
                >
                    <h3>TERSEDIA JUGA INHOUSE-TRAINING PERUSAHAAN ANDA</h3>
                </motion.div>
            </div>
        </section>
    );
}
