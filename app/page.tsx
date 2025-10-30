import { UserTable } from "./user-table";

export default async function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="">
        <UserTable />
      </main>
    </div>
  );
}
