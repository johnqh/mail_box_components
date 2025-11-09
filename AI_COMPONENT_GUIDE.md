# AI Component Development Guide

## Overview
This document provides AI-friendly guidance for working with the `@johnqh/mail-box-components` library. All 300+ components in this library are optimized for AI-assisted development with comprehensive TypeScript types, JSDoc comments, and consistent patterns.

## Component Architecture

### Design Principles
1. **Consistent Naming**: All components follow PascalCase naming
2. **Type Safety**: Full TypeScript support with exported interfaces
3. **Theme Support**: Every component supports light/dark modes automatically
4. **Accessibility**: ARIA attributes and semantic HTML throughout
5. **Composability**: Components are designed to work together seamlessly

### Common Patterns

#### Basic Component Structure
```tsx
import { cn } from '../lib/utils';

export interface ComponentNameProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const ComponentName = ({ className, children, disabled, onClick }: ComponentNameProps) => {
  return (
    <div
      className={cn(
        'p-4 rounded-lg border transition-colors',
        'bg-white dark:bg-gray-900',
        'border-gray-200 dark:border-gray-700',
        'text-gray-900 dark:text-white',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      onClick={disabled ? undefined : onClick}
    >
      {children}
    </div>
  );
};
```

## Component Categories

### Batches 1-28 (Core Components)
Original components from the base library including:
- Basic UI elements (Button, Input, Card, Modal, etc.)
- Navigation components (Tabs, Breadcrumb, Pagination)
- Data display (Table, List, Grid)
- Form controls (Select, Checkbox, Radio, Switch)

### Batches 29-43 (First Extension - 60 components)
- **Batch 29**: Advanced Layout (Masonry, Kanban, Timeline, FloatingPanel)
- **Batch 30**: Charts & Graphs (BarChart, LineChart, PieChart, AreaChart)
- **Batch 31**: Media (VideoPlayer, AudioPlayer, ImageGallery, MediaUploader)
- **Batch 32**: Social (ShareButtons, CommentThread, UserMention, Reaction)
- **Batch 33**: E-commerce (ProductCard, PriceDisplay, CartSummary, RatingStars)
- **Batch 34**: Dashboard (DashboardStatCard, ActivityFeed, QuickActions, TrendIndicator)
- **Batch 35**: Navigation (BreadcrumbNav, PaginationNav, SideNav, StepperNav)
- **Batch 36**: Notifications (ToastNotification, NotificationBadge, NotificationPanel, AlertBanner)
- **Batches 37-43**: Data Entry, File Management, Search, Settings, Analytics, Messaging, Admin

### Batches 44-58 (Second Extension - 60 components)
- **Batch 44**: Advanced Forms (SignaturePad, SliderInput, ColorPickerAdvanced, WysiwygEditor)
- **Batch 45**: Data Visualization Advanced
- **Batch 46**: Interactive Widgets
- **Batch 47**: Content Display
- **Batch 48**: User Profile
- **Batch 49**: Scheduling & Calendar
- **Batch 50**: Communication
- **Batch 51**: Payment & Billing
- **Batch 52**: Location & Maps
- **Batch 53**: Educational
- **Batch 54**: Gaming Elements
- **Batch 55**: Accessibility Features
- **Batch 56**: Performance Monitoring
- **Batch 57**: Integration Components
- **Batch 58**: Experimental UI

### Batches 59-73 (Third Extension - 60 components)
- **Batch 59**: Animation Components
- **Batch 60**: Workflow & Process
- **Batch 61**: Security & Privacy
- **Batch 62**: Collaboration Tools
- **Batch 63**: Documentation
- **Batch 64**: Testing & QA
- **Batch 65**: DevOps & Deployment
- **Batch 66**: Marketing & SEO
- **Batch 67**: Feedback & Reviews
- **Batch 68**: Onboarding & Tours
- **Batch 69**: Advanced Tables
- **Batch 70**: Rich Media
- **Batch 71**: IoT & Sensors
- **Batch 72**: Blockchain & Web3
- **Batch 73**: AI & ML Components

