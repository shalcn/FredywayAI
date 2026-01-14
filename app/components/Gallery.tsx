'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import styles from './Gallery.module.css';

const galleryImages = [
    '/images/uploaded_image_0_1768389085172.jpg',
    '/images/uploaded_image_1_1768389085172.jpg',
    '/images/uploaded_image_2_1768389085172.jpg',
    '/images/uploaded_image_3_1768389085172.jpg',
    '/images/uploaded_image_4_1768389085172.jpg'
];

export default function Gallery() {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section className={styles.section} ref={ref}>
            <div className="container">
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2>Dokumentasi Event Sebelumnya</h2>
                    <p>Lihat pengalaman peserta dari workshop & training kami sebelumnya</p>
                </motion.div>

                <div className={styles.grid}>
                    {galleryImages.map((image, index) => (
                        <motion.div
                            key={index}
                            className={styles.imageCard}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <img src={image} alt={`Event ${index + 1}`} />
                            <div className={styles.overlay}></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
