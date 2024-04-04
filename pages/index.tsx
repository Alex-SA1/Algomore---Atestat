import Head from "next/head";
import Header from "@/components/Header";
import Main from "@/components/Main";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="text-black bg-black">
      <Head>
        <title>AlgoMore</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      
      <Header />
      <Main />
      <Footer />
    </div>
  
  )
}
