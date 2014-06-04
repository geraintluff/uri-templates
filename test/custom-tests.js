var UriTemplate = require('../uri-templates');
var assert = require('proclaim');

describe("Guessing variable priority", function () {
	it('GitHub issue #8', function () {
		var template = new UriTemplate("{+path}/c/capture{/date,id,page}");
		var guess = template.fromUri('/a/b/c/capture/20140101/1');
		
		// we already test elsewhere that this reconstructs correctly - we just want to make sure variables are prioritised left-to-right
		assert.strictEqual(guess.date, '20140101');
		assert.strictEqual(guess.id, '1');
		assert.strictEqual(guess.page, undefined);
	})
});