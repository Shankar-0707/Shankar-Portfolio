export default function ProjectCard({ title, tech, link }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-orange-500 transition">
      <h3 className="text-lg font-medium mb-3">{title}</h3>

      <div className="flex gap-2 mb-4 flex-wrap">
        {tech.map((t) => (
          <span key={t} className="text-xs bg-white/10 px-2 py-1 rounded">
            {t}
          </span>
        ))}
      </div>

      <a href={link} className="text-sm text-orange-500">
        Live Demo →
      </a>
    </div>
  );
}
