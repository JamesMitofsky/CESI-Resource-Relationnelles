# Cesi Resource Relationnelles

## Dockerize
[Tutorial for dockerizing](https://medium.com/@ganiilhamirsyadi/dockerize-react-native-expo-app-152c1e65e76c)

## Running the app

### Prebuild

```bash
npx expo prebuild  
```

```bash
npx expo prebuild  
```

### EAS deployment

* [Deployment patterns: two command flow (simplest)](https://docs.expo.dev/eas-update/deployment-patterns/#two-command-flow)

# Debugging

## M1 Mac — error running pod install  (relating to prebuild)

### Possible solutions

1. [Using homebrew instead of gem](https://stackoverflow.com/a/70431334/5395435)
2. [Installing a specific version of ruby](https://github.com/expo/expo/issues/20707#issuecomment-1374639875)
3. [Use chruby](https://github.com/expo/expo/issues/20707#issuecomment-1375901074)
4. [Reset all cocoapods & set ruby version](https://github.com/infinitered/ignite/issues/2620#issuecomment-1920013669)
5. [Add resolutions object to the `package.json`](https://github.com/expo/eas-cli/issues/1251#issue-1330596633)

### Current debugging

After doing step 4 of the solutions, I tried step 5.