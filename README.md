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

The `machines` package is configured to include `src/` in its `files` and is in
the `nohoist` list, meaning that the `machines` package will be installed
directly to `inspector/node_modules`. This allows the `inspector` package to
directly read the files in the `machines` package, which allows it to
automatically generate routes and pages for each machine.

In order for this to work, each machine should be defined in its own file. The
name of this file defines the `slug` of the machine, which is used in the URL
path for the machine. For example, `idle.machine.ts` creates a `machines/idle`
path.

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

## Credits

- [@mattpocock](https://github.com/mattpocock) for building XState Catalogue,
  which is the main source of inspiration for this template
- [@davidkpiano](https://github.com/davidkpiano) for being one hell of pianist.
  <sub>And for creating XState</sub>
