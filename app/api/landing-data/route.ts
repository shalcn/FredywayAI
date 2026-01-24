import { NextResponse } from 'next/server';
import { landingDataRef } from '@/lib/firebase';
import { get, set } from 'firebase/database';

// Default data
const defaultData = {
    date: "24 - 25 Februari 2026",
    time: "09:00 - 16:00 WIB",
    location: "Hotel Grand Mercure, Kemayoran, Jakarta",
    earlyBirdDate: "1 Februari 2026",
    ebHeader: "EARLY BIRD BERAKHIR 1 FEBRUARI 2026!",
    ebNormalCard: "Untuk pendaftaran setelah 1 Februari 2026",
    ebEBCard: "Bayar Sebelum 1 Februari 2026",
    waNumber: "6287775730572"
};

// GET: Read data from Firebase
export async function GET() {
    try {
        console.log('Fetching data from Firebase...');
        const snapshot = await get(landingDataRef);

        if (snapshot.exists()) {
            const data = snapshot.val();
            return NextResponse.json(data);
        } else {
            console.log('No data found, returning defaults');
            return NextResponse.json(defaultData);
        }
    } catch (error: any) {
        console.error('Error reading from Firebase:', error);
        return NextResponse.json({
            error: 'Failed to read data',
            details: error.message,
            url: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL ? 'Env set' : 'Env NOT set'
        }, { status: 500 });
    }
}

// POST: Update data in Firebase
export async function POST(request: Request) {
    try {
        const newData = await request.json();
        console.log('Received new data:', newData);

        // Basic validation
        if (!newData.date || !newData.time || !newData.location) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Save to Firebase Realtime Database
        await set(landingDataRef, newData);
        console.log('Data saved successfully to Firebase');

        return NextResponse.json({ success: true, data: newData });
    } catch (error: any) {
        console.error('Error saving to Firebase:', error);
        return NextResponse.json({
            error: 'Failed to save data',
            details: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}

