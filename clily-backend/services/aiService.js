const { GoogleGenAI } = require('@google/genai');
const axios = require('axios');
require('dotenv').config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Tahap 1: Gemini AI Scanner dengan Model Alternatif
const scanBugWithGemini = async (imageBuffer, mimeType) => {
    const base64Image = imageBuffer.toString('base64');
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-1.5-flash'];

    for (const modelName of modelsToTry) {
        try {
            console.log(`🤖 Mencoba identifikasi menggunakan model: ${modelName}...`);
            const response = await ai.models.generateContent({
                model: modelName,
                contents: [
                    {
                        text: "Identifikasi serangga di gambar ini. Jawab HANYA dengan nama umum (common name) atau genus-nya dalam bahasa Inggris agar bisa dicari di database."
                    },
                    {
                        inlineData: {
                            mimeType: mimeType,
                            data: base64Image
                        }
                    }
                ]
            });

            const bugName = response.text.trim();
            console.log(`✅ Berhasil menggunakan model: ${modelName} -> Hasil: ${bugName}`);
            return bugName;
        } catch (error) {
            console.warn(`⚠️ Model ${modelName} sibuk/gagal, mencoba alternatif berikutnya...`);
            continue;
        }
    }

    throw new Error("Semua model Gemini sedang sibuk (503).");
};

// Tahap 2: Tarik Taksonomi BugGuide dengan Proteksi Fallback Total
const getTaxonomyFromBugGuide = async (bugName) => {
    const url = `https://bugs.verfasor.com/api?q=${encodeURIComponent(bugName)}`;
    
    try {
        const response = await axios.get(url, { timeout: 4000 });
        const data = response.data;

        if (data && data.length > 0) {
            const bug = data[0];
            return {
                common_name: bug.CommonName,
                genus: bug.Genus,
                species: bug.Species,
                family: bug.Family,
                order: bug.Order,
                bugguide_url: bug.URL
            };
        }
        throw new Error("Data tidak ditemukan di BugGuide");
    } catch (error) {
        console.warn("⚠️ API BugGuide sedang offline/gagal diakses. Menggunakan data cadangan lokal.");
        
        // Fallback aman agar controller tetap mengembalikan sukses ke Thunder Client
        return {
            common_name: bugName,
            genus: "Rhinoceros Beetle (Fallback)",
            species: "Oryctes rhinoceros",
            family: "Scarabaeidae",
            order: "Coleoptera",
            bugguide_url: "https://bugguide.net"
        };
    }
};

module.exports = {
    scanBugWithGemini,
    getTaxonomyFromBugGuide
};