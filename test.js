"use strict";

var uriTemplates = require('./uri-templates');
var assert = require('proclaim');

describe("Basic tests", function () {

	it("Basic substitution", function () {
		var template = uriTemplates("/prefix/{var}/suffix");
		var uri = template.fillFromObject({var: "test"});
		
		assert.strictEqual(uri, "/prefix/test/suffix");
	});
});

function createTests(title, examplesDoc) {
	describe(title + "(substitution)", function () {
		for (var sectionTitle in examplesDoc) {
			var exampleSet = examplesDoc[sectionTitle];
			describe(sectionTitle, function () {
				var variables = exampleSet.variables;
				var variableFunction = function (varName) {
					return variables[varName];
				};
			
				for (var i = 0; i < exampleSet.testcases.length; i++) {
					var pair = exampleSet.testcases[i];

					(function (templateString, expected) {
						it(templateString, function () {
							var template = uriTemplates(templateString);
							var actualUri = template.fillFromObject(variables);
							console.log([templateString, actualUri]);
							if (typeof expected == "string") {
								assert.strictEqual(actualUri, expected);
							} else {
								assert.includes(expected, actualUri);
							}
						});
					})(pair[0], pair[1]);
				}
			});	
		}
	});

	describe(title + " (de-substitution)", function () {
		for (var sectionTitle in examplesDoc) {
			var exampleSet = examplesDoc[sectionTitle];
			describe(sectionTitle, function () {
				for (var i = 0; i < exampleSet.testcases.length; i++) {
					var pair = exampleSet.testcases[i];

					(function (templateString, expected, exampleSet) {
						it(templateString, function () {
							var original = (typeof expected == 'string') ? expected : expected[0];
							var template = uriTemplates(templateString);
					
							var guessedVariables = template.fromUri(original);
							console.log(guessedVariables);
							console.log(exampleSet.variables);
					
							var reconstructed = template.fillFromObject(guessedVariables);

							if (typeof expected == "string") {
								assert.strictEqual(reconstructed, expected);
							} else {
								assert.includes(expected, reconstructed);
							}
						});
					})(pair[0], pair[1], exampleSet);
				}
			});	
		}
	});
}

createTests("Spec examples", require('./uritemplate-test/spec-examples.json'));
