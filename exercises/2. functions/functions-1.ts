// functions-1.ts
//
// Make me work!
//
// exercise() should set a variable 'myEmoji' to the result of calling the 'getEmoji' function
// and return 'myEmoji'
//
// Use the `hint` watch subcommand for a hint
//
// I AM NOT DONE

export function exercise() {
  const myEmoji = getEmoji;

  // Do not change this line
  return myEmoji;
}

// Do not change the code below
function getEmoji() {
  const emojis = ["🚀", "🌈", "🦄", "🔥", "🎉"];
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
}
