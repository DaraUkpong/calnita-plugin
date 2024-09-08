import { NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';
import xml2js from 'xml2js';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

const transformCsvData = (data: any[]): Product[] => {
  return data.map((item: any) => ({
    id: item['ID'],
    name: item['Name'],
    price: parseFloat(item['Price']),
    imageUrl: item['ImageURL'],
  }));
};

const transformXmlData = (data: any): Product[] => {
  return data.products.product.map((item: any) => ({
    id: item.id[0],
    name: item.name[0],
    price: parseFloat(item.price[0]),
    imageUrl: item.imageUrl[0],
  }));
};

const saveProductsToDatabase = async (products: Product[], partnerId: string) => {
  const mutation = `
    mutation AddProducts($products: [ProductInput!]!, $partnerId: ID!) {
      addProducts(products: $products, partnerId: $partnerId) {
        success
        message
        errors {
          field
          message
        }
      }
    }
  `;
  const variables = { products, partnerId };

  const response = await fetch(process.env.GRAPHQL_ENDPOINT ?? '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer YOUR_AUTH_TOKEN`,
    },
    body: JSON.stringify({ query: mutation, variables }),
  });

  const result = await response.json();
  return result.data.addProducts;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const partnerId = formData.get('partnerId') as string;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' });
    }

    const text = await file.text();

    let transformedData: Product[] = [];
    if (file.name.endsWith('.csv')) {
      const records = parse(text, { columns: true });
      transformedData = transformCsvData(records);
    } else if (file.name.endsWith('.xml')) {
      const result = await xml2js.parseStringPromise(text);
      transformedData = transformXmlData(result);
    } else {
      return NextResponse.json({ success: false, error: 'Unsupported file type' });
    }

    const saveResult = await saveProductsToDatabase(transformedData, partnerId);

    return NextResponse.json({ success: saveResult.success, message: saveResult.message });
  } catch (error) {
    console.error('Error parsing file:', error);
    return NextResponse.json({ success: false, error: 'Failed to parse file' });
  }
}
