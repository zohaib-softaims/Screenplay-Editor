import ScreenplayEditor from "../src/components/editor/ScreenplayEditor";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-800 flex flex-col items-center justify-start p-4">
      <div className="w-full">
        <h1 className="text-4xl font-extrabold text-slate-100 mb-8 text-center tracking-wide drop-shadow-lg">🎬 Screenplay Editor</h1>
        <ScreenplayEditor />
      </div>
    </main>
  );
}
