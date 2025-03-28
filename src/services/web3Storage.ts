import { create } from 'ipfs-http-client';
import { Policy } from '@/types/policy';

// Konfigurasi IPFS client menggunakan Infura
const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${Buffer.from(
      `${process.env.NEXT_PUBLIC_INFURA_PROJECT_ID}:${process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET}`
    ).toString('base64')}`,
  },
});

// Interface untuk hasil penyimpanan
export interface Web3StorageResult {
  cid: string;
  dealId?: string;
  timestamp: Date;
}

export class Web3StorageService {
  /**
   * Mengunggah dokumen kebijakan ke IPFS
   * @param policy Dokumen kebijakan yang akan diunggah
   * @returns Hasil penyimpanan termasuk CID dan Deal ID
   */
  static async uploadPolicy(policy: Policy): Promise<Web3StorageResult> {
    try {
      // Konversi policy ke JSON
      const policyData = JSON.stringify(policy);
      const buffer = Buffer.from(policyData);

      // Upload ke IPFS dengan pinning
      const result = await ipfs.add(buffer, {
        pin: true,
        cidVersion: 0,
      });

      // Simulasi penyimpanan ke Filecoin
      const dealId = await this.storeOnFilecoin(result.cid.toString());

      return {
        cid: result.cid.toString(),
        dealId,
        timestamp: new Date(),
      };
    } catch (error) {
      console.error('Error uploading to IPFS:', error);
      throw new Error('Gagal mengunggah dokumen ke IPFS');
    }
  }

  /**
   * Mengunduh dokumen kebijakan dari IPFS
   * @param cid Content Identifier dari dokumen
   * @returns Dokumen kebijakan yang diunduh
   */
  static async downloadPolicy(cid: string): Promise<Policy> {
    try {
      // Download dari IPFS
      const stream = ipfs.cat(cid);
      const chunks = [];

      for await (const chunk of stream) {
        chunks.push(chunk);
      }

      const buffer = Buffer.concat(chunks);
      const policyData = JSON.parse(buffer.toString());

      return policyData as Policy;
    } catch (error) {
      console.error('Error downloading from IPFS:', error);
      throw new Error('Gagal mengunduh dokumen dari IPFS');
    }
  }

  /**
   * Memverifikasi keberadaan dokumen di IPFS
   * @param cid Content Identifier dari dokumen
   * @returns Status keberadaan dokumen
   */
  static async verifyStorage(cid: string): Promise<boolean> {
    try {
      // Verifikasi keberadaan di IPFS
      const exists = await ipfs.pin.ls(cid);
      return exists.length > 0;
    } catch (error) {
      console.error('Error verifying storage:', error);
      return false;
    }
  }

  /**
   * Menyimpan dokumen ke Filecoin (simulasi)
   * @param cid Content Identifier dari dokumen
   * @returns Deal ID dari Filecoin
   */
  private static async storeOnFilecoin(cid: string): Promise<string> {
    // Simulasi penyimpanan ke Filecoin
    // Dalam implementasi nyata, ini akan menggunakan Filecoin client
    await new Promise(resolve => setTimeout(resolve, 1000));
    return `f${Math.random().toString(36).substr(2, 9)}`;
  }
} 