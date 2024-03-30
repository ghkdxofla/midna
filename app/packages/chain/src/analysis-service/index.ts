import {
  RuntimeModule,
  runtimeMethod,
  runtimeModule,
  state,
} from "@proto-kit/module";
import { State, assert } from "@proto-kit/protocol";
import { Field, MerkleTree, MerkleWitness } from "o1js";
import { Account, Path } from "./account";
import { UInt64 } from "@proto-kit/library";

interface AnalysisServiceConfig {
  tree: MerkleTree;
  wallets: string[];
  accounts: Map<string, Account>;
}

@runtimeModule()
export class AnaylsisService extends RuntimeModule<AnalysisServiceConfig> {
  @state() public treeRoot = State.from<Field>(Field);

  @runtimeMethod()
  async analysis(account: Account, path: Path, userNo: UInt64) {
    let treeRoot = this.treeRoot
      .get()
      .orElse(Field(this.config.tree.getRoot()));

    path.calculateRoot(account.hash()).assertEquals(treeRoot);

    const newAccount = account.updateUrl(userNo.value);

    let newTreeRoot = path.calculateRoot(newAccount.hash());

    this.treeRoot.set(newTreeRoot);
  }
}
