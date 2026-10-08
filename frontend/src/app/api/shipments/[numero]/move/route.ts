import { NextResponse } from "next/server";
import { shipmentsData } from "@/data/shipments";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ numero: string }> }
) {
  try {
    const { numero } = await params;
    const body = await request.json();
    const { lat, lng, locationName, progress, status, eventDescription } = body;

    const cleanNum = decodeURIComponent(numero).trim().toUpperCase();
    const found = shipmentsData.find((s) => s.trackingNumber.toUpperCase() === cleanNum);

    if (!found) {
      return NextResponse.json(
        { success: false, message: `Colis ${cleanNum} non trouvé` },
        { status: 404 }
      );
    }

    const updatedShipment = {
      ...found,
      currentCoordinates: { lat: Number(lat), lng: Number(lng) },
      currentLocationName: locationName || found.currentLocationName,
      progress: progress !== undefined ? Number(progress) : found.progress,
      status: status || found.status,
    };

    return NextResponse.json({
      success: true,
      message: `Déplacement du colis ${cleanNum} enregistré`,
      data: updatedShipment,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erreur lors de la mise à jour du déplacement" },
      { status: 500 }
    );
  }
}
