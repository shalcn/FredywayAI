'use client';

import { useState } from 'react';
import { LogIn, Loader2, AlertCircle } from 'lucide-react';
import styles from '../page.module.css';

interface LoginProps {
    onLoginSuccess: (token: string) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                onLoginSuccess(data.token);
            } else {
                setError(data.error || 'Login gagal');
            }
        } catch (err) {
            setError('Terjadi kesalahan koneksi');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Admin Login</h1>
                <p className={styles.subtitle}>Masukkan kredensial untuk mengakses dashboard</p>
            </div>

            <div className={styles.card}>
                {error && (
                    <div className={`${styles.statusMessage} ${styles.statusError}`}>
                        <AlertCircle size={20} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={styles.input}
                            placeholder="admin"
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={styles.submitButton}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Memproses...
                            </>
                        ) : (
                            <>
                                <LogIn size={20} />
                                Masuk ke Dashboard
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
