const ROLE_MAP: Record<string, string> = {
  '1494144464715907133': "owner", // Group Holder
  '1363545887565021364': "admin", // Executive Team
  '1471333401431638038': "developer", // Development Team
  '1356769748611895459': "staff", // Corporate Team
  '1357075397409243266': "staff", // Management Team
  '1356766404103246015': "staff" // staff
};

export function resolveRole(discordRoles: string[]): string {
  for (const roleId of discordRoles) {
    if (ROLE_MAP[roleId]) return ROLE_MAP[roleId];
  }
  return "guest";
}