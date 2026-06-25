import { NextStudio } from 'next-sanity/studio';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

// Gunakan Project ID abang: ynzv2cpt
const config = defineConfig({
  projectId: 'ynzv2cpt',
  dataset: 'production',
  title: 'Azri Studio Admin',
  basePath: '/admin', // Jalan rahsia abang
  plugins: [deskTool()],
  schema: {
    types: [
      {
        name: 'project',
        title: 'Project Portfolio',
        type: 'document',
        fields: [
          { name: 'title', title: 'Nama Projek', type: 'string' },
          { name: 'category', title: 'Kategori', type: 'string' },
          { name: 'description', title: 'Penerangan', type: 'text' },
          { name: 'image', title: 'Gambar', type: 'image', options: { hotspot: true } },
          { name: 'link', title: 'Link Vercel', type: 'url' },
          { name: 'tags', title: 'Tags (Guna koma)', type: 'string' },
        ]
      }
    ]
  }
});

export default function StudioPage() {
  return (
    <div className="h-screen w-full bg-white">
      <NextStudio config={config} />
    </div>
  );
}