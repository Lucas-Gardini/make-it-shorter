import { PrismaClient } from "@prisma/client";
import LinkCard from "components/LinkCard";
import Head from "next/head";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";

export async function getServerSideProps(context) {
	const prisma = new PrismaClient();

	let Link = await prisma.link.findFirst({
		where: {
			customUrl: context.query.url,
		},
	});

	if (Link === null) {
		Link = await prisma.link.findFirst({
			where: {
				id: context.query.url,
			},
		});
	}

	return {
		props: { shortenedInfo: Link }, // will be passed to the page component as props
	};
}

export default function Home({ shortenedInfo }) {
	console.log(shortenedInfo);

	useEffect(() => {
		if (shortenedInfo !== null) {
			window.location.href = shortenedInfo.url;
		} else {
			window.location.href = "/";
		}
	});

	return (
		<div className={styles.container}>
			<Head>
				<title>Make It Shorter - {shortenedInfo ? shortenedInfo.url : "URL INVÁLIDA"}</title>
				<meta name="description" content={shortenedInfo ? `Redirecionando você para: ${shortenedInfo.url}` : "URL INVÁLIDA"} />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{shortenedInfo && <main className={styles.main}>Te levando para: {shortenedInfo.url}</main>}
		</div>
	);
}
