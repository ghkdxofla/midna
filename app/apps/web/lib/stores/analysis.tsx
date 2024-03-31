import { create } from "zustand";
import { Client, useClientStore } from "./client";
import { immer } from "zustand/middleware/immer";
import { PendingTransaction, UnsignedTransaction } from "@proto-kit/sequencer";
import { Balance, BalancesKey, TokenId, UInt64 } from "@proto-kit/library";
import {
  Poseidon,
  PublicKey,
  MerkleWitness,
  Struct,
  Field,
  MerkleTree,
} from "o1js";
import { useCallback, useEffect } from "react";
import { useChainStore } from "./chain";
import { useWalletStore } from "./wallet";
import { assert } from "console";

class Path extends MerkleWitness(8) {}
class Account extends Struct({
  accountId: PublicKey,
  url: Field,
}) {
  hash(): Field {
    return Poseidon.hash(Account.toFields(this));
  }
}

export interface AnalysisState {
  loading: boolean;
  url: {
    [key: string]: string;
  };
  data: {
    [key: string]: string;
  };
  saveData: (url: string, data: string) => void;
  loadAnalysis: (client: Client, address: string) => Promise<void>;
  analysis: (client: Client, address: string) => Promise<PendingTransaction>;
}

function isPendingTransaction(
  transaction: PendingTransaction | UnsignedTransaction | undefined,
): asserts transaction is PendingTransaction {
  if (!(transaction instanceof PendingTransaction))
    throw new Error("Transaction is not a PendingTransaction");
}

export const useAnalysisStore = create<
  AnalysisState,
  [["zustand/immer", never]]
>(
  immer((set) => ({
    loading: Boolean(false),
    url: {},
    data: {},
    saveData(url: string, data:string) {
      set((state) => {
        state.data[url] = data;
      });
    },
    async loadAnalysis(client: Client, address: string) {
      set((state) => {
        state.loading = true;
      });
      const analysis = client.runtime.resolve("AnalysisService");
      const index = analysis.config.wallets.indexOf(address);
      const treeRoot =
        await client.query.runtime.AnalysisService.treeRoot.get();
      if (!treeRoot) {
        return;
      }
      const witness = analysis.config.tree.getWitness(BigInt(index));
      const path = new Path(witness);
      const account = await analysis.accounts.get(PublicKey.fromBase58(address))
        .value;

      path.calculateRoot(account.hash()).assertEquals(treeRoot);

      analysis.config.tree.setLeaf(BigInt(index), account.hash());

      set((state) => {
        state.loading = false;
        state.url[address] = index.toString();
      });
    },
    async analysis(client: Client, address: string) {
      const analysis = client.runtime.resolve("AnalysisService");
      const sender = PublicKey.fromBase58(address);

      const index = analysis.config.wallets.indexOf(address);
      const witness = analysis.config.tree.getWitness(BigInt(index));
      const path = new Path(witness);
      const account = analysis.config.accounts.get(address);

      if (account === undefined) {
        throw new Error("Account not found");
      }

      const tokenId = TokenId.from(0);
      const tx = await client.transaction(sender, () => {
        analysis.analysis(account, path, UInt64.from(index), tokenId);
      });

      await tx.sign();
      await tx.send();

      isPendingTransaction(tx.transaction);
      return tx.transaction;
    },
  })),
);

export const useObserveAnalysis = () => {
  const client = useClientStore();
  const chain = useChainStore();
  const wallet = useWalletStore();
  const analysis = useAnalysisStore();

  useEffect(() => {
    if (!client.client || !wallet.wallet) return;

    analysis.loadAnalysis(client.client, wallet.wallet);
  }, [client.client, chain.block?.height, wallet.wallet]);
};

export const useAnalysis = () => {
  const client = useClientStore();
  const analysis = useAnalysisStore();
  const wallet = useWalletStore();

  return useCallback(async () => {
    if (!client.client || !wallet.wallet) return;

    const pendingTransaction = await analysis.analysis(
      client.client,
      wallet.wallet,
    );

    wallet.addPendingTransaction(pendingTransaction);
  }, [client.client, wallet.wallet]);
};
