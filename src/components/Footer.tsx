import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const footerLinks = {
  social: [
    { name: "Twitter", href: "#" },
    { name: "LinkedIn", href: "#" },
    { name: "GitHub", href: "#" },
    { name: "Dribbble", href: "#" },
  ],
  navigate: [
    { name: "Home", href: "#" },
    { name: "Work", href: "#work" },
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Cookies", href: "#" },
  ],
};

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.3 });

  return (
    <footer ref={footerRef} className="relative py-20 border-t border-primary/20">
      <div className="container mx-auto px-6">
        {/* Grid Layout */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-4xl font-display">
              <span className="text-primary">CREATIVE</span>
              <br />
              DEV
            </h3>
            <p className="text-muted-foreground text-sm font-mono">
              [ Crafting exceptional digital experiences ]
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground">
              Follow
            </h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link, i) => (
                <motion.li 
                  key={i} 
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <a
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 font-mono"
                  >
                    <motion.span 
                      className="text-primary"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    >
                      →
                    </motion.span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground">
              Navigate
            </h4>
            <ul className="space-y-3">
              {footerLinks.navigate.map((link, i) => (
                <motion.li 
                  key={i} 
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <a
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 font-mono"
                  >
                    <motion.span 
                      className="text-primary"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    >
                      →
                    </motion.span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h4 className="text-sm font-mono uppercase tracking-[0.3em] text-muted-foreground">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, i) => (
                <motion.li 
                  key={i} 
                  whileHover={{ x: 5 }}
                  className="group"
                >
                  <a
                    href={link.href}
                    className="text-foreground hover:text-primary transition-colors inline-flex items-center gap-2 font-mono"
                  >
                    <motion.span 
                      className="text-primary"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    >
                      →
                    </motion.span>
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-primary/20 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-mono"
        >
          <p>© 2024 CREATIVE DEVELOPER. ALL RIGHTS RESERVED.</p>
          <motion.div
            className="flex items-center gap-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span 
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            AVAILABLE FOR FREELANCE
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent origin-left"
      />
    </footer>
  );
};
