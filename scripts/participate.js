#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const ROOT_DIR = path.resolve(__dirname, "..");
const PARTICIPANTS_DIR = path.join(ROOT_DIR, "participants");
const TEMPLATE_DIR = path.join(PARTICIPANTS_DIR, "template");
const TSCONFIG_PATH = path.join(ROOT_DIR, "tsconfig.json");

// ─── Helpers ────────────────────────────────────────────────────────────────

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function copyDirRecursive(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function replaceTemplateAlias(filePath, username) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const updated = raw.replace(/@template\//g, `@${username}/`);
  if (updated !== raw) {
    fs.writeFileSync(filePath, updated, "utf-8");
  }
}

function replaceAliasInAllTsFiles(dir, username) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      replaceAliasInAllTsFiles(fullPath, username);
    } else if (entry.name.endsWith(".ts")) {
      replaceTemplateAlias(fullPath, username);
    }
  }
}

function updateParticipantTsconfig(username) {
  const tsconfigPath = path.join(PARTICIPANTS_DIR, username, "tsconfig.json");
  const raw = fs.readFileSync(tsconfigPath, "utf-8");

  // Replace every occurrence of "@template/" alias with the new username alias
  const updated = raw
    .replace(/@template\//g, `@${username}/`)
    .replace(/participants\/template\//g, `participants/${username}/`);

  fs.writeFileSync(tsconfigPath, updated, "utf-8");
}

function addPathToRootTsconfig(username) {
  const raw = fs.readFileSync(TSCONFIG_PATH, "utf-8");
  const tsconfig = JSON.parse(raw);

  const aliasKey = `@${username}/*`;
  const aliasValue = [`participants/${username}/*`];

  if (tsconfig.compilerOptions.paths[aliasKey]) {
    console.log(`  ℹ️  Path alias "@${username}/*" already exists in tsconfig.json — skipping.`);
    return;
  }

  tsconfig.compilerOptions.paths[aliasKey] = aliasValue;

  // Write back with 2-space indentation to preserve style
  fs.writeFileSync(TSCONFIG_PATH, JSON.stringify(tsconfig, null, 2) + "\n", "utf-8");
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n🎉  Welcome to the Playwright Practice Community!\n");

  let username = await prompt("  Enter your GitHub username: ");

  // Basic validation
  username = username.toLowerCase().replace(/\s+/g, "-");
  if (!username) {
    console.error("  ❌  GitHub username cannot be empty.");
    process.exit(1);
  }

  const targetDir = path.join(PARTICIPANTS_DIR, username);

  if (fs.existsSync(targetDir)) {
    console.error(`  ❌  Folder "participants/${username}" already exists. Please choose a different name.`);
    process.exit(1);
  }

  console.log(`\n  📁  Creating folder: participants/${username}`);
  copyDirRecursive(TEMPLATE_DIR, targetDir);

  console.log(`  ✏️   Updating participant tsconfig.json (replacing @template → @${username})`);
  updateParticipantTsconfig(username);

  console.log(`  ✏️   Replacing @template imports in all .ts files`);
  replaceAliasInAllTsFiles(targetDir, username);

  console.log(`  🔧  Adding "@${username}/*" path alias to root tsconfig.json`);
  addPathToRootTsconfig(username);

  console.log(`\n  ✅  Done! Your workspace is ready at: participants/${username}`);
  console.log(`\n  Next steps:`);
  console.log(`    1. Open "participants/${username}/tests/" and start writing your tests.`);
  console.log(`    2. Use "@${username}/src/..." as the path alias in your imports.\n`);
}

main().catch((err) => {
  console.error("  ❌  Unexpected error:", err.message);
  process.exit(1);
});
