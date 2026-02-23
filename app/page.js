const handleCheck = async () => {
  setLoading(true);
  try {
    const genAI = new GoogleGenerativeAI("KODE_API_GEMINI_ANDA");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Ubah gambar ke Base64
    const imagePart = {
      inlineData: { data: base64String, mimeType: "image/jpeg" }
    };

    const prompt = "Analisis potensi pelanggaran hak cipta/trademark pada gambar dan caption ini...";
    const result = await model.generateContent([prompt, imagePart]);
    const response = await result.response;
    setAnalysis(response.text());
  } catch (error) {
    console.error("Gagal memeriksa:", error);
  }
  setLoading(false);
};