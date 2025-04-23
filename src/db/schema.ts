import { serial, varchar, timestamp, integer, text, pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";


export const User = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email").notNull().unique(),
  name: varchar("name").notNull(),
  password: varchar("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export const Category = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});


export const Blog = pgTable("blogs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => User.id),
  categoryId: integer("category_id").references(() => Category.id), // Optional, but added for category relation
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  imageType: varchar("image_type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
  date: timestamp("date").defaultNow().notNull(),
});


export const Comment = pgTable("comments", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  blogId: integer("blog_id").notNull().references(() => Blog.id),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const UserRelations = relations(User, ({ many }) => ({
  blogs: many(Blog),
}));

export const CategoryRelations = relations(Category, ({ many }) => ({
  blogs: many(Blog),
}));

export const BlogRelations = relations(Blog, ({ one, many }) => ({
  user: one(User, {
    fields: [Blog.userId],
    references: [User.id],
  }),
  category: one(Category, {
    fields: [Blog.categoryId],
    references: [Category.id],
  }),
  comments: many(Comment),
}));

export const CommentRelations = relations(Comment, ({ one }) => ({
  blog: one(Blog, {
    fields: [Comment.blogId],
    references: [Blog.id],
  }),
}));
