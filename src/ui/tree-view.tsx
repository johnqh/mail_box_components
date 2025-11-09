import React, { useState } from 'react';
import { cn } from '../lib/utils';

export interface TreeNode {
  /** Node ID */
  id: string;
  /** Node label */
  label: React.ReactNode;
  /** Node icon */
  icon?: React.ReactNode;
  /** Child nodes */
  children?: TreeNode[];
  /** Disabled state */
  disabled?: boolean;
}

export interface TreeViewProps {
  /** Tree data */
  data: TreeNode[];
  /** Selected node ID */
  selectedId?: string;
  /** Selection handler */
  onSelect?: (node: TreeNode) => void;
  /** Expanded node IDs */
  expandedIds?: string[];
  /** Expand handler */
  onExpand?: (nodeId: string) => void;
  /** Default expanded */
  defaultExpanded?: boolean;
  /** Show lines */
  showLines?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * TreeView Component
 *
 * Hierarchical tree view with expand/collapse.
 * Supports selection, custom icons, and indentation lines.
 *
 * @example
 * ```tsx
 * <TreeView
 *   data={fileTree}
 *   selectedId={selectedNode}
 *   onSelect={handleSelect}
 *   showLines
 * />
 * ```
 *
 * @example
 * ```tsx
 * <TreeView
 *   data={folderStructure}
 *   expandedIds={expandedNodes}
 *   onExpand={handleExpand}
 *   defaultExpanded
 * />
 * ```
 */
export const TreeView: React.FC<TreeViewProps> = ({
  data,
  selectedId,
  onSelect,
  expandedIds: controlledExpandedIds,
  onExpand,
  defaultExpanded = false,
  showLines = false,
  className,
}) => {
  const [internalExpandedIds, setInternalExpandedIds] = useState<Set<string>>(
    new Set(defaultExpanded ? data.map((node) => node.id) : [])
  );

  const expandedIds =
    controlledExpandedIds !== undefined
      ? new Set(controlledExpandedIds)
      : internalExpandedIds;

  const toggleExpand = (nodeId: string) => {
    if (controlledExpandedIds !== undefined && onExpand) {
      onExpand(nodeId);
    } else {
      setInternalExpandedIds((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(nodeId)) {
          newSet.delete(nodeId);
        } else {
          newSet.add(nodeId);
        }
        return newSet;
      });
    }
  };

  const handleSelect = (node: TreeNode) => {
    if (!node.disabled && onSelect) {
      onSelect(node);
    }
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedIds.has(node.id);
    const isSelected = selectedId === node.id;

    return (
      <div key={node.id}>
        {/* Node item */}
        <div
          className={cn(
            'flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors',
            !node.disabled && 'hover:bg-gray-100 dark:hover:bg-gray-800',
            isSelected && 'bg-blue-50 dark:bg-blue-900/30',
            node.disabled && 'opacity-50 cursor-not-allowed',
            !node.disabled && 'cursor-pointer'
          )}
          style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
          onClick={() => handleSelect(node)}
        >
          {/* Expand/collapse button */}
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(node.id);
              }}
              className="flex-shrink-0 w-4 h-4 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
            >
              <svg
                className={cn(
                  'w-3 h-3 transition-transform',
                  isExpanded && 'rotate-90'
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          ) : (
            <div className="w-4 h-4 flex-shrink-0" />
          )}

          {/* Icon */}
          {node.icon && (
            <span className="flex-shrink-0 w-4 h-4 text-gray-600 dark:text-gray-400">
              {node.icon}
            </span>
          )}

          {/* Label */}
          <span
            className={cn(
              'flex-1 text-sm',
              isSelected
                ? 'text-blue-700 dark:text-blue-300 font-medium'
                : 'text-gray-900 dark:text-white'
            )}
          >
            {node.label}
          </span>
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className={cn(showLines && 'border-l-2 border-gray-200 dark:border-gray-700 ml-2')}>
            {node.children!.map((child) =>
              renderNode(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn('w-full', className)}>
      {data.map((node) => renderNode(node, 0))}
    </div>
  );
};

export default TreeView;
