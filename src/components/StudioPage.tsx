import { Studio } from 'sanity';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

const config = defineConfig({
  projectId: 'ynzv2cpt',
  dataset: 'production',
  title: 'Azri Studio Admin',
  basePath: '/admin',
  plugins: [deskTool()],
  schema: {
    types: [
      {
        name: 'project',
        title: 'Project Portfolio',
        type: 'document',
        fields: [
          { name: 'title', title: 'Nama Projek', type: 'string' },
          { 
            name: 'category', 
            title: 'Kategori', 
            type: 'string',
            // --- KITA TAMBAH DROPDOWN KAT SINI ---
            options: {
              list: [
                { title: 'Landing Page', value: 'Landing Page' },
                { title: 'Website', value: 'Website' },
                { title: 'E-Commerce', value: 'E-Commerce' },
              ],
            },
            validation: Rule => Rule.required() // Supaya abang tak lupa pilih
          },
          { name: 'description', title: 'Penerangan', type: 'text' },
          { 
            name: 'image', 
            title: 'Gambar', 
            type: 'image', 
            options: { hotspot: true } 
          },
          { name: 'link', title: 'Link Vercel', type: 'url' },
          { name: 'tags', title: 'Tags (Guna koma)', type: 'string' },
        ]
      }
    ]
  }
});

export default function StudioPage() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Studio config={config} />
    </div>
  );
}