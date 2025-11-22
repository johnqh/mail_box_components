# @sudobility/fitness-components

Fitness and health tracking UI components for React applications.

## Installation

```bash
npm install @sudobility/fitness-components @sudobility/components @sudobility/design
```

## Components

- **StepCounter** - Daily step tracking display
- **CalorieTracker** - Calorie intake and burn tracker
- **WorkoutLog** - Workout session logging
- **WorkoutPlanner** - Workout schedule planner
- **ExerciseTimer** - Exercise interval timer
- **BodyMetrics** - Body measurements tracking
- **FitnessGoal** - Goal setting and progress
- **HeartRate** - Heart rate monitoring display
- **SleepTracker** - Sleep quality tracking
- **WaterIntake** - Daily water intake tracker
- **WeightChart** - Weight progress chart
- **AthleteStats** - Athletic performance statistics
- **ProgressPhoto** - Progress photo comparison
- **MealPlanner** - Meal planning interface
- **NutritionFacts** - Nutrition information display
- **NutritionLabel** - Food nutrition label
- **MacroCalculator** - Macro nutrient calculator
- **PersonalRecord** - Personal record achievements
- **TrainingPlan** - Training plan overview

## Usage

```tsx
import { StepCounter, CalorieTracker, WorkoutLog } from '@sudobility/fitness-components';

function App() {
  return (
    <>
      <StepCounter steps={8500} goal={10000} />
      <CalorieTracker consumed={1800} burned={2200} />
      <WorkoutLog workouts={workouts} />
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
