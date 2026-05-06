import { Directory, File, Paths } from "expo-file-system";

export default function useFileSystem() {
  const fileExist = (uri: string): boolean => {
    try {
      return new File(Paths.document, uri).exists;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const saveFileLocally = ({
    currentUri,
    destinationUri,
    destinationName = currentUri.split("/").pop(),
  }: {
    currentUri: string;
    destinationUri: string;
    destinationName?: string;
  }) => {
    try {
      const file = new File(currentUri);

      const destinationDirectory = new Directory(
        Paths.document,
        destinationUri,
      );

      if (!destinationDirectory.exists) {
        destinationDirectory.create({ intermediates: true });
      }

      const copiedFile = new File(destinationDirectory, destinationName!);
      file.copy(copiedFile);

      return file.uri; // Save this string in your database/AsyncStorage
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };

  const deleteFile = (toDeleteUri: string) => {
    try {
      if (fileExist(toDeleteUri)) {
        const file = new File(Paths.document, toDeleteUri);
        file.delete();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const listFiles = (directory: string): string[] => {
    try {
      const dir = new Directory(Paths.document, directory);
      return dir.list().map((f) => f.uri);
    } catch (err) {
      console.error(err);
      return [];
    }
  };

  return { fileExist, saveFileLocally, deleteFile, listFiles };
}
