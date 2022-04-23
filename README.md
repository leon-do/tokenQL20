# TokenQL20

```bash
sudo apt update
sudo apt upgrade

sudo apt install docker-compose
sudo apt install jq

curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt-get install -y nodejs
npm install -g @graphprotocol/graph-cli@0.26.0

git clone https://github.com/graphprotocol/graph-node/
cd graph-node/docker
vi docker-compose.yml
# edit ethereum: 'mainnet:YOUR_RPC'
./setup.sh
docker-compose up -d

cd ~
git clone https://github.com/leon-do/tokenQL20.git
cd tokenQL
npm install
vi subgraph.yaml
npm run codegen
npm run build
npm run create-local
npm run deploy-local

:8030/graphql/playground
:8000/subgraphs/name/generated/sample/graphql
```

## Playground Query

```graphql
{
  indexingStatuses {
    synced
    chains {
      chainHeadBlock {
        number
      }
      latestBlock {
        number
      }
    }
  }
}
```
