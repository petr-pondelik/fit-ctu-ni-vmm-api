# NI-VMM: Unsplash - metadata-based reranking API

## Prerequisites

* Node.js >= v10.19.0
* NPM nebo Yarn (pro vývoj využíván Yarn v1.22.5)

## Run project

All the commands have to be run within the project root.

1: Install project dependencies (node_module/ directory).

   
    yarn

2: Run the application using package.json script:

 
    yarn run run
    
2: Or run the application using ts-node package:

    ./node_modules/ts-node/dist/bin.js bin/www.ts    
    
3: API should be listening on the [http://localhost:3333](http://localhost:3333) or [http://127.0.0.1:3333](http://127.0.0.1:3333).

## Create your log file for ApiPool

Rename `data/unsplashApiLog.dummy.json` to `data/unsplashApiLog.json`.

## Sending requests

Requests can be send using Postman `or ni-vmm-front` web client.

## Routes

There is one route available:

    POST /photos/search
    Body:
    {
        "query": string,
        "author": string,
        "position": {
            "latitude": number,
            "longitude": number
        },
        "dimensions": {
            "width": number,
            "height": number
        },
        "created": datetime
    }