"use client";
import { useState, useTransition } from "react";
import Image from "next/image";
import {
  MessageCircle,
  Send,
  CornerDownRight,
  Trash2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { addComment, addReply, deleteComment } from "@/libs/suggestions";
import { Comment } from "@/types/types";
import { MarkdownRenderer } from "./mdRenderer";
import { signIn } from "@/libs/sign";
import { formatTimeAgo } from "@/libs/time";

function Avatar({ name, image }: { name: string; image?: string }) {
  if (image)
    return (
      <Image
        src={image}
        alt={name}
        width={28}
        height={28}
        className="w-7 h-7 rounded-full shrink-0 mt-0.5"
      />
    );
  return (
    <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary flex items-center justify-center text-xs text-pink-400 font-medium shrink-0 mt-0.5">
      {name[0].toUpperCase()}
    </div>
  );
}

function CommentInput({
  onSubmit,
  placeholder = "Write a comment...",
  disabled,
  autoFocus,
  onCancel,
}: {
  onSubmit: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  onCancel?: () => void;
}) {
  const [value, setValue] = useState("");

  function handle() {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue("");
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handle()}
          placeholder={placeholder}
          disabled={disabled}
          autoFocus={autoFocus}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-primary transition-colors disabled:opacity-50"
        />
        <button
          onClick={handle}
          disabled={!value.trim() || disabled}
          className="px-4 py-2.5 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Send className="w-3.5 h-3.5" />
          Post
        </button>
      </div>
      {onCancel && (
        <button
          onClick={onCancel}
          className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors w-fit"
        >
          Cancel
        </button>
      )}
    </div>
  );
}

function ThreadCollapser({
  isCollapsed,
  onToggle,
  replyCount,
}: {
  isCollapsed: boolean;
  onToggle: () => void;
  replyCount: number;
}) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-1 text-xs text-zinc-500 hover:text-zinc-300 transition-colors mt-1"
    >
      {isCollapsed ? (
        <ChevronRight className="w-3 h-3" />
      ) : (
        <ChevronDown className="w-3 h-3" />
      )}
      {replyCount} {replyCount === 1 ? "reply" : "replies"}
    </button>
  );
}

