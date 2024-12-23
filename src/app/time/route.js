export function GET() {
  return Response.json({
    currentTime: new Date().toISOString(),
  });
}
