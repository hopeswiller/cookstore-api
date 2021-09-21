const expressJSDocSwagger = require('express-jsdoc-swagger');

const swaggerOptions = {
    info: {
        title: 'CookStore API',
        description: 'CookStore API Information',
        version: '0.1.0',
        contact: {
            name: "hopeswiller",
            email: "davidba941@gmail.com"
        }
    },
    security: {
        BasicAuth: {
            type: "http",
            scheme: "basic",
        },
    },

    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: '../routes/*.js',
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/api/docs',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: false,
    // Open API JSON Docs endpoint.
    apiDocsPath: '/v3/api/docs'
};

module.exports = (app) => {
    expressJSDocSwagger(app)(swaggerOptions)
}
