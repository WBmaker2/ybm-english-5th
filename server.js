import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8"
};

function resolveRequestPath(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, "http://localhost").pathname);
  const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
  const absolutePath = path.normalize(path.join(rootDirectory, relativePath));

  if (!absolutePath.startsWith(rootDirectory)) {
    throw new Error("Forbidden");
  }

  return absolutePath;
}

const server = createServer(async (request, response) => {
  try {
    const filePath = resolveRequestPath(request.url || "/");
    const fileStats = await stat(filePath);

    if (fileStats.isDirectory()) {
      response.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Directory listing is not allowed.");
      return;
    }

    const body = await readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();

    response.writeHead(200, {
      "Cache-Control": "no-store",
      "Content-Type": mimeTypes[extension] || "application/octet-stream"
    });
    response.end(body);
  } catch (error) {
    const statusCode = error.message === "Forbidden" ? 403 : 404;
    response.writeHead(statusCode, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(statusCode === 403 ? "Forbidden" : "Not found");
  }
});

server.listen(port, () => {
  console.log(`Golden Bell app ready at http://localhost:${port}`);
});
