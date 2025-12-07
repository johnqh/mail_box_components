/**
 * Layout Components - Page structure and layout elements
 */

export { StandardPageLayout } from './StandardPageLayout';
export { PageHeader } from './PageHeader';

// Layout context for unified width control
export {
  LayoutProvider,
  useLayout,
  LayoutContext,
  type LayoutProviderProps,
  type LayoutContextValue,
  type LayoutMode,
  ContentContainer,
  type ContentContainerProps,
} from './Layout';

// Footer components
export {
  Footer,
  type FooterProps,
  type FooterVariant,
  FooterGrid,
  FooterBrand,
  type FooterBrandProps,
  FooterLinkSection,
  type FooterLinkSectionProps,
  FooterLink,
  type FooterLinkProps,
  FooterBottom,
  FooterCompact,
  FooterCompactLeft,
  FooterCompactRight,
  FooterVersion,
  type FooterVersionProps,
  FooterCopyright,
  type FooterCopyrightProps,
} from './Footer';
export {
  MasterDetailLayout,
  type MasterDetailLayoutProps,
  MasterListItem,
  type MasterListItemProps,
} from './MasterDetailLayout';

// Topbar components
export {
  Topbar,
  type TopbarProps,
  type TopbarVariant,
  TopbarProvider,
  useTopbar,
  TopbarContext,
  type TopbarProviderProps,
  TopbarLeft,
  TopbarCenter,
  TopbarRight,
  TopbarMobileContent,
  TopbarDivider,
  TopbarLogo,
  type TopbarLogoProps,
  TopbarMenuToggle,
  type TopbarMenuToggleProps,
  TopbarNav,
  TopbarMobileNav,
  type TopbarNavProps,
  type TopbarNavItem,
  type TopbarMobileNavProps,
  TopbarNavigation,
  type TopbarNavigationProps,
  TopbarActions,
  TopbarIconButton,
  TopbarSearch,
  type TopbarActionsProps,
  type TopbarIconButtonProps,
  type TopbarSearchProps,
} from './Topbar';
