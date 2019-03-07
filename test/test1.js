const xt = require('xtal-test/index');
const test = require('tape');
async function customTests(page) {
    await page.waitFor(1000);
    const textContent = await page.$eval('xtal-split', (c) => c.innerHTML);
    const TapeTestRunner = {
        test: test
    };
    TapeTestRunner.test('testing dev.html', t => {
        t.equal(textContent, 'super<span class="match">ca</span>lifragilisticexpialidocious');
        t.end();
    });
}
(async () => {
    await xt.runTests({
        path: 'demo/dev.html'
    }, customTests);
})();
