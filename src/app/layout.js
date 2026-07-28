import { Playfair_Display, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import VersionSwitcher from "@/components/VersionSwitcher";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "CBD — Connect. Buzz. Disrupt. | A Collaboration Ecosystem",
  description: "CBD exists to bring together the people who create growth — brands, creators, businesses, colleges and communities, connected into one trusted ecosystem.",
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='22' fill='%23EEE3D8'/%3E%3Cg fill='%238F3F55' font-family='Georgia,serif' font-weight='700'%3E%3Ctext x='15' y='68' font-size='56' letter-spacing='-4'%3EC%3C/text%3E%3Ctext x='43' y='63' font-size='44'%3EB%3C/text%3E%3Ctext x='67' y='74' font-size='52'%3ED%3C/text%3E%3C/g%3E%3Cg fill='none' stroke='%238F3F55' stroke-width='1.2' stroke-linecap='round'%3E%3Cpath d='M58,58 A 3 3 0 0 0 58,62'/%3E%3Cpath d='M58,55 A 5 5 0 0 0 58,65'/%3E%3Cpath d='M58,52 A 7 7 0 0 0 58,68'/%3E%3C/g%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${manrope.variable}`}
    >
      <body>
        {children}
        <VersionSwitcher />
      </body>
    </html>
  );
}

