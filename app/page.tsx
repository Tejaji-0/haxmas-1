"use client";
import { useState, useEffect } from "react";
import ChristmasCookieClick from "@/components/ChristmasCookieClick";
import Shop from "@/components/Shop";

type ShopItem = {
  id: string;
  name: string;
  icon: string;
  baseCost: number;
  cookiesPerSecond: number;
  count: number;
};

export default function Home() {
  const [count, setCount] = useState(0);
  const [cookiesPerSecond, setCookiesPerSecond] = useState(0);
  const [shopItems, setShopItems] = useState<ShopItem[]>([
    { id: "cursor", name: "Cursor", icon: "👆", baseCost: 15, cookiesPerSecond: 0.1, count: 0 },
    { id: "grandma", name: "Grandma", icon: "👵", baseCost: 100, cookiesPerSecond: 1, count: 0 },
    { id: "farm", name: "Cookie Farm", icon: "🏡", baseCost: 500, cookiesPerSecond: 5, count: 0 },
    { id: "factory", name: "Factory", icon: "🏭", baseCost: 3000, cookiesPerSecond: 25, count: 0 },
    { id: "santa", name: "Santa's Helper", icon: "🎅", baseCost: 10000, cookiesPerSecond: 100, count: 0 },
  ]);

  // Auto-clicker effect
  useEffect(() => {
    if (cookiesPerSecond > 0) {
      const interval = setInterval(() => {
        setCount(prev => prev + cookiesPerSecond / 10);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [cookiesPerSecond]);

  const handlePurchase = (itemId: string) => {
    const item = shopItems.find(i => i.id === itemId);
    if (!item) return;

    const cost = Math.floor(item.baseCost * Math.pow(1.15, item.count));
    
    if (count >= cost) {
      setCount(prev => prev - cost);
      setShopItems(prev => 
        prev.map(i => 
          i.id === itemId 
            ? { ...i, count: i.count + 1 }
            : i
        )
      );
      setCookiesPerSecond(prev => prev + item.cookiesPerSecond);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f472a] to-[#1a5a3a] flex flex-col">
      <main className="flex min-h-screen flex-col items-center justify-center py-16 px-8">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 w-full max-w-6xl">
          {/* Left side - Cookie Clicker */}
          <div className="flex flex-col items-center gap-8 text-center lg:w-1/2">
            {/* Title */}
            <h1 className="text-7xl font-bold text-red-100 drop-shadow-lg">
              🎄 Christmas Cookie Clicker 🎄
            </h1>
            
            {/* Counter Display */}
            <div className="bg-red-800 bg-opacity-60 backdrop-blur-sm rounded-3xl px-12 py-8 shadow-2xl border-4 border-red-200">
              <p className="text-2xl text-red-100 mb-2">Cookies Baked:</p>
              <p className="text-6xl font-bold text-yellow-100 drop-shadow-md">{Math.floor(count)}</p>
              {cookiesPerSecond > 0 && (
                <p className="text-lg text-green-200 mt-2">per second: {cookiesPerSecond.toFixed(1)}</p>
              )}
            </div>
            
            {/* Cookie Clicker */}
            <div className="mt-4">
              <ChristmasCookieClick onClick={() => setCount(count + 1)} />
            </div>
            
            {/* Fun message */}
            <p className="text-xl text-green-100 mt-4">
              {count === 0 && "Click the cookie to start baking! 🍪"}
              {count > 0 && count < 10 && "Keep clicking! Santa's getting hungry! 🎅"}
              {count >= 10 && count < 50 && "You're on a roll! 🔥"}
              {count >= 50 && count < 100 && "Cookie master in training! ⭐"}
              {count >= 100 && "Ho Ho Ho! You're a cookie legend! 🏆"}
            </p>
          </div>

          {/* Right side - Shop */}
          <div className="lg:w-1/2 flex justify-center">
            <Shop cookies={Math.floor(count)} items={shopItems} onPurchase={handlePurchase} />
          </div>
        </div>
      </main>
      
      {/* Decorative snowflakes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">❄️</div>
        <div className="absolute top-20 right-20 text-4xl animate-pulse">❄️</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-bounce">❄️</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-pulse">❄️</div>
        <div className="absolute top-1/2 left-1/4 text-3xl animate-bounce">⭐</div>
        <div className="absolute top-1/3 right-1/4 text-3xl animate-pulse">⭐</div>
      </div>
    </div>
  );
}
