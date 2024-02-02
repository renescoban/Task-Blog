import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"],
variable: "--font-sans" });

export const metadata = {
  title: "Task Blog",
  description: "Task Blog built using next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className=  {inter.className}  >
        <div className='main'>
          <div className='gradient' ></div>
        </div>
        <main className='antialiased font-sans relative z-0 flex justify-center items-center flex-col'>

          <nav className='flex justify-between items-center w-full h-16 z-50 '>
            <div className='pl-2 ' >
              <a href="/" className='px-2 text-black'>Home</a>
            </div>
            <div className='flex gap-5'>buton navs</div>
            <div className='pr-2'>prf</div>
          </nav>

          {children}
        </main>
      </body>
    </html>
  );
}
