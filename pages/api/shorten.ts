import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { url, customUrl } = req.body;

	const Link = await prisma.link.create({
		data: {
			url: url as string,
			customUrl: customUrl as string,
		},
	});

	res.status(200).json({ link: Link });
}
