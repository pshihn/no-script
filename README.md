# no-script

**no-script** is a custom element that will block all child `script` elements from executing. 

There may be times when you want to block all script under a specific node, especially when third party code is being injected under that node.

[View the live demo](https://pshihn.github.io/no-script/demo/)

## Example

Consider the following code:

```html
<no-script>
  <h2>No Script!<h2>
  <script>
    console.log('Executed: inline script');
  </script>
  <script src="a.js"></script>
  <script async src="b.js"></script>
</no-script>
```

Nothing gets logged in the console.
(Both `a.js` and `b.js` also log to the console.)

### Allowing certain scripts

Any script that you want to be allowed to execute, add the attribute `allow-execution` to the `script` tag.

```html
<no-script>
  <script>
    console.log('This will NOT get logged');
  </script>
  <script allow-execution>
    console.log('This WILL get logged');
  </script>
</no-script>
```


## Caveats
`no-script` needs to be defined synchronously in the code, or at least defined before the html in question is parsed. 

```html
<head>
  <script src="../dist/no-script.js"></script>
</head>
<body>
  <no-script>
    <script src="a.js"></script>
  </no-script>
</body>
```

Also, `no-script` relies on mutation observers, which means it's not guaranteed that the browser will not execute the script before firing the observer events. Though, having tested on modern Chrome, Safari, and Firefox, it works.

## Work in progress
This element is result of a different (not-open-source) experiment about controliing execution of third party javascript. I'm extracting the basics into an open web component. Plan is to add some of those features to this element such as enabling/scheduling disabled scripts. 
