"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/quizNavbar";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Progress } from "@/components/ui/progress";
import { quizData } from "../data/questions";

const QuizContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get("category") as "pemrograman" | "pengetahuan-umum";

  const questions = quizData[category] || [];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push(`/result?score=${score}&total=${questions.length}`);
    }
  }, [timeLeft, router, score, questions.length]);

  const handleNext = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === questions[currentQuestion].answer) {
        setScore(score + 1);
      }
      setSelectedAnswer(null);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        router.push(`/result?score=${score + 1}&total=${questions.length}`);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-full md:min-h-screen">
      <Navbar timeLeft={timeLeft} />

      <div className="flex flex-col items-center flex-grow w-full max-w-5xl mx-auto px-6 my-8">
        <Breadcrumb className="self-start mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Kuis {category === "pemrograman" ? "Pemrograman" : "Pengetahuan Umum"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h2 className="text-2xl font-bold self-start w-full">
          Kuis {category === "pemrograman" ? "Pemrograman" : "Pengetahuan Umum"}
        </h2>

        <div className="mt-6 w-full max-w-3xl">
          <div className="relative w-full mb-4 mt-3">
            <div
              className="absolute -top-7 left-0 transform -translate-x-1/2 bg-black dark:bg-white dark:text-black text-white text-xs px-2 py-1 rounded"
              style={{ left: `${(currentQuestion / questions.length) * 100}%` }}
            >
              {Math.round((currentQuestion / questions.length) * 100)}%
              <div className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 border-x-8 border-x-transparent border-t-8 border-t-black dark:border-t-white"></div>
            </div>
            <Progress value={(currentQuestion / questions.length) * 100} />
          </div>

          <p className="mb-4">
            <span className="font-bold block mb-2 text-lg">Soal {currentQuestion + 1}:</span>
            {questions[currentQuestion].question}
          </p>

          <div className="flex flex-col gap-3 w-full">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`p-3 rounded-md text-center border transition-all w-full cursor-pointer 
                  ${
                    selectedAnswer === index
                      ? "bg-gray-300 dark:bg-gray-700 border-gray-600"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600"
                  }`}
                onClick={() => setSelectedAnswer(index)}
              >
                {option}
              </button>
            ))}
          </div>

          <Button className="mt-4 w-full" onClick={handleNext} disabled={selectedAnswer === null}>
            {currentQuestion + 1 < questions.length ? "Next" : "Finish"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const QuizPage = () => {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <QuizContent />
    </Suspense>
  );
};

export default QuizPage;
