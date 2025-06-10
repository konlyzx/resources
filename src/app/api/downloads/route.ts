import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products, downloads } from '@/lib/db/schema';
import { eq, sql } from 'drizzle-orm';

// POST - Registrar descarga
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId } = body;
    
    // Obtener información del request
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    const forwarded = request.headers.get('x-forwarded-for');
    const ipAddress = forwarded ? forwarded.split(',')[0] : 'Unknown';
    
    // Registrar la descarga
    await db.insert(downloads).values({
      productId: parseInt(productId),
      userAgent,
      ipAddress,
    });
    
    // Incrementar contador de descargas del producto
    await db.update(products)
      .set({
        downloadCount: sql`${products.downloadCount} + 1`,
        updatedAt: new Date(),
      })
      .where(eq(products.id, parseInt(productId)));

    return NextResponse.json({
      success: true,
      message: 'Descarga registrada exitosamente'
    });
  } catch (error) {
    console.error('Error registering download:', error);
    return NextResponse.json(
      { success: false, error: 'Error al registrar descarga' },
      { status: 500 }
    );
  }
} 