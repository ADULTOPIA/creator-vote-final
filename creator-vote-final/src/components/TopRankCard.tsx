import React from 'react';
import { Creator } from '../types/creator';

type Props = {
  creator: Creator;
  rank: number;
  size: number; // カード幅(px)
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

const TopRankCard: React.FC<Props> = ({ creator, rank, size }) => {
  const snsId = extractSnsId(creator.snsLink);
  return (
  <div className="flex flex-col items-center" style={{ width: size }}>
    <div className="w-full overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className="relative w-full overflow-hidden rounded-t-2xl" style={{ aspectRatio: '9/16' }}>
        <img
          src={creator.imageUrl}
          alt={creator.displayName}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative px-3 py-4">
        <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-400 text-sm font-bold text-white shadow">
          {rank}
        </span>
        <p className="truncate text-xl font-semibold text-gray-800">{creator.displayName}</p>
        {snsId && <p className="truncate text-sm text-gray-500">{snsId}</p>}
        <p className="mt-2 text-base font-bold text-[#FF69B4]">
          {creator.totalVoteCount.toLocaleString()} 票
        </p>
      </div>
    </div>
  </div>
  );
};

export default TopRankCard;
