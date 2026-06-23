'use client';

import React, { useMemo } from 'react';
import EmptyState from '../../components/EmptyState';
import ReputationProfile, { type ReputationProfileProps, type ReputationEvent } from '../../components/ReputationProfile';

/**
 * Reputation data structure from API (or mock)
 * Ready for future backend integration
 */
interface UserReputation {
  score?: number | null;
  level?: string;
  history?: ReputationEvent[];
}

/**
 * Transforms raw reputation data into ReputationProfile props
 * Ensures type safety and provides sensible defaults
 *
 * @param reputationData - Raw reputation data from API
 * @param userName - User name to display in profile
 * @returns Typed ReputationProfileProps ready for component rendering
 */
function shapeReputationData(
  reputationData: UserReputation | null | undefined,
  userName: string = 'User'
): ReputationProfileProps {
  return {
    name: userName,
    score: reputationData?.score ?? null,
    level: reputationData?.level ?? 'Community Member',
    history: reputationData?.history ?? [],
  };
}

interface ReputationPageProps {
  reputationData?: UserReputation | null;
  userName?: string;
}

export const ReputationPageContent: React.FC<ReputationPageProps> = ({
  reputationData = null,
  userName = 'User',
}) => {
  // Compute profile props from data
  const profileProps = useMemo(
    () => shapeReputationData(reputationData, userName),
    [reputationData, userName]
  );

  // Determine rendering state
  const hasReputation = typeof profileProps.score === 'number' && profileProps.score >= 0;

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-6">Reputation</h1>
      {!hasReputation ? (
        <EmptyState
          illustration="reputation"
          title="No reputation yet"
          description="Your reputation will be built as you complete contracts and receive feedback from clients. Start by creating and fulfilling your first contract."
        />
      ) : (
        <ReputationProfile {...profileProps} />
      )}
    </main>
  );
};

const ReputationPage: React.FC = () => {
  // TODO: Replace with actual API call when backend is ready
  // In production, fetch reputation data and pass to ReputationPageContent
  const mockReputationData: UserReputation | null = null;
  const mockUserName = 'User';

  return <ReputationPageContent reputationData={mockReputationData} userName={mockUserName} />;
};

export default ReputationPage;
