# xstate-nextjs-workspaces-template

Yarn Workspaces + XState + Next.js = ❤️

## What is this?

This template provides a basic `yarn` workspaces monorepo for publishing an npm
package of [XState](https://xstate.js.org/) machines and a
[Next.js](https://nextjs.org/) site that allows for easily inspecting the
machines. It uses [`preconstruct`](https://preconstruct.tools/) to make local
development a breeze.

Develop some machines using the inspector site to help visualize them, publish
the `machines` package, then publish the Next.js site. BAM! You've got yourself
a package of XState machines and a site where users can play with them!

Check out a live version of the inspector site here:
https://xstate-nextjs-workspaces-template.vercel.app/

## How does it work?

### Local development and build

The setup is powered primarily by [`preconstruct`](https://preconstruct.tools/).

`preconstruct` is configured to run the `preconstruct dev` script during
`postinstall`, which allows you to do local development in separate packages
that depend on each other without needing to re-build the package each time you
make a change.

It also handles building for us (at least for the packages it's configured to
build, which is `machines` by default), so we don't really have to do much of
anything.

### Inspector site

The `inspector` package is a Next.js site with a fairly barebones setup. It's
mostly intended to demonstrate a working pattern for rendering an inspector for
each machine while rendering them at separate routes.

There are a few rules:

1. You have to render the component that you call `useMachine` in INSIDE
   `MachineContainer`. If `useMachine` is called before `MachineContainer`
   renders and calls `inspect`, the inspector won't work.
2. Don't call `useMachine` in the body of the component that renders
   `MachineContainer`. That is a violation of #1. Just want to make that clear.
3. If you want to make changes to machines in the `machines` package and have
   those changes show up, you'll have to disable Fast Refresh by exporting a
   non-React export, e.g. `export const __preventFastRefresh = true`. There are
   probably better ways around this that don't involve disabling Fast Refresh,
   but I haven't figured them out yet.
4. Make sure to enable the `devTools` option when using the `@xstate/react`
   hooks e.g. `useMachine(someMachine, {devTools: true})`.

So basically, if you're following the rules, the page for your machine will look
like this:

```jsx
import {useMachine} from '@xstate/react'
import {someMachine} from 'machines'
import {MachineContainer} from '../../components/MachineContainer'

export default function MachinePage() {
  return (
    <MachineContainer>
      <RenderMachine />
    </MachineContainer>
  )
}

function RenderMachine() {
  useMachine(someMachine, {devTools: true})
  return null
}

export const __preventFastRefresh = true
```

### Versioning and publishing

Eventually I'd like to add
[`changesets`](https://github.com/atlassian/changesets) to make it easy to
version and publish and generate changelogs for the `machines` package (and any
others you might add), but for now I'm out of time and motivation. PRs welcome
though!

## TODO

- Add `changesets`
- Add [`@chakra-ui/react`](https://github.com/chakra-ui/chakra-ui) (Why? Because
  I'm a Chakra UI maintainer and I'm required by law to demonstrate that kind of
  bias towards my own stuff)
- Make the `inspector` site not look like crap
- Add MDX and add cool functionality like what
  [@mattpocock](https://github.com/mattpocock) is doing with
  [XState Catalogue](https://xstate-catalogue.vercel.app/)
- Figure out a cleaner pattern for handling machine inspector routes. It's a
  little gross and dirty right now, but it works 🤷

## Credits

- [@mattpocock](https://github.com/mattpocock) for building XState Catalogue,
  which is the main source of inspiration for this template, and for
  [`xstate#2020`](https://github.com/davidkpiano/xstate/issues/2020) which
  pointed me to the need to use `patch-package` and also helped me discover the
  `MachineContainer` pattern
- [@davidkpiano](https://github.com/davidkpiano) for being one hell of pianist.
  <sub>And for creating XState</sub>
