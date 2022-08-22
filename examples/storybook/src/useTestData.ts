import { useMemo } from 'react';

export interface TestRow {
  id: number;
  title: string;
}

const useTestData = (size: number): TestRow[] => {
  const data = useMemo<TestRow[]>(() => {
    return Array.from(new Array(size)).map((_, index) => {
      const id = index + 1;
      return {
        id,
        title: `Item ${id}`,
      };
    });
  }, [size]);
  return data;
};

export default useTestData;
