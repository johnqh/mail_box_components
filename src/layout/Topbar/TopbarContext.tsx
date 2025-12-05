import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';

export type TopbarVariant = 'default' | 'app' | 'minimal' | 'transparent';

interface TopbarContextValue {
  variant: TopbarVariant;
  sticky: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
}

const TopbarContext = createContext<TopbarContextValue | null>(null);

export interface TopbarProviderProps {
  children: ReactNode;
  variant?: TopbarVariant;
  sticky?: boolean;
}

export const TopbarProvider: React.FC<TopbarProviderProps> = ({
  children,
  variant = 'default',
  sticky = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <TopbarContext.Provider
      value={{
        variant,
        sticky,
        mobileMenuOpen,
        setMobileMenuOpen,
        toggleMobileMenu,
      }}
    >
      {children}
    </TopbarContext.Provider>
  );
};

export const useTopbar = (): TopbarContextValue => {
  const context = useContext(TopbarContext);
  if (!context) {
    throw new Error('useTopbar must be used within a TopbarProvider');
  }
  return context;
};

export { TopbarContext };
