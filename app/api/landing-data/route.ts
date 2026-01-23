import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'app', 'data', 'landing-data.json');

// GET: Read data
export async function GET() {
    try {
        if (!fs.existsSync(dataFilePath)) {
            // Default data if file doesn't exist
            const initialData = {
                date: "24 - 25 Februari 2026",
                time: "09:00 - 16:00 WIB",
                location: "Hotel Grand Mercure, Kemayoran, Jakarta"
            };
            return NextResponse.json(initialData);
        }

        const fileContent = fs.readFileSync(dataFilePath, 'utf-8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

// POST: Update data
export async function POST(request: Request) {
    try {
        const newData = await request.json();

        // Basic validation
        if (!newData.date || !newData.time || !newData.location) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        fs.writeFileSync(dataFilePath, JSON.stringify(newData, null, 2));

        return NextResponse.json({ success: true, data: newData });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
}
