import { relations, sql, InferSelectModel } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  int,
  mysqlTableCreator,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { type AdapterAccount } from "next-auth/adapters";

export const mysqlTable = mysqlTableCreator(
  (name) => `workout-planner_${name}`,
);

export const posts = mysqlTable(
  "post",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    text: varchar("text", { length: 255 }),
    userId: varchar("userId", { length: 255 }).notNull(),
    groupId: varchar("userId", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (post) => ({
    idIdx: index("id_idx").on(post.id),
    userIdIdx: index("userId_idx").on(post.userId),
    groupIdIdx: index("groupId_idx").on(post.groupId),
  }),
);

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, { fields: [posts.userId], references: [users.id] }),
  group: one(groups, {
    fields: [posts.groupId],
    references: [groups.id],
  }),
}));

export type Post = InferSelectModel<typeof posts>;
export type PostwithAuthor = Post & { author: User };

export const groups = mysqlTable("group", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  isPersonal: boolean("isPersonal").default(false),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const groupsRelations = relations(groups, ({ one, many }) => ({
  owner: one(users, {
    fields: [groups.userId],
    references: [users.id],
  }),
  posts: many(posts),
  memberships: many(memberships),
  configuredBy: many(userConfigs),
}));

export const memberships = mysqlTable(
  "membership",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    groupId: varchar("groupId", { length: 255 }).notNull(),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (membership) => ({
    idIdx: index("id_idx").on(membership.id),
    userIdIdx: index("userId_idx").on(membership.userId),
    groupIdIdx: index("groupId_idx").on(membership.groupId),
  }),
);

export const membershipsRelations = relations(memberships, ({ one }) => ({
  user: one(users, {
    fields: [memberships.userId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [memberships.groupId],
    references: [groups.id],
  }),
}));

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  image: varchar("image", { length: 255 }),
  isAdmin: boolean("isAdmin").default(false).notNull(),
  userConfigId: varchar("userConfigId", { length: 255 }),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  groups: many(groups),
  posts: many(posts),
  memberships: many(memberships),
  userConfig: one(userConfigs, {
    fields: [users.userConfigId],
    references: [userConfigs.id],
  }),
}));

export type User = InferSelectModel<typeof users>;

export const userConfigs = mysqlTable(
  "userConfig",
  {
    id: varchar("id", { length: 255 }).notNull().primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull().unique(),
    groupId: varchar("groupId", { length: 255 }).notNull(),
  },
  (userConfig) => ({
    idIdx: index("id_idx").on(userConfig.id),
    userIdIdx: index("userId_idx").on(userConfig.userId),
    groupIdIdx: index("groupId_idx").on(userConfig.groupId),
  }),
);

export const userConfigRelations = relations(userConfigs, ({ one }) => ({
  configuredUser: one(users, {
    fields: [userConfigs.userId],
    references: [users.id],
  }),
  selectedgroup: one(groups, {
    fields: [userConfigs.groupId],
    references: [groups.id],
  }),
}));

export type UserConfig = InferSelectModel<typeof userConfigs>;

// export const userOrgConfig = mysqlTable(
//   "userOrgConfig",
//   {
//     userId: varchar("userId", { length: 255 }).notNull(),
//     groupId: varchar("id", { length: 255 }),
//   },
//   (urc) => ({
//     compoundKey: primaryKey(urc.userId, urc.groupId),
//   }),
// );

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey(account.provider, account.providerAccountId),
    userIdIdx: index("userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = mysqlTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("userId", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey(vt.identifier, vt.token),
  }),
);
