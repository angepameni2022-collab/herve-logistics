import { NextResponse } from "next/server";
import { shipmentsData } from "@/data/shipments";
import { getDb, isMongoConfigured } from "@/lib/mongodb";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ numero: string }> }
) {
  try {
    const { numero } = await params;
    const clean = decodeURIComponent(numero || "").trim().toUpperCase();

    if (!clean) {
      return NextResponse.json(
        { success: false, message: "Numéro de suivi invalide" },
        { status: 400 }
      );
    }

    if (isMongoConfigured()) {
      const db = await getDb();
      if (db) {
        const collection = db.collection("shipments");
        const found = await collection.findOne({
          trackingNumber: { $regex: new RegExp(`^${clean}$`, "i") },
        });

        if (found) {
          const { _id, ...rest } = found as { _id?: unknown; [key: string]: unknown };
          return NextResponse.json({
            success: true,
            source: "mongodb",
            data: rest,
          });
        }
      }
    }

    // Fallback aux données de référence
    const localMatch = shipmentsData.find(
      (s) => s.trackingNumber.toUpperCase() === clean
    );

    if (localMatch) {
      return NextResponse.json({
        success: true,
        source: "seed",
        data: localMatch,
      });
    }

    return NextResponse.json(
      { success: false, message: "Colis introuvable" },
      { status: 404 }
    );
  } catch (error) {
    console.error("API GET /api/shipments/[numero] error:", error);
    return NextResponse.json(
      { success: false, message: "Erreur serveur lors de la recherche du colis" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ numero: string }> }
) {
  try {
    const { numero } = await params;
    const clean = decodeURIComponent(numero || "").trim().toUpperCase();
    const updatePayload = await request.json();

    if (isMongoConfigured()) {
      const db = await getDb();
      if (db) {
        const collection = db.collection("shipments");
        await collection.updateOne(
          { trackingNumber: { $regex: new RegExp(`^${clean}$`, "i") } },
          { $set: updatePayload },
          { upsert: true }
        );

        return NextResponse.json({
          success: true,
          source: "mongodb",
          message: `Colis ${clean} mis à jour avec succès en base de données`,
          data: updatePayload,
        });
      }
    }

    return NextResponse.json({
      success: true,
      source: "in_memory",
      message: `Mise à jour effectuée (MongoDB non configuré)`,
      data: updatePayload,
    });
  } catch (error) {
    console.error("API PUT /api/shipments/[numero] error:", error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de la mise à jour du colis" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ numero: string }> }
) {
  try {
    const { numero } = await params;
    const clean = decodeURIComponent(numero || "").trim().toUpperCase();

    if (isMongoConfigured()) {
      const db = await getDb();
      if (db) {
        const collection = db.collection("shipments");
        await collection.deleteOne({
          trackingNumber: { $regex: new RegExp(`^${clean}$`, "i") },
        });

        return NextResponse.json({
          success: true,
          message: `Colis ${clean} supprimé de MongoDB`,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: `Colis ${clean} supprimé`,
    });
  } catch (error) {
    console.error("API DELETE /api/shipments/[numero] error:", error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de la suppression du colis" },
      { status: 500 }
    );
  }
}
