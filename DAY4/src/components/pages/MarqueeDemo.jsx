import React from 'react';
import { cn } from "@/lib/utils"; // Ensure this utility is correctly imported
import Marquee from "@/components/magicui/marquee";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I have been using VoidTasks for a few months now, and it has significantly improved our team productivity",
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "VoidTasks has a fantastic set of features that cater to all our project management needs. The ability to assign tasks to specific team members and receive real-time updates is invaluable.",
    img: "https://avatar.vercel.sh/jill",
  },
  {
    name: "John",
    username: "@john",
    body: "As a project manager, VoidTasks has been a game-changer for me. The dashboard provides a comprehensive overview of all ongoing projects",
    img: "https://avatar.vercel.sh/john",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "VoidTasks is an efficient tool for managing tasks and projects. The customizable nature of the platform allows us to tailor it to our specific needs.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "VoidTasks has made team collaboration so much easier. The ability to assign tasks, set deadlines, and track progress in one place has streamlined our workflow",
    img: "https://avatar.vercel.sh/jenny",
  },
  {
    name: "James",
    username: "@james",
    body: "VoidTasks combines user-friendliness with a rich set of features. The task management and notification system are top-notch",
    img: "https://avatar.vercel.sh/james",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-600 bg-black hover:bg-gray-800",
        "text-white" // Text color for light and dark themes
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col"> 
          <figcaption className="text-sm font-medium">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-gray-400">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const MarqueeDemo = () => {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-600 bg-black md:shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-6">Customer Insights</h2>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black"></div>
    </div>
  );
};

export default MarqueeDemo;
