# Speeky Speech Recognition Service

## Deploy manually to Kubernetes

```
docker build -t brucegroverlee/speeky-service-speech-recognition .
```

```
docker push brucegroverlee/speeky-service-speech-recognition
```

```
cd ./kubernetes
kubectl apply -f deployment.yaml
```
