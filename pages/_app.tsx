import Divider from "components/Divider";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header className="px-8 pt-8 pb-6 flex justify-between items-center">
        <Link href="/">
          <a className="hover:underline">
            <h1 className="text-2xl font-bold inline">Blog</h1>
          </a>
        </Link>
        <nav>
          <Link href="/tags">
            <a className="hover:underline">Tags</a>
          </Link>
        </nav>
      </header>
      <Divider />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
