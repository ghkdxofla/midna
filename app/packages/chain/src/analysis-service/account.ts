import { Poseidon, Field, MerkleWitness, PublicKey, Struct } from "o1js";

export class Path extends MerkleWitness(8) {}
export class Account extends Struct({
  accountId: PublicKey,
  url: Field,
}) {
  hash(): Field {
    return Poseidon.hash(Account.toFields(this));
  }

  updateUrl(url: Field): Account {
    return new Account({
      accountId: this.accountId,
      url: url,
    });
  }
}
