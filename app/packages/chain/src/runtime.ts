import { Balance } from "@proto-kit/library";
import { Balances } from "./balances";
import { ModulesConfig } from "@proto-kit/common";
import { GuestBook } from "./guest-book";
import { AnalysisService } from "./analysis-service";
import { Account } from "./analysis-service/account";
import { MerkleTree, MerkleWitness, Field, PublicKey } from "o1js";

export const modules = {
  Balances,
  GuestBook,
  AnalysisService,
};

const wallets = [
  "B62qrBX5U4BLvaFVtseNJQacuwcNfbDHK93qA2m5ij1UxQYSz9TkANr",
  "B62qjQbVR77UBSixAth4rQmNQi1fa2hKkSsVyMdp4Cp25VX2ZedDd5t",
  "B62qmYvVHqdGTMWUpWgkaFpUQWxtVf4hrbGr37CJEqt4yYdL6WGSHfS",
];

let accounts: Map<string, Account> = new Map<string, Account>(
  wallets.map((address: string, index: number) => {
    return [
      address,
      new Account({
        accountId: PublicKey.fromBase58(address),
        url: Field(""),
      }),
    ];
  })
);

const tree = new MerkleTree(8);
tree.setLeaf(0n, accounts.get(wallets[0])!.hash());
tree.setLeaf(1n, accounts.get(wallets[1])!.hash());
tree.setLeaf(2n, accounts.get(wallets[2])!.hash());

export const config: ModulesConfig<typeof modules> = {
  Balances: {
    totalSupply: Balance.from(10_000),
  },
  GuestBook: {},
  AnalysisService: {
    tree: tree,
    wallets: wallets,
    accounts: accounts,
  },
};

export default {
  modules,
  config,
};
