import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className=" max-w-7xl mx-auto px-6 sm:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Branding */}
          <div>
            <h2 className="text-2xl font-bold text-white">MindStack</h2>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              Empowering learners worldwide with personalized education and
              modern learning tools.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Explore</h3>
              <ul className="space-y-2 text-sm">
                {["Courses", "About", "Blog", "Pricing"].map((item, idx) => (
                  <li key={idx}>
                    <motion.a
                      whileHover={{ x: 4, color: "#60a5fa" }}
                      transition={{ type: "spring", stiffness: 300 }}
                      href="#"
                      className="block"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
              <ul className="space-y-2 text-sm">
                {["Help Center", "FAQ", "Contact", "Privacy Policy"].map(
                  (item, idx) => (
                    <li key={idx}>
                      <motion.a
                        whileHover={{ x: 4, color: "#34d399" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        href="#"
                        className="block"
                      >
                        {item}
                      </motion.a>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Connect</h3>
            <div className="flex gap-4">
              {[
                { icon: Github, link: "#" },
                { icon: Linkedin, link: "#" },
                { icon: Twitter, link: "#" },
                { icon: Mail, link: "#" },
              ].map((item, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.2, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  href={item.link}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white shadow"
                >
                  <item.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} MindStack. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-2 sm:mt-0">
            Built with ❤️ by{" "}
            <span className="text-white font-semibold">Razib Dash</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
