import GettingStarted from "./getting_started";
import Authentication from "./authentication";
import PaginationAndLimits from "./pagination_limits";
import RolesPermissions from "./roles_permissions";
// Core Resources
import Pets from "./pet";
import Store from "./store";
import User from "./user";


const APIDoc: SectionItem[] = [
  GettingStarted,
  Authentication,
  PaginationAndLimits,
  RolesPermissions,
  Pets,
  Store,
  User
];

export default APIDoc;
