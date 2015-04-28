/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have defined URLs', function(){
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have defined names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    /* This test suite named "The menu" checks that menu behaves as expected*/
    describe('The menu', function() {

        var $body = $('body');

        /* This test ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            expect($body.hasClass('menu-hidden')).toBeTruthy();
        });

        /* This test ensures the menu changes
         * visibility when the menu icon is clicked.
         */
        it('correctly changes visibility when clicked', function() {
            var $menuButton = $('.menu-icon-link');
            $menuButton.click();
            expect($body.hasClass('menu-hidden')).not.toBeTruthy();
            $menuButton.click();
            expect($body.hasClass('menu-hidden')).toBeTruthy();
        });
    });

    /* This test suite named "Initial Entries" checks that the first entries are loaded */
    describe('Intial Entries', function() {

        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('with atleast one loaded', function(done) {
            expect($('.feed').children().length).not.toBe(0);
            done();
        });
    });

    /* This test suite named "New Feed Selection" checks that different feeds are loaded appropriately */
    describe('New Feed Selection', function() {
        var contentTitle;
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        beforeEach(function(done) {
            loadFeed(1, function() {
                contentTitle = $('.feed .entry-link h2').text();
                loadFeed(0, function() {
                    done();
                });
            });
        });

        it('content has changed', function(done) {
            expect(contentTitle).toBeDefined(); // to ensure that the first load was defined
            expect($('.feed .entry-link h2').text()).not.toBe(contentTitle);
            done();
        });
    });
}());
