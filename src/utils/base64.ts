export const encodeBase64 = (str: string):string => Buffer.from(str, 'binary').toString('base64');
