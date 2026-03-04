import { existsSync } from "node:fs";
import { cp, rm, symlink } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import os from "node:os";

const root = process.cwd();
const tempRoot = path.join(os.tmpdir(), `fk-rajec-pages-${Date.now()}`);
const tempOut = path.join(tempRoot, "out");
const rootOut = path.join(root, "out");

const excludedPrefixes = [
  ".git/",
  ".next/",
  "out/",
  "node_modules/",
  "src/app/api/",
  "src/app/auth/",
  "src/app/dashboard/",
];

function shouldCopy(src, dest) {
  const rel = path.relative(root, src).replace(/\\/g, "/");
  if (!rel || rel === ".") return true;
  if (dest.includes(".pages-build-temp")) return false;
  return !excludedPrefixes.some((prefix) => rel === prefix.slice(0, -1) || rel.startsWith(prefix));
}

function runBuild() {
  return new Promise((resolve, reject) => {
    const child = spawn("npx", ["next", "build", "--webpack"], {
      cwd: tempRoot,
      stdio: "inherit",
      shell: process.platform === "win32",
      env: {
        ...process.env,
        GITHUB_ACTIONS: "true",
      },
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Pages build failed with exit code ${code}`));
      }
    });
  });
}

function runHtmlFormatter() {
  return new Promise((resolve, reject) => {
    const child = spawn("node", ["scripts/format-export-html.mjs"], {
      cwd: root,
      stdio: "inherit",
      shell: process.platform === "win32",
      env: {
        ...process.env,
      },
    });

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`HTML formatting failed with exit code ${code}`));
      }
    });
  });
}

async function prepareTempWorkspace() {
  await rm(tempRoot, { recursive: true, force: true });

  await cp(root, tempRoot, {
    recursive: true,
    filter: shouldCopy,
  });

  await symlink(path.join(root, "node_modules"), path.join(tempRoot, "node_modules"), "junction");
}

async function copyBuildOutputBack() {
  if (!existsSync(tempOut)) {
    throw new Error("Pages build did not produce an out directory.");
  }

  await rm(rootOut, { recursive: true, force: true });
  await cp(tempOut, rootOut, { recursive: true });
}

try {
  await prepareTempWorkspace();
  await runBuild();
  await copyBuildOutputBack();
  await runHtmlFormatter();
} finally {
  await rm(tempRoot, { recursive: true, force: true });
}
