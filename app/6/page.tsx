'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle2, Sparkles, LogOut, Settings, UserX, AlertTriangle } from 'lucide-react';
import styles from './page.module.css';
import Login from './components/Login';
import AccountSettings from './components/AccountSettings';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [showSettings, setShowSettings] = useState(false);
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        location: '',
        earlyBirdDate: '',
        ebHeader: '',
        ebNormalCard: '',
        ebEBCard: '',
        waNumber: '',
        waBubbleNumber: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

    const fetchData = () => {
        setIsLoading(true);
        fetch('/api/landing-data')
            .then(res => res.json())
            .then(data => {
                setFormData({
                    date: data.date || '',
                    time: data.time || '',
                    location: data.location || '',
                    earlyBirdDate: data.earlyBirdDate || '1 Februari 2026',
                    ebHeader: data.ebHeader || 'EARLY BIRD BERAKHIR 1 FEBRUARI 2026!',
                    ebNormalCard: data.ebNormalCard || 'Untuk pendaftaran setelah 1 Februari 2026',
                    ebEBCard: data.ebEBCard || 'Bayar Sebelum 1 Februari 2026',
                    waNumber: data.waNumber || '6287775730572',
                    waBubbleNumber: data.waBubbleNumber || '6287775730572'
                });
                setIsLoading(false);
            })
            .catch(err => {
                console.error('Failed to load data', err);
                setStatus({ type: 'error', message: 'Gagal memuat data.' });
                setIsLoading(false);
            });
    };

    useEffect(() => {
        // Check authentication
        const auth = localStorage.getItem('admin_authenticated');
        if (auth === 'true') {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }

        // Fetch current data
        fetchData();
    }, []);

    const handleLoginSuccess = () => {
        localStorage.setItem('admin_authenticated', 'true');
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('admin_authenticated');
        setIsAuthenticated(false);
    };

    const handleCredentialReset = async () => {
        if (!confirm('Apakah Anda yakin ingin mereset username dan password kembali ke default (admin/admin123)?')) {
            return;
        }

        setIsSaving(true);
        setStatus({ type: null, message: '' });

        try {
            const res = await fetch('/api/auth/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: 'admin',
                    password: 'admin123'
                }),
            });

            if (res.ok) {
                setStatus({ type: 'success', message: 'Akun berhasil direset ke default (admin/admin123)!' });
            } else {
                const data = await res.json();
                setStatus({ type: 'error', message: data.error || 'Gagal mereset kredensial' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Terjadi kesalahan sistem' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleFactoryReset = async () => {
        if (!confirm('PERHATIAN: Apakah Anda yakin ingin mereset SEMUA data kembali ke template default? Tindakan ini tidak dapat dibatalkan.')) {
            return;
        }

        setIsSaving(true);
        setStatus({ type: null, message: '' });

        try {
            const res = await fetch('/api/landing-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reset: true }),
            });

            if (res.ok) {
                const data = await res.json();
                setFormData(data.data); // Update form with new default data
                setStatus({ type: 'success', message: 'Data berhasil direset ke default!' });
            } else {
                setStatus({ type: 'error', message: 'Gagal mereset data.' });
            }
        } catch (error) {
            setStatus({ type: 'error', message: 'Terjadi kesalahan sistem.' });
        } finally {
            setIsSaving(false);
        }
    };

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

    if (isAuthenticated === null || (isAuthenticated && isLoading)) {
        return (
            <div className={styles.loadingContainer}>
                <Loader2 className={styles.loadingSpinner} size={48} />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className={styles.pageContainer}>
                <Login onLoginSuccess={handleLoginSuccess} />
            </div>
        );
    }

    return (
        <div className={styles.pageContainer}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Admin Dashboard</h1>
                    <p className={styles.subtitle}>Kelola informasi event landing page</p>
                    <div className={styles.headerActions}>
                        {!showSettings && (
                            <>
                                <div className={styles.credentialWrapper}>
                                    <div className={styles.credentialBox}>
                                        <span className={styles.credentialLabel}>Default Credential:</span>
                                        <strong>admin / admin123</strong>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleCredentialReset}
                                        disabled={isSaving}
                                        className={styles.submitButton}
                                        style={{ width: 'auto', margin: 0, padding: '0.5rem 1rem', fontSize: '0.9rem', background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                                        title="Reset Akun (Username/Password to default)"
                                    >
                                        <UserX size={18} />
                                        Reset Akun
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleFactoryReset}
                                    disabled={isSaving}
                                    className={styles.submitButton}
                                    style={{ width: 'auto', margin: 0, padding: '0.5rem 1rem', fontSize: '0.9rem', background: 'rgba(234, 179, 8, 0.15)', color: '#facc15', border: '1px solid rgba(234, 179, 8, 0.3)' }}
                                    title="Factory Reset (Restore default template)"
                                >
                                    <AlertTriangle size={18} />
                                    Default
                                </button>
                            </>
                        )}
                        <button
                            className={styles.submitButton}
                            style={{ width: 'auto', margin: 0, padding: '0.5rem 1rem', fontSize: '0.9rem', background: showSettings ? 'var(--gold-main)' : 'rgba(255,255,255,0.1)', color: showSettings ? 'black' : 'white', border: '1px solid rgba(212,175,55,0.2)' }}
                            onClick={() => setShowSettings(!showSettings)}
                        >
                            <Settings size={18} />
                            {showSettings ? 'Kembali ke Dashboard' : 'Pengaturan Akun'}
                        </button>
                        <button
                            className={styles.submitButton}
                            style={{ width: 'auto', margin: 0, padding: '0.5rem 1rem', fontSize: '0.9rem', background: 'rgba(239, 68, 68, 0.15)', color: '#fca5a5', border: '1px solid rgba(239, 68, 68, 0.3)', boxShadow: 'none' }}
                            onClick={handleLogout}
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>

                {showSettings ? (
                    <AccountSettings />
                ) : (
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

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Batas Early Bird (Header Pricing)</label>
                                <div className={styles.previewContainer}>
                                    <p className={styles.previewLabel}>Preview Tampilan di Landing Page:</p>
                                    <img src="/images/urgency_preview.png" alt="Urgency Preview" className={styles.previewImage} />
                                </div>
                                <input
                                    type="text"
                                    value={formData.ebHeader}
                                    onChange={e => setFormData({ ...formData, ebHeader: e.target.value })}
                                    className={styles.input}
                                    placeholder="Contoh: EARLY BIRD BERAKHIR 1 FEBRUARI 2026!"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Batas Early Bird (Kartu Harga Normal)</label>
                                <div className={styles.previewContainer}>
                                    <p className={styles.previewLabel}>Preview Tampilan di Landing Page:</p>
                                    <img src="/images/normal_price_preview.png" alt="Normal Price Preview" className={styles.previewImage} />
                                </div>
                                <input
                                    type="text"
                                    value={formData.ebNormalCard}
                                    onChange={e => setFormData({ ...formData, ebNormalCard: e.target.value })}
                                    className={styles.input}
                                    placeholder="Contoh: Untuk pendaftaran setelah 1 Februari 2026"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Batas Early Bird (Kartu Harga Early Bird)</label>
                                <div className={styles.previewContainer}>
                                    <p className={styles.previewLabel}>Preview Tampilan di Landing Page:</p>
                                    <img src="/images/eb_price_preview.png" alt="EB Price Preview" className={styles.previewImage} />
                                </div>
                                <input
                                    type="text"
                                    value={formData.ebEBCard}
                                    onChange={e => setFormData({ ...formData, ebEBCard: e.target.value })}
                                    className={styles.input}
                                    placeholder="Contoh: Bayar Sebelum 1 Februari 2026"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Batas Early Bird (General/Footer)</label>
                                <div className={styles.previewContainer}>
                                    <p className={styles.previewLabel}>Preview Tampilan di Landing Page:</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                                        <img src="/images/footer_urgency_preview.png" alt="Footer Urgency Preview" className={styles.previewImage} />
                                        <img src="/images/perhatian_preview.png" alt="Perhatian Preview" className={styles.previewImage} />
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    value={formData.earlyBirdDate}
                                    onChange={e => setFormData({ ...formData, earlyBirdDate: e.target.value })}
                                    className={styles.input}
                                    placeholder="Contoh: 1 Februari 2026"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Nomor WhatsApp (Tanpa +, Contoh: 628123456789)</label>
                                <div className={styles.previewContainer}>
                                    <p className={styles.previewLabel}>Preview Tampilan di Landing Page:</p>
                                    <img src="/images/whatsapp_footer_preview_v3.png" alt="WhatsApp Preview" className={styles.previewImage} />
                                </div>
                                <input
                                    type="text"
                                    value={formData.waNumber}
                                    onChange={e => setFormData({ ...formData, waNumber: e.target.value })}
                                    className={styles.input}
                                    placeholder="Contoh: 6287775730572"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Nomor WhatsApp Floating Bubble (Tanpa +)</label>
                                <div className={styles.previewContainer}>
                                    <p className={styles.previewLabel}>Preview Tampilan di Landing Page:</p>
                                    <img src="/images/wa_bubble_preview_v2.png" alt="WhatsApp Bubble Preview" className={styles.previewImage} />
                                </div>
                                <input
                                    type="text"
                                    value={formData.waBubbleNumber}
                                    onChange={e => setFormData({ ...formData, waBubbleNumber: e.target.value })}
                                    className={styles.input}
                                    placeholder="Contoh: 6287775730572"
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className={styles.submitButton}
                                    style={{ flex: 1 }}
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
                            </div>

                            <div className={styles.footer}>
                                Perubahan akan langsung terlihat di landing page
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div >
    );
}

