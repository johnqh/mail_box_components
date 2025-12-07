/**
 * Topbar Components - Flexible, responsive top navigation bar
 *
 * @example
 * ```tsx
 * import {
 *   Topbar,
 *   TopbarLeft,
 *   TopbarCenter,
 *   TopbarRight,
 *   TopbarLogo,
 *   TopbarNav,
 *   TopbarMenuToggle,
 *   TopbarActions,
 *   TopbarMobileNav,
 * } from '@sudobility/components';
 *
 * function Header() {
 *   const navItems = [
 *     { id: 'home', label: 'Home', href: '/' },
 *     { id: 'about', label: 'About', href: '/about' },
 *   ];
 *
 *   return (
 *     <>
 *       <Topbar variant="app" sticky>
 *         <TopbarLeft>
 *           <TopbarMenuToggle />
 *           <TopbarLogo src="/logo.svg" alt="Logo" onClick={() => navigate('/')} />
 *         </TopbarLeft>
 *         <TopbarCenter>
 *           <TopbarNav items={navItems} />
 *         </TopbarCenter>
 *         <TopbarRight>
 *           <TopbarActions>
 *             <Button>Sign In</Button>
 *           </TopbarActions>
 *         </TopbarRight>
 *       </Topbar>
 *       <TopbarMobileNav items={navItems} />
 *     </>
 *   );
 * }
 * ```
 */

// Main component
export { Topbar, type TopbarProps, type TopbarVariant } from './Topbar';

// Context
export {
  TopbarProvider,
  useTopbar,
  TopbarContext,
  type TopbarProviderProps,
} from './TopbarContext';

// Slot components
export {
  TopbarLeft,
  TopbarCenter,
  TopbarRight,
  TopbarMobileContent,
  TopbarDivider,
} from './TopbarSlots';

// Logo component
export { TopbarLogo, type TopbarLogoProps } from './TopbarLogo';

// Menu toggle
export {
  TopbarMenuToggle,
  type TopbarMenuToggleProps,
} from './TopbarMenuToggle';

// Navigation
export {
  TopbarNav,
  TopbarMobileNav,
  type TopbarNavProps,
  type TopbarNavItem,
  type TopbarMobileNavProps,
} from './TopbarNav';

// Unified navigation (desktop + mobile)
export {
  TopbarNavigation,
  type TopbarNavigationProps,
} from './TopbarNavigation';

// Actions
export {
  TopbarActions,
  TopbarIconButton,
  TopbarSearch,
  type TopbarActionsProps,
  type TopbarIconButtonProps,
  type TopbarSearchProps,
} from './TopbarActions';
