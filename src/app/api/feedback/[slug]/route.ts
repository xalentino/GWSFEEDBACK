import { discordWebhook } from "@/libs/webhook";
import { auth } from "@/libs/auth";
import { prisma } from "@/libs/database";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { ALLOWED_ROLES } from "@/libs/permissions";
import { toSlug } from "@/libs/toSlug";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    
    const allComments = await prisma.comment.findMany({
      where: { suggestionId: (await prisma.suggestion.findUnique({ where: { slug } }))?.id },
      include: {
        author: true,
        parent: true,
        suggestion: true,
      },
    });
    
    const buildCommentTree = (comments: any[], parentId: string | null = null): any[] => {
      return comments
        .filter(comment => comment.parentId === parentId)
        .map(comment => ({
          ...comment,
          replies: buildCommentTree(comments, comment.id)
        }))
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    };
    
    const nestedComments = buildCommentTree(allComments, null);
    
    const data = await prisma.suggestion.findUnique({
      where: { slug },
      include: {
        author: true,
        votes: true,
      },
    });
    
    return NextResponse.json({ 
      success: true, 
      data: { ...data, comments: nestedComments } 
    });
  } catch (err) {
    console.log("An error occured while getting suggestions", err);
    return NextResponse.json({ success: false, data: null, error: "Internal server error" });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const suggestion = await prisma.suggestion.findUnique({ where: { slug } });
  if (!suggestion) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if ((suggestion.authorId !== session.user.id) && !ALLOWED_ROLES[session.user.role]) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { title, description, category, status } = await request.json();

  const newSlug = await toSlug(title);
  const updated = await prisma.suggestion.update({
    where: { slug },
    data: { title, description, category, status, slug: newSlug },
    include: {
      author: { select: { id: true, name: true, image: true } },
      votes: true,
      comments: {
        include: {
          author: true,
          parent: true,
          replies: {
            include: {
              parent: true,
              author: true
            }
          }
        }
      },
    },
  });

  await discordWebhook(suggestion.id);
  return NextResponse.json({ data: updated });
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const suggestion = await prisma.suggestion.findUnique({ where: { slug } });
  if (!suggestion) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if ((suggestion.authorId !== session.user.id) && !ALLOWED_ROLES[session.user.role]) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  
  await discordWebhook(suggestion.id, true);

  await prisma.suggestion.delete({ where: { slug } });
  return NextResponse.json({ success: true });
}