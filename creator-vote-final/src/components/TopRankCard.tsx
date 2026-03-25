import React from 'react';
import { Creator } from '../types/creator';

type Props = {
  creator: Creator;
  rank: number;
  size: number; // カード幅(px)
  textSize?: number; // 文字サイズ基準(px)、省略時はsizeと同じ
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

const TopRankCard: React.FC<Props> = ({ creator, rank, size, textSize }) => {
  const snsId = extractSnsId(creator.snsLink);
  const ts = textSize ?? size;
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
        <span className="absolute right-2 bottom-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-bold text-white shadow">
          {rank}
        </span>
        <p className="break-words font-semibold text-gray-800" style={{ fontSize: `${1.25 * ts / 240}rem` }}>{creator.displayName}</p>
        {snsId && <p className="break-all text-gray-500" style={{ fontSize: `${0.875 * ts / 240}rem` }}>{snsId}</p>}
        <p className="mt-2 font-bold text-[#FF69B4]" style={{ fontSize: `${1 * ts / 240}rem` }}>
          {creator.totalVoteCount.toLocaleString()} 票
        </p>
      </div>
    </div>
  </div>
  );
};

export default TopRankCard;
