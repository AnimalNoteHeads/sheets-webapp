System.register(['angular2/platform/browser', './demisharp-tester.component'], function(exports_1) {
    var browser_1, demisharp_tester_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (demisharp_tester_component_1_1) {
                demisharp_tester_component_1 = demisharp_tester_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(demisharp_tester_component_1.DemisharpTester);
        }
    }
});
//# sourceMappingURL=boot.js.map