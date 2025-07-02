import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// Save avatar image to database
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: characterId } = await params;
    
    // Verify the character belongs to the current user
    const character = await prisma.character.findFirst({
      where: {
        id: characterId,
        user: {
          email: session.user.email
        }
      }
    });

    if (!character) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    // Get the image data from the request body
    const { imageData, mimeType = "image/png" } = await request.json();

    if (!imageData) {
      return NextResponse.json({ error: "Image data is required" }, { status: 400 });
    }

    // Convert base64 data URL to binary data
    let binaryData: Buffer;
    try {
      // Remove the data URL prefix (e.g., "data:image/png;base64,")
      const base64Data = imageData.replace(/^data:image\/[a-z]+;base64,/, '');
      binaryData = Buffer.from(base64Data, 'base64');
    } catch (error) {
      return NextResponse.json({ error: "Invalid image data format" }, { status: 400 });
    }

    // Save or update the avatar image
    const avatarImage = await prisma.avatarImage.upsert({
      where: {
        characterId: characterId
      },
      update: {
        imageData: binaryData,
        mimeType: mimeType
      },
      create: {
        characterId: characterId,
        imageData: binaryData,
        mimeType: mimeType
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Avatar image saved successfully" 
    });

  } catch (error) {
    console.error("Error saving avatar image:", error);
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 });
  }
}

// Get avatar image from database
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: characterId } = await params;
    
    // Verify the character belongs to the current user and get the avatar image
    const avatarImage = await prisma.avatarImage.findFirst({
      where: {
        characterId: characterId,
        character: {
          user: {
            email: session.user.email
          }
        }
      }
    });

    if (!avatarImage) {
      return NextResponse.json({ error: "Avatar image not found" }, { status: 404 });
    }

    // Convert binary data back to base64 data URL
    const base64Data = Buffer.from(avatarImage.imageData).toString('base64');
    const dataUrl = `data:${avatarImage.mimeType};base64,${base64Data}`;

    return NextResponse.json({ 
      success: true,
      imageData: dataUrl,
      mimeType: avatarImage.mimeType
    });

  } catch (error) {
    console.error("Error retrieving avatar image:", error);
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 });
  }
}

// Delete avatar image from database
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id: characterId } = await params;
    
    // Verify the character belongs to the current user
    const character = await prisma.character.findFirst({
      where: {
        id: characterId,
        user: {
          email: session.user.email
        }
      }
    });

    if (!character) {
      return NextResponse.json({ error: "Character not found" }, { status: 404 });
    }

    // Delete the avatar image
    await prisma.avatarImage.deleteMany({
      where: {
        characterId: characterId
      }
    });

    return NextResponse.json({ 
      success: true, 
      message: "Avatar image deleted successfully" 
    });

  } catch (error) {
    console.error("Error deleting avatar image:", error);
    return NextResponse.json({ 
      error: "Internal server error" 
    }, { status: 500 });
  }
} 