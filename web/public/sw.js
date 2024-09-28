self.addEventListener("fetch", (e) => {
  const { request } = e;

  // if (request.mode !== "navigate") return;

  if (request.url.includes("run-js")) {
    e.respondWith(run(request));
  }
})

const run = async (request) => {
  const rawCode = await request.text();
  const result = rawCode

  return new Response(result, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
