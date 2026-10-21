import { existsSync, mkdirSync, copyFileSync } from "node:fs";
import path from "node:path";
const name = "Build_In_Right_Order_Website_Approved.mp4";
const src = path.resolve(process.cwd(), "server/private_media", name);
const dest = path.resolve(process.cwd(), "dist/private_media", name);
if (existsSync(src)) {
  mkdirSync(path.dirname(dest), { recursive: true });
  copyFileSync(src, dest);
  console.log("[Video] Private video staged for streaming.");
} else {
  console.log("[Video] Private video not yet supplied; preview will display an unavailable notice.");
}
