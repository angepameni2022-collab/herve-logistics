import { NextResponse } from "next/server";
import { shipmentsData } from "@/data/shipments";
import { getDb, isMongoConfigured } from "@/lib/mongodb";

export async function GET() {
  try {
    if (isMongoConfigured()) {
      const db = await getDb();
      if (db) {
        const collection = db.collection("shipments");
        let list = await collection.find({}).sort({ departureDate: -1 }).toArray();

        // Si la collection est vide, l'initialiser avec les données officielles du projet
        if (list.length === 0 && shipmentsData.length > 0) {
          await collection.insertMany(shipmentsData.map(s => ({ ...s })));
          list = await collection.find({}).toArray();
        }

        // Nettoyer l'ID MongoDB _id pour éviter les problèmes de sérialisation JSON
        const sanitized = list.map((item) => {
          const { _id, ...rest } = item as { _id?: unknown; [key: string]: unknown };
          return rest;
        });

        return NextResponse.json({
          success: true,
          source: "mongodb",
          count: sanitized.length,
          data: sanitized,
        });
      }
    }

    return NextResponse.json({
      success: true,
      source: "static_seed",
      count: shipmentsData.length,
      data: shipmentsData,
    });
  } catch (error) {
    console.error("API GET /api/shipments error:", error);
    return NextResponse.json({
      success: true,
      source: "fallback",
      count: shipmentsData.length,
      data: shipmentsData,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body || !body.trackingNumber) {
      return NextResponse.json(
        { success: false, message: "Numéro de suivi requis" },
        { status: 400 }
      );
    }

    if (isMongoConfigured()) {
      const db = await getDb();
      if (db) {
        const collection = db.collection("shipments");
        await collection.updateOne(
          { trackingNumber: body.trackingNumber },
          { $set: body },
          { upsert: true }
        );

        return NextResponse.json({
          success: true,
          source: "mongodb",
          message: `Colis ${body.trackingNumber} enregistré avec succès en base de données`,
          data: body,
        });
      }
    }

    return NextResponse.json({
      success: true,
      source: "in_memory",
      message: "Expédition enregistrée (MongoDB non configuré)",
      data: body,
    });
  } catch (error) {
    console.error("API POST /api/shipments error:", error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de l'enregistrement du colis" },
      { status: 500 }
    );
  }
}
