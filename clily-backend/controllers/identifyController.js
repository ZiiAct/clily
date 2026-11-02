const aiService = require('../services/aiService');

const identifyBug = async (req, res) => {
    try {
        const startTime = Date.now();

        if (!req.file) {
            return res.status(400).json({ status: "error", message: "Gambar tidak ditemukan" });
        }

        // 1. Scan pakai Gemini
        const scannedName = await aiService.scanBugWithGemini(req.file.buffer, req.file.mimetype);

        // 2. Cari data taksonomi di BugGuide
        const taxonomyData = await aiService.getTaxonomyFromBugGuide(scannedName);

        const processTime = (Date.now() - startTime) / 1000;

        // 3a. Kalau dikenali Gemini tapi gak ada di database BugGuide
        if (!taxonomyData) {
            return res.status(200).json({
                status: "partial_success",
                process_time_seconds: processTime,
                message: `Gemini mengenali gambar sebagai '${scannedName}', namun data tidak tersedia di ensiklopedia taksonomi.`,
                data: {
                    species_name: scannedName,
                    taxonomy: null
                }
            });
        }

        // 3b. Kalau sukses dan datanya lengkap
        res.status(200).json({
            status: "success",
            process_time_seconds: processTime,
            data: {
                species_name: taxonomyData.common_name || scannedName,
                taxonomy: {
                    genus: taxonomyData.genus,
                    species: taxonomyData.species,
                    family: taxonomyData.family,
                    order: taxonomyData.order
                },
                reference_url: taxonomyData.bugguide_url
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ status: "error", message: "Gagal memproses gambar" });
    }
};

module.exports = { identifyBug };