import Link from "next/link";
import { ClientComponent } from "./components/clientSide";
import { ServerComponent } from "./components/serverSide";

export const runtime = "edge";

export default async function Home() {
  return (
    <>
      <div>
        <ClientComponent />
        <Link href="/post">投稿へ</Link>
        <ServerComponent />
      </div>
    </>
  );
}
