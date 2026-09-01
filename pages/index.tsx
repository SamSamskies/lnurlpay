import type { NextPage } from "next";
import Header from "components/Header";
import RetirementNotice from "components/RetirementNotice";
import Head from "next/head";
import { useGetBaseUrl } from "hooks";

const Home: NextPage = () => {
  const baseUrl = useGetBaseUrl();
  const ogContent = `${baseUrl}/thereisno2ndbest.jpg`;

  return (
    <>
      <Head>
        <meta property="og:image" content={ogContent} />
        <meta
          name="twitter:image"
          content={`${ogContent}?justtryingtomakethisfriggenimagedisplay=1`}
        />
      </Head>
      <Header />
      <RetirementNotice />
    </>
  );
};

export default Home;
