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
                    earlyBirdDate: data.earlyBirdDate || '1 Februari 2026'
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
                    <button className="btn btn-primary" style={{ fontSize: '1.25rem', padding: '1.25rem 3rem' }} onClick={() => {
                        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    }}>
                        Daftar Sekarang - Hemat Rp 1.5 Juta
                    </button>
                    <div className={styles.warning}>
                        <div className={styles.warningHeader}>
                            <AlertTriangle size={24} />
                            <strong>PERHATIAN:</strong>
                        </div>
                        <p className={styles.warningText}>
                            Kuota terbatas hanya untuk 30 peserta karena kami ingin memastikan setiap peserta mendapat perhatian maksimal dan bisa praktik langsung. Early Bird berakhir {eventData.earlyBirdDate}. Setelah itu harga\u00A0naik\u00A0Rp\u00A01.5\u00A0Juta.
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
                                <span>WhatsApp: Kak Andersen (<a href="https://wa.me/6287775730572" target="_blank" rel="noopener noreferrer" style={{ color: '#3182ce', textDecoration: 'underline' }}>+62 877-7573-0572</a>)</span>
                            </div>
                            <div className={styles.contactItem}>
                                <Mail size={20} />
                                <span>Email: Masukkan Email Anda</span>
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
