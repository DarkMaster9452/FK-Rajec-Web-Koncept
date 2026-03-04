import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prettier from "prettier";

async function getHtmlFiles(dir) {
  const { readdir } = await import("node:fs/promises");
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await getHtmlFiles(fullPath)));
      continue;
    }
    if (entry.isFile() && entry.name.toLowerCase().endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function formatInlineScripts(html) {
  return html.replace(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/gi, (_m, attrs, body) => {
    const source = body.trim();
    if (!source) {
      return `<script${attrs}></script>`;
    }

    try {
      const formatted = prettier.format(source, {
        parser: "babel",
        printWidth: 100,
        semi: true,
        singleQuote: true,
      });
      return `<script${attrs}>\n${formatted.trim()}\n</script>`;
    } catch {
      return `<script${attrs}>\n${source}\n</script>`;
    }
  });
}

async function formatHtmlFile(filePath) {
  const raw = await readFile(filePath, "utf8");

  const firstPass = await prettier.format(raw, {
    parser: "html",
    printWidth: 100,
    htmlWhitespaceSensitivity: "ignore",
  });

  const withPrettyScripts = formatInlineScripts(firstPass);

  const finalHtml = await prettier.format(withPrettyScripts, {
    parser: "html",
    printWidth: 100,
    htmlWhitespaceSensitivity: "ignore",
  });

  await writeFile(filePath, finalHtml, "utf8");
}

async function main() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const rootDir = path.resolve(scriptDir, "..");
  const outDirArg = process.argv[2];
  const outDir = outDirArg ? path.resolve(rootDir, outDirArg) : path.join(rootDir, "out");

  const files = await getHtmlFiles(outDir);
  await Promise.all(files.map((filePath) => formatHtmlFile(filePath)));

  process.stdout.write(`Formatted ${files.length} HTML files in ${outDir}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
