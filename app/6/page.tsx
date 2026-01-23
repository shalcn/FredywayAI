'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle2, Sparkles } from 'lucide-react';
import styles from './page.module.css';

export default function AdminPage() {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        location: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    useEffect(() => {
        // Fetch current data
        fetch('/api/landing-data')
            .then(res => res.json())
            .then(data => {
                setFormData(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to load data', err);
                setStatus({ type: 'error', message: 'Gagal memuat data.' });
                setIsLoading(false);
            });
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setStatus({ type: null, message: '' });

        try {
            const res = await fetch('/api/landing-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus({ type: 'success', message: 'Data berhasil diperbarui!' });
            } else {
                setStatus({ type: 'error', message: 'Gagal menyimpan data.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Terjadi kesalahan sistem.' });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <Loader2 className={styles.loadingSpinner} size={48} />
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Admin Dashboard</h1>
                    <p className={styles.subtitle}>Kelola informasi event landing page</p>
                </div>

                <div className={styles.card}>
                    {status.message && (
                        <div className={`${styles.statusMessage} ${status.type === 'success' ? styles.statusSuccess : styles.statusError}`}>
                            {status.type === 'success' && <CheckCircle2 size={20} />}
                            {status.type === 'error' && <Sparkles size={20} />}
                            {status.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Tanggal Event</label>
                            <input
                                type="text"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                                className={styles.input}
                                placeholder="Contoh: 24 - 25 Februari 2026"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Waktu Event</label>
                            <input
                                type="text"
                                value={formData.time}
                                onChange={e => setFormData({ ...formData, time: e.target.value })}
                                className={styles.input}
                                placeholder="Contoh: 09:00 - 16:00 WIB"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.label}>Lokasi Event</label>
                            <textarea
                                value={formData.location}
                                onChange={e => setFormData({ ...formData, location: e.target.value })}
                                rows={3}
                                className={styles.textarea}
                                placeholder="Alamat lengkap lokasi event"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className={styles.submitButton}
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    Menyimpan...
                                </>
                            ) : (
                                <>
                                    <Save size={20} />
                                    Simpan Perubahan
                                </>
                            )}
                        </button>

                        <div className={styles.footer}>
                            Perubahan akan langsung terlihat di landing page
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
