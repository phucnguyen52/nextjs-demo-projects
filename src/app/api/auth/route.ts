// import { decodeJWT } from "@/lib/utils";

// type PayloadJWT = {
//   iat: number;
//   exp: number;
//   tokenType: string;
//   userId: string;
// };

export async function POST(request: Request) {
  const body = await request.json();

  const sessionToken = body.sessionToken as string;
  const expiresAt = body.expiresAt as string;
  if (!sessionToken) {
    return Response.json(
      { message: "Không nhận được session token" },
      {
        status: 400,
      }
    );
  }
  // // decode token để lấy ngày hết hạn rồi set vào cookies
  // const payload = decodeJWT<PayloadJWT>(sessionToken);
  const expiresDate = new Date(expiresAt).toISOString();
  return Response.json(body, {
    status: 200,
    headers: {
      "Set-Cookie": `sessionToken=${sessionToken}; Path=/; HttpOnly; Expires=${expiresDate}; SameSite=Lax; Secure`,
    },
  });
}
