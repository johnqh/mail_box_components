/**
 * Footer Components - Flexible, responsive footer
 *
 * @example
 * ```tsx
 * import {
 *   Footer,
 *   FooterGrid,
 *   FooterBrand,
 *   FooterLinkSection,
 *   FooterLink,
 *   FooterBottom,
 *   FooterCompact,
 *   FooterCompactLeft,
 *   FooterCompactRight,
 *   FooterVersion,
 *   FooterCopyright,
 * } from '@sudobility/components';
 *
 * // Full footer
 * function LandingFooter() {
 *   return (
 *     <Footer variant="full">
 *       <FooterGrid>
 *         <FooterBrand description="Your app description">
 *           <Logo />
 *         </FooterBrand>
 *         <FooterLinkSection title="Platform">
 *           <FooterLink><Link to="/about">About</Link></FooterLink>
 *           <FooterLink><Link to="/docs">Docs</Link></FooterLink>
 *         </FooterLinkSection>
 *       </FooterGrid>
 *       <FooterBottom>
 *         <FooterVersion version="1.0.0" />
 *         <FooterCopyright year="2025" companyName="Company" />
 *       </FooterBottom>
 *     </Footer>
 *   );
 * }
 *
 * // Compact footer
 * function AppFooter() {
 *   return (
 *     <Footer variant="compact" sticky>
 *       <FooterCompact>
 *         <FooterCompactLeft>
 *           <FooterVersion version="1.0.0" />
 *           <FooterCopyright year="2025" companyName="Company" />
 *         </FooterCompactLeft>
 *         <FooterCompactRight>
 *           <Link to="/privacy">Privacy</Link>
 *           <Link to="/terms">Terms</Link>
 *         </FooterCompactRight>
 *       </FooterCompact>
 *     </Footer>
 *   );
 * }
 * ```
 */

export { Footer, type FooterProps, type FooterVariant } from './Footer';

export {
  FooterGrid,
  FooterBrand,
  type FooterBrandProps,
  FooterLinkSection,
  type FooterLinkSectionProps,
  FooterLink,
  type FooterLinkProps,
  FooterBottom,
  FooterBottomRow,
  FooterCompact,
  FooterCompactLeft,
  FooterCompactRight,
  FooterVersion,
  type FooterVersionProps,
  FooterCopyright,
  type FooterCopyrightProps,
  FooterSocialLinks,
  type FooterSocialLinksProps,
} from './FooterSlots';
