export function saveBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function saveObject(jsonObject: object, fileName: string): void {
  const blob = new Blob([JSON.stringify(jsonObject)], { type: 'application/json' });
  saveBlob(blob, fileName);
}

export function readJsonFile<T>(file: File): Promise<T> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const rawText = fileReader.result as string;
      resolve(JSON.parse(rawText));
    };
    fileReader.readAsText(file);
  });
}
