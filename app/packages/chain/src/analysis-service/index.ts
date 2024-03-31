import {
  runtimeMethod,
  runtimeModule,
  state,
} from "@proto-kit/module";
import { State, StateMap, assert } from "@proto-kit/protocol";
import { Bool, Field, MerkleTree, PublicKey, SmartContract } from "o1js";
import { Account, Path } from "./account";
import { BalancesKey, UInt64 } from "@proto-kit/library";
import { Balance, Balances as BaseBalances, TokenId } from "@proto-kit/library";

interface AnalysisServiceConfig {
  tree: MerkleTree;
  wallets: string[];
  accounts: Map<string, Account>;
}

const AMOUNT = UInt64.from(100);

const pk = PublicKey.fromBase58(
  "B62qrBX5U4BLvaFVtseNJQacuwcNfbDHK93qA2m5ij1UxQYSz9TkANr"
);

@runtimeModule()
export class AnalysisService extends BaseBalances<AnalysisServiceConfig> {
  @state() public treeRoot = State.from<Field>(Field);
  @state() public accounts = StateMap.from<PublicKey, Account>(
    PublicKey,
    Account
  );

  @runtimeMethod()
  public analysis(
    account: Account,
    path: Path,
    userNo: UInt64,
    tokenId: TokenId
  ) {
    let treeRoot = this.treeRoot
      .get()
      .orElse(Field(this.config.tree.getRoot()));

    path.calculateRoot(account.hash()).assertEquals(treeRoot);

    const balance = this.getBalance(tokenId, account.accountId);
    balance.assertGreaterThan(AMOUNT);
    this.transfer(tokenId, account.accountId, pk, AMOUNT);

    const newAccount = account.updateUrl(userNo.value);

    let newTreeRoot = path.calculateRoot(newAccount.hash());

    this.treeRoot.set(newTreeRoot);
    this.accounts.set(account.accountId, newAccount);
  }

  @runtimeMethod()
  public addBalance(
    tokenId: TokenId,
    address: PublicKey,
    amount: Balance
  ): void {
    this.mint(tokenId, address, amount);
  }
}
