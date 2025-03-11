import path from "path";
import sanitize from "sanitize-filename";

export const sanitizeFilename = (originalFileName: string) => {
    if (!originalFileName) {
        return { sanitizedBaseName: "", ext: "" }
    }
    const ext = path.extname(originalFileName);
    const baseName = path.basename(originalFileName, ext);

    const sanitizedBaseName = sanitize(baseName).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 50);

    return { sanitizedBaseName, ext }


}