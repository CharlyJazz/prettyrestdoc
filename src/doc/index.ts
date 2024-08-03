import GettingStarted from "./getting_started";
import Authentication from "./authentication";
import PaginationAndLimits from "./pagination_limits";
import RolesPermissions from "./roles_permissions";
// Core Resources
import ShiftCosts from "./shift_costs";
import Budgets from "./budgets";
import Contracts from "./contracts";
import Demands from "./demands";
import Entitlements from "./entitlements";
import LieuTime from "./lieu_time";
import Scans from "./scans";
import ShiftOffers from "./shift_offers";
import Staff from "./staff";
import TimeOff from "./time_off";

const APIDoc: SectionItem[] = [
  GettingStarted,
  Authentication,
  PaginationAndLimits,
  RolesPermissions,
  ShiftCosts,
  Budgets,
  Contracts,
  Demands,
  Entitlements,
  LieuTime,
  Scans,
  ShiftOffers,
  Staff,
  TimeOff,
];

export default APIDoc;
