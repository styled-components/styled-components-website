import React from 'react';
import { usePathname } from 'next/navigation';

interface SidebarFoldState {
  isSideFolded: boolean;
  onSideToggle: () => void;
}

const SidebarFoldContext = React.createContext<SidebarFoldState>({
  isSideFolded: true,
  onSideToggle: () => {},
});

export function SidebarFoldProvider({ children }: { children: React.ReactNode }) {
  const { isSideFolded, onSideToggle } = useSidebarFoldInternal();

  const value = React.useMemo(() => ({ isSideFolded, onSideToggle }), [isSideFolded, onSideToggle]);

  return <SidebarFoldContext.Provider value={value}>{children}</SidebarFoldContext.Provider>;
}

export function useSidebarFold() {
  return React.useContext(SidebarFoldContext);
}

function useSidebarFoldInternal() {
  const pathname = usePathname();
  const [isSideFolded, setIsSideFolded] = React.useState(true);

  const onSideToggle = React.useCallback(() => {
    setIsSideFolded(x => !x);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: fold nav on route change
  React.useEffect(() => {
    setIsSideFolded(true);
  }, [pathname]);

  return { isSideFolded, onSideToggle };
}
