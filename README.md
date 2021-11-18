All functions are set to private to prevent accidental publication to NPM

```"private": true```

Lambda function unit tests and linting is performed by Jest, and can be invoked with the shortcut `npm test`. To run Jest in watch mode execute with the watch flag, `npm test -- --watch`.

```"test": "jest"```

To execute your Lambda function locally run `npm start`. The `AWS_XRAY_CONTEXT_MISSING` variable suppresses context related X-ray errors. `AWS_REGION` sets the AWS region. `node -e` executes the handler function with a null event. To pass an event to the handler, replace the first null in the function parameters with a valid JSON object.

```"start": "AWS_XRAY_CONTEXT_MISSING=LOG_ERROR AWS_REGION=ap-southeast-2 node -e 'require(\"./src/index\").handler...```

To consolidate dependencies and minify our Lambda function code we use the default webpack configuration with additional flags to support the node runtime (to avoid node dependency errors, like fs). To run package without minification append the development mode flag, `npm run pack -- --mode development`

```"pack": "npx webpack --target node"```

As Lambda only accepts zips of code execute a zip command to package up the file post webpack.

```"zip": "zip dist/function dist/main.js"```

The package command is a helper command which runs webpack and then zips the code for uploade to Lambda.

```"package": "npm run pack && npm run zip"```

The package:dev command is a helper command similar to package, but set to development mode (for verbose development deploys).

```"package:dev": "npm run pack -- --mode development && npm run zip"```

Whilst the Lambda containers ship with the aws-sdk, version changes have caused issues in the past. As such we now include the aws-sdk as part of the build. Moreover, in order to automatically instrument the aws-sdk, aws-xray-sdk is included as a wrapper.

```
"dependencies": {
  "aws-sdk": "^2.1031.0",
  "aws-xray-sdk": "^3.3.4"
}
```

The eslint config is set to Airbnb base, with a single exception for console.log, which Lambda uses to log to CloudWatch Logs.

```
"eslintConfig": {
  "extends": "airbnb-base",
    "rules": {
      "no-console": "off"
  }
}
```

The Jest eslint runner is set to fix issues automatically when run in watch mode. Set this to false to disable.

```
"jest-runner-eslint": {
  "cliOptions": {
    "fix": true
  }
}
```

Jest is configured to execute unit tests 

```"displayName": "test"```

And lint all code (including tests).

```"displayName": "lint"```