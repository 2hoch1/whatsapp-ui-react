import React from 'react'

/**
 * Recursively extracts all text from a React node tree.
 * Detects the `content` prop used by the <Text> component.
 */
export function extractTextFromNode(node: React.ReactNode): string {
  if (node === null || node === undefined) return ''
  if (typeof node === 'string') return node
  if (typeof node === 'number' || typeof node === 'boolean') return String(node)
  if (Array.isArray(node)) return node.map(extractTextFromNode).join('')
  if (!React.isValidElement(node)) return ''

  const el = node as React.ReactElement<Record<string, unknown>>

  if (typeof el.props['content'] === 'string') return el.props['content']

  return extractTextFromNode(el.props['children'] as React.ReactNode)
}
