enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}
const urlAccessBlacklist: Record<UserRole, string[]> = {
  [UserRole.USER]: ["/admin"],
  [UserRole.ADMIN]: ["/user"],
};

export default urlAccessBlacklist;
