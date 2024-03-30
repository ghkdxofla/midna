import { Field, PublicKey, Struct } from "o1js";
import { UInt64 } from "@proto-kit/library";
 
export class CheckInId extends Field {}
export class CheckIn extends Struct({
  guest: PublicKey,
  createdAt: UInt64,
  rating: UInt64,
}) {}