import Divider from "components/Divider";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header className="px-8 pt-8 pb-6">
        <Link href="/">
          <a className="hover:underline">
            <h1 className="text-2xl font-bold inline">Blog</h1>
          </a>
        </Link>
      </header>
      <Divider />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
