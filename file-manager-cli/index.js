// Create a file
const fs = require("node:fs/promises");

const createFile = async () => {
  try {
    await fs.writeFile("example.txt", "Hello World", "utf-8");
    console.log("File created successfully");
  } catch (error) {
    console.error("Error creating file:", error.messsage);
  }
};

createFile();

const readFile = async () => {
  try {
    const data = await fs.readFile("notes.txt", "utf-8");
    console.log("File content:", data);
  } catch (error) {
    console.error("Error reading file:", error.messsage);
  }
};

readFile();

const appendText = async () => {
  try {
    await fs.appendFile(
      "notes.txt",
      "\nNode.js is a runtime for js code",
      "utf-8"
    );
    console.log("Text added to file successfully");
  } catch (error) {
    console.error("Error appending text:", error.messsage);
  }
};

appendText();

const deleteFile = async () => {
  try {
    await fs.unlink("node.txt");
    console.log("File deleted");
  } catch (error) {
    console.error("Error deleting file:", error.messsage);
  }
};

deleteFile();
