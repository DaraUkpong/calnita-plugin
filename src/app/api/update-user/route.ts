import { graphqlClient } from "@/services/graphql";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOption";
import { updateMe } from "@/services/user/user";
import { mapResponsesToUserInput } from "@/services/graphql/mappings";

export async function POST(req: NextRequest) {
  try {
    // Get the session using getServerSession
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get the request body and destructure the fields
    const reqBody = await req.json();

    // Log for debugging
    //console.log("Received body:", reqBody);

    //return NextResponse.json({ status: 200 });

    const accessToken = session.user.accessToken;
    //console.log(accessToken);

    if (accessToken) {
      graphqlClient.setHeader("Authorization", `Bearer ${accessToken}`);
    }

    const input = mapResponsesToUserInput(reqBody);
    const data = await updateMe(input);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
