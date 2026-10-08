import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderName, senderEmail, phone, subject, message } = body;

    return NextResponse.json({
      success: true,
      message: "Message transmis avec succès à l'équipe Hervé Logistics",
      supportPhone: "+1 579 485 2162",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Erreur lors de l'envoi du message" },
      { status: 400 }
    );
  }
}
