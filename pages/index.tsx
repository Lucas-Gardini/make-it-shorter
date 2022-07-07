import LinkCard from "components/LinkCard";
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home({}) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Make It Shorter - Seu encurtador de links</title>
				<meta name="description" content="Mais um site que encurta seu link de modo gratuito e sem anúncios porque sim" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 style={{ position: "absolute", top: "0" }}>Make It Shorter</h1>
				<LinkCard />
			</main>
		</div>
	);
}
