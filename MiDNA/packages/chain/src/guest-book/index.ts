import {
  RuntimeModule,
  runtimeMethod,
  runtimeModule,
  state,
} from "@proto-kit/module";
import { StateMap, assert } from "@proto-kit/protocol";
import { PublicKey } from "o1js";
import { CheckIn } from "./check-in";
import { UInt64 } from "@proto-kit/library";

@runtimeModule()
export class GuestBook extends RuntimeModule<Record<string, never>> {
  @state() public checkIns = StateMap.from(PublicKey, CheckIn);

  @runtimeMethod()
  public checkIn(rating: UInt64) {
    assert(rating.lessThanOrEqual(UInt64.from(5)), "Maximum rating can be 5");
    const guest = this.transaction.sender.value;
    const createdAt = UInt64.from(this.network.block.height);
    const checkIn = new CheckIn({
      guest,
      createdAt,
      rating,
    });

    this.checkIns.set(checkIn.guest, checkIn);
  }
}
