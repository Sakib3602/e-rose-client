"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full mt-16" style={{ backgroundColor: "#761A24" }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">RoseWood</h2>
              <p className="text-white/80 text-sm leading-relaxed mb-6">
                Hello Gorgeous, Welcome to Rosewood — your ultimate destination
                for elegant, trendy, and comfortable women's fashion. We’re here
                to make your shopping experience effortless, enjoyable, and
                empowering — with quality you can trust and styles you'll fall
                in love with.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Address:</h3>
              <div className="space-y-2 text-white/80 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p>123 Business Street, Suite 100</p>
                    <p>New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              INFORMATION
            </h3>
            <ul className="space-y-3">
              {[
                "About Us",
                "Store Locations",
                "Contact Us",
                "Size Guide",
                "Shipping Info",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/80 hover:text-white text-sm transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              CUSTOMER CARE
            </h3>
            <ul className="space-y-3">
              {[
                "Care & Wash Guide",
                "Size Guide",
                "Coupons & Gift Code",
                "Order & Delivery Process",
                "Return & Exchange",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/80 hover:text-white text-sm transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">
              CONTACT & SUPPORT
            </h3>

            <div className="mb-6">
              <h4 className="text-white font-medium mb-2">Customer Service:</h4>
              <p className="text-white/80 text-sm mb-4">
                (9 am - 6 pm Monday to Friday)
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Mail className="w-4 h-4" />
                  <span>support@yourstore.com</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-white font-medium mb-4">Follow Us On</h4>
              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white border-0"
                >
                  <Youtube className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <p className="text-white/80 text-sm mb-4">
                If you face any kind of problem while using the website, kindly
                let us know using the 'Get Help' button
              </p>
              <Button className="bg-white/20 hover:bg-white/30 text-white border border-white/30">
                Get Help
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap gap-6 text-sm">
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              Terms & Conditions
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              Return Policy
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition-colors"
            >
              Careers
            </a>
          </div>

          <div className="text-white/60 text-sm">
            © 2024 YourStore. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
