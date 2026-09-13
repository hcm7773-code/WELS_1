import React from 'react';
import { TabType } from '../types';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  streakDays: number;
  completedCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  streakDays,
  completedCount,
}) => {
  return (
    <>
      <Header
        currentTab={currentTab}
        onSelectTab={onSelectTab}
        streakDays={streakDays}
        completedCount={completedCount}
      />
      <BottomNavigation
        currentTab={currentTab}
        onSelectTab={onSelectTab}
      />
    </>
  );
};