### Batches 74-103 (Fourth Extension - 120 components)
- **Batches 74-76**: Advanced Interactions (12 components)
- **Batches 77-79**: Data Import/Export (12 components)
- **Batches 80-82**: Templates & Builders (12 components)
- **Batches 83-85**: Scheduling & Time (12 components)
- **Batches 86-88**: Financial Components (12 components)
- **Batches 89-91**: Health & Fitness (12 components)
- **Batches 92-94**: Travel & Tourism (12 components)
- **Batches 95-97**: Real Estate (12 components)
- **Batches 98-100**: Food & Restaurant (12 components)
- **Batches 101-103**: Events & Entertainment (12 components)

## Theme Support

### Dark Mode Classes
All components use Tailwind's dark mode prefix:
```tsx
className={cn(
  'bg-white dark:bg-gray-900',      // Background
  'text-gray-900 dark:text-white',  // Text
  'border-gray-200 dark:border-gray-700', // Borders
  'hover:bg-gray-50 dark:hover:bg-gray-800' // Hover states
)}
```

### Color Variants
Components support semantic color variants:
- `default`: Gray tones
- `primary`: Blue tones
- `success`: Green tones
- `warning`: Yellow tones
- `danger`: Red tones

## AI Development Workflow

### Finding Components
1. **By Category**: Use the batch numbers to find related components
2. **By Name**: All components are exported from `src/ui/index.ts`
3. **By Feature**: Check the category in this guide

### Using Components
```tsx
// Import specific component
import { ComponentName } from '@johnqh/mail-box-components';

// Use with TypeScript
const MyApp = () => {
  return <ComponentName className="my-custom-class" />;
};
```

### Customizing Components
```tsx
// All components accept className for Tailwind customization
<ComponentName
  className="my-8 shadow-lg"
  disabled={false}
  onClick={() => console.log('clicked')}
/>
```

## TypeScript Support

### Interface Patterns
All components export their props interface:
```tsx
export interface ComponentNameProps {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}
```

### Type Exports
Import types for custom implementations:
```tsx
import type { ComponentNameProps } from '@johnqh/mail-box-components';
```

## Accessibility Features

### ARIA Attributes
Components include proper ARIA attributes:
- `role` attributes for semantic HTML
- `aria-label` for screen readers
- `aria-disabled` for disabled states
- `aria-expanded` for expandable content

### Keyboard Navigation
Interactive components support:
- Tab navigation
- Enter/Space for activation
- Escape for dismissal
- Arrow keys for selection

## Performance Optimization

### Tree Shaking
Import only what you need:
```tsx
// Good - tree shakeable
import { Button, Card } from '@johnqh/mail-box-components';

// Avoid - imports everything
import * as Components from '@johnqh/mail-box-components';
```

### Code Splitting
Use dynamic imports for large components:
```tsx
const HeavyComponent = lazy(() => import('@johnqh/mail-box-components').then(m => ({ default: m.HeavyComponent })));
```

## Build Information

- **Total Components**: 420+
- **Bundle Size**: 633.53 kB (128.21 kB gzipped)
- **TypeScript**: Full type definitions included
- **Tree Shakeable**: Yes
- **CSS Framework**: Tailwind CSS
- **React Version**: 18+

## Contributing

When adding new components:
1. Follow the established naming patterns
2. Include full TypeScript types
3. Add comprehensive JSDoc comments
4. Support light/dark themes
5. Include accessibility features
6. Add usage examples

## Support

For issues or questions:
- GitHub: [Repository URL]
- Documentation: [Docs URL]
- Examples: See `CLAUDE.md` for development guides

