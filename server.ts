// const serverless = require('serverless-http')
// const next = require('next')
// const nextHandler = next({ dev: false })

// module.exports.handler = serverless(nextHandler.getRequestHandler(), {
//   binary: ['*/*'],
//   request: (request) => {
//     delete request.body
//   },
// })


import { NextConfig } from "next";
import NextServer from "next/dist/server/next-server";
import serverless from "serverless-http";
// @ts-ignore
import { config } from "./.next/required-server-files.json";

const nextServer = new NextServer({
  hostname: "localhost",
  port: 3000,
  dir: __dirname,
  dev: false,
  conf: {
    ...(config as NextConfig),
  },
});

export const handler = serverless(nextServer.getRequestHandler(), {
  binary: ["*/*"],
});