import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

// path for flashcard
const path = "flashcard.json";

// check the permission or request the permission
const setPermissions = async () => {
  // Check current state
  const permission = await Filesystem.checkPermissions();
  if (permission.publicStorage === "granted") {
    return;
  }
  // Case no permission, request permission
  const request = await Filesystem.requestPermissions();
  if (request.publicStorage === "granted") {
    return;
  }
  // If not granted, throw error
  throw new Error("Permission not granted");
};

// Write data to file
const writeAppFile = async (data) => {
  try {
    // Convert data (obj) to JSON string
    const json = JSON.stringify(data);
    // Write
    await Filesystem.writeFile({
      path,
      data: json,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  } catch (e) {
    // Case error on write
    console.log(e);
  }
};

// Read data from file
const readAppFile = async () => {
  try {
    // Read
    const file = await Filesystem.readFile({
      path,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    // Parse JSON string to obj
    return JSON.parse(file.data);
  } catch (e) {
    // Case error on read, the file doesn't exist (usually)
    console.log(e);
    return [];
  }
};

// Delete item from file
const delAppFileById = async (id) => {
  try {
    await Filesystem.readFile({
      path: path,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    }).then((file) => {
      // parse the data
      const data = JSON.parse(file.data);
      // keep only when id is not equal to the id to delete
      const updateData = data.filter((item) => item.id !== id);
      const json = JSON.stringify(updateData);
      // write the new data
      Filesystem.writeFile({
        path: path,
        data: json,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      return;
    });
  } catch (e) {
    console.log(e);
  }
};

const editAppFileById = async (id, newData) => {
  try {
    await Filesystem.readFile({
      path: path,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    }).then((file) => {
      // parse the data
      const data = JSON.parse(file.data);
      // Replace data when match id, else keep previous data
      const editData = data.map((c) => (c.id === id ? newData : c));
      const json = JSON.stringify(editData);
      // write the new data
      Filesystem.writeFile({
        path: path,
        data: json,
        directory: Directory.Documents,
        encoding: Encoding.UTF8,
      });
      return;
    });
  } catch (e) {
    console.log(e);
  }
};

export {
  setPermissions,
  writeAppFile,
  readAppFile,
  delAppFileById,
  editAppFileById,
};
