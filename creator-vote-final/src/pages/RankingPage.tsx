import React from 'react';
import { subscribeToCreators } from '../services/creatorService';
import { Creator } from '../types/creator';
import Loading from '../components/Loading';
import TopRankCard from '../components/TopRankCard';
import SmallRankCard from '../components/SmallRankCard';

const RankingPage: React.FC = () => {
  const [creators, setCreators] = React.useState<Creator[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  React.useEffect(() => {
    const unsubscribe = subscribeToCreators(
      (data) => {
        setCreators(data);
        setIsLoading(false);
        setErrorMessage(null);
      },
      (error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const top3 = creators.slice(0, 3);
  const rank4to10 = creators.slice(3, 10);

  const row1 = rank4to10.slice(0, 3); // 4, 5, 6位
  const row2 = rank4to10.slice(3);   // 7, 8, 9, 10位

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/adultopia/hero.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-white/50 shadow-lg backdrop-blur"
      />

      <div className="relative z-10 flex flex-col flex-1 w-full max-w-2xl mx-auto px-4 py-10">
        {isLoading && <Loading message="読み込み中..." />}
        {errorMessage && <p className="text-center text-sm text-red-500">{errorMessage}</p>}

        {!isLoading && !errorMessage && (
          <div className="flex flex-col flex-1">
            {/* スペーサー: 表彰台＋4位以降を画面下部にまとめて寄せる */}
            <div className="flex-1" />

            {/* 表彰台: 2位 → 1位（中央） → 3位 */}
            {top3.length > 0 && (
              <div className="flex items-end justify-center gap-8">
                {top3[1] && <TopRankCard creator={top3[1]} rank={2} size={200} />}
                {top3[0] && <TopRankCard creator={top3[0]} rank={1} size={240} />}
                {top3[2] && <TopRankCard creator={top3[2]} rank={3} size={160} />}
              </div>
            )}

            {/* 4位以降: 表彰台の直下に少し間を開けて配置 */}
            <div className="pt-16">
              {/* 4～10位: 1段目(4-6) + 2段目(7-10) 中央寄せ */}
              {rank4to10.length > 0 && (
                <div className="mb-4 flex flex-col gap-8">
                  <div className="flex justify-center gap-6">
                    {row1.map((creator, i) => (
                      <SmallRankCard key={creator.creatorId} creator={creator} rank={4 + i} large />
                    ))}
                  </div>
                  <div className="flex justify-center gap-6">
                    {row2.map((creator, i) => (
                      <SmallRankCard key={creator.creatorId} creator={creator} rank={7 + i} />
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingPage;
