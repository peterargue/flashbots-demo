# Setup Environment
### Install Node/NPM
Visit: https://nodejs.org/en/download/
Download the version for your system

Update NPM
```
sudo npm install -g npm
```

### Setup `searcher-sponsored-tx`
Clone the repo
```
cd ~/dev
git clone https://github.com/peterargue/searcher-sponsored-tx.git
```

Checkout the `demo` branch and install the dependencies
```
cd searcher-sponsored-tx
git checkout demo
npm install
```

Create a `.env` file you will use later
```
cp example.env .env
```