import { readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const basePathArg = process.argv[2] ?? "/";
const normalizedBase =
    basePathArg === "/"
        ? "/"
        : `${basePathArg.startsWith("/") ? basePathArg : `/${basePathArg}`}`.replace(/\/$/, "") + "/";

const distClientDir = path.resolve("dist/client");
const assetsDir = path.join(distClientDir, "assets");

const ensureTrailingSlash = (value) => (value.endsWith("/") ? value : `${value}/`);
const trimLeadingSlash = (value) => value.replace(/^\//, "");

const findLargestAppEntry = async () => {
    const files = await readdir(assetsDir);
    const entryCandidates = files.filter((file) => /^index-.*\.js$/.test(file));

    if (entryCandidates.length === 0) {
        throw new Error("No client entry chunk was found in dist/client/assets.");
    }

    const candidateStats = await Promise.all(
        entryCandidates.map(async (file) => {
            const fullPath = path.join(assetsDir, file);
            const fileStat = await stat(fullPath);
            return { file, size: fileStat.size };
        })
    );

    candidateStats.sort((a, b) => b.size - a.size);
    return `assets/${candidateStats[0].file}`;
};

const findStylesheet = async () => {
    const files = await readdir(assetsDir);
    const styleFile = files.find((file) => /^styles-.*\.css$/.test(file));
    return styleFile ? `assets/${styleFile}` : null;
};

const writeIndexHtml = async () => {
    const appEntry = await findLargestAppEntry();
    const stylesheet = await findStylesheet();

    const baseForHtml = ensureTrailingSlash(normalizedBase);
    const scriptSrc = `${baseForHtml}${trimLeadingSlash(appEntry)}`;
    const stylesheetHref = stylesheet ? `${baseForHtml}${trimLeadingSlash(stylesheet)}` : null;

    const html = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Whispers of Fate</title>
    ${stylesheetHref ? `<link rel="stylesheet" href="${stylesheetHref}" />` : ""}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="${scriptSrc}"></script>
  </body>
</html>
`;

    await writeFile(path.join(distClientDir, "index.html"), html, "utf8");
};

await writeIndexHtml();
console.log(`Generated dist/client/index.html with base path: ${normalizedBase}`);
