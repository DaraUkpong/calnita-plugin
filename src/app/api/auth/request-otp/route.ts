import { graphqlClient, REQUEST_OTP_MUTATION } from "@/services/graphql";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("Starting OTP request");
    const { email } = await req.json();
    console.log("Email extracted:", email);

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const variables = { email };
    console.log("Sending GraphQL request with variables:", variables);

    const startTime = Date.now();
    const response = await graphqlClient.request(
      REQUEST_OTP_MUTATION,
      variables
    );
    const endTime = Date.now();
    console.log(`GraphQL request completed in ${endTime - startTime}ms`);

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error("Error requesting OTP:", error);
    return NextResponse.json(
      { error: "Failed to request OTP", details: error.message },
      { status: 500 }
    );
  }
}
