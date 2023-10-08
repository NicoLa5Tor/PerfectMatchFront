import { Buffer } from 'buffer';
export const EncryptXOR = (text: string) : string => {
 
  const  key = "doPerroibanAbajo";
   
  const plainBytes = Buffer.from(text, 'utf-8');
  const keyBytes = Buffer.from(key, 'utf-8');

  for (let i = 0; i < plainBytes.length; i++) {
      plainBytes[i] = plainBytes[i] ^ keyBytes[i % keyBytes.length];
  }

  console.log("Clave: ",Buffer.from(plainBytes).toString('base64'))
  return Buffer.from(plainBytes).toString('base64');
    
}