import { NextResponse } from 'next/server';

// This would typically be stored in a database
const partnerWebsites = [
  {
    id: '1',
    name: 'BeautyBay',
    url: 'https://www.beautybay.com',
    apiKey: 'beautybay_api_key_123',
  },
  {
    id: '2',
    name: 'Sephora',
    url: 'https://www.sephora.com',
    apiKey: 'sephora_api_key_456',
  },
  {
    id: '2',
    name: 'Test Website',
    url: 'http://localhost:8000',
    apiKey: 'sephora_api_key_456',
  },
  {
    id: '2',
    name: 'RDX',
    url: 'http://www.calnita.com',
    apiKey: 'calnita',
  },
  // Add more partner websites as needed
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  // Normalize the URL for comparison
  const normalizedUrl = new URL(url).origin.toLowerCase();

  // Find the partner website
  const partnerWebsite = partnerWebsites.find(pw => 
    new URL(pw.url).origin.toLowerCase() === normalizedUrl
  );

  if (!partnerWebsite) {
    return NextResponse.json({ error: 'Partner website not found' }, { status: 404 });
  }

  // Don't send the API key to the client
  const { apiKey, ...safePartnerWebsite } = partnerWebsite;

  return NextResponse.json(safePartnerWebsite);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name, url, apiKey } = body;

  if (!name || !url || !apiKey) {
    return NextResponse.json({ error: 'Name, URL, and API key are required' }, { status: 400 });
  }

  // Check if the website already exists
  const existingWebsite = partnerWebsites.find(pw => pw.url === url);
  if (existingWebsite) {
    return NextResponse.json({ error: 'Partner website already exists' }, { status: 409 });
  }

  // Generate a new ID (in a real database, this would typically be auto-generated)
  const newId = (parseInt(partnerWebsites[partnerWebsites.length - 1].id) + 1).toString();

  const newPartnerWebsite = {
    id: newId,
    name,
    url,
    apiKey,
  };

  partnerWebsites.push(newPartnerWebsite);

  // Don't send the API key back to the client
  const { apiKey: _, ...safeNewPartnerWebsite } = newPartnerWebsite;

  return NextResponse.json(safeNewPartnerWebsite, { status: 201 });
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
  }

  const body = await request.json();
  const { name, url, apiKey } = body;

  const partnerWebsiteIndex = partnerWebsites.findIndex(pw => pw.id === id);

  if (partnerWebsiteIndex === -1) {
    return NextResponse.json({ error: 'Partner website not found' }, { status: 404 });
  }

  // Update the partner website
  partnerWebsites[partnerWebsiteIndex] = {
    ...partnerWebsites[partnerWebsiteIndex],
    ...(name && { name }),
    ...(url && { url }),
    ...(apiKey && { apiKey }),
  };

  // Don't send the API key back to the client
  const { apiKey: _, ...safeUpdatedPartnerWebsite } = partnerWebsites[partnerWebsiteIndex];

  return NextResponse.json(safeUpdatedPartnerWebsite);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
  }

  const partnerWebsiteIndex = partnerWebsites.findIndex(pw => pw.id === id);

  if (partnerWebsiteIndex === -1) {
    return NextResponse.json({ error: 'Partner website not found' }, { status: 404 });
  }

  // Remove the partner website
  partnerWebsites.splice(partnerWebsiteIndex, 1);

  return NextResponse.json({ message: 'Partner website deleted successfully' });
}