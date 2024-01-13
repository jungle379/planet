import { db } from ".";
import { posts, users } from "./schema";
import { eq, or, asc, desc } from "drizzle-orm";

async function main() {
  // すべてのユーザーを取得
  //
  // 以下と同等のSQL
  // SELECT * FROM users;
  const selecAllUsers = await db.select().from(users);
  console.log("すべてのユーザーを取得");
  console.log(selecAllUsers);
  console.log("\n-----------------------------------\n");

  // すべての投稿を取得
  //
  // 以下と同等のSQL
  // SELECT * FROM posts;
  const selecAllPosts = await db.select().from(posts);
  console.log("すべての投稿を取得");
  console.log(selecAllPosts);
  console.log("\n-----------------------------------\n");

  // 1件のユーザーを取得
  //
  // 以下と同等のSQL
  // SELECT * FROM users LIMIT 1;
  const selec1Users = await db.select().from(users).limit(1);
  console.log("1件のユーザーを取得");
  console.log(selec1Users);
  console.log("\n-----------------------------------\n");

  // ユーザー名が山田太郎のユーザーを取得
  //
  // 以下と同等のSQL
  // SELECT * FROM users WHERE name = '山田太郎';
  const selecYamadaTaroUsers = await db
    .select()
    .from(users)
    .where(eq(users.name, "山田太郎"));
  console.log("ユーザー名が山田太郎のユーザーを取得");
  console.log(selecYamadaTaroUsers);
  console.log("\n-----------------------------------\n");

  // ユーザー名が山田太郎あるいは田中花子のユーザーを取得
  //
  // 以下と同等のSQL
  // SELECT * FROM users WHERE name = '山田太郎' OR name = '田中花子';
  const selecSuzukiHanakoOrYamadaTaroUsers = await db
    .select()
    .from(users)
    .where(or(eq(users.name, "山田太郎"), eq(users.name, "田中花子")));
  console.log("ユーザー名が山田太郎あるいは田中花子のユーザーを取得");
  console.log(selecSuzukiHanakoOrYamadaTaroUsers);
  console.log("\n-----------------------------------\n");

  // すべてのユーザー、投稿とあわせて取得
  //
  // 以下と同等のSQL
  // SELECT * FROM users LEFT JOIN posts ON users.id = posts.author_id
  const selecAllUsersAndPosts = await db
    .select({
      userId: users.id,
      userName: users.name,
      post: {
        postId: posts.id,
        postTitle: posts.title,
      },
    })
    .from(users)
    .leftJoin(posts, eq(users.id, posts.authorId))
    .orderBy(asc(users.id), desc(posts.id));
  console.log("すべてのユーザー、投稿とあわせて取得");
  console.log(selecAllUsersAndPosts);
  console.log("\n-----------------------------------\n");

  // すべてのユーザー、投稿とあわせて取得
  const queryAllUsersWithPosts = await db.query.users.findMany({
    with: {
      posts: true,
    },
  });
  console.log("すべてのユーザー、投稿とあわせて取得\n");
  console.log(JSON.stringify(queryAllUsersWithPosts, null, 2));
  console.log("\n-----------------------------------\n");
}

main();
