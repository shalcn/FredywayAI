'use client';

import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
            <div className={styles.container}>
                <div className={styles.logo}>
                    <img src="/images/LOGO+TEXT.PNG" alt="Freddway Coaching Consulting" className={styles.logoImg} />
                </div>

                <div className={styles.navLinks}>
                    <button onClick={() => scrollToSection('about')} className={styles.navLink}>Tentang</button>
                    <button onClick={() => scrollToSection('benefits')} className={styles.navLink}>Manfaat</button>
                    <button onClick={() => scrollToSection('facilitator')} className={styles.navLink}>Fasilitator</button>
                    <button onClick={() => scrollToSection('pricing')} className={styles.navLink}>Investasi</button>
                    <button onClick={() => scrollToSection('register')} className={styles.btnRegister}>
                        Daftar Sekarang
                    </button>
                </div>
            </div>
        </nav>
    );
}
