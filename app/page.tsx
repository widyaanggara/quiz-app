"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils"; // Util untuk className dinamis

const categories = [
  { 
    id: "pengetahuan-umum", 
    title: "Pengetahuan Umum", 
    description: "Kuis tentang fakta menarik di dunia.",
    imageLight: "/images/pengetahuan-umum-light.png",
    imageDark: "/images/pengetahuan-umum-light.png", 
  },
  { 
    id: "pemrograman", 
    title: "Programming Language", 
    description: "Kuis tentang bahasa pemrograman.",
    imageLight: "/images/coding.png",
    imageDark: "/images/coding.png", 
  }
  
];

const CategorySelection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { theme } = useTheme(); // 🔥 Pindahkan useTheme() ke dalam komponen
  const router = useRouter();

  const handleStartQuiz = () => {
    if (selectedCategory) {
      router.push(`/quiz?category=${selectedCategory}`);
    }
  };

  return (
    <div className="flex flex-col min-h-full mt-28 mb-12 md:mb-0 md:mt-0 md:min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center gap-8 justify-center flex-grow px-6">
        <h2 className="md:text-3xl text-2xl font-bold md:mb-4">Pilih Kategori Kuis</h2>

        {/* RadioGroup untuk pemilihan kategori */}
        <RadioGroup 
          onValueChange={setSelectedCategory} 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {categories.map((category) => (
            <Card
              key={category.id}
              className={cn(
                "cursor-pointer p-8 rounded-lg shadow-md text-center border-2 transition-all ease-in-out duration-200",
                selectedCategory === category.id 
                ? "border-gray-400 bg-gray-300 dark:bg-gray-800 dark:border-gray-500" : "border-gray-200 dark:border-gray-600"
              )}
              onClick={() => setSelectedCategory(category.id)}
            >
              <RadioGroupItem value={category.id} id={category.id} className="hidden" />
              <div className="flex justify-center mb-4">
                <Image 
                  src={theme === "dark" ? category.imageDark : category.imageLight} 
                  alt={category.title} 
                  width={80} 
                  height={80} 
                  className="rounded-md" 
                />
              </div>
              <h3 className="text-lg font-semibold">{category.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{category.description}</p>
            </Card>
          ))}
        </RadioGroup>

        {/* Tombol Start Quiz */}
        <Button 
          onClick={handleStartQuiz} 
          disabled={!selectedCategory}
        >
          Start Quiz
        </Button>
      </div>
    </div>
  );
};

export default CategorySelection;
