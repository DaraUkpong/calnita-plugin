import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { graphqlClient } from '@/utils/graphql-client';
import { UPDATE_USER_MUTATION } from '@/app/lib/mutations';
import { authOptions } from '@/app/lib/auth'; // Adjust the path as needed

export async function POST(req: NextRequest) {
  try {
    // Get the session using getServerSession
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get the request body
    const { input } = await req.json();

    // Optionally, use the session data to authenticate the request to your GraphQL server
    // For example, set it in headers or some other authentication mechanism
    // Assuming you have an access token in the session, use it instead of refresh token
    if (session.accessToken) {
      graphqlClient.setHeader('Authorization', `Bearer ${session.accessToken}`);
    }

    // Perform the GraphQL request
    const data: any = await graphqlClient.request(UPDATE_USER_MUTATION, { input });

    return NextResponse.json(data.updateMe, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}