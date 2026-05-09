import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/constants';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const subcategory = searchParams.get('subcategory');
  const id = searchParams.get('id');

  let products = PRODUCTS;

  if (id) {
    const product = products.find((p) => p.id === id);
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ product });
  }

  if (category) {
    products = products.filter((p) => p.category === category);
  }

  if (subcategory) {
    products = products.filter((p) => p.subcategory === subcategory);
  }

  return NextResponse.json({ products });
}
