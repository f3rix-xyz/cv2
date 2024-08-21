import { pgEnum, pgTable, pgTableCreator, text } from "drizzle-orm/pg-core";
import Github from "next-auth/providers/github";
import { title } from "process";

export const projects = pgTable("projects", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    description: text("description").notNull(),
    github: text("github").notNull(),
    live_link: text("live_link"),

});

export type Project = typeof projects.$inferInsert;
export type NewProject = typeof projects.$inferInsert;


export const blogs = pgTable("blogs", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    content: text("content").notNull(),
    date: text("date").notNull(),
});

export type Blog = typeof blogs.$inferInsert;
export type NewBlog = typeof blogs.$inferInsert;

export const users = pgTable("users", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    email: text("email").notNull(),
    name: text("name").notNull(),
    linkedin: text("linkedin").notNull(),
    about: text("about").notNull(),
    contact: text("contact"),
    github: text("github"),
})


export type User = typeof users.$inferInsert;
export type NewUser = typeof users.$inferInsert;

// const postTypeEnum = pgEnum('post_type', ['hackathon', 'case comp']);

export const posts = pgTable("posts", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    user_id: text("user_id").notNull().references(() => users.id),
    type: text("type").notNull(),
    message: text("message"),
    competitionName: text("title").notNull(),
    competitionLink: text("link").notNull(),
    date: text("date").notNull(),

})



export type Post = typeof posts.$inferInsert;
export type NewPost = typeof posts.$inferInsert;

export const accepted_users = pgTable("accepted_users", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    post_id: text("post_id").notNull().references(() => posts.id),
    user_id: text("user_id").notNull().references(() => users.id),
});

export type AcceptedUser = typeof accepted_users.$inferInsert;
export type NewAcceptedUser = typeof accepted_users.$inferInsert;

export const message = pgTable("message", {
    id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
    post_id: text("post_id").notNull().references(() => posts.id),
    user_id: text("user_id").notNull().references(() => users.id),
    message: text("message").notNull(),
});