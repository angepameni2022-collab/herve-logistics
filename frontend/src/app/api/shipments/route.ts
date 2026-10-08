import { NextResponse } from "next/server";
import { shipmentsData } from "@/data/shipments";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: shipmentsData,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: "Expédition créée avec succès",
      data: body,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Requête invalide" },
      { status: 400 }
    );
  }
}
