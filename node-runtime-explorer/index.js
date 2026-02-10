// Print process.platform
console.log(process.platform);
// •	Print process.version
console.log(process.version);
// •	Print __dirname
console.log(__dirname);
// •	Read a name from process.argv and greet the user

const name = process.argv[2];

if (name) {
  console.log(`Hello ${name}!`);
} else {
  console.log("Hello Stranger");
}
