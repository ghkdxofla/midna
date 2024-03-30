
import {
  RuntimeModule,
  runtimeMethod,
  runtimeModule,
  state,
} from "@proto-kit/module";
import { State, assert } from "@proto-kit/protocol";
import { Field } from "o1js";
import { Account, Path } from "./account";

interface AnalysisServiceConfig {
  treeRoot: Field
}

@runtimeModule()
export class AnaylsisService extends RuntimeModule<AnalysisServiceConfig> {
  @state() public treeRoot = State.from<Field>(Field);

  @runtimeMethod()
  async update( account: Account, path: Path, urlPathParameter: Field) {
    let treeRoot = this.treeRoot.get().orElse(Field(0));

    path.calculateRoot(account.hash()).assertEquals(treeRoot);

    let newAccount = account.updateResultUrlPathParameter(urlPathParameter);
    let newTreeRoot = path.calculateRoot(newAccount.hash());

    this.treeRoot.set(newTreeRoot);
  }
}

