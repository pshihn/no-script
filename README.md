# no-script

no-script is a custom element that will block all child script elements from executing. 

## Example

Consider the following code:

```html
<no-script>
  <h2>No Script!<h2>
  <script>
    console.log('Executed: inline script');
  </script>
  <script src="./a.js"></script>
  <script async src="./b.js"></script>
</no-script>
```

Nothing gets logged on in the console if `no-script` custom element is defined. 
(Both `a.js` and `b.js` also log to the console.)

[View the live demo](https://pshihn.github.io/no-script/demo/)

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

Also, `no-script` relies on mutation observers, which means its not guaranteed that the browser will not execute the script before firing the observer events. Though, having tested on modern Chrome, Safari, and Firefox, it works.

## Work in progress
This element is result of a different experiment about controliing execution of third party javascript. I will be adding some of those features to this element such as enablong/scheduling disabled scripts. 
