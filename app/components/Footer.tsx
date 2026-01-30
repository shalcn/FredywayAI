'use client';

import styles from './Footer.module.css';
import { useState, useEffect } from 'react';
import { Phone, Mail, Globe, Calendar, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { landingDataRef } from '@/lib/firebase';
import { onValue } from 'firebase/database';

export default function Footer() {
    // Initialize state from localStorage if available, otherwise use defaults
    const [eventData, setEventData] = useState(() => {
        if (typeof window !== 'undefined') {
            const cached = localStorage.getItem('eventData');
            if (cached) {
                try {
                    return JSON.parse(cached);
                } catch (e) {
                    console.error('Failed to parse cached event data:', e);
                }
            }
        }
        return {
            date: '24 - 25 Februari 2026',
            time: '09:00 - 16:00 WIB',
            location: 'Hotel Grand Mercure, Kemayoran, Jakarta',
            earlyBirdDate: '1 Februari 2026'
        };
    });

    useEffect(() => {
        // Set up real-time listener
        const unsubscribe = onValue(landingDataRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const newEventData = {
                    date: data.date || '24 - 25 Februari 2026',
                    time: data.time || '09:00 - 16:00 WIB',
                    location: data.location || 'Hotel Grand Mercure, Kemayoran, Jakarta',
                    earlyBirdDate: data.earlyBirdDate || '1 Februari 2026',
                    waNumber: data.waNumber || '6287775730572'
                };
                setEventData(newEventData);
                // Cache to localStorage
                if (typeof window !== 'undefined') {
                    localStorage.setItem('eventData', JSON.stringify(newEventData));
                }
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <footer className={styles.footer} id="register">
            <div className={styles.cta}>
                <div className="container">
                    <h2>Jangan Tunda Lagi.</h2>
                    <h3>Masa Depan Kepemimpinan Anda Dimulai Hari Ini.</h3>
                    <div className={styles.ctaButtons}>
                        <button className={`${styles.ctaButton} btn btn-primary`} onClick={() => {
                            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            Daftar Sekarang - Hemat Rp 1.5 Juta
                        </button>
                        <button className={`${styles.ctaButton} btn btn-secondary`} onClick={() => {
                            document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' });
                        }}>
                            Lihat Detail Program
                        </button>
                    </div>


                    <div className={styles.warning}>
                        <div className={styles.warningHeader}>
                            <AlertTriangle size={24} />
                            <strong>PERHATIAN:</strong>
                        </div>
                        <p className={styles.warningText}>
                            Kuota terbatas hanya untuk 30 peserta karena kami ingin memastikan setiap peserta mendapat perhatian maksimal dan bisa praktik langsung. Early Bird berakhir {eventData.earlyBirdDate}. Setelah itu harga naik <span style={{ whiteSpace: 'nowrap' }}>Rp 1.5 Juta.</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.footerMain}>
                <div className="container">
                    <div className={styles.footerGrid}>
                        <div className={styles.footerBrand}>
                            <img src="/images/LOGO BUNDAR.PNG" alt="Freddway Coaching Consulting" className={styles.footerLogo} />
                            <p>25+ Tahun Mengembangkan Leader Indonesia</p>
                        </div>

                        <div className={styles.footerContact}>
                            <h4>Hubungi Kami</h4>
                            <div className={styles.contactItem}>
                                <Phone size={20} />
                                <span>WhatsApp:<a href={`https://wa.me/${eventData.waNumber || '6287775730572'}?text=${encodeURIComponent("Halo, saya ingin tanya seputar program ini...")}`} target="_blank" rel="noopener noreferrer" style={{ color: '#3182ce', textDecoration: 'underline' }}>+{eventData.waNumber || '6287775730572'}</a></span>

                            </div>
                            <div className={styles.contactItem}>
                                <Mail size={20} />
                                <span>Email: <a href="mailto:sensenadiwanata@gmail.com" style={{ color: '#3182ce', textDecoration: 'underline' }}>sensenadiwanata@gmail.com</a></span>
                            </div>
                            <div className={styles.contactItem}>
                                <Globe size={20} />
                                <span>Website: freddway.com</span>
                            </div>
                        </div>

                        <div className={styles.footerEvent}>
                            <h4>Detail Event</h4>
                            <div className={styles.eventDetail}>
                                <span className={styles.label}>
                                    <Calendar size={18} />
                                    Tanggal:
                                </span>
                                <span className={styles.value}>{eventData.date}</span>
                            </div>
                            <div className={styles.eventDetail}>
                                <span className={styles.label}>
                                    <MapPin size={18} />
                                    Lokasi:
                                </span>
                                <span className={styles.value}>{eventData.location}</span>
                            </div>
                            <div className={styles.eventDetail}>
                                <span className={styles.label}>
                                    <Clock size={18} />
                                    Waktu:
                                </span>
                                <span className={styles.value}>{eventData.time}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.copyright}>
                <p>© 2026 Freddway Coaching & Consulting. All Rights Reserved.</p>
            </div>
        </footer>
    );
}
