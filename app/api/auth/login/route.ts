import { NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, get } from 'firebase/database';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // Get credentials from Firebase
        const authRef = ref(database, 'admin_auth');
        const snapshot = await get(authRef);

        let validUsername = 'admin';
        let validPassword = 'admin123';

        if (snapshot.exists()) {
            const data = snapshot.val();
            validUsername = data.username || validUsername;
            validPassword = data.password || validPassword;
        }

        if (username === validUsername && password === validPassword) {
            return NextResponse.json({ success: true, token: 'fake-jwt-token' });
        } else {
            return NextResponse.json({ error: 'Username atau password salah' }, { status: 401 });
        }
    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({ error: 'Terjadi kesalahan sistem', details: error.message }, { status: 500 });
    }
}
