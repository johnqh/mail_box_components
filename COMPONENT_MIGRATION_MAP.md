# Component Migration Mapping

This document maps all 500+ components from `src/ui/` to their new locations in the reorganized structure.

## Primitives (50 components)

### src/primitives/layout/ (20 components)
- box.tsx
- flex.tsx
- flex-container.tsx
- container.tsx
- grid.tsx
- stack.tsx (VStack, HStack)
- center.tsx
- spacer.tsx
- section.tsx
- page-container.tsx
- aspect-ratio.tsx
- divider.tsx
- separator.tsx
- border-accent.tsx
- floating-panel.tsx
- split-pane.tsx
- resizable.tsx
- resizable-panels.tsx
- scroll-area.tsx
- masonry.tsx

### src/primitives/typography/ (13 components)
- text.tsx
- heading.tsx
- typography.tsx (PageTitle, SectionTitle, BodyText, TextLink)
- code.tsx
- code-display.tsx
- kbd.tsx
- blockquote.tsx
- helper-text.tsx
- screen-reader-text.tsx
- truncated-text.tsx
- formatted-number.tsx
- relative-time.tsx

### src/primitives/feedback/ (17 components)
- spinner.tsx
- loading-overlay.tsx
- loading-dots.tsx
- loading-state.tsx
- skeleton-loader.tsx
- alert.tsx (Alert, AlertTitle, AlertDescription)
- alert-dialog.tsx
- alert-banner.tsx
- toast.tsx (Toast, ToastProvider, useToast)
- toast-notification.tsx
- notification-badge.tsx
- notification-panel.tsx
- badge.tsx
- status-badge.tsx (StatusBadge, ChainBadge)
- status-indicator.tsx
- system-status-indicator.tsx
- section-badge.tsx

## Forms (60 components)

### src/forms/inputs/ (35 components)
- input.tsx
- text-area.tsx
- number-input.tsx
- search-input.tsx
- date-input.tsx
- time-picker.tsx
- password-input.tsx
- phone-input.tsx
- otp-input.tsx
- two-factor-input.tsx
- email-input-group.tsx (EmailInputGroup, EmailInputField, CollapsibleEmailField)
- checkbox.tsx
- switch.tsx
- radio-group.tsx
- label.tsx
- helper-text.tsx
- form-field.tsx
- form-field-group.tsx (FormFieldGroup, TextField, TextAreaField, SelectField)
- form-alerts.tsx
- form-section.tsx (from design-system-components)
- inline-edit.tsx
- select.tsx (Select, SelectGroup, SelectValue, etc.)
- multi-select.tsx
- combobox.tsx
- dropdown.tsx
- toggle-group.tsx
- slider.tsx
- slider-input.tsx
- file-input.tsx
- file-icon.tsx
- tag-input.tsx
- mention-input.tsx
- action-button.tsx
- privacy-toggle.tsx
- password-strength.tsx

### src/forms/advanced/ (18 components)
- date-time-picker.tsx
- date-range-picker.tsx
- calendar.tsx
- time-slot-picker.tsx
- color-picker.tsx
- color-picker-advanced.tsx
- color-swatch.tsx
- signature-pad.tsx
- image-cropper.tsx
- wysiwyg-editor.tsx
- credit-card-input.tsx
- currency-input.tsx
- currency-converter.tsx
- media-uploader.tsx
- file-input.tsx
- file-icon.tsx
- markdown-renderer.tsx
- code-highlighter.tsx

### src/forms/builders/ (7 components)
- form-builder.tsx
- form-validator.tsx
- form-template.tsx
- schema-validator.tsx
- field-mapper.tsx
- survey-builder.tsx
- quiz-builder.tsx

## Navigation (17 components)

### src/navigation/
- smart-link.tsx (SmartLink, SmartContent, useSmartLinks)
- link.tsx
- external-link.tsx
- tracked-link.tsx (from core/)
- breadcrumb.tsx
- breadcrumb-nav.tsx
- breadcrumb-section.tsx (from core/)
- tabs.tsx (Tabs, TabsList, TabsTrigger, TabsContent)
- pagination.tsx
- pagination-nav.tsx
- table-of-contents.tsx
- navigation-menu.tsx
- navigation-list.tsx
- side-nav.tsx
- stepper-nav.tsx
- stepper.tsx
- skip-navigation.tsx

## Data Display (28 components)

