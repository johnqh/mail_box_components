import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FormModal } from '../ui/form-modal';

const noop = () => {};

describe('FormModal', () => {
  it('names its dialog from the title, so consumers need no heading of their own', () => {
    render(
      <FormModal open title='Import audio' onClose={noop} onSave={noop}>
        body
      </FormModal>
    );
    // Without this the dialog has role but no accessible name, and every
    // consumer works around it by nesting a second labelled role="dialog".
    expect(
      screen.getByRole('dialog', { name: 'Import audio' })
    ).toBeInTheDocument();
  });

  it('renders the title exactly once', () => {
    render(
      <FormModal open title='Import audio' onClose={noop} onSave={noop}>
        body
      </FormModal>
    );
    expect(screen.getAllByText('Import audio')).toHaveLength(1);
  });

  it('renders nothing when closed', () => {
    render(
      <FormModal open={false} title='Import audio' onClose={noop} onSave={noop}>
        body
      </FormModal>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('stacks above the sticky Topbar', () => {
    render(
      <FormModal open title='Import audio' onClose={noop} onSave={noop}>
        body
      </FormModal>
    );
    // `Topbar`'s `highest` is z-[60] and sticky; at z-50 this modal rendered
    // under it, hiding the title and close button on a full-screen phone
    // layout. jsdom cannot resolve Tailwind classes to a computed z-index, so
    // the class itself is what gets pinned.
    const overlay = screen.getByRole('dialog').parentElement!;
    expect(overlay.className).toContain('z-[100]');
  });

  it('confirms with the given label and disables it when canSave is false', async () => {
    const onSave = vi.fn();
    const { rerender } = render(
      <FormModal
        open
        title='T'
        onClose={noop}
        onSave={onSave}
        canSave={false}
        saveLabel='Import'
      >
        body
      </FormModal>
    );
    const button = screen.getByRole('button', { name: 'Import' });
    expect(button).toBeDisabled();

    rerender(
      <FormModal
        open
        title='T'
        onClose={noop}
        onSave={onSave}
        canSave
        saveLabel='Import'
      >
        body
      </FormModal>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Import' }));
    expect(onSave).toHaveBeenCalledTimes(1);
  });

  it('blocks closing while saving, so a slow submit cannot be cancelled halfway', async () => {
    const onClose = vi.fn();
    render(
      <FormModal open title='T' onClose={onClose} onSave={noop} saving>
        body
      </FormModal>
    );
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
    await userEvent.keyboard('{Escape}');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('closes on Escape when not saving', async () => {
    const onClose = vi.fn();
    render(
      <FormModal open title='T' onClose={onClose} onSave={noop}>
        body
      </FormModal>
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  describe('actions', () => {
    it('renders a button per action, in order, and wires each one', async () => {
      const cancel = vi.fn();
      const visible = vi.fn();
      const whole = vi.fn();
      render(
        <FormModal
          open
          title='Export hidden tracks?'
          onClose={noop}
          actions={[
            { label: 'Cancel', onClick: cancel },
            {
              label: 'Visible tracks only',
              onClick: visible,
              variant: 'outline',
            },
            { label: 'Whole score', onClick: whole },
          ]}
        >
          body
        </FormModal>
      );
      const labels = screen
        .getAllByRole('button')
        .map(b => b.textContent)
        .filter(t => t !== '');
      expect(labels).toEqual(['Cancel', 'Visible tracks only', 'Whole score']);

      await userEvent.click(
        screen.getByRole('button', { name: 'Visible tracks only' })
      );
      expect(visible).toHaveBeenCalledTimes(1);
      expect(cancel).not.toHaveBeenCalled();
      expect(whole).not.toHaveBeenCalled();
    });

    it('omits the bottom bar entirely for an empty actions list', () => {
      render(
        <FormModal open title='Keyboard shortcuts' onClose={noop} actions={[]}>
          body
        </FormModal>
      );
      // Only the top-bar close button remains.
      expect(screen.getAllByRole('button')).toHaveLength(1);
      expect(
        screen.getByRole('button', { name: 'Cancel' })
      ).toBeInTheDocument();
      // Button count alone would pass even if the bar rendered empty, which is
      // the actual defect: a bordered, padded strip with nothing in it.
      const dialog = screen.getByRole('dialog');
      expect(dialog.querySelector('.border-t')).toBeNull();
    });

    it('honours a destructive variant, which the single-CTA form cannot express', () => {
      render(
        <FormModal
          open
          title='Delete track'
          onClose={noop}
          actions={[
            { label: 'Cancel', onClick: noop },
            { label: 'Delete', onClick: noop, variant: 'destructive' },
          ]}
        >
          body
        </FormModal>
      );
      // The design system resolves `destructive` to a red surface; assert on
      // that rather than the variant name, which never reaches the DOM.
      expect(screen.getByRole('button', { name: 'Delete' }).className).toMatch(
        /red|destructive/
      );
    });

    it('disables an action and shows its loading label', () => {
      render(
        <FormModal
          open
          title='T'
          onClose={noop}
          actions={[
            {
              label: 'Import',
              onClick: noop,
              loading: true,
              loadingLabel: 'Importing…',
            },
          ]}
        >
          body
        </FormModal>
      );
      const button = screen.getByRole('button', { name: 'Importing…' });
      expect(button).toBeDisabled();
      expect(
        screen.queryByRole('button', { name: 'Import' })
      ).not.toBeInTheDocument();
    });

    it('takes precedence over onSave', () => {
      render(
        <FormModal
          open
          title='T'
          onClose={noop}
          onSave={noop}
          saveLabel='Save'
          actions={[{ label: 'Replace', onClick: noop }]}
        >
          body
        </FormModal>
      );
      expect(
        screen.queryByRole('button', { name: 'Save' })
      ).not.toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Replace' })
      ).toBeInTheDocument();
    });
  });
});
