import "./globals.css";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



export const metadata = {
  title: "Eagles E-Sports",
  description: "Welcome to the dynamic realm of Eagles, where skill meets strategy in the electrifying world of esports. Unleash the power of precision, coordination, and teamwork as our elite players redefine the boundaries of competitive gaming. Join us on an adrenaline-fueled journey through the digital battlefield, where every match is a spectacle of skill, passion, and triumph. Embrace the spirit of esports excellence with Eagles – where victory is not just a goal, but a way of life. Elevate your gaming experience and witness the relentless pursuit of greatness on the grand stage of competitive gaming.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
