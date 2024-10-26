import { getPartner } from '@/services/partner/partner';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { partnerId: string } }
) {
  try {
    const partnerId = params.partnerId;
    
    // Replace with your actual API endpoint
    const response = await getPartner(partnerId);
    const data = response.partner;

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch partner data' },
      { status: 500 }
    );
  }
}