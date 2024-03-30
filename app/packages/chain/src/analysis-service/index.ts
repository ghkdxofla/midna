import {
  RuntimeModule,
  runtimeMethod,
  runtimeModule,
  state,
} from "@proto-kit/module";
import { State, assert } from "@proto-kit/protocol";
import { Field, MerkleTree, MerkleWitness, PublicKey } from "o1js";
import { Account, Path } from "./account";
import { UInt64 } from "@proto-kit/library";
import { Balance, Balances as BaseBalances, TokenId } from "@proto-kit/library";

interface AnalysisServiceConfig {
  tree: MerkleTree;
  wallets: string[];
  accounts: Map<string, Account>;
}

const pk = PublicKey.fromBase58(
  "B62qjQbVR77UBSixAth4rQmNQi1fa2hKkSsVyMdp4Cp25VX2ZedDd5t"
);

@runtimeModule()
export class AnaylsisService extends BaseBalances<AnalysisServiceConfig> {
  @state() public treeRoot = State.from<Field>(Field);

  @runtimeMethod()
  async analysis(
    account: Account,
    path: Path,
    userNo: UInt64,
    amount: UInt64,
    tokenId: TokenId
  ) {
    let treeRoot = this.treeRoot
      .get()
      .orElse(Field(this.config.tree.getRoot()));

    path.calculateRoot(account.hash()).assertEquals(treeRoot);

    const newAccount = account.updateUrl(userNo.value);

    let newTreeRoot = path.calculateRoot(newAccount.hash());

    this.treeRoot.set(newTreeRoot);
    this.transfer(tokenId, account.accountId, pk, amount);
  }
}
