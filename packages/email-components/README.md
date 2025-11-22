# @sudobility/email-components

Email marketing and management UI components for React applications.

## Installation

```bash
npm install @sudobility/email-components @sudobility/components @sudobility/design
```

## Components

- **EmailAccountsList** - Email account management list
- **EmailInputGroup** - Email input with validation
- **EmailTemplate** - Email template builder
- **EmailCampaign** - Campaign creation and management
- **EmailAnalytics** - Email campaign analytics dashboard
- **ABTestEmail** - A/B testing for email campaigns
- **SubscriberList** - Subscriber management interface
- **ContactCard** - Contact information card
- **FreeEmailBanner** - Banner for free email providers

## Usage

```tsx
import { EmailAccountsList, EmailCampaign, EmailAnalytics } from '@sudobility/email-components';

function App() {
  return (
    <>
      <EmailAccountsList accounts={accounts} />
      <EmailCampaign onSave={handleSave} />
      <EmailAnalytics campaignId="123" />
    </>
  );
}
```

## Dependencies

This package requires:
- `@sudobility/components` - Core component library
- `@sudobility/design` - Design system tokens
- `react` ^18.0.0 or ^19.0.0

## License

MIT
