# @sudobility/realestate-components

Real estate listing and property management UI components for React applications.

## Installation

```bash
npm install @sudobility/realestate-components @sudobility/components @sudobility/design
```

## Components

- **PropertyCard** - Property listing card
- **PropertySearch** - Property search interface
- **PropertyGallery** - Property image gallery
- **PropertyMap** - Interactive property map
- **PropertyCompare** - Property comparison tool
- **ListingForm** - Property listing creation form
- **NeighborhoodInfo** - Neighborhood information display
- **OpenHouse** - Open house scheduling
- **RentalApplication** - Rental application form
- **VirtualTour** - Virtual property tour
- **MortgageCalc** - Mortgage calculator
- **AgentCard** - Real estate agent profile card

## Usage

```tsx
import { PropertyCard, PropertySearch, MortgageCalc } from '@sudobility/realestate-components';

function App() {
  return (
    <>
      <PropertySearch onSearch={handleSearch} />
      <PropertyCard property={property} />
      <MortgageCalc price={500000} downPayment={100000} />
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
