# useMemo-useReducer
![image](https://user-images.githubusercontent.com/72486336/235303403-17dd3e8d-5167-4685-8273-909bd0d87d7f.png)

# Details
Displaying the use of useMemo and useReducer hooks for better performance and development patterns.

## useMemo
It should be used in two cases. 
- Computationally expensive calculation in the state at first render.
- The result of computation is an array or an object

It should not be used in two cases
- Calculation is simple
- Result is scalar like string, number, boolean.

## useReducer
It should be used only
- If the function is being passed down to a child component as a prop.

It should not be used on trivial things like
- Passing a function of onChange to an html input tag.

# Live Demo
https://usememo-usereducer.netlify.app/
