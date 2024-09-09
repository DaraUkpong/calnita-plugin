export function getObjectSize(obj: any) {
    const str = JSON.stringify(obj);
    const bytes = new TextEncoder().encode(str).length;
    return bytes;
  }
  
  