import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Pilih bobot yang dibutuhkan
  variable: "--font-poppins",
});

export const metadata = {
  title: "Quizzy",
  description: "Quizzy adalah platform kuis interaktif untuk menguji dan mengembangkan pengetahuan dalam berbagai kategori. Jawab pertanyaan, raih skor tertinggi, dan asah keterampilanmu!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
