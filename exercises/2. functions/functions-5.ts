// functions-5.ts
//
// Make me work!
//
// exercise() should call multiply with x and y
// and then call isEven with the result
// and return the result of isEven
//
// Use the `hint` watch subcommand for a hint
//
// I AM NOT DONE

export function exercise(): boolean {
  const x: number = 3; // Do not change this line
  const y: number = 5; // Do not change this line

  return isEven(multiply());
}

// Do not change the code below
function multiply(x: number, y: number): number {
  return x * y;
}

function isEven(x: number): boolean {
  return x % 2 === 0;
}