### src/data-display/
- table.tsx
- data-table.tsx
- data-grid.tsx
- pivot-table.tsx
- spreadsheet-grid.tsx
- column-resize.tsx
- cell-editor.tsx
- list.tsx (List, ListItem)
- list-item-with-action.tsx
- navigation-list.tsx
- feature-list-item.tsx
- user-table.tsx
- transfer-list.tsx
- virtual-list.tsx
- tree-view.tsx
- card.tsx (Card, CardHeader, CardContent, CardFooter)
- stat-card.tsx (from design-system-components)
- feature-card.tsx
- product-card.tsx
- info-card.tsx
- avatar.tsx
- avatar-group.tsx
- profile-header.tsx
- key-value-pair.tsx
- stat-display.tsx
- dashboard-stat-card.tsx
- empty-state.tsx
- no-content.tsx

## Charts (19 components)

### src/charts/
- bar-chart.tsx
- line-chart.tsx
- pie-chart.tsx
- area-chart.tsx
- radar-chart.tsx
- bubble-chart.tsx
- sparkline.tsx
- heatmap.tsx
- funnel-chart.tsx
- scatter-plot.tsx
- tree-map.tsx
- sankey-diagram.tsx
- burndown-chart.tsx
- performance-chart.tsx
- metric-comparison.tsx
- gauge.tsx
- progress-bar.tsx
- progress.tsx
- progress-circle.tsx

## Media (19 components)

### src/media/
- image.tsx
- image-gallery.tsx
- image-comparison.tsx
- image-cropper.tsx
- video-player.tsx
- video-thumbnail.tsx
- video-editor.tsx
- video-call.tsx
- audio-player.tsx
- audio-waveform.tsx
- wave-form.tsx
- voice-recorder.tsx
- podcast-player.tsx
- playlist-manager.tsx
- media-uploader.tsx
- media-playlist.tsx
- lightbox.tsx
- qr-code-display.tsx
- live-stream.tsx

## Modals & Dialogs (10 components)

### src/modals/
- modal.tsx (Modal, ModalHeader, ModalContent, ModalFooter)
- dialog.tsx
- alert-dialog.tsx
- confirmation-dialog.tsx
- text-input-modal.tsx
- drawer.tsx
- sheet.tsx
- popover.tsx
- hover-card.tsx
- tooltip.tsx

## Interactive (14 components)

### src/interactive/
- drag-drop.tsx
- drag-drop-list.tsx
- sortable-grid.tsx
- nested-drag.tsx
- gesture-detector.tsx
- swipe-actions.tsx
- pinch-zoom.tsx
- double-tap.tsx
- long-press.tsx
- hover-tooltip.tsx
- radial-menu.tsx
- focus-trap.tsx
- scroll-spy.tsx
- pull-to-refresh.tsx

## Specialized Components (TO BE EXTRACTED - 250+ components)

These will be moved to separate packages in Phase 2:

### @sudobility/web3-components (10)
- wallet-icon.tsx
- wallet-connect.tsx
- wallet-selection.tsx
- address-label.tsx
- address-link.tsx
- nft-gallery.tsx
- token-swap.tsx
- gas-tracker.tsx
- crypto-portfolio.tsx

### @sudobility/email-components (10)
- email-accounts-list.tsx
- email-input-group.tsx (keep base in core, specialized in package)
- email-template.tsx
- email-campaign.tsx
- email-analytics.tsx
- ab-test-email.tsx
- subscriber-list.tsx
- contact-card.tsx
- free-email-banner.tsx

### @sudobility/fitness-components (19)
- step-counter.tsx
- calorie-tracker.tsx
- workout-log.tsx
- workout-planner.tsx
- exercise-timer.tsx
- body-metrics.tsx
- fitness-goal.tsx
- heart-rate.tsx
- sleep-tracker.tsx
- water-intake.tsx
- weight-chart.tsx
- athlete-stats.tsx
- nutrition-facts.tsx
- nutrition-label.tsx
- meal-planner.tsx

### @sudobility/realestate-components (12)
- property-card.tsx
- property-search.tsx
- property-gallery.tsx
- property-map.tsx
- property-compare.tsx
- listing-form.tsx
- neighborhood-info.tsx
- open-house.tsx
- rental-application.tsx
- virtual-tour.tsx
- mortgage-calc.tsx
- agent-card.tsx

