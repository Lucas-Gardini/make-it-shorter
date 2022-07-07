import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { customUrl } = req.body;

	const Links = await prisma.link.findMany({
		where: {
			customUrl,
		},
	});

	console.log(Links);

	res.status(200).json({ available: Links.length === 0 });
}
