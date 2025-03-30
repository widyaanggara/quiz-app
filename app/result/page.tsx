"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const ResultPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const score = searchParams.get("score");
  const total = searchParams.get("total");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h2 className="text-2xl font-bold">Hasil Kuis</h2>
      <p className="mt-2 text-lg">Skor kamu: {score} / {total}</p>
      
      <div className="flex gap-4 mt-4">
        <Button onClick={() => router.push("/")}>Kembali ke Home</Button>

      </div>
    </div>
  );
};

export default ResultPage;
