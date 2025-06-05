import { submitRegistration } from "@/lib/submitRegistration";

export async function POST(req) {
  const formData = await req.formData();
  const authHeader = req.headers.get("authorization");
  const accessToken = authHeader?.split(" ")[1];

  const result = await submitRegistration(formData, accessToken);
  return Response.json(result);
}



