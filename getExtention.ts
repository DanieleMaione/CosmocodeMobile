/** @format */

export const utilityGetExtension = (filename: string) => {
  const temp = filename.split('.');
  const extension = temp[temp.length - 1];

  return extension;
};
