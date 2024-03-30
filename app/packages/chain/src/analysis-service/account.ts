import { Poseidon, Field, MerkleWitness, PublicKey, Struct } from "o1js";
import { UInt64 } from "@proto-kit/library";

export class Path extends MerkleWitness(8) {}
export class Account extends Struct({
  accountId: PublicKey,
  createdAt: UInt64,
  resultUrlPathParameter: Field,
}) {
  hash(): Field {
    return Poseidon.hash(Account.toFields(this));
  }

  updateResultUrlPathParameter(newResultUrlPathParameter: Field): Account {
    return new Account({
      accountId: this.accountId,
      createdAt: this.createdAt,
      resultUrlPathParameter: newResultUrlPathParameter,
    });
  }
}