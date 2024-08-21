'use client';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

export default function SocialLinks() {
    const links = [
        { href: 'https://github.com/f3rix-xyz', icon: FaGithub, label: 'GitHub' },
        { href: 'https://www.linkedin.com/in/ayush-goyal-45334418a/', icon: FaLinkedin, label: 'LinkedIn' },
        { href: 'mailto:ayush_g@ar.iitr.ac.in', icon: FaEnvelope, label: 'Email' }, // Add your email here
    ];

    return (
        <div className="flex flex-row space-x-4">
            {links.map((link) => (
                <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-4 text-neon-blue hover:text-neon-orange transition-colors"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <link.icon className="text-4xl" />
                    <span className="sr-only">{link.label}</span>
                </motion.a>
            ))}
        </div>
    );
}
