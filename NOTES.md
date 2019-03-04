## Installation

```sh
brew tap aws/tap
brew install aws-sam-cli
```

To support sam-local:

```sh
brew cask install docker
open -a Docker
```

## Usage

To build and run a local HTTP server that hosts all of your functions:

```sh
sam build && sam local start-api
```

(Hitting an endpoint for the first time will cause the container image to download, which can take some time.)

To build and package for deployment:

```sh
sam build && sam package --s3-bucket <AppName>-<StageName> --output-template-file packaged.yaml
```

...and deploy:

```sh
# Note, `--parameter-overrides` only necessary when creating stack or when intentionally updating stack parameter.
sam deploy --template-file packaged.yaml --stack-name <AppName-StageName> --capabilities CAPABILITY_IAM --parameter-overrides StageName=<StageName>
```

Delete stack:

```sh
aws cloudformation delete-stack --stack-name <stackname>
```
