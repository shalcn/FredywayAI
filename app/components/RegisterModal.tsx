'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import styles from './RegisterModal.module.css';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        position: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call and redirect
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Encode message
        const message = `Halo Admin, saya ${formData.name}.
Perusahaan: ${formData.company}
Jabatan: ${formData.position}

Saya ingin mendaftar program Executive Strategic Leadership with AI`;
        const waLink = `https://wa.me/6287775730572?text=${encodeURIComponent(message)}`;

        window.open(waLink, '_blank');

        setIsSubmitting(false);
        setFormData({ name: '', company: '', position: '' });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className={styles.overlay} onClick={onClose}>
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <button className={styles.closeBtn} onClick={onClose}>
                            <X size={24} />
                        </button>

                        <div className={styles.header}>
                            <h2>Daftar Sekarang</h2>
                            <p>Isi data diri Anda untuk mengamankan slot Early Bird.</p>
                        </div>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <label htmlFor="name">Nama Lengkap</label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    placeholder="Masukkan nama sesuai KTP"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="company">Perusahaan</label>
                                <input
                                    type="text"
                                    id="company"
                                    required
                                    placeholder="Nama Perusahaan"
                                    value={formData.company}
                                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>

                            <div className={styles.inputGroup}>
                                <label htmlFor="position">Jabatan</label>
                                <input
                                    type="text"
                                    id="position"
                                    required
                                    placeholder="Jabatan saat ini"
                                    value={formData.position}
                                    onChange={e => setFormData({ ...formData, position: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                        Memproses...
                                    </>
                                ) : (
                                    <>
                                        Konfirmasi Pendaftaran
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
