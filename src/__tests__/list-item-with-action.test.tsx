import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ListItemWithAction } from '../ui/list-item-with-action';

describe('ListItemWithAction', () => {
  it('labels the action with its text by default', () => {
    render(
      <ListItemWithAction onAction={vi.fn()} actionText='Remove'>
        user@example.com
      </ListItemWithAction>
    );
    expect(screen.getByRole('button', { name: /remove/i })).toBeTruthy();
  });

  it('shows the icon alone when asked, and still names the button', () => {
    // A row whose action reads "Delete <the thing it is about>" says the thing
    // twice and lets the button dominate the row in a narrow column. Icon-only
    // must not cost the button its accessible name.
    render(
      <ListItemWithAction onAction={vi.fn()} actionText='Delete chat' iconOnly>
        Search for Apple Lisa computer
      </ListItemWithAction>
    );
    const button = screen.getByRole('button', { name: 'Delete chat' });
    expect(button.textContent).toBe('');
  });
});