function CommentCard({
  comment,
  suggestionId,
  currentUserId,
  depth = 0,
  suggestionAuthorId,
  maxDepth = 6,
  isHighlighted = false,
}: {
  comment: Comment;
  suggestionId: string;
  currentUserId?: string;
  depth?: number;
  suggestionAuthorId: string;
  maxDepth?: number;
  isHighlighted?: boolean;
}) {
  const [replying, setReplying] = useState(false);
  const [replies, setReplies] = useState<Comment[]>(comment.replies ?? []);
  const [isPending, startTransition] = useTransition();
  const [deleted, setDeleted] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showAllReplies, setShowAllReplies] = useState(false);
  const [newReplyId, setNewReplyId] = useState<string | null>(null);

  function handleDelete() {
    startTransition(async () => {
      await deleteComment(comment.id);
      setDeleted(true);
    });
  }

  function handleReply(content: string) {
    setReplying(false);
    startTransition(async () => {
      const newReply = await addReply(suggestionId, content, comment.id);
      setReplies((prev) => [...prev, newReply as unknown as Comment]);
      setIsCollapsed(false);
      setShowAllReplies(true);
      setNewReplyId(newReply.id);
      setTimeout(() => setNewReplyId(null), 2000);
    });
  }

  if (deleted) return null;

  const displayedReplies = showAllReplies ? replies : replies.slice(0, 3);
  const hasMoreReplies = replies.length > 3;

  if (depth >= maxDepth && replies.length > 0) {
    return (
      <div
        className={`p-4 flex gap-3 transition-all duration-700 ${
          depth > 0 ? "border-l-2" : ""
        } ${isHighlighted ? "bg-yellow-600/15" : ""}`}
        style={{
          marginLeft: depth > 0 ? `${Math.min(depth * 12, 40)}px` : 0,
          borderColor: isHighlighted ? "rgb(234 179 8 / 0.6)" : "rgb(63 63 70)",
        }}
      >
        <Avatar name={comment.author.name} image={comment.author.image} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-zinc-300">
              {comment.author.name}
            </span>
            <span className="text-xs text-zinc-600">
              {formatTimeAgo(new Date(comment.createdAt))}
            </span>
          </div>
          <MarkdownRenderer content={comment.content} />
          <ThreadCollapser
            isCollapsed={!showAllReplies}
            onToggle={() => setShowAllReplies(true)}
            replyCount={replies.length}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className={`p-4 flex gap-3 transition-all duration-700 ${
          depth > 0 ? "border-l-2" : ""
        } ${isHighlighted ? "bg-yellow-600/15" : ""} ${
          depth >= 4 ? "bg-zinc-900/20" : ""
        }`}
        style={{
          marginLeft: depth > 0 ? `${Math.min(depth * 16, 48)}px` : 0,
          borderColor: isHighlighted ? "rgb(234 179 8 / 0.6)" : "rgb(63 63 70)",
        }}
      >
        <Avatar name={comment.author.name} image={comment.author.image} />
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-zinc-300">
              {comment.author.name}
            </span>
            {comment.author.role !== "guest" && (
              <Image
                src={`/roles/${comment.author.role}.svg`}
                alt="role"
                height={16}
                width={16}
                className="shrink-0"
              />
            )}
            <span className="text-xs text-zinc-600">
              {" · "}
              {formatTimeAgo(new Date(comment.createdAt))}
            </span>
          </div>
          <MarkdownRenderer content={comment.content} />
          <div className="flex flex-row gap-3">
            {currentUserId && depth < maxDepth && (
              <button
                onClick={() => setReplying((v) => !v)}
                className="flex items-center gap-1 text-xs text-zinc-600 hover:text-blue-400 transition-colors w-fit mt-1"
              >
                <CornerDownRight className="w-3 h-3" />
                Reply
              </button>
            )}
            {(currentUserId === suggestionAuthorId ||
              currentUserId === comment.author.id) && (
              <button
                onClick={handleDelete}
                className="flex items-center gap-1 text-xs text-zinc-600 hover:text-red-400 transition-colors w-fit mt-1"
              >
                <Trash2 className="w-3 h-3" />
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {replies.length > 0 && depth < maxDepth - 1 && (
          <div style={{ marginLeft: `${Math.min(depth * 16, 48)}px` }}>
            <ThreadCollapser
              isCollapsed={isCollapsed}
              onToggle={() => setIsCollapsed((v) => !v)}
              replyCount={replies.length}
            />
          </div>
        )}

        {!isCollapsed && replies.length > 0 && (
          <>
            {displayedReplies.map((reply) => (
              <CommentCard
                key={reply.id}
                comment={reply}
                suggestionAuthorId={suggestionAuthorId}
                suggestionId={suggestionId}
                currentUserId={currentUserId}
                depth={depth + 1}
                maxDepth={maxDepth}
                isHighlighted={reply.id === newReplyId}
              />
            ))}

            {hasMoreReplies && !showAllReplies && (
              <button
                onClick={() => setShowAllReplies(true)}
                className="text-xs text-pink-400 hover:text-pink-300 transition-colors w-fit"
                style={{ marginLeft: `${Math.min((depth + 1) * 16, 48)}px` }}
              >
                Show {replies.length - 3} more replies...
              </button>
            )}
          </>
        )}

        {replying && depth < maxDepth && (
          <div style={{ marginLeft: `${Math.min((depth + 1) * 16, 48)}px` }}>
            <CommentInput
              placeholder={`Reply to ${comment.author.name}...`}
              onSubmit={handleReply}
              disabled={isPending}
              autoFocus
              onCancel={() => setReplying(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export function CommentsSection({
  suggestionId,
  initialComments,
  currentUserId,
  suggestionAuthorId,
}: {
  suggestionId: string;
  initialComments: Comment[];
  currentUserId?: string;
  suggestionAuthorId: string;
}) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isPending, startTransition] = useTransition();

  function handleNewComment(content: string) {
    startTransition(async () => {
      const newComment = await addComment(suggestionId, content);
      setComments((prev) => [...prev, newComment as unknown as Comment]);
    });
  }

  const totalCommentsCount = comments.reduce((count, comment) => {
    const countReplies = (c: Comment): number =>
      1 + (c.replies?.reduce((acc, r) => acc + countReplies(r), 0) ?? 0);
    return count + countReplies(comment);
  }, 0);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-zinc-600 uppercase tracking-widest">
          Comments · {totalCommentsCount}
        </p>
        {comments.length > 0 && (
          <p className="text-xs text-zinc-600">
            {comments.length}{" "}
            {comments.length === 1 ? "conversation" : "conversations"}
          </p>
        )}
      </div>

      {comments.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-10 text-zinc-600">
          <MessageCircle className="w-6 h-6" />
          <p className="text-sm">No comments yet. Be the first!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {comments.map((c) => (
            <CommentCard
              key={c.id}
              comment={c}
              suggestionAuthorId={suggestionAuthorId}
              suggestionId={suggestionId}
              currentUserId={currentUserId}
            />
          ))}
        </div>
      )}

      {currentUserId ? (
        <div className="mt-4 pt-4 border-t border-zinc-800">
          <CommentInput onSubmit={handleNewComment} disabled={isPending} />
        </div>
      ) : (
        <div className="flex justify-center">
          <button
            className="text-sm text-zinc-600 text-center py-2 w-full hover:text-primary transition-colors bg-zinc-500/10 rounded-lg border border-zinc-700/50"
            onClick={() => signIn("discord")}
          >
            Log in to leave a comment.
          </button>
        </div>
      )}
    </div>
  );
}