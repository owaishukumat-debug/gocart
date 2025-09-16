import { PrismaClient } from "@prisma/client";
import formidable from "formidable";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

export async function POST(req) {
  const form = new formidable.IncomingForm();
  form.uploadDir = path.join(process.cwd(), "/public/uploads");
  form.keepExtensions = true;

  if (!fs.existsSync(form.uploadDir)) fs.mkdirSync(form.uploadDir, { recursive: true });

  // Simplified body parsing for App Router
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const data = Buffer.concat(chunks).toString();
  const contentType = req.headers['content-type'];
  if (contentType?.includes('multipart/form-data')) {
    form.headers = { ...req.headers };
  }

  return new Promise((resolve) => {
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Form parse error:", err.stack); // Detailed error
        resolve(new Response(JSON.stringify({ error: "Form parsing error: " + err.message }), { status: 500 }));
        return;
      }

      try {
        console.log("Received fields:", fields); // Debug fields
        console.log("Received files:", files); // Debug files
        const { name, description, mrp, price, category, stock } = fields;
        if (!name || !mrp || !price) {
          resolve(new Response(JSON.stringify({ error: "Name, MRP, and price are required" }), { status: 400 }));
          return;
        }

        let imagePath = "/placeholder.png";
        if (files.image) {
          const file = Array.isArray(files.image) ? files.image[0] : files.image;
          const fileName = `${Date.now()}_${path.basename(file.originalFilename || 'image.jpg')}`;
          const destPath = path.join(form.uploadDir, fileName);
          fs.renameSync(file.filepath, destPath);
          imagePath = `/uploads/${fileName}`;
        }

        const product = await prisma.product.create({
          data: {
            name: name[0], // Handle array from formidable
            description: description ? description[0] || "" : "",
            mrp: parseFloat(mrp[0]),
            price: parseFloat(price[0]),
            images: [imagePath],
            category: category ? category[0] || "" : "",
            stock: parseInt(stock[0]) || 0,
            inStock: parseInt(stock[0]) > 0,
          },
        });

        console.log("Product created:", product); // Debug success
        resolve(new Response(JSON.stringify({ product }), { status: 200 }));
      } catch (error) {
        console.error("DB error:", error.stack); // Detailed DB error
        resolve(new Response(JSON.stringify({ error: "Error adding product: " + error.message }), { status: 500 }));
      }
    });
  });
}