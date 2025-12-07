/**
 * Layout Context - Unified width control for page layouts
 *
 * @example
 * ```tsx
 * import {
 *   LayoutProvider,
 *   ContentContainer,
 *   useLayout,
 * } from '@sudobility/components';
 *
 * // Wrap your app or page
 * function App() {
 *   return (
 *     <LayoutProvider mode="standard">
 *       <Topbar />
 *       <ContentContainer as="main">
 *         <PageContent />
 *       </ContentContainer>
 *       <Footer />
 *     </LayoutProvider>
 *   );
 * }
 *
 * // For full-width pages like Mail
 * function MailApp() {
 *   return (
 *     <LayoutProvider mode="full">
 *       <Topbar />
 *       <ContentContainer as="main">
 *         <MailContent />
 *       </ContentContainer>
 *       <Footer />
 *     </LayoutProvider>
 *   );
 * }
 *
 * // Access layout in custom components
 * function MyComponent() {
 *   const { containerClass, mode } = useLayout();
 *   return <div className={containerClass}>...</div>;
 * }
 * ```
 */

export {
  LayoutProvider,
  useLayout,
  LayoutContext,
  type LayoutProviderProps,
  type LayoutContextValue,
  type LayoutMode,
} from './LayoutContext';

export {
  ContentContainer,
  type ContentContainerProps,
} from './ContentContainer';
