const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = async (req, res) => {
  // Only GET Available
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed." });
  }

  const { seed } = req.body;

  // All the pages viewed
  const allPageWithViews = await prisma.$queryRaw(`
    SELECT
      element,
      count(element) as views
    FROM
      events
      JOIN websites ON events.website_id = websites.id
    WHERE
      websites.seed = '${seed}'
    GROUP BY
      element
    ORDER BY
      views DESC
  `);

  await prisma.$disconnect();

  return res.json({
    data: allPageWithViews,
  });
};