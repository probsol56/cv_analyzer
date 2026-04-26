import { useAuthStore } from '../store/useAuthStore';

const LOCAL_KEY = (tool: string) => `usage_count_${tool}`;
const FREE_LIMIT = 3;

export const useUsageGuard = (tool: string) => {
  const { user } = useAuthStore();

  const getLocalCount = (): number => {
    if (user) return 0;
    return parseInt(localStorage.getItem(LOCAL_KEY(tool)) ?? '0', 10);
  };

  const incrementLocal = () => {
    if (user) return;
    localStorage.setItem(LOCAL_KEY(tool), String(getLocalCount() + 1));
  };

  const usesLeft = (): number => {
    if (user) return Infinity;
    return Math.max(0, FREE_LIMIT - getLocalCount());
  };

  return { incrementLocal, usesLeft };
};
