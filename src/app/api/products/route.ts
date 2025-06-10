import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

// GET - Obtener todos los productos
export async function GET() {
  try {
    const allProducts = await db.select().from(products).where(eq(products.isActive, true));
    
    return NextResponse.json({
      success: true,
      products: allProducts
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}

// POST - Crear nuevo producto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const newProduct = await db.insert(products).values({
      name: body.name,
      description: body.description,
      longDescription: body.longDescription,
      size: body.size,
      type: body.type,
      category: body.category,
      downloadUrl: body.downloadUrl,
      images: body.images || [],
      features: body.features || [],
      requirements: body.requirements || [],
      tags: body.tags || [],
      rating: body.rating || '0.0',
      reviews: body.reviews || 0,
      downloadCount: body.downloadCount || 0,
    }).returning();

    return NextResponse.json({
      success: true,
      product: newProduct[0]
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Error al crear producto' },
      { status: 500 }
    );
  }
} 