### Batches 104-118 (Fifth Extension - 60 components)
- **Batch 104**: Social Media Integration (SocialFeed, TwitterEmbed, InstagramWidget, FacebookShare)
- **Batch 105**: Email Marketing (EmailCampaign, SubscriberList, EmailAnalytics, AbTestEmail)
- **Batch 106**: CRM Components (ContactCard, DealPipeline, LeadScorer, CrmDashboard)
- **Batch 107**: Project Management (ProjectBoard, SprintPlanner, TaskBoard, BurndownChart)
- **Batch 108**: HR & Recruiting (JobPosting, CandidateCard, InterviewScheduler, OnboardingChecklist)
- **Batch 109**: Legal & Compliance (ContractViewer, SignatureRequest, ComplianceChecker, AuditTrail)
- **Batch 110**: Customer Support (TicketSystem, LiveChat, KnowledgeBase, SupportDashboard)
- **Batch 111**: Inventory Management (StockLevel, WarehouseMap, InventoryAlert, ReorderPoint)
- **Batch 112**: Supply Chain (ShipmentTracker, SupplierCard, ProcurementForm, LogisticsMap)
- **Batch 113**: Manufacturing (ProductionLine, QualityControl, MachineMonitor, DefectTracker)
- **Batch 114**: Quality Assurance (TestCase, BugTracker, QaReport, RegressionTest)
- **Batch 115**: Environmental/Sustainability (CarbonFootprint, EnergyMonitor, RecyclingTracker, SustainabilityScore)
- **Batch 116**: Automotive (VehicleStatus, FuelGauge, MaintenanceLog, TripMeter)
- **Batch 117**: Aviation (FlightStatus, AirportMap, BoardingPass, FlightTracker)
- **Batch 118**: Maritime (VesselTracker, PortSchedule, CargoManifest, TideChart)

### Batches 119-133 (Sixth Extension - 60 components)
- **Batch 119**: Telecommunications (CallCenter, VoipPhone, SmsComposer, PhoneDirectory)
- **Batch 120**: Education/E-Learning (CourseCatalog, QuizBuilder, GradeBook, AssignmentSubmission)
- **Batch 121**: Medical/Healthcare (PatientRecord, AppointmentBooking, PrescriptionManager, VitalSigns)
- **Batch 122**: Retail/POS (PosTerminal, InventoryScanner, SalesReport, CustomerLoyalty)
- **Batch 123**: Sports/Fitness (TeamRoster, ScoreBoard, WorkoutPlanner, AthleteStats)
- **Batch 124**: Entertainment/Media (PlaylistManager, PodcastPlayer, VideoEditor, StreamingStats)
- **Batch 125**: Agriculture (CropMonitor, WeatherStation, FarmEquipment, HarvestTracker)
- **Batch 126**: Construction (BlueprintViewer, MaterialOrder, SafetyChecklist, ProjectTimeline)
- **Batch 127**: Gaming/Esports (TournamentBracket, PlayerStats, LiveStream, TeamManagement)
- **Batch 128**: Finance/Banking (AccountOverview, TransactionHistory, LoanCalculator, InvestmentPortfolio)
- **Batch 129**: Insurance (PolicyManager, ClaimSubmission, RiskAssessment, QuoteGenerator)
- **Batch 130**: Energy/Utilities (PowerGrid, WaterMeter, BillingCycle, UsageForecast)
- **Batch 131**: Transportation/Logistics (RouteOptimizer, FleetManagement, LoadPlanner, DriverLog)
- **Batch 132**: Government/Civic (VoterRegistration, PermitApplication, PublicNotice, CensusForm)
- **Batch 133**: Non-Profit/Charity (DonationForm, VolunteerSchedule, FundraiserProgress, GrantApplication)

## Updated Statistics

- **Total Components**: 420+
- **Total Batches**: 133
- **Bundle Size**: 633.53 kB (128.21 kB gzipped)
- **TypeScript Support**: ✅ Full
- **Dark Mode Support**: ✅ All components
- **Tree Shakeable**: ✅ Yes
