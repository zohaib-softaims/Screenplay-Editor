import ScreenplayEditor from "../src/components/editor/ScreenplayEditor";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-800 flex flex-col items-center justify-start">
      <div className="w-full">
        <ScreenplayEditor />
      </div>
    </main>
  );
}
