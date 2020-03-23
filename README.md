# Svelte Starter with Tailwind

With assistance from these github issues: 

How to configure Tailwind in a svelte project? [link](https://github.com/tailwindcss/discuss/issues/254)

Erroneous errors with tailwind-style @ rules [link](https://github.com/UnwrittenFun/svelte-vscode/issues/47)

*Psst — looking for a shareable component template? Go here --> [sveltejs/component-template](https://github.com/sveltejs/component-template)*

---

This is a starter project template for [Svelte](https://svelte.dev) apps. It comes with [TailwindCSS](https://tailwindcss.com/) already baked in. Tailwind classes can be applied to DOM elements in the template or used in `<style>` tags with `@apply` and preprocessed with [svelte-preprocess-postcss](https://github.com/TehShrike/svelte-preprocess-postcss). 

To learn more about how to use Tailwind, check out the very awesome [Tailwind docs](https://tailwindcss.com/docs/installation/)

## Use Degit

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit babycourageous/svelte-tailwind-starter PROJECT_NAME
```

*Note that you will need to have [Node.js](https://nodejs.org) installed.*

## Get Deps

Install the dependencies...

```bash
cd PROJECT_NAME && yarn
```

...then start [Rollup](https://rollupjs.org):

```bash
yarn dev
```

Navigate to [localhost:5000](http://localhost:5000). 

LiveReload is enabled so when you edit a component file in `src` and save it the browser will reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## Building and running for production

To build an optimised version of the app:

```bash
yarn build
```

You can run the newly built app with `yarn start`. This uses [sirv](https://github.com/lukeed/sirv), which is included in the package.json's `dependencies` so that the app will work when it is deployed to platforms like [Heroku](https://heroku.com).

## Single-page app mode

By default, sirv will only respond to requests that match files in `public`. This is to maximise compatibility with static fileservers, allowing you to deploy your app anywhere.

If you're building a single-page app (SPA) with multiple routes, sirv needs to be able to respond to requests for *any* path. You can make it so by editing the `"start"` command in package.json:

```js
"start": "sirv public --single"
```
