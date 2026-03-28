const fs = require("fs");
const font = fs.readFileSync("public/fonts/NotoSansBengali.ttf");
const b64 = font.toString("base64");
fs.writeFileSync(
  "src/lib/NotoSansBengaliBase64.ts",
  `export const NotoSansBengaliBase64 = "${b64}";`,
);
console.log("Done!");
