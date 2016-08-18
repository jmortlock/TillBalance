'use strict';

/* App Module */
var app = angular.module('hal.sysnet', [
    'ui.grid',
    'ui.bootstrap',
    'ui.router',
    'ui.router.tabs',
    'ngAnimate',
    'angularUtils.directives.uiBreadcrumbs',
    'hal.sysnet.tillbalance.controllers',
    'hal.sysnet.filters',
    'hal.sysnet.directives'
]);


app.config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/tillbalance/reads");

    var floatMain = {
        name: 'floats',
        url: "/tillbalance/floats",
        views: {
            "@page_header": { templateUrl: 'partials/tillbalance/page_header.html' },
            "@navbar": { templateUrl: 'partials/navbar.html' },
            "@content": { templateUrl: 'partials/tillbalance/floats/content.html' }
        },
        data: {
            displayName: 'Floats',
            pageTitle: 'Floats'
        }
    };

    var floatTemplateMain = {
        name: 'float_templates',
        url: "/tillbalance/floats/templates",
        views: {
            "@page_header": { templateUrl: 'partials/tillbalance/page_header.html' },
            "@navbar": { templateUrl: 'partials/navbar.html' },
            "@content": { templateUrl: 'partials/tillbalance/float_templates/content.html' }
        },
        data: {
            displayName: 'Float Templates',
            pageTitle: 'Float Templates'
        }
    };

    var tillRead = {
        name: 'tillread',
        url: "/tillbalance/reads",
        views: {
            "@page_header": { templateUrl: 'partials/tillbalance/page_header.html' },
            "@navbar": { templateUrl: 'partials/navbar.html' },
            "@content": { templateUrl: 'partials/tillbalance/list_content.html' }
        },
        data: {
            displayName: 'List',
            pageTitle: 'Till Reads'
        }
    };

    var tillReadDetail = {
        name: 'tillread.detail',
        url: "/:id",
        parent: 'tillread',
        views: {
            "@page_header": { templateUrl: 'partials/tillbalance/page_header.html' },
            "@navbar": { templateUrl: 'partials/navbar.html' },
            "@content": { templateUrl: 'partials/tillbalance/detail_content.html' }
        },
        data: {
            displayName: 'Details'
        }
    };

    //
    // Now set up the states
    $stateProvider
        .state(floatTemplateMain)
        .state(floatMain)
        .state(tillRead)
        .state(tillReadDetail);
});
