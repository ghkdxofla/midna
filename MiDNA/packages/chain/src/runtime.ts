import { Balance } from "@proto-kit/library";
import { Balances } from "./balances";
import { ModulesConfig } from "@proto-kit/common";
import { GuestBook } from "./guest-book";

export const modules = {
  Balances,
  GuestBook,
};

export const config: ModulesConfig<typeof modules> = {
  Balances: {
    totalSupply: Balance.from(10_000),
  },
  GuestBook: {},
};

export default {
  modules,
  config,
};
