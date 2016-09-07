var Metalsmith = require('metalsmith'),
    markdown = require('metalsmith-markdown'),
    templates = require('metalsmith-templates'),
    collections = require('metalsmith-collections'),
    permalinks = require('metalsmith-permalinks'),
    etsy = require('metalsmith-etsy');

Metalsmith(__dirname)
    .use(etsy({
        api_key: <your_api_key>,
        etsy_shop: 'StickToThePlannerCOM',
        listing_template: 'listing.hbt',
        get_images : false
    }))
    .use(collections({
        pages: {
            pattern: 'content/pages/*.md'
        },
        articles: {
            pattern: 'content/articles/*.md',
            sortBy: 'date'
        },
        listings: {
            pattern: 'listings/*.md'
        }
    }))
    .use(markdown())
    .use(permalinks({
        pattern: ':collections/:title'
    }))
    .use(templates({
        engine: 'handlebars',
        partials: {
            header: 'partials/header',
            footer: 'partials/footer'
        }
    }))
    .destination('./build')
    .build(function (err) { if(err) console.log(err) })