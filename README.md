# uri-templates

URI Templates ([RFC6570](http://tools.ietf.org/html/rfc6570)) in JavaScript, including de-substitution.

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

## Substitution using an object
```javascript
// "/categories/green/round/"
var uri1 = template1.fillWithObject({colour: "green", shape: "round"});

// "/prefix/?a=A&b=B&c=C
var uri2 = template2.fillWithObject({
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
var params = template2.fromUri(url2b);
/*
	{
		params: {
			beep: "boop",
			bleep: "bloop"
		}
	}
*/
```