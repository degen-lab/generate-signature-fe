# How to start the frontend for signature generation

1. Set up the url for the backend.
The default url is linking to the DegenLab signature generation backend. To change it to your own backend, update the post request in the [SigForm.tsx file](https://github.com/degen-lab/generate-signature-fe/blob/58bc8428d733582f0c30685d709c044a5b458d78/src/app/components/signature/signature-form/SigForm.tsx#L101). For a local backend the request will be `http://localhost:8080/get-signature`.

2. Install dependencies

```
npm i
```

3. Build the frontend

```
npm run build
```

4. Run the frontend

```
npm run start
```
