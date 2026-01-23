'use client';

import { useState } from 'react';
import { User, Lock, Save, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import styles from '../page.module.css';

export default function AccountSettings() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setStatus({ type: 'error', message: 'Konfirmasi password tidak cocok' });
            return;
        }

        setIsSaving(true);
        setStatus({ type: null, message: '' });

        try {
            const res = await fetch('/api/auth/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    password: formData.password
                }),
            });

            if (res.ok) {
                setStatus({ type: 'success', message: 'Kredensial berhasil diperbarui!' });
                setFormData({ ...formData, password: '', confirmPassword: '' });
            } else {
                const data = await res.json();
                setStatus({ type: 'error', message: data.error || 'Gagal menyimpan perubahan' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Terjadi kesalahan sistem' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className={styles.card} style={{ marginTop: '2rem' }}>
            <div className={styles.formGroup} style={{ marginBottom: '1.5rem' }}>
                <h3 className={styles.label} style={{ fontSize: '1.1rem', color: 'var(--text-white)' }}>
                    Pengaturan Akun
                </h3>
                <p className={styles.subtitle} style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>
                    Ubah username dan password untuk keamanan tambahan
                </p>
            </div>

            {status.message && (
                <div className={`${styles.statusMessage} ${status.type === 'success' ? styles.statusSuccess : styles.statusError}`}>
                    {status.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Username Baru</label>
                    <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className={styles.input}
                            style={{ paddingLeft: '3rem' }}
                            placeholder="Username baru"
                            required
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Password Baru</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className={styles.input}
                            style={{ paddingLeft: '3rem' }}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>Konfirmasi Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
                        <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            className={styles.input}
                            style={{ paddingLeft: '3rem' }}
                            placeholder="Konfirmasi password baru"
                            required
                        />
                    </div>
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
                            Perbarui Akun
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
