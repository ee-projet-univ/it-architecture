# Architecture des sytèmes d'information (TD)

📢 Mise en place de 3 types d'architecture avec un exemple simple en nodejs :

* Service web soap
* API RESTFULL (openapi)
* Serverless (serverless framework)

_Une fonction "hello world" avec un paramètre "name", retourne Hello {{ name }}"_

👉 Pourquoi nodejs ? https://insights.stackoverflow.com/survey/2018#technology

_Objectifs :_ 

- Réaliser les implémentations du service web, de l'API REST et de la fonction serverless avec les instructions communiquées.

- Tester et valider le comportement de chaque.

- Identifier les avantages et les inconvénients (Compréhesion & rapidité du dev, taille du code source, temps de réponse, poid de la réponse...)

## Setup

### Environnement de travail 

#### Mac OSX

##### Installation Homebrew

https://brew.sh/

##### Installation outils

* Nodejs / Mongodb : brew install node mongodb
* Postman : https://learning.getpostman.com/docs/postman/launching_postman/installation_and_updates/#macos-installation
* Vscode : https://code.visualstudio.com/docs/setup/mac
* Robot 3T : https://studio3t.com/download-thank-you/?OS=osx

#### Ubuntu

##### Installation nodejs

```bash
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt install nodejs
```

##### Installation outils

* Mongodb : https://hevodata.com/blog/install-mongodb-on-ubuntu/
* Postman : https://learning.getpostman.com/docs/postman/launching_postman/installation_and_updates/#linux-installation
* Vscode : https://code.visualstudio.com/docs/setup/linux
* Robot 3T : https://studio3t.com/download-thank-you/?OS=x64

#### Windows

##### Installation chocolatey

https://chocolatey.org/docs/installation

##### Installation outils

```shell
choco install postman nodejs.install mongodb.install robo3t.install vscode hyper --confirm;
```

### Github

* https://github.com/join
* Créer un nouveau repository : _it-architecture_
* `git clone`

## Serverless API

Objectif : Créer un handler serverless avec un endpoint `hello-world` 

- Initialiser un projet nodejs : 
  - mkdir serverless-rest-api; cd serverless-rest-api; 
  - Implémenter la handler "helloWorld" : https://github.com/serverless/examples/tree/master/aws-node-simple-http-endpoint
  - npm i -D serverless-offline
  - _package.json_ - scripts `"start"` : `"serverless offline"`

- ⚡️ Test postman :
    ```http
    POST /hello-world HTTP/1.1
    Host: localhost:3000
    { "name": "sample name" }
    ```
- ✨ `git commit / push`