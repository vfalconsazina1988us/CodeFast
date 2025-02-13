import clientPromise from "@/libs/mongo";
import { ObjectId } from "mongodb";
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("production");
    const { id } = params;

    const user = await db.collection("users").findOne({
      _id: new ObjectId(id)
    });

    if (!user) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error al obtener usuario" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("production");
    const { id } = params;
    const data = await request.json();

    const result = await db.collection("users").updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      message: "Usuario actualizado exitosamente" 
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error al actualizar usuario" },
      { status: 500 }
    );
  }
} 
 
 
