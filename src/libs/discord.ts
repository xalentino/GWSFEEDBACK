const ROLE_MAP: Record<string, string> = {
  '1494144464715907133': "owner", // Group Holder
  '1363545887565021364': "admin", // Executive Team
  '1471333401431638038': "developer", // Development Team
  '1356769748611895459': "staff", // Corporate Team
  '1357075397409243266': "staff", // Management Team
  '1356766404103246015': "staff" // staff
};

const PRIORITY_ORDER = ["owner", "admin", "developer", "staff"];

export function resolveRole(discordRoles: string[]): string {
  const matchedRoles = discordRoles
    .map((id) => ROLE_MAP[id])
    .filter(Boolean);

  for (const priorityRole of PRIORITY_ORDER) {
    if (matchedRoles.includes(priorityRole)) return priorityRole;
  }

  return "guest";
}