export type Role = "guest" | "admin" | "owner" | "staff" | "developer" | "contributor";

export type SuggestionStatus = "PENDING" | "PLANNED" | "IN_PROGRESS" | "DONE";

export type SuggestionCategory = "SUGGESTION" | "BUG" | "FEEDBACK" | "FEATURE";

export type Provider = "github" | "google" | "roblox" | "discord";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  role: Role;
  banned: boolean;
  banReason?: string | null;
  banExpires?: Date | null;
}

export interface Session {
  token: string;
  ipAddress: string;
  userAgent: string;
}

export interface AuthSession {
  data: {
    session: Session;
    user: User;
  } | null;
  error: null | Error;
}

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: Role;
  banned: boolean;
  bannedReason: string | null;
  createdAt: string;
  _count: {
    suggestions: number;
    comments: number;
    votes: number;
  };
}

export interface CommentAuthor {
  id: string;
  name: string;
  image: string;
  role: Role;
}

export interface Comment {
  id: string;
  content: string;
  author: CommentAuthor;
  createdAt: string | Date;
  parentId: string | null;
  parent?: Comment | null;
  replies: Comment[];
  suggestionId?: string;
}

export interface CreateCommentInput {
  content: string;
  parentId?: string | null;
}

export interface CommentWithMetadata extends Comment {
  _count?: {
    replies: number;
  };
  depth?: number;
  isCollapsed?: boolean;
}

export interface SuggestionAuthor {
  id: string;
  name: string;
  image: string;
  role: Role;
}

export interface Vote {
  id: string;
  authorId: string;
  suggestionId: string;
}

export interface Suggestion {
  id: string;
  slug: string;
  title: string;
  description: string;
  votes: Vote[];
  comments: Comment[];
  status: SuggestionStatus;
  category: SuggestionCategory;
  author: SuggestionAuthor;
  createdAt: string | Date;
  updatedAt?: string | Date;
  messageid?: string | null;
  _count?: {
    votes: number;
    comments: number;
  };
}

// For creating/updating suggestions
export interface CreateSuggestionInput {
  title: string;
  description: string;
  category: SuggestionCategory;
}

export interface UpdateSuggestionInput {
  title?: string;
  description?: string;
  category?: SuggestionCategory;
  status?: SuggestionStatus;
}

// ============ API Response Types ============

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  error?: string;
}

export interface SuggestionsResponse {
  success: boolean;
  data: Suggestion[] | null;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  error?: string;
}

export interface CommentsResponse {
  success: boolean;
  data: Comment[] | null;
  error?: string;
}

export interface AvatarProps {
  name: string;
  image?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export interface CommentInputProps {
  onSubmit: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  onCancel?: () => void;
}

export interface CommentCardProps {
  comment: Comment;
  suggestionId: string;
  currentUserId?: string;
  depth?: number;
  suggestionAuthorId: string;
  maxDepth?: number;
  onReplyAdded?: (commentId: string, newReply: Comment) => void;
  onDelete?: (commentId: string) => void;
}

export interface CommentsSectionProps {
  suggestionId: string;
  initialComments: Comment[];
  currentUserId?: string;
  suggestionAuthorId: string;
  maxDepth?: number;
}

export interface ThreadCollapserProps {
  isCollapsed: boolean;
  onToggle: () => void;
  replyCount: number;
}

export type SortOrder = "asc" | "desc";
export type SortBy = "createdAt" | "votes" | "comments";

export interface FilterOptions {
  status?: SuggestionStatus;
  category?: SuggestionCategory;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
  search?: string;
}

// ============ Database Types (for Prisma) ============

export interface PrismaComment {
  id: string;
  content: string;
  authorId: string;
  suggestionId: string;
  parentId: string | null;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  parent?: PrismaComment | null;
  replies?: PrismaComment[];
}

export interface PrismaSuggestion {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: SuggestionStatus;
  category: SuggestionCategory;
  authorId: string;
  messageid: string | null;
  createdAt: Date;
  updatedAt: Date;
  author: User;
  votes: Vote[];
  comments: PrismaComment[];
}

export type BuildCommentTreeFunction = (comments: Comment[]) => Comment[];
export type FlattenCommentsFunction = (comments: Comment[]) => Comment[];
export type CountRepliesFunction = (comment: Comment) => number;

export interface CommentEvent {
  type: "ADD" | "DELETE" | "UPDATE";
  commentId: string;
  suggestionId: string;
  userId?: string;
  data?: Partial<Comment>;
}

export interface DiscordWebhookData {
  content?: string;
  embeds?: {
    title: string;
    description: string;
    color: number;
    fields?: {
      name: string;
      value: string;
      inline?: boolean;
    }[];
    timestamp?: string;
    footer?: {
      text: string;
    };
  }[];
  username?: string;
  avatar_url?: string;
}