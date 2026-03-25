import React from 'react';
import { Creator } from '../types/creator';

type Props = {
  creator: Creator;
  rank: number;
  large?: boolean;
};

const extractSnsId = (url?: string): string | null => {
  if (!url) return null;
  try {
    const pathname = new URL(url).pathname;
    const id = pathname.replace(/\/$/, '').split('/').pop();
    return id ? `@${id}` : null;
  } catch {
    return null;
  }
};

const SmallRankCard: React.FC<Props> = ({ creator, rank, large = false }) => {
  const snsId = extractSnsId(creator.snsLink);
  return (
    <div
      className={`relative flex overflow-hidden rounded-2xl bg-white/80 shadow-sm backdrop-blur ${
        large ? 'min-w-[300px]' : 'min-w-[240px]'
      }`}
    >
      <img
        src={creator.imageUrl}
        alt={creator.displayName}
        className={`flex-shrink-0 object-cover ${large ? 'h-32 w-20' : 'h-20 w-14'}`}
      />
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 px-3">
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className={`truncate font-semibold text-gray-800 ${large ? 'text-sm' : 'text-xs'}`}>
            {creator.displayName}
          </span>
          {snsId && (
            <span className="truncate text-xs text-gray-800">{snsId}</span>
          )}
        </div>
        <span className={`font-bold text-[#FF69B4] ${large ? 'text-xs' : 'text-xs'}`}>
          {creator.totalVoteCount.toLocaleString()} 票
        </span>
      </div>
      <span className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-bold text-white">
        {rank}
      </span>
    </div>
  );
};

export default SmallRankCard;
