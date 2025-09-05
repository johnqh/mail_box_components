import { describe, it, expect } from 'vitest'
import { cn } from '../utils'

describe('cn utility function', () => {
  it('should merge class names correctly', () => {
    const result = cn('px-2 py-1', 'bg-red-500')
    expect(result).toBe('px-2 py-1 bg-red-500')
  })

  it('should handle conditional classes', () => {
    const result = cn('px-2', true && 'py-1', false && 'hidden')
    expect(result).toBe('px-2 py-1')
  })

  it('should handle array inputs', () => {
    const result = cn(['px-2', 'py-1'], ['bg-red-500'])
    expect(result).toBe('px-2 py-1 bg-red-500')
  })

  it('should handle object inputs', () => {
    const result = cn({
      'px-2': true,
      'py-1': true,
      'hidden': false
    })
    expect(result).toBe('px-2 py-1')
  })

  it('should merge tailwind classes with conflicts', () => {
    const result = cn('px-2 px-4', 'py-1 py-2')
    expect(result).toBe('px-4 py-2')
  })

  it('should handle undefined and null inputs', () => {
    const result = cn('px-2', undefined, null, 'py-1')
    expect(result).toBe('px-2 py-1')
  })

  it('should handle empty inputs', () => {
    const result = cn('')
    expect(result).toBe('')
  })

  it('should handle multiple class conflicts', () => {
    const result = cn('text-sm text-lg text-xl', 'font-normal font-bold')
    expect(result).toBe('text-xl font-bold')
  })

  it('should handle responsive class merging', () => {
    const result = cn('w-full md:w-1/2', 'md:w-1/3 lg:w-1/4')
    expect(result).toBe('w-full md:w-1/3 lg:w-1/4')
  })

  it('should handle variant merging', () => {
    const result = cn('bg-blue-500 hover:bg-blue-600', 'bg-red-500 hover:bg-red-600')
    expect(result).toBe('bg-red-500 hover:bg-red-600')
  })

  it('should preserve non-conflicting classes', () => {
    const result = cn('flex items-center', 'justify-between gap-2')
    expect(result).toBe('flex items-center justify-between gap-2')
  })

  it('should handle deeply nested arrays', () => {
    const result = cn([['px-2', 'py-1'], [['bg-red-500']]])
    expect(result).toBe('px-2 py-1 bg-red-500')
  })

  it('should handle mixed input types', () => {
    const result = cn(
      'base-class',
      ['array-class'],
      { 'object-class': true },
      undefined,
      null,
      false,
      true && 'conditional-class'
    )
    expect(result).toBe('base-class array-class object-class conditional-class')
  })

  it('should handle complex tailwind modifiers', () => {
    const result = cn(
      'sm:px-2 md:px-4 lg:px-6',
      'hover:bg-blue-500 focus:bg-blue-600',
      'dark:bg-gray-800 dark:hover:bg-gray-700'
    )
    expect(result).toContain('sm:px-2')
    expect(result).toContain('md:px-4')
    expect(result).toContain('lg:px-6')
    expect(result).toContain('hover:bg-blue-500')
    expect(result).toContain('dark:bg-gray-800')
  })

  it('should handle arbitrary value classes', () => {
    const result = cn('w-[100px]', 'h-[200px]', 'top-[10%]')
    expect(result).toBe('w-[100px] h-[200px] top-[10%]')
  })

  it('should handle important modifiers', () => {
    const result = cn('!text-red-500', '!bg-blue-500')
    expect(result).toBe('!text-red-500 !bg-blue-500')
  })

  it('should handle group and peer modifiers', () => {
    const result = cn(
      'group-hover:text-blue-500',
      'peer-focus:border-blue-500',
      'group-focus/item:bg-gray-100'
    )
    expect(result).toContain('group-hover:text-blue-500')
    expect(result).toContain('peer-focus:border-blue-500')
    expect(result).toContain('group-focus/item:bg-gray-100')
  })

  it('should handle animation classes', () => {
    const result = cn('animate-spin', 'animate-bounce')
    expect(result).toBe('animate-bounce')
  })

  it('should handle transition classes correctly', () => {
    const result = cn(
      'transition-all duration-300',
      'transition-colors duration-150'
    )
    expect(result).toBe('transition-colors duration-150')
  })

  it('should handle CSS variable classes', () => {
    const result = cn('[--my-var:100px]', '[--my-color:#ff0000]')
    expect(result).toBe('[--my-var:100px] [--my-color:#ff0000]')
  })

  it('should handle data attribute selectors', () => {
    const result = cn(
      'data-[state=open]:bg-blue-500',
      'data-[disabled]:opacity-50'
    )
    expect(result).toContain('data-[state=open]:bg-blue-500')
    expect(result).toContain('data-[disabled]:opacity-50')
  })

  it('should handle aria attribute selectors', () => {
    const result = cn(
      'aria-expanded:rotate-180',
      'aria-selected:bg-blue-100'
    )
    expect(result).toContain('aria-expanded:rotate-180')
    expect(result).toContain('aria-selected:bg-blue-100')
  })

  it('should handle number as input', () => {
    const result = cn('px-2', 0, 1, 'py-2')
    expect(result).toBe('px-2 1 py-2')
  })

  it('should handle very long class strings', () => {
    const longClass = Array(100).fill('class').join(' ')
    const result = cn(longClass, 'final-class')
    expect(result).toContain('final-class')
  })

  it('should be case sensitive', () => {
    const result = cn('Text-Red-500', 'text-red-500')
    expect(result).toContain('Text-Red-500')
    expect(result).toContain('text-red-500')
  })

  it('should handle whitespace correctly', () => {
    const result = cn('  px-2  ', '  py-2  ', '  bg-blue-500  ')
    expect(result).toBe('px-2 py-2 bg-blue-500')
  })

  it('should handle custom utility classes', () => {
    const result = cn('custom-utility', 'another-custom-class')
    expect(result).toBe('custom-utility another-custom-class')
  })

  it('should work with no arguments', () => {
    const result = cn()
    expect(result).toBe('')
  })

  it('should handle Symbol type gracefully', () => {
    const sym = Symbol('test')
    const result = cn('px-2', sym as any, 'py-2')
    expect(result).toBe('px-2 py-2')
  })
})