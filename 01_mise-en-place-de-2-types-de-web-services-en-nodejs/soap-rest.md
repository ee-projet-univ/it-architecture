# Architecture des sytèmes d'information (TD 1)

📢 Mise en place de 2 types de web services avec un exemple simple en nodejs :

- Service web soap
- API RESTFULL (openapi)

## Objectifs

- Réaliser les implémentations du services SOAP et de l'API REST (openapi) avec les instructions ci-dessous.

- Tester et valider le comportement de chaque.

- Identifier les avantages et les inconvénients (Compréhesion & rapidité du dev, taille du code source, temps de réponse, poid de la réponse...)

## Contexte

Chaque webservice à créer est une fonction "hello world" qui attend un paramètre `name` et retourne le message `Hello {{ name }}`\_

👉 Pourquoi nodejs ? https://insights.stackoverflow.com/survey/2020#technology-other-frameworks-libraries-and-tools

## Setup

### Environnement de travail

Outils obligatoires : Git, NodeJS (LTS), Exécuteur de requêtes SOAP / REST (Postman par exemple), un IDE (vscode par exemple)

#### Mac OSX

##### Installation Homebrew

https://brew.sh/

##### Installation outils

- Git: brew install git
- Nodejs : brew install node
- Postman : https://learning.getpostman.com/docs/postman/launching_postman/installation_and_updates/#macos-installation
- Vscode : https://code.visualstudio.com/docs/setup/mac

#### Ubuntu

##### Installation nodejs

```bash
sudo apt install git-all curl
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt install nodejs
```

##### Installation outils

- Postman : https://learning.getpostman.com/docs/postman/launching_postman/installation_and_updates/#linux-installation
- Vscode : https://code.visualstudio.com/docs/setup/linux

#### Windows

##### Installation chocolatey

https://chocolatey.org/docs/installation

##### Installation outils

```shell
choco install git nodejs.install postman vscode --confirm;
```

### Github

- https://github.com/join
- Créer un nouveau repository (pour versionner votre travail): _it-architecture_
- `git clone`

## Service Web SOAP

- Initialiser un projet nodejs :

  - Setup: `mkdir soap-server; cd soap-server; npm init --yes;`
  - Installation des dépendences: `npm i soap; npm i -D nodemon;`. Documentation de la librarie Soap: https://github.com/vpulim/node-soap
  - Modifier le fichier _package.json_ - ajouter la commande de démarrage du serveur `"start": "nodemon index.js"` dans la section `scripts`
  - Créer un fichier `index.js`

- Implementer le serveur SOAP et la fonction `HelloWorld` en se basant sur la documentation: adapter l'exemple pour exposer la fonction `HelloWorld` https://github.com/vpulim/node-soap#soaplistenserver-path-services-wsdl-callback---create-a-new-soap-server-that-listens-on-path-and-provides-services (Create a new SOAP server that listens on path and provides services)

- Préferer l'exemple `http server example`: remplacer `var server = http.createServer` par `var server = require("http").createServer`
- Ne pas oublier de charger la librairie Soap: `var soap = require('soap');`
- Créer le fichier `myservice.wsdl`: (Documentation: https://www.w3.org/TR/wsdl.html#_wsdl)

```xml
<definitions
  xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
  xmlns:xsd="http://www.w3.org/2001/XMLSchema"
  xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/"
  xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/"
  xmlns="http://schemas.xmlsoap.org/wsdl/" name="Soap web service for IT architecture">
  <!--  definition of datatypes  -->
  <types>
    <schema
      xmlns="http://www.w3.org/2000/10/XMLSchema" >
      <element name="name">
        <complexType>
          <all>
            <element name="value" type="string"/>
          </all>
        </complexType>
      </element>
      <element name="result">
        <complexType>
          <all>
            <element name="value" type="string"/>
          </all>
        </complexType>
      </element>
    </schema>
  </types>
  <!--  response messages  -->
  <message name="returns_result">
    <part name="result" type="xsd:result"/>
  </message>
  <!--  request messages  -->
  <message name="HelloWorld">
    <part name="name" type="xsd:name"/>
  </message>
  <!--  server's services  -->
  <portType name="SOAP web service">
    <operation name="HelloWorld">
      <input message="tns:HelloWorld"/>
      <output message="tns:returns_result"/>
    </operation>
  </portType>
  <!--  server encoding  -->
  <binding name="SOAP web service_webservices" type="tns:SOAP web service">
    <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="HelloWorld">
      <soap:operation soapAction="urn:xmethods-delayed-quotes#HelloWorld"/>
      <input>
        <soap:body use="encoded" namespace="urn:xmethods-delayed-quotes" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
      </input>
      <output>
        <soap:body use="encoded" namespace="urn:xmethods-delayed-quotes" encodingStyle="http://schemas.xmlsoap.org/soap/encoding/"/>
      </output>
    </operation>
  </binding>
  <!--  access to service provider  -->
  <service name="MyService">
    <port name="MyPort" binding="SOAP web service_webservices">
      <soap:address location="http://localhost:8000/wsdl"/>
    </port>
  </service>
</definitions>
```

- Démarrer le server SOAP: `npm start`

- Vérifier que le wsdl est accessible : http://localhost:8000/wsdl?wsdl
- Tester le web service: avec postman (http://blog.getpostman.com/2014/08/22/making-soap-requests-using-postman/) :
  ```http
  POST /wsdl?wsdl HTTP/1.1
  Host: localhost:8000
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:pm="http://www.getpostman.com/">
  <soapenv:Header></soapenv:Header>
  <soapenv:Body>
  <hs:HelloWorld>
  <hs:name>sample name</hs:name>
  </hs:HelloWorld>
  </soapenv:Body>
  </soapenv:Envelope>
  ```
- Versionner les modifications (`git add / commit / push`)

## REST API

- Initialiser un projet nodejs :

  - Setup: `mkdir rest-api-server; cd rest-api-server; npm init --yes;`
  - Installation des dépendences: `npm i -D oas-generator;`

- Générer la specification Open API pour la fonction `HelloWorld` accessible via `/hello-world`.

  - Utiliser l'éditeur https://editor.swagger.io. Documentation : https://swagger.io/docs/specification/basic-structure/
  - Copier la specification Open API dans le fichier `swagger.yaml`
  - Générer l'api : `npx oas-generator swagger.yaml`

- Le service web rest a été généré dans les répertoire `nodejs-server-generated`
- `cd nodejs-server-generated;`
- Installation des dépendences: `npm i -D nodemon;`
- Modifier le fichier `nodejs-server-generated/package.json` - Remplacer la commande de démarrage du serveur `"start": "nodemon index.js"` dans la section `scripts`

- Implémenter la fonction "helloWorld" du service

- Démarrer le server REST: `npm start`
- Vérifier que la documentation api est accessible : http://localhost:8080/docs

- Tester le web service: avec postman :
  ```http
  POST /hello-world HTTP/1.1
  Host: localhost:8080
  Content-Type: application/json
  { "name": "sample name" }
  ```
- Versionner les modifications (`git add / commit / push`)

## Analyse

Identifier les avantages et les inconvénients des deux types de services web.
(Compréhesion & rapidité du dev, taille du code source, temps de réponse, poid de la réponse, disponibilité des documentations, tendence d'utilisation...)
