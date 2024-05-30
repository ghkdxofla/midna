# MiDNA
Repository for MiDNA (ETHSeoul 2024 Project)   
See: https://devfolio.co/projects/midna-4a2f

## Description
MiDNA (Mina for DNA Analysis) is a service that utilizes Mina and ZKApp.   
DNA sequence data are analyzed by the service in an offline. Only the user who made the payment with Mina can see the results.
<img width="1427" alt="image" src="https://github.com/ghkdxofla/ethseoul-2024-keth/assets/26355065/ccf06294-7cee-4860-9541-c32c62403f8e">
<img width="1512" alt="image" src="https://github.com/ghkdxofla/ethseoul-2024-keth/assets/26355065/c3074ce5-48a9-4cd1-909c-61b3ad618819">

## Architecture
![image](https://github.com/ghkdxofla/midna/assets/26355065/e44e9c40-fa72-4af5-9144-19b91be149e4)


## Setup

1. Auro Wallet
2. nvm
3. Node.js v18
4. pnpm
5. node_modules
6. pipenv

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

### pipenv

```bash
pipenv sync -d
pipenv shell

cd server
python main.py
```

```bash

## Run

```bash
pnpm run dev
```

- [http://localhost:3000](http://localhost:3000)
- [http://localhost:3000/faucet](http://localhost:3000/faucet)
- [http://localhost:8080/graphql](http://localhost:8080/graphql)
