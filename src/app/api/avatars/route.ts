import fs from 'fs';
import path from 'path';

export async function GET() {
  const imagesDir = path.join(process.cwd(), 'public/assets/images/avatars');

  // Assurez-vous que le dossier existe
  if (!fs.existsSync(imagesDir)) {
    return new Response(JSON.stringify({ error: 'Directory not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const filenames = fs.readdirSync(imagesDir);

  // Filtrer les fichiers pour inclure uniquement les images (par exemple, .jpg, .png)
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const imagePaths = filenames
    .filter((filename) => imageExtensions.includes(path.extname(filename).toLowerCase()))
    .map((filename) => `/assets/images/avatars/${filename}`);

  return new Response(JSON.stringify(imagePaths), {
    headers: { 'Content-Type': 'application/json' },
  });
}
