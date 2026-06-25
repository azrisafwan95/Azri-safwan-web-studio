import { motion } from 'framer-motion';
import { ExternalLink, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Setup Client Sanity
const client = createClient({
  projectId: 'ynzv2cpt', // ID abang
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-05-18',
});

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

const Portfolio = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Query GROQ (Bahasa Sanity) untuk ambil data
    const query = `*[_type == "project"] | order(_createdAt desc)`;
    
    client.fetch(query).then((data) => {
      setProjects(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-[#0a0a0b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter">
            Portfolio <span className="text-yellow-500">Terpilih</span>
          </motion.h2>
          <div className="w-20 h-1.5 bg-yellow-500 mx-auto mb-6"></div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-yellow-500" size={40} />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="group bg-[#14151a] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-yellow-500/40 transition-all duration-500 shadow-2xl"
              >
                <div className="relative h-72 overflow-hidden">
                  {project.image && (
                    <img
                      src={urlFor(project.image).url()}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14151a] via-transparent to-transparent opacity-90" />
                </div>
                
                <div className="p-8">
                  <span className="px-4 py-2 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-black text-yellow-500 uppercase tracking-widest">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-6 mb-3 uppercase tracking-tighter italic">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed font-medium">
                    {project.description}
                  </p>
                  
                  <a
                    href={project.link}
                    target="_blank"
                    className="inline-flex items-center gap-3 text-yellow-500 font-black text-xs uppercase tracking-widest hover:text-white transition-colors"
                  >
                    Lihat Live Site <ExternalLink size={16} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;