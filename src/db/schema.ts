import { serial, varchar, timestamp, integer, text, pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const User = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email").notNull().unique(),
  name: varchar("name").notNull(),
  password: varchar("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const Blog = pgTable("blogs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => User.id),
  title: varchar("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(), 
  imageType: varchar("image_type").notNull(), 
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
  date: timestamp("date").defaultNow().notNull(),
});

export const UserRelations = relations(User, ({ many }) => ({
  blogs: many(Blog),
}));


export const Category = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const Comment = pgTable("comments", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  blogId: integer("blog_id").notNull().references(() => Blog.id),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const CategoryRelations = relations(Category, ({ many }) => ({
  blogs: many(Blog),
}));

export const CommentRelations = relations(Comment, ({ many }) => ({
  blogs: many(Blog),
}));
