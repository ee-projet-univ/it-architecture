# Architecture des sytèmes d'information - TD 4

📢 Déploiement de 2 types de web services avec Kubernetes

## Objectifs

- Déployer via Kubernetes, les implémentations du services SOAP et de l'API REST (openapi) créés lors du TD 1 avec les instructions ci-dessous.

- Tester et valider le comportement de chaque.

## Contexte

- Chaque webservice doit être packagé dans un conteneur Docker et déployé au sein d'un cluster Kubernetes
- Le cluster Kubernetes sera créé avec l'aide de [Minikube](https://minikube.sigs.k8s.io/docs/start/). _Minikube est un Kubernetes local, dont l'objectif est de faciliter l'apprentissage et le développement de Kubernetes._

## Setup

### Installation de docker

- https://docs.docker.com/get-docker/

### Installation de minikube

- https://kubernetes.io/docs/tasks/tools/install-minikube/
- Démarrage de minikube avec le driver docker: `minikube start --driver=docker`
- Installation de kubectl: `minikube kubectl`
- Affichage du dashboard : `minikube dashboard`

### Installation de kubectl

## Déploiement du premier service : soap-server

Dans le répertoire `soap-server`

### 1. Construction de l'image docker

Documentation Docker Builder: https://docs.docker.com/engine/reference/builder/

- Créer le fichier Dockerfile permettant de construire le conteneur:

```Dockerfile
# Use nodejs
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port listened by the server
EXPOSE 8000

# Start app
CMD [ "npm", "start" ]
```

#### 2. Génération de l'image docker en version "1.0.0": `soap-server:1.0.0`

```sh
eval $(minikube docker-env)
docker build -t soap-server:1.0.0 .
```

#### 3. Déploiement du service `soap-server`

Documentation: https://minikube.sigs.k8s.io/docs/handbook/deploying/
`kubectl` est la commande permettant de contrôler le cluster Kubernetes

```sh
# Create & expose a new deployment for the soap-server
kubectl create deployment soap-server --image=soap-server:1.0.0
kubectl expose deployment soap-server --type=LoadBalancer --port=8000
```

#### 4. Tester le déploiement du service

- Vérifier l'état de votre déploiement sur le dashboard `minikube dashboard` (Deployments). Le déploiement "soap-server" doit être actif avec un `pod` (instance)
- Récupérer l'url de votre service: `minikube service soap-server --url`
- Tester votre service soap avec postman (http://xxx.xxx.xxx.xxx:xxxxx/wsdl?wsdl)

## Déploiement du deuxième service : rest-api-server

Dans le répertoire `rest-api-server/nodejs-server-generated`

### 1. Construction de l'image docker

- Créer le fichier Dockerfile permettant de construire le conteneur ⚠ le port d'écoute du serveur est différent

#### 2. Génération de l'image docker en version "1.0.0": `rest-api-server:1.0.0`

#### 3. Déploiement du service `rest-api-server`

#### 4. Tester le déploiement du service

## Déploiement d'une nouvelle version du service `rest-api-server`

La nouvelle version a pour but d'afficher le nom de domaine courant lors de l'appel de la fonction `HelloWorld`

Dans le répertoire `rest-api-server/nodejs-server-generated`

### Modifier le service "rest-api-server/nodejs-server-generated/controllers/helloworldControllerService.js"

```js
res.send({
  result: "Hello " + req.data.value.name,
  HOSTNAME: process.env.HOSTNAME,
});
```

#### 2. Génération de l'image docker en version "2.0.0": `rest-api-server:2.0.0`

#### 3. Déploiement du service `rest-api-server`

`kubectl set image deployment/rest-api-server rest-api-server=rest-api-server:2.0.0`

#### 4. Tester le déploiement du service

- Vérifier l'état de votre déploiement sur le dashboard `minikube dashboard` (Deployments).
- Tester votre service avec postman, la fonction Hello World doit retourner la réponse :

```json
{
  "result": "Hello xxx",
  "HOSTNAME": "rest-api-server-xxxxxxxxxx-xxxxx"
}
```

#### 5. Scaler le service "rest-api-server" via le dashboard minikube (2 pods)

- Sur le dashboard `minikube dashboard` (Deployments), utiliser le menu contextuel du déploiement rest-api-server: Mettre à l'échelle, répliques désirées: 2
- Sur le dashboard `minikube dashboard` (Deployments). Le déploiement "rest-api-server" doit être actif avec deux `pod` (instance)

### 6. Simulation de panne: supprimer le pod original.

- Sur le dashboard `minikube dashboard` (Pods), utiliser le menu contextuel du déploiement rest-api-server le plus ancien
- Test avec postman : vérifier le HOSTNAME

### 7. Vérifier que le pod se relance.

- Sur le dashboard `minikube dashboard` (Deployments). Le déploiement "rest-api-server" doit être actif avec deux `pod` (instance)
- Test avec postman : vérifier le HOSTNAME

#### 8. Arrêt

```sh
kubectl delete services soap-server
kubectl delete deployment soap-server
kubectl delete services rest-api-server
kubectl delete deployment rest-api-server
minikube stop
minikube delete
```
