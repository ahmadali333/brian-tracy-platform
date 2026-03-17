import { motion } from "framer-motion";
import {
  Instagram,
  Linkedin,
  Facebook,
  ArrowUpRight,
} from "lucide-react";
import { Magnetic, LineReveal } from "./AnimationComponents";
import { useNavigate } from "react-router-dom";
import { useRef, useCallback } from "react";
import { SOCIAL_LINKS } from "@/constants/links";

const footerLinks = {
  services: ["AI/ML Development", "Enterprise Software", "SaaS Development", "MVP & POC", "Product Strategy", "Mobile App Development", "Branding & UI/UX", "Social Media Marketing"],
  company: [
    { name: "Projects", href: "/projects" },
    { name: "Articles", href: "/articles" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" }],
  social: [
    { icon: Linkedin, href: SOCIAL_LINKS.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: SOCIAL_LINKS.instagram, label: "Instagram" },
    { icon: Facebook, href: SOCIAL_LINKS.facebook, label: "Facebook" },
  ],
};

export const Footer = () => {
  const navigate = useNavigate();
  const glowRef = useRef<HTMLDivElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);

  const handleGlowMove = useCallback((e: React.MouseEvent) => {
    if (!glowRef.current || !h2Ref.current) return;
    const rect = glowRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    h2Ref.current.style.backgroundImage = `radial-gradient(circle 300px at ${x}px ${y}px, #00d4aa 0%, rgba(18,107,102,0.4) 45%, rgba(255,255,255,0.05) 70%)`;
  }, []);

  const handleGlowEnter = useCallback(() => {
    // gradient will be set by move handler
  }, []);

  const handleGlowLeave = useCallback(() => {
    if (h2Ref.current) {
      h2Ref.current.style.backgroundImage = 'linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05))';
    }
  }, []);

  return (
    <footer className="section-forced-dark section-padding md:py-20 max-md:pb-10 border-t border-border overflow-hidden">

      <div className="max-w-[1800px] mx-auto relative z-10">
        {/* Big Logo with cursor glow */}
        <motion.div
          ref={glowRef}
          className="mb-12 relative cursor-default"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onMouseMove={handleGlowMove}
          onMouseEnter={handleGlowEnter}
          onMouseLeave={handleGlowLeave}
        >
          <h2
            ref={h2Ref}
            className="text-[15vw] font-bold leading-none tracking-tighter select-none hidden md:block overflow-hidden"
            style={{
              color: 'transparent',
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.05), rgba(255,255,255,0.05))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              transition: 'none',
            }}
          >
            Forrof
          </h2>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Magnetic strength={0.1}>
              <motion.a
                href="#home"
                className="text-3xl font-bold tracking-tight inline-block mb-6"
                whileHover={{ scale: 1.02 }}
              >
                Forrof
              </motion.a>
            </Magnetic>
            <p className="text-muted-foreground max-w-md mb-8 leading-relaxed">
              We engineer intelligent software products and business systems
              that turn technology into a long‑term growth engine.
            </p>
            <div className="flex gap-4">
              {footerLinks.social.map((social, index) => (
                <Magnetic key={social.label} strength={0.3}>
                  <motion.a
                    href={social.href}
                    aria-label={social.label}
                    className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-muted-foreground overflow-hidden relative group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-foreground"
                      initial={{ y: "100%" }}
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <social.icon size={18} className="relative z-10 " />
                  </motion.a>
                </Magnetic>
              ))}
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-6">
              Services
            </p>
            <ul className="space-y-4">
              {footerLinks.services.map((link, index) => (
                <motion.li
                  key={link}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <motion.a
                    href="#services"
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-6">
              Company
            </p>
            <ul className="space-y-4">
              {footerLinks.company.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <motion.a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(link.href);
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 inline-flex items-center gap-2 group"
                    whileHover={{ x: 5 }}
                  >
                    {link.name}
                    <ArrowUpRight
                      size={12}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar with Animation */}
        <motion.div
          className="pt-8 border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <LineReveal className="h-px bg-border w-full mb-8" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              className="text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} Forrof. All rights reserved.
            </motion.p>
            <div className="flex gap-8">
              <motion.a
                href="/privacy-policy"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/privacy-policy");
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0 }}
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="/terms-and-policy"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/terms-and-policy");
                }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
