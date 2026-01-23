import { NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, set } from 'firebase/database';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Username dan password wajib diisi' }, { status: 400 });
        }

        // Update credentials in Firebase
        const authRef = ref(database, 'admin_auth');
        await set(authRef, {
            username,
            password
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Update settings error:', error);
        return NextResponse.json({ error: 'Gagal memperbarui pengaturan', details: error.message }, { status: 500 });
    }
}
