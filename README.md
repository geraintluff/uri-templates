# uri-templates

URI Templates ([RFC6570](http://tools.ietf.org/html/rfc6570)) in JavaScript, including de-substitution.

It is tested against the [official test suite](https://github.com/uri-templates/uritemplate-test), including the extended tests.

The "de-substitution" extracts parameter values from URIs.  It is also tested against the official test suite (including extended tests).

## Creation

In Node:
```javascript
var uriTemplates = require('uri-templates');
var template1 = uriTemplates("/date/{colour}/{shape}/");
```

In browser:
```javascript
var template2 = new UriTemplate("/prefix/{?params*}");
```

## Configuration
You can provide a configuration object as the second argument:
```javascript
new UriTemplate("/prefix/{?params*}", {
	leaveUnmatchedPlaceholders: true
});
```

`leaveUnmatchedPlaceholders` defaults to `false`. When `true` any placeholders which do not have a corresponding key in the object, or their value is `null`, will be left in the built URL.

E.g.
```javascript
var template = new UriTemplate("/prefix/{a}?arg1={arg1Value}", {
	leaveUnmatchedPlaceholders: true
});

console.log(template.fill({
	a: "something"
}));
```
will output "/prefix/something?arg1={arg1Value}".

## Substitution using an object
```javascript
// "/categories/green/round/"
var uri1 = template1.fill({colour: "green", shape: "round"});

// "/prefix/?a=A&b=B&c=C
var uri2 = template2.fillFromObject({
	params: {a: "A", b: "B", c: "C"}
});
```

## Substitution using a callback
```javascript
// "/categories/example_colour/example_shape/"
var uri1b = template1.fill(function (varName) {
	return "example_" + varName;
});
```

## Guess variables from URI ("de-substitution")
```javascript
var uri2b = "/prefix/?beep=boop&bleep=bloop";
var params = template2.fromUri(uri2b);
/*
	{
		params: {
			beep: "boop",
			bleep: "bloop"
		}
	}
*/
```

While templates can be ambiguous (e.g. `"{var1}{var2}"`), it will still produce *something* that reconstructs into the original URI.

It can handle all the cases in the official test suite, including the extended tests:

```javascript
var template = uriTemplate("{/id*}{?fields,token}");

var values = template.fromUri("/person/albums?fields=id,name,picture&token=12345");
/*
{
	id: ["person", 'albums"],
	fields: ["id", "name", "picture"],
	token: "12345"
}
*/
```

## License

This project is released as [public-domain](http://geraintluff.github.io/tv4/LICENSE.txt).  Anybody can modify or re-license it for any purpose, without restriction.
