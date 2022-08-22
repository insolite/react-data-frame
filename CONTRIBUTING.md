# Contributing

## Set up development environment

Install dependencies:

```bash
yarn
```

## Start dev server

Start package build in watch mode and Storybook dev server:

```bash
yarn start
```

## Publish package

### Using CI (preferred)

```bash
bumpversion patch # minor|major|patch
git push origin master --tags
```

### From local machine

Build package and publish to NPM:

```bash
yarn package:publish
```
