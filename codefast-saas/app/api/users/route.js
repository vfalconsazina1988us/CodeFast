import clientPromise from "@/libs/mongo";
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("production");
    const users = await db.collection("users").find({}).toArray();

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error al obtener huespedes" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("production");
    const data = await request.json();

    const result = await db.collection("users").insertOne(data);

    return NextResponse.json({ 
      message: "Usuario creado exitosamente",
      userId: result.insertedId 
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error al crear usuario" },
      { status: 500 }
    );
  }
} 