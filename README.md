# Ethseoul 2024 KETH

Repository for ETHSeoul 2024

## Setup

1. Auro Wallet
2. nvm
3. Node.js v18
4. pnpm
5. node_modules

### Auro Wallet

1. [aurowallet.com](https://www.aurowallet.com/)
2. extensions
   - [chrome](https://chromewebstore.google.com/detail/auro-wallet/cnmamaachppnkjgnildpdmkaakejnhae)

### NVM

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

다음을 `~/.bashrc` 혹은 `~/.zshrc`에 추가:

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

### Node.js

```bash
nvm install 18
```

### pnpm

```bash
corepack enable pnpm
```

### download node_modules

```bash
pnpm i
```

## Run

```bash
pnpm run dev
```

- [http://localhost:3000](http://localhost:3000)
- [http://localhost:3000/faucet](http://localhost:3000/faucet)
- [http://localhost:8080/graphql](http://localhost:8080/graphql)
