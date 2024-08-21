'use client';
import { Project } from '@/lib/db/schema';
import { motion } from 'framer-motion';

export default function ProjectCards({ projects }: { projects: Project[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    className="bg-black/30 border border-neon-blue rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-neon-blue my-4">{project.title}</h3>
                        <p className="text-neon-green mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-4 mt-4">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neon-orange hover:text-neon-blue transition-colors pr-6"
                            >
                                GitHub
                            </a>
                            {project.live_link && (
                                <a
                                    href={project.live_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-neon-orange hover:text-neon-blue transition-colors px-4"
                                >
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