### @sudobility/travel-components (17)
- destination-card.tsx
- trip-planner.tsx
- itinerary-builder.tsx
- hotel-booking.tsx
- flight-search.tsx
- flight-status.tsx
- flight-tracker.tsx
- boarding-pass.tsx
- airport-map.tsx
- tour-package.tsx
- travel-map.tsx
- booking-confirmation.tsx
- travel-checklist.tsx
- currency-rates.tsx
- weather-forecast.tsx
- travel-tips.tsx
- booking-widget.tsx

### @sudobility/food-components (12)
- menu-display.tsx
- recipe-card.tsx
- recipe-rating.tsx
- ingredient-list.tsx
- order-cart.tsx
- table-reservation.tsx
- delivery-tracker.tsx
- restaurant-review.tsx
- nutrition-label.tsx (duplicate with fitness)
- cooking-timer.tsx
- allergen-filter.tsx
- portion-calculator.tsx

### @sudobility/events-components (13)
- event-card.tsx
- event-calendar.tsx
- event-calendar-adv.tsx
- ticket-selector.tsx
- seating-chart.tsx
- countdown-event.tsx
- guest-list.tsx
- rsvp-form.tsx
- event-gallery.tsx
- schedule-timeline.tsx
- speaker-card.tsx
- sponsor-grid.tsx
- attendee-badge.tsx

### @sudobility/finance-components (22)
- account-overview.tsx
- transaction-history.tsx
- budget-tracker.tsx
- expense-form.tsx
- income-chart.tsx
- financial-report.tsx
- investment-tracker.tsx
- investment-portfolio.tsx
- stock-ticker.tsx
- crypto-portfolio.tsx (duplicate with web3)
- profit-loss.tsx
- balance-sheet.tsx
- cash-flow.tsx
- tax-calculator.tsx
- currency-converter.tsx (duplicate)
- payment-form.tsx
- invoice-display.tsx
- invoice-template.tsx
- receipt-template.tsx
- billing-history.tsx
- subscription-plan.tsx
- loan-calculator.tsx

## Remaining Core Components (Keep in src/ui/ temporarily)

These are general-purpose but need further categorization:

### Utilities & Misc (to be categorized)
- icon-container.tsx
- gradient-icon-container.tsx
- gradient-banner.tsx
- icon-text.tsx
- info-box.tsx
- copy-button.tsx
- logo.tsx
- backdrop.tsx
- portal.tsx
- overlay.tsx
- show.tsx
- visually-hidden.tsx
- menu-item.tsx
- settings-list.tsx
- internal-link-clusters.tsx
- design-system-components.tsx

### Marketing (consider separate package)
- hero-banner-with-badge.tsx
- feature-grid.tsx
- feature-block.tsx
- use-case-grid.tsx
- comparison-section.tsx
- feature-comparison.tsx
- testimonial-slider.tsx
- review-card.tsx
- feedback-form.tsx
- nps-survey.tsx
- sentiment-indicator.tsx
- cta-banner.tsx
- share-buttons.tsx
- social-feed.tsx

### Animation
- animated-section.tsx (FadeInUp, FadeInScale, FloatingElement)
- animated-counter.tsx
- reveal-on-scroll.tsx
- parallax-scroll.tsx
- morph-transition.tsx
- fade-carousel.tsx
- aurora-background.tsx
- particle-effect.tsx

### Advanced Features (to be categorized)
- infinite-scroll.tsx
- step-indicator.tsx
- progress-tracker.tsx
- trend-indicator.tsx
- metrics-grid.tsx
- process-steps.tsx
- timeline.tsx
- timeline-vertical.tsx
- carousel.tsx
- accordion.tsx
- collapsible.tsx
- rating.tsx
- rating-stars.tsx
- reaction.tsx
- comment-thread.tsx
- user-mention.tsx
- chat-bubble.tsx
- message-list.tsx
- message-input.tsx
- typing-indicator.tsx
- typing-indicator-msg.tsx

## Migration Notes

1. **Phase 1**: Move general-purpose components to new structure
2. **Phase 2**: Extract specialized domains to separate packages
3. **Phase 3**: Update all imports and exports for backward compatibility
4. **Phase 4**: Deprecate old paths, provide migration guide

## Backward Compatibility Strategy

Main `src/index.ts` will re-export from new locations:
```typescript
// Old way (deprecated but still works)
export { Button } from './ui/button'

// New way
export { Button } from './primitives/feedback/button'

// Both work during transition period
```
