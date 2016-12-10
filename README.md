# Wowser Pipeline

[![Join chat](https://img.shields.io/badge/gitter-join_chat-blue.svg?style=flat)](https://gitter.im/wowserhq/wowser)

Wowser Pipeline is the client asset server for the Wowser project.

[Learn more about Wowser](https://github.com/wowserhq/wowser)

It makes World of Warcraft client data available over HTTP, and enables
useful transformations of that data (ex: DBC-to-JSON, BLP-to-PNG).

A copy of the World of Warcraft client is required to use Wowser and
Wowser Pipeline.

Licensed under the **MIT** license, see LICENSE for more information.

## Features

Wowser Pipeline currently supports clients that use MPQ archives to
store data. This covers early alpha builds of World of Warcraft through
the Mists of Pandaria expansion. CASC-using versions of World of Warcraft
are not currently supported.

Pipeline capabilities:

- Serving unmodified copies of assets
- Serving transformed copies of assets
- Glob-style search API (ex: `/pipeline/find/*penguin*`)

Transformation capabilities:

- BLP-to-PNG
- DBC-to-JSON

## Node Support

Currently, Wowser Pipeline supports the LTS and current releases of Node;
`6.x` and `7.x`, respectively.

## Installation and Use

Wowser Pipeline is available to install from npm.

1. To install globally, run:

   ```shell
   npm install -g wowser-pipeline
   ```

2. Once the pipeline is installed, and its binary dependencies are built for your
   system, you can start the pipline server in production mode by running:

   ```shell
   wowser-pipeline
   ```

   at a shell prompt. If it's your first time running the pipeline server, you'll
   be prompted to answer a few first-run questions (see the First Run section below).

3. If all went well, you should be able to try a pipeline search by visiting the
   following URL in your browser:

   ```
   http://localhost:<configured-port>/pipeline/find/*penguin*
   ```

## First Run

On first run of the pipeline server, you will be prompted to specify the following:

- Path to client data folder (e.g. `C:/Program Files (x86)/World of Warcraft/Data`)
- Server port (default is `3000`)
- Number of cluster workers (default depends on amount of CPUs)

Clear these settings by running `npm run reset`

**Disclaimer:** Wowser Pipeline serves up resources to the browser over HTTP.
Depending on your network configuration these may be available to others. Respect
laws and do not distribute game data you do not own.

## Development

Wowser Pipeline is written in [ES2015], developed with [Gulp], compiled by
[Babel] and [soon™] to be tested through [Mocha].

1. Clone the repository:

   ```shell
   git clone git://github.com/wowserhq/wowser-pipeline.git
   ```

2. Download and install [Node.js] – including `npm` – for your platform.

3. Install dependencies:

   ```shell
   npm install
   ```

4. Install [StormLib] and [BLPConverter], which are used to handle Blizzard's
   game files.

5. Build the pipeline:

   ```shell
   npm run gulp
   ```

   Keep this process running to monitor source files and automatically rebuild.

6. After building, start the pipeline server in development mode by running:

   ```shell
   npm run start-dev
   ```

   This will start the pipeline server, and monitor for changes in `src/**/*`.
   Whenever a change is detected, the pipeline will be rebuilt, and the pipeline
   server will be restarted.

   If this is your first time running the pipeline server, you'll be prompted for
   various settings. See the First Run section above for more details.

   If you would prefer to restart the pipeline manually while developing, you can
   start the pipeline server in production mode by running:

   ```shell
   npm run start
   ```

   instead.

7. If all went well, you should be able to try a pipeline search by visiting the
   following URL in your browser:

   ```
   http://localhost:<configured-port>/pipeline/find/*penguin*
   ```

## Contributing

When contributing, please:

1. Fork the repository
2. Create a single-topic branch in your fork
3. Open a pull request

[Babel]: https://babeljs.io/
[BLPConverter]: https://github.com/wowserhq/blizzardry#blp
[ES2015]: https://babeljs.io/docs/learn-es2015/
[Gulp]: http://gulpjs.com/
[Mocha]: http://mochajs.org/
[Node.js]: http://nodejs.org/#download
[StormLib]: https://github.com/wowserhq/blizzardry#mpq
[soon™]: http://www.wowwiki.com/Soon
