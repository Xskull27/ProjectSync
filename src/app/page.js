"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Hero from "../../public/images/Hero.png";
import { useAuth } from "@/lib/authContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-hidden">
      {/* Neon Glow Light in Center */}
      <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-3xl pointer-events-none z-0" />

  <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-4 sm:px-8 md:px-12 lg:px-20 gap-10 md:gap-16 pt-20 md:pt-0">
        {/* Left Content */}
        <div className="flex-1 w-full md:w-1/2 flex flex-col justify-center items-start text-left py-10 md:py-16">
          <div className="bg-gray-900/80 text-white px-4 py-1 border border-blue-600/50 rounded-full text-xs sm:text-sm font-medium mb-4 shadow-md">
            LetsDoIt
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6 drop-shadow-xl">
            Manage your <span className="text-purple-500">Projects</span> and <span className="text-blue-500">Issues</span> seamlessly
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-xl md:max-w-2xl">
           Optimize your development workflow and easily handle your team’s tasks and projects using our advanced management tool.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {user ? (
              <h2 className="text-blue-400 text-xl sm:text-2xl">
                Welcome back, <span className="text-white font-bold">{user?.username}</span>!
              </h2>
            ) : (
              <Link href="/register" passHref>
                <Button className="px-8 py-3 text-base sm:text-lg font-semibold rounded-full bg-purple-600 hover:bg-blue-700 transition-colors w-full sm:w-auto shadow-lg">
                  Register Now
                </Button>
              </Link>
            )}
            {user ? (
              <Link href="/dashboard" passHref>
                <Button
                  variant="outline"
                  className="px-8 py-3 bg-transparent text-base sm:text-lg rounded-full border-2 border-blue-600 text-white transition-colors w-full sm:w-auto shadow-lg"
                >
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/login" passHref>
                <Button
                  variant="outline"
                  className="px-8 py-3 text-base sm:text-lg font-semibold rounded-full border-2 border-blue-600 text-blue-500 hover:bg-blue-600 hover:text-white transition-colors w-full sm:w-auto shadow-lg"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end items-center h-48 sm:h-64 md:h-[350px] lg:h-[70vh] overflow-hidden rounded-2xl shadow-2xl mt-8 md:mt-0 bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-pink-900/10 relative">
          {/* Add extra top margin for mobile to avoid merging with navbar */}
          <div className="block md:hidden" style={{ minHeight: '2.5rem' }} />
          <Image
            src={Hero}
            alt="ProjectSync - Project and Issue Management Tool"
            width={1200}
            height={900}
            className="w-full h-full object-contain md:object-cover drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </div>
  );
}
