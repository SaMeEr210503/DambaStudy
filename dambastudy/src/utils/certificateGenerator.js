import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

/**
 * generateCertificatePDF
 * params:
 *   name: Student name
 *   courseTitle: Title of course
 *   date: Completion date (string)
 * returns Uint8Array PDF bytes
 */
export async function generateCertificatePDF({ name, courseTitle, date }) {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([800, 600]);
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Background
    page.drawRectangle({
        x: 0,
        y: 0,
        width: 800,
        height: 600,
        color: rgb(0.95, 0.95, 0.95),
    });

    // Title
    page.drawText("Certificate of Completion", {
        x: 180,
        y: 520,
        size: 30,
        font,
        color: rgb(0.2, 0.2, 0.2),
    });

    // Subtitle
    page.drawText("This certificate is proudly presented to:", {
        x: 200,
        y: 470,
        size: 14,
        font,
        color: rgb(0.3, 0.3, 0.3),
    });

    // Student name
    page.drawText(name, {
        x: 200,
        y: 430,
        size: 28,
        font,
        color: rgb(0, 0, 0),
    });

    // Course title
    page.drawText(`For successfully completing:`, {
        x: 200,
        y: 380,
        size: 14,
        font,
        color: rgb(0.3, 0.3, 0.3),
    });

    page.drawText(courseTitle, {
        x: 200,
        y: 350,
        size: 20,
        font,
        color: rgb(0.1, 0.1, 0.1),
    });

    // Date
    page.drawText(`Date: ${date}`, {
        x: 200,
        y: 300,
        size: 14,
        font,
        color: rgb(0.3, 0.3, 0.3),
    });

    // Footer
    page.drawText("DambaStudy Academy", {
        x: 330,
        y: 60,
        size: 12,
        font,
        color: rgb(0.2, 0.2, 0.2),
    });

    return await pdfDoc.save();
}
