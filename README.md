# Wowser Pipeline

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

6. After building, serve the pipeline by running:

   ```shell
   npm run serve
   ```

7. If all went well, you should be able to try a search using the pipeline by
   visiting the following URL in your browser:

   ```
   http://localhost:<configured-port>/pipeline/find/*penguin*
   ```

### First Run

On first run of the pipeline server, you will be prompted to specify the following:

- Path to client data folder (e.g. `C:/Program Files (x86)/World of Warcraft/Data`)
- Server port (default is `3000`)
- Number of cluster workers (default depends on amount of CPUs)

Clear these settings by running `npm run reset`

**Disclaimer:** Wowser Pipeline serves up resources to the browser over HTTP.
Depending on your network configuration these may be available to others. Respect
laws and do not distribute game data you do not own.

## Contribution

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
