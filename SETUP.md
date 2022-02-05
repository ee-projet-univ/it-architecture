# Architecture des sytèmes d'information - SETUP

## Environnement de travail

Outils obligatoires : Git, NodeJS (LTS), Exécuteur de requêtes SOAP / REST (Postman par exemple), un IDE (vscode par exemple)

### Mac OSX

#### Installation Homebrew

https://brew.sh/

#### Installation outils

- Git: brew install git
- Nodejs : brew install node (Si problème installer depuis https://nodejs.org)
- Postman : brew install --cask postman
- Vscode : https://code.visualstudio.com/docs/setup/mac
- Mongodb : brew install mongodb
- Robot 3T : brew install --cask robo-3t

### Ubuntu

#### Installation nodejs

```bash
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_14.x | sudo bash -
sudo apt install nodejs
```

#### Installation outils

- Git : sudo apt install git-all
- Postman : sudo snap install postman
- Vscode : sudo snap install code
- Mongodb : https://hevodata.com/blog/install-mongodb-on-ubuntu/
- Robot 3T : sudo snap install robo3t-snap

### Windows

#### Installation chocolatey

https://chocolatey.org/docs/installation

#### Installation outils

- Git: choco install git --confirm
- Nodejs : choco install node --confirm
- Postman : choco install postman --confirm
- Vscode : choco install vscode --confirm
- Mongod : choco install mongodb.install --confirm
- Robot 3T : choco install robo3t.install --confirm

## Github

- https://github.com/join
- Créer un nouveau repository (pour versionner votre travail): _it-architecture_
- `git clone`
- Dans le répertoire cloné, créer un fichier `.gitignore`:

```
node_modules
```
