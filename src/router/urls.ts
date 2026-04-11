/**
 * Maps pathname → permission key for layout guard. Add entries when you add routes.
 */
const urls = {
  dashboard: { url: '/', permissionName: 'dashboard' },
} as const

export const urlPermissionObject = Object.entries(urls).reduce(
  (acc, [, value]) => {
    acc[value.url] = value.permissionName
    return acc
  },
  {} as Record<string, string>,
)

export default urls
