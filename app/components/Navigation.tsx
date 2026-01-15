'use client';

import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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

                <button className={styles.mobileMenuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>

                <div className={`${styles.navLinks} ${isMenuOpen ? styles.mobileOpen : ''}`}>
                    <button onClick={() => { scrollToSection('about'); setIsMenuOpen(false); }} className={styles.navLink}>Tentang</button>
                    <button onClick={() => { scrollToSection('benefits'); setIsMenuOpen(false); }} className={styles.navLink}>Manfaat</button>
                    <button onClick={() => { scrollToSection('facilitator'); setIsMenuOpen(false); }} className={styles.navLink}>Fasilitator</button>
                    <button onClick={() => { scrollToSection('pricing'); setIsMenuOpen(false); }} className={styles.navLink}>Investasi</button>
                    <button onClick={() => { scrollToSection('register'); setIsMenuOpen(false); }} className={styles.btnRegister}>
                        Daftar Sekarang
                    </button>
                </div>
            </div>
        </nav>
    );
}
