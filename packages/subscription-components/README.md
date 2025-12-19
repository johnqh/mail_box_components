# @sudobility/subscription-components

Subscription UI components for React with RevenueCat integration.

## Installation

```bash
npm install @sudobility/subscription-components
```

## Peer Dependencies

- `react` (^18.0.0 || ^19.0.0)
- `react-dom` (^18.0.0 || ^19.0.0)
- `@sudobility/components` (^4.0.0)
- `@sudobility/design` (^1.0.0)
- `@revenuecat/purchases-js` (^1.0.0) - optional, only needed for RevenueCat integration

## Components

### SubscriptionTile

A customizable subscription plan tile component that displays pricing, features, and promotional information.

```tsx
import { SubscriptionTile } from '@sudobility/subscription-components';

<SubscriptionTile
  id="yearly"
  title="Annual Plan"
  price="$99.99"
  periodLabel="/year"
  features={['Unlimited access', 'Priority support', 'Early features']}
  isSelected={selected === 'yearly'}
  onSelect={() => setSelected('yearly')}
  topBadge={{ text: 'Best Value', color: 'purple' }}
  discountBadge={{ text: 'Save 40%', isBestValue: true }}
/>
```

### SubscriptionLayout

A container component for subscription selection UI with status display and action buttons.

```tsx
import { SubscriptionLayout, SubscriptionTile } from '@sudobility/subscription-components';

<SubscriptionLayout
  title="Choose Your Plan"
  currentStatus={{
    isActive: true,
    activeContent: {
      title: 'Active Subscription',
      fields: [
        { label: 'Plan', value: 'Annual' },
        { label: 'Expires', value: 'Dec 31, 2025' },
      ],
    },
  }}
  primaryAction={{
    label: 'Subscribe Now',
    onClick: handleSubscribe,
  }}
  secondaryAction={{
    label: 'Restore Purchase',
    onClick: handleRestore,
  }}
  error={error}
>
  {plans.map(plan => (
    <SubscriptionTile key={plan.id} {...plan} />
  ))}
</SubscriptionLayout>
```

### SubscriptionProvider

A context provider for RevenueCat subscription management.

```tsx
import { SubscriptionProvider, useSubscriptionContext } from '@sudobility/subscription-components';

// Wrap your app
<SubscriptionProvider
  apiKey="your_revenuecat_api_key"
  entitlementId="premium"
  onError={(error) => console.error(error)}
>
  <App />
</SubscriptionProvider>

// Use in components
function PricingPage() {
  const {
    products,
    currentSubscription,
    isLoading,
    purchase,
    restore,
  } = useSubscriptionContext();

  // ...
}
```

## Localization

All text labels are passed through callbacks, allowing full control over localization:

```tsx
<SubscriptionTile
  title={t('plans.annual.title')}
  price={formatCurrency(99.99)}
  periodLabel={t('periods.year')}
  features={t('plans.annual.features', { returnObjects: true })}
  // ...
/>
```

## License

MIT
