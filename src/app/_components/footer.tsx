import { MailIcon, MapPinIcon, PhoneIcon, LinkedinIcon, TwitterIcon, GithubIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/icon.svg";
import { siteConfig } from "@/lib/constants";

export function Footer() {
  const socialIcons = {
    LinkedIn: LinkedinIcon,
    Twitter: TwitterIcon,
    GitHub: GithubIcon,
  };

  return (
    <footer className="bg-background text-foreground py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image src={logo} alt={siteConfig.name} className="w-8 h-8" />
              <span className="font-mono text-lg text-white">{siteConfig.name}</span>
            </div>
            <p className="text-sm opacity-80 mb-6 text-white/70">{siteConfig.description}</p>
            <div className="flex gap-3">
              {siteConfig.footer.socials.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons] || socialIcons.LinkedIn;
                return (
                  <Link
                    key={social.label}
                    href={social.href as any}
                    className="hover:text-white transition-all p-2 rounded-xl border border-white/40 hover:border-white/60 bg-transparent flex items-center justify-center group"
                    aria-label={social.label}
                  >
                    <Icon size={18} strokeWidth={1.5} className="text-white/70 group-hover:text-white" />
                  </Link>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Products</h3>
            <ul className="space-y-2 text-sm opacity-80">
              {siteConfig.footer.products.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href as any}
                    className="hover:text-accent-foreground transition-colors px-2 py-0.5 rounded-md hover:border-white/40 border border-transparent block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2 text-sm opacity-80">
              {siteConfig.footer.services.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href as any}
                    className="hover:text-accent-foreground transition-colors px-2 py-0.5 rounded-md hover:border-white/40 border border-transparent block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-[0.2em] text-[10px]">Resources</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {siteConfig.footer.resources.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href as any}
                    className="hover:text-accent-foreground transition-colors px-2 py-0.5 rounded-md hover:border-white/40 border border-transparent block"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white uppercase tracking-[0.2em] text-[10px]">Contact</h3>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-center gap-2">
                <MailIcon size={16} strokeWidth={1} />
                <Link
                  href={`mailto:${siteConfig.footer.contact.email}`}
                  className="hover:text-accent-foreground transition-colors px-2 py-0.5 rounded-md hover:border-white/40 border border-transparent"
                >
                  {siteConfig.footer.contact.email}
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <PhoneIcon size={16} strokeWidth={1} />
                <Link
                  href={`tel:${siteConfig.footer.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-accent-foreground transition-colors px-2 py-0.5 rounded-md hover:border-white/40 border border-transparent"
                >
                  {siteConfig.footer.contact.phone}
                </Link>
              </li>
              <li className="flex items-center gap-2 px-2 py-0.5">
                <MapPinIcon size={16} strokeWidth={1} />
                <span className="text-white">{siteConfig.footer.contact.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-80">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm opacity-80">
            {siteConfig.footer.legal.map((item) => (
              <Link
                key={item.label}
                href={item.href as any}
                className="hover:text-accent-foreground transition-colors px-3 py-1 rounded-lg border border-transparent hover:border-white/10 bg-transparent hover:bg-white/5"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
