import "./globals.css";

import { PhotographerProvider } from "@/context/PhotographerContext";

export const metadata = {
  title: "Photographer Listing",
  description: "Browse and connect with the best photographers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PhotographerProvider>{children}</PhotographerProvider>
      </body>
    </html>
  );
}
