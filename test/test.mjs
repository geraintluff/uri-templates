import {readFile} from 'fs/promises';
import {join, dirname} from 'path';
import {fileURLToPath} from 'url';
import assert from 'proclaim';
import uriTemplates from '../uri-templates.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
				for (var i = 0; i < exampleSet.testcases.length; i++) {
					var pair = exampleSet.testcases[i];

					(function (templateString, expected) {
						it(templateString, function () {
							var template = uriTemplates(templateString);
							var actualUri = template.fillFromObject(variables);
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

	var unguessable = {};

	describe(title + " (de-substitution)", function () {
		for (var sectionTitle in examplesDoc) {
			var exampleSet = examplesDoc[sectionTitle];
			describe(sectionTitle, function () {
				for (var i = 0; i < exampleSet.testcases.length; i++) {
					var pair = exampleSet.testcases[i];

					(function (templateString, expected) {
						if (unguessable[templateString]) {
							return;
						}

						it(templateString, function () {
							var original = (typeof expected == 'string') ? expected : expected[0];
							var template = uriTemplates(templateString);

							var guessedVariables = template.fromUri(original);
							assert.isObject(guessedVariables);

							var reconstructed = template.fillFromObject(guessedVariables);

							if (typeof expected == "string") {
								assert.strictEqual(reconstructed, expected);
							} else {
								assert.includes(expected, reconstructed);
							}
						});
					})(pair[0], pair[1]);
				}
			});
		}
	});
}

async function readAndParseJSON (file) {
  return JSON.parse(await readFile(join(__dirname, file)));
}

createTests("Spec examples by section", await readAndParseJSON('../uritemplate-test/spec-examples-by-section.json'));
createTests("Extended examples", await readAndParseJSON('../uritemplate-test/extended-tests.json'));

createTests("Custom examples 1", await readAndParseJSON('./custom-tests.json'));
createTests("Custom examples 2", await readAndParseJSON('./custom-tests-2.json'));
