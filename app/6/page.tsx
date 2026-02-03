'use client';

import { useState, useEffect } from 'react';
import { Save, Loader2, CheckCircle2, Sparkles, LogOut, Settings, UserX, AlertTriangle, Clock, Zap, Phone } from 'lucide-react';
import styles from './page.module.css';
import pricingStyles from '../components/Pricing.module.css';
import footerStyles from '../components/Footer.module.css';
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
                    earlyBirdDate: data.earlyBirdDate || '10 Februari 2026',
                    ebHeader: data.ebHeader || 'EARLY BIRD BERAKHIR 10 FEBRUARI 2026!',
                    ebNormalCard: data.ebNormalCard || 'Untuk pendaftaran setelah 10 Februari 2026',
                    ebEBCard: data.ebEBCard || 'Bayar Sebelum 10 Februari 2026',
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
                                    placeholder="Contoh: 25 - 26 Februari 2026"
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
                                    <p className={styles.previewLabel}>Preview Tampilan di Landing Page (Live):</p>
                                    <div className={pricingStyles.urgency} style={{ margin: 0, width: '100%', maxWidth: '100%' }}>
                                        <div className={pricingStyles.urgencyHeader}>
                                            <Clock size={20} />
                                            <strong>{formData.ebHeader.toUpperCase().replace(/(\d+)\s+/g, '$1 ')}</strong>
                                        </div>
                                        <div className={pricingStyles.urgencyText}>
                                            Daftar sekarang dan hemat Rp 1.5 Juta.<br />
                                            Kuota terbatas 30 peserta.
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    value={formData.ebHeader}
                                    onChange={e => setFormData({ ...formData, ebHeader: e.target.value })}
                                    className={styles.input}
                                    placeholder="Contoh: EARLY BIRD BERAKHIR 10 FEBRUARI 2026!"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Batas Early Bird (Kartu Harga Normal)</label>
                                <div className={styles.previewContainer}>
                                    <p className={styles.previewLabel}>Preview Tampilan di Landing Page (Live):</p>
                                    <div className={pricingStyles.pricingCard} style={{ margin: 0, height: 'auto', transform: 'none', boxShadow: 'none', border: '1px solid rgba(212, 175, 55, 0.4)' }}>
                                        <div className={pricingStyles.cardHeader}>
                                            <h3>HARGA NORMAL</h3>
                                            <p className={pricingStyles.cardSubtitle}>{formData.ebNormalCard}</p>
                                        </div>
                                        <div className={pricingStyles.price}>
                                            <span className={pricingStyles.currency}>Rp</span>
                                            <span className={pricingStyles.amount}>6.000.000</span>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    value={formData.ebNormalCard}
                                    onChange={e => setFormData({ ...formData, ebNormalCard: e.target.value })}
                                    className={styles.input}
                                    placeholder="Contoh: Untuk pendaftaran setelah 10 Februari 2026"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Batas Early Bird (Kartu Harga Early Bird)</label>
                                <div className={styles.previewContainer}>
                                    <p className={styles.previewLabel}>Preview Tampilan di Landing Page (Live):</p>
                                    <div className={`${pricingStyles.pricingCard} ${pricingStyles.featured}`} style={{ margin: '1.5rem 0', height: 'auto', transform: 'scale(0.95)', transformOrigin: 'top center' }}>
                                        <div className={pricingStyles.badge} style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}>
                                            <Zap size={16} fill="currentColor" /> EARLY BIRD - HEMAT 25%
                                        </div>
                                        <div className={pricingStyles.cardHeader}>
                                            <h3>EARLY BIRD</h3>
                                            <p className={pricingStyles.cardSubtitle}>{formData.ebEBCard}<br />Hemat Rp 1.500.000 !</p>
                                        </div>
                                        <div className={pricingStyles.price}>
                                            <span className={pricingStyles.currency}>Rp</span>
                                            <span className={pricingStyles.amount}>4.500.000</span>
                                        </div>
                                        <button className="btn btn-primary" style={{
                                            width: '100%',
                                            marginTop: '1.5rem',
                                            background: '#FFD700',
                                            border: 'none',
                                            color: '#1a1a1a',
                                            fontWeight: '700',
                                            padding: '0.8rem'
                                        }} type="button">
                                            Daftar Sekarang
                                        </button>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    value={formData.ebEBCard}
                                    onChange={e => setFormData({ ...formData, ebEBCard: e.target.value })}
                                    className={styles.input}
                                    placeholder="Contoh: Bayar Sebelum 10 Februari 2026"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Batas Early Bird (General/Footer)</label>
                                <div className={styles.previewContainer}>
                                    <p className={styles.previewLabel}>Preview Tampilan di Landing Page (Live):</p>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '10px' }}>
                                        {/* Footer Warning Preview */}
                                        <div className={footerStyles.warning} style={{ margin: 0, maxWidth: '100%' }}>
                                            <div className={footerStyles.warningHeader}>
                                                <AlertTriangle size={24} />
                                                <strong>PERHATIAN:</strong>
                                            </div>
                                            <p className={footerStyles.warningText}>
                                                Kuota terbatas hanya untuk 30 peserta karena kami ingin memastikan setiap peserta mendapat perhatian maksimal dan bisa praktik langsung. Early Bird berakhir {formData.earlyBirdDate}. Setelah itu harga naik <span style={{ whiteSpace: 'nowrap' }}>Rp 1.5 Juta.</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    value={formData.earlyBirdDate}
                                    onChange={e => setFormData({ ...formData, earlyBirdDate: e.target.value })}
                                    className={styles.input}
                                    placeholder="Contoh: 10 Februari 2026"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.label}>Nomor WhatsApp (Tanpa +, Contoh: 628123456789)</label>
                                <div className={styles.previewContainer}>
                                    <p className={styles.previewLabel}>Preview Tampilan di Landing Page (Live):</p>
                                    <div className={footerStyles.contactItem} style={{ color: 'white' }}>
                                        <Phone size={20} style={{ color: 'var(--gold-main)' }} />
                                        <span>WhatsApp: <span style={{ color: '#3182ce', textDecoration: 'underline' }}>+{formData.waNumber}</span></span>
                                    </div>
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
                                    <p className={styles.previewLabel}>Preview Tampilan di Landing Page (Live):</p>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        background: '#25D366',
                                        color: 'white',
                                        padding: '12px 24px',
                                        borderRadius: '50px',
                                        width: 'fit-content',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                                    }}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.472 14.382C17.112 14.202 15.344 13.332 15.016 13.212C14.688 13.092 14.448 13.032 14.208 13.392C13.968 13.752 13.28 14.562 13.072 14.802C12.864 15.042 12.656 15.072 12.296 14.892C11.936 14.712 10.776 14.332 9.4 13.102C8.32 12.142 7.592 10.952 7.376 10.592C7.16 10.232 7.352 10.032 7.532 9.852C7.688 9.692 7.88 9.452 8.056 9.242C8.232 9.032 8.296 8.872 8.416 8.632C8.536 8.392 8.472 8.182 8.384 8.002C8.296 7.822 7.592 6.092 7.304 5.402C7.024 4.732 6.736 4.822 6.544 4.822C6.368 4.822 6.16 4.812 5.952 4.812C5.744 4.812 5.408 4.892 5.12 5.202C4.832 5.512 4.016 6.272 4.016 7.822C4.016 9.372 5.152 10.872 5.312 11.082C5.472 11.292 7.552 14.522 10.744 15.882C11.504 16.202 12.096 16.392 12.56 16.542C13.432 16.822 14.224 16.782 14.848 16.692C15.544 16.592 17.008 15.812 17.312 14.952C17.616 14.092 17.616 13.362 17.528 13.212C17.44 13.062 17.2 13.022 17.024 12.932H17.472V14.382ZM12.008 21.992H12.008C8.344 21.992 5.248 20.922 2.616 19.342L2.56 19.312L0.424 19.952L1.872 17.432L1.824 17.342C0.608 15.352 -0.016 13.082 -0.016 10.742C-0.016 4.502 5.384 -0.568 12.024 -0.568C15.224 -0.568 18.232 0.692 20.488 2.972C22.752 5.242 24.008 8.272 24.008 11.452C24.008 17.682 18.616 22.742 12.008 21.992V21.992Z" />
                                        </svg>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>Butuh Bantuan?</span>
                                            <span style={{ fontWeight: 'bold' }}>Chat WhatsApp</span>
                                        </div>
                                    </div>
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

