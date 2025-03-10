import { readdirSync, existsSync } from 'fs';
import { join, relative } from 'path';

const IGNORED_ROOT_DIRS = ['.cursor', '.expo', '.vscode', 'node_modules', '.git'];
const CHECK_DIRS = ['app', 'src', 'scripts'];
const KEBAB_CASE_REGEX = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/;
const SPECIAL_CASES = ['(tabs)'];

function checkFolderNames(dir) {
  const items = readdirSync(dir, { withFileTypes: true });
  let hasErrors = false;

  for (const item of items) {
    if (!item.isDirectory()) continue;
    
    const fullPath = join(dir, item.name);
    const relativePath = relative(process.cwd(), fullPath);
    
    if (SPECIAL_CASES.includes(item.name)) continue;
    
    if (!KEBAB_CASE_REGEX.test(item.name)) {
      console.error(`Error: Folder "${relativePath}" should be kebab-case`);
      hasErrors = true;
    }

    hasErrors = checkFolderNames(fullPath) || hasErrors;
  }

  return hasErrors;
}

function checkRootFolders() {
  const items = readdirSync('.', { withFileTypes: true });
  let hasErrors = false;

  for (const item of items) {
    if (!item.isDirectory()) continue;
    if (IGNORED_ROOT_DIRS.includes(item.name)) continue;
    if (!CHECK_DIRS.includes(item.name) && !KEBAB_CASE_REGEX.test(item.name)) {
      console.error(`Error: Root folder "${item.name}" should be kebab-case`);
      hasErrors = true;
    }
  }

  return hasErrors;
}

let hasErrors = false;
hasErrors = checkRootFolders() || hasErrors;

for (const dir of CHECK_DIRS) {
  if (existsSync(dir)) {
    hasErrors = checkFolderNames(dir) || hasErrors;
  }
}

if (hasErrors) {
  process.exit(1);
}