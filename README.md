# [LZO -> `Shaw API GIT -> Frontend`][sponsor]

[![Lack Zillions Over (LZO) Team][lzo-badge]][sponsor]

[![Sponsor][sponsor-badge]][sponsor]
[![Commitizen friendly][commitizen-badge]][commitizen]
[![TypeScript version][ts-badge]][typescript-4-6]
[![Node.js version][nodejs-badge]][nodejs]
[![APLv2][license-badge]][license]

## Project

`Shaw API GIT -> Frontend` is a small simple interface that consumes the endpoints of the Shaw API GIT Backend.

### Getting Started

This project is intended to be used with the latest Active LTS release of [Node.js][nodejs].

#### Clone repository

To clone the repository, use the following commands:

```sh
git clone https://github.com/GuilhermeSantos001/shaw-api-git-frontend.git
cd shaw-api-git-frontend
yarn install && yarn dev
```

## Requirements

- This application use redis for cache routes.
- Do you need create an `.env` file for environments variables.

### Content for `.env`

```json
NODE_ENV="development"
VITE_APP_HOST="http://localhost:{PORT}"
```

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg
[commitizen]: http://commitizen.github.io/cz-cli/
[ts-badge]: https://img.shields.io/badge/TypeScript-4.6-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2016.15-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v16.x/docs/api/
[typescript-4-6]: https://devblogs.microsoft.com/typescript/announcing-typescript-4-6/
[sponsor-badge]: https://img.shields.io/badge/♥-Sponsor-fc0fb5.svg
[sponsor]: https://github.com/sponsors/guilhermesantos001
[lzo-badge]: https://img.shields.io/badge/Lack%20Zillions%20Over%20(LZO)-My%20Legacy-fc0fb5.svg?color=blue&logo=Crowdsource&logoColor=white&style=for-the-badge
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[license]: https://github.com/guilhermesantos001/shaw-api-git-backend/blob/main/LICENSE
