import { Balance } from "@proto-kit/library";
import { Balances } from "./balances";
import { ModulesConfig } from "@proto-kit/common";
import { GuestBook } from "./guest-book";
import { AnaylsisService } from "./analysis-service"
import { MerkleTree, MerkleWitness} from "o1js"

export const modules = {
  Balances,
  GuestBook,
  AnaylsisService,
};

const tree = new MerkleTree(8);
const treeRoot = tree.getRoot();
const circuitWitness = tree.getWitness(0n);

export const config: ModulesConfig<typeof modules> = {
  Balances: {
    totalSupply: Balance.from(10_000),
  },
  GuestBook: {},
  AnaylsisService: {
    treeRoot: treeRoot,
  },
};

export default {
  modules,
  config,
};
