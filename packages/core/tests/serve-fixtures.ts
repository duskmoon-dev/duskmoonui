// Simple static file server for visual tests
const server = Bun.serve({
  port: 3333,
  async fetch(req) {
    const url = new URL(req.url);
    const filePath = '.' + url.pathname;
    const file = Bun.file(filePath);
    if (await file.exists()) {
      return new Response(file);
    }
    return new Response('Not found', { status: 404 });
  },
});

console.log(`Server running at http://localhost:${server.port}`);
