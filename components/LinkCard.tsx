import { useState } from "react";
import { Card, Grid, Text, Button, Row, Input, Checkbox } from "@nextui-org/react";
import Link from "next/link";

export default function LinkCard() {
	const [url, setUrl] = useState("https://");
	const [useCustomUrl, setUseCustomUrl] = useState(false);
	const [customUrl, setCustomUrl] = useState("");
	const [shortenedUrl, setShortenedUrl] = useState({ id: "", url: "", customUrl: "" });
	const [available, setAvailable] = useState(false);

	const checkAvailability = async () => {
		const checkAvailabilityOfCustomUrl = async () => {
			const response = await fetch("/api/checkCustomUrl", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ customUrl }),
			});
			const data = await response.json();

			setAvailable(data.available);

			if (!data.available) {
				alert("URL Personalizada já está em uso");
			}
		};

		try {
			let address = url;
			if (address.includes("http") === false) {
				address = `https://${address}`;
				setUrl(address);
			}

			setAvailable(true);

			useCustomUrl && (await checkAvailabilityOfCustomUrl());
		} catch (error) {
			console.log(error.message);
			setAvailable(false);
			alert("URL inválida");
		}
	};

	const shortenUrl = async () => {
		try {
			const response = await fetch("/api/shorten", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ url, customUrl: useCustomUrl ? customUrl : "" }),
			});
			const { link } = await response.json();
			setShortenedUrl(link);
		} catch (error) {
			console.log(error.message);
			alert("Erro ao encurtar o link");
		}
	};

	return (
		<Grid.Container>
			<Grid>
				<Card css={{ minWidth: "80vw" }}>
					<Card.Header>
						<Text b>Encurtar Link</Text>
					</Card.Header>
					<Card.Divider />
					{shortenedUrl.id.length === 0 ? (
						<Card.Body css={{ overflow: "hidden" }}>
							<Input
								value={url}
								onChange={(e) => {
									setAvailable(false);
									setUrl(e.target.value);
								}}
								clearable
								underlined
								label="Url"
								color="success"
							/>

							{useCustomUrl && (
								<Input
									value={customUrl}
									onChange={(e) => {
										setAvailable(false);
										setCustomUrl(e.target.value);
									}}
									clearable
									underlined
									css={{ mt: 15 }}
									label="Personalizada"
									color="primary"
								/>
							)}

							<Checkbox
								color="success"
								defaultSelected={useCustomUrl}
								css={{ mt: 15 }}
								onChange={(e) => {
									setUseCustomUrl(e);
								}}
							>
								Url Personalizada
							</Checkbox>
						</Card.Body>
					) : (
						<Card.Body css={{ overflow: "hidden" }}>
							<Text
								onClick={() => {
									navigator.clipboard.writeText(window.location.origin + "/" + shortenedUrl.id);
									alert("Url copiada!");
								}}
							>
								<Text b css={{ mr: 10 }}>
									Link encurtado:
								</Text>
								<Link href="#">{window.location.origin + "/" + shortenedUrl.id}</Link>
							</Text>
							{shortenedUrl.customUrl.length > 0 && (
								<Text
									onClick={() => {
										navigator.clipboard.writeText(window.location.origin + "/" + shortenedUrl.customUrl);
										alert("Url copiada!");
									}}
								>
									<Text b css={{ mr: 10 }}>
										Link personalizado:
									</Text>
									<Link href="#">{window.location.origin + "/" + shortenedUrl.customUrl}</Link>
								</Text>
							)}
						</Card.Body>
					)}
					<Card.Divider />
					<Card.Footer>
						{shortenedUrl.id.length === 0 ? (
							<Row justify="space-between">
								<Button size="sm" light color={available ? "success" : "error"} onPress={checkAvailability}>
									Checar URL
								</Button>
								<Button size="sm" disabled={!available} color="success" onPress={shortenUrl}>
									Encurtar!
								</Button>
							</Row>
						) : (
							<Row justify="flex-end">
								<Button
									size="sm"
									disabled={!available}
									color="success"
									onPress={() => {
										window.location.href = window.location.origin + "/";
									}}
								>
									Encurtar Outro!
								</Button>
							</Row>
						)}
					</Card.Footer>
				</Card>
			</Grid>
		</Grid.Container>
	);
}
