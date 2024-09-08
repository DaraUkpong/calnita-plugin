// app/api/request-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { gql } from 'graphql-request';
import { graphqlClient } from '@/utils/graphql-client';
import { REQUEST_OTP_MUTATION } from '@/app/lib/mutations';



export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const variables = { email };
console.log(variables)
    const response = await graphqlClient.request(REQUEST_OTP_MUTATION, variables);

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('Error requesting OTP:', error);
    return NextResponse.json(
      { error: 'Failed to request OTP', details: error.message },
      { status: 500 }
    );
  }
}