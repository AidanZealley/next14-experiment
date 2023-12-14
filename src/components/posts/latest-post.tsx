"use client";

import formatRelative from "date-fns/formatRelative";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { initialsFromName } from "@/lib/utils";
import { api } from "@/trpc/react";
import { Clock } from "lucide-react";

export const LatestPost = () => {
  const { data: post } = api.post.latest.useQuery();

  return (
    <>
      <p className="text-7xl font-extrabold leading-tight">{post?.text}</p>

      <div className="grid gap-3">
        <div className="flex items-center gap-6">
          <Avatar className="h-12 w-12">
            <AvatarImage src={post?.author.image ?? ""} />
            <AvatarFallback>
              {initialsFromName(post?.author.name)}
            </AvatarFallback>
          </Avatar>
          <div className="grid">
            <span className="text-lg">{post?.author.name}</span>
            <span className="flex items-center gap-2 opacity-80">
              <span className="text-sm">
                Posted{" "}
                {formatRelative(post?.createdAt ?? Date.now(), Date.now())}
              </span>
              <Clock className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>

      {/* background-color: rgb(219, 39, 119);
        background-image: radial-gradient(at 37% 77%, rgb(134, 239, 172) 0, transparent 60%), radial-gradient(at 4% 4%, rgb(250, 232, 255) 0, transparent 56%), radial-gradient(at 76% 16%, rgb(153, 27, 27) 0, transparent 71%), radial-gradient(at 43% 5%, rgb(23, 23, 23) 0, transparent 63%), radial-gradient(at 41% 98%, rgb(153, 27, 27) 0, transparent 60%), radial-gradient(at 71% 3%, rgb(124, 58, 237) 0, transparent 62%);
      

        background-color: rgb(13, 148, 136);
        background-image: radial-gradient(at 23% 32%, rgb(45, 212, 191) 0, transparent 56%), radial-gradient(at 8% 18%, rgb(251, 191, 36) 0, transparent 82%), radial-gradient(at 61% 20%, rgb(6, 182, 212) 0, transparent 59%), radial-gradient(at 74% 9%, rgb(24, 24, 27) 0, transparent 21%), radial-gradient(at 28% 96%, rgb(241, 245, 249) 0, transparent 57%), radial-gradient(at 69% 59%, rgb(224, 231, 255) 0, transparent 68%);
      
    
        background-color: rgb(59, 130, 246);
        background-image: radial-gradient(at 8% 3%, rgb(96, 165, 250) 0, transparent 82%), radial-gradient(at 65% 96%, rgb(243, 244, 246) 0, transparent 95%), radial-gradient(at 18% 56%, rgb(234, 88, 12) 0, transparent 86%), radial-gradient(at 30% 39%, rgb(34, 211, 238) 0, transparent 91%), radial-gradient(at 49% 14%, rgb(134, 239, 172) 0, transparent 53%), radial-gradient(at 16% 2%, rgb(217, 119, 6) 0, transparent 76%);
      
    
        background-color: rgb(209, 213, 219);
        background-image: radial-gradient(at 34% 30%, rgb(219, 234, 254) 0, transparent 81%), radial-gradient(at 72% 61%, rgb(251, 113, 133) 0, transparent 62%), radial-gradient(at 94% 20%, rgb(37, 99, 235) 0, transparent 45%), radial-gradient(at 85% 89%, rgb(139, 92, 246) 0, transparent 64%), radial-gradient(at 16% 63%, rgb(165, 243, 252) 0, transparent 74%), radial-gradient(at 19% 82%, rgb(82, 82, 91) 0, transparent 12%);
      
        background-color: rgb(225, 29, 72);
        background-image: radial-gradient(at 51% 11%, rgb(240, 171, 252) 0, transparent 100%), radial-gradient(at 10% 8%, rgb(226, 232, 240) 0, transparent 86%), radial-gradient(at 40% 92%, rgb(99, 102, 241) 0, transparent 71%), radial-gradient(at 76% 75%, rgb(12, 74, 110) 0, transparent 24%), radial-gradient(at 2% 7%, rgb(124, 45, 18) 0, transparent 20%), radial-gradient(at 78% 96%, rgb(124, 58, 237) 0, transparent 62%); */}
    </>
  );
};
