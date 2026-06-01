import { prisma } from "./database";

export async function toSlug(title: string): Promise<string> {
  const newTitle = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  try {
    const existing = await prisma.suggestion.findMany({
      where: {
        slug: {
          startsWith: newTitle
        },
      },
    });
    if (!existing) return newTitle;
    const taken = new Set(existing.map((s) => s.slug));
    if (!taken.has(newTitle)) return newTitle;
    let suffix = 2;
    while (taken.has(`${newTitle}-${suffix}`)) {
      suffix++;
    }
    return `${newTitle}-${suffix}`;
  } catch (err) {
    console.error("Error finding existing slug:", err);
  }

  return newTitle;
}
