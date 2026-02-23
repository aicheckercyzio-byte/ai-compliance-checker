"use client";
import { useState } from "react";
import { auth, provider, db, checkWhitelist } from "@/lib/firebase"; // Pastikan sudah buat file firebase.js
import { signInWithPopup, signOut } from "firebase/auth";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AIComplianceApp() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [result, setResult] = useState("");

  // 1. FUNGSI LOGIN & CEK WHITELIST
  const handleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const isAllowed = await checkWhitelist(res.user.email);

      if (isAllowed) {
        setUser(res.user);
      } else {
        alert("Maaf, email Anda tidak terdaftar dalam sistem.");
        await signOut(auth);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 2. FUNGSI ANALISIS GEMINI AI
  const analyzeContent = async () => {
    if (!image) return alert("Upload foto dulu bos!");
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Konversi image ke base64 (sederhana)
      const base64Data = await toBase64(image);
      const imagePart = {
        inlineData: { data: base64Data.split(",")[1], mimeType: "image/jpeg" }
      };

      const prompt = `Analisis gambar dan caption "${caption}" ini. Cari apakah ada logo merek besar, watermark aplikasi lain, atau pelanggaran hak cipta. Berikan status AMAN atau PERINGATAN.`;
      
      const result = await model.generateContent([prompt, imagePart]);
      setResult(result.response.text());
    } catch (err) {
      setResult("Gagal menganalisis. Cek API Key Anda.");
    }
    setLoading(false);
  };

  const toBase64 = file => new Promise((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => res(reader.result);
    reader.onerror = e => rej(e);
  });

  // TAMPILAN LOGIN
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded-xl shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">AI Compliance Checker</h1>
          <button onClick={handleLogin} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
            Masuk dengan Google
          </button>
        </div>
      </div>
    );
  }

  // TAMPILAN DASHBOARD
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold">Halo, {user.displayName} 👋</h1>
        <button onClick={() => signOut(auth).then(() => setUser(null))} className="text-red-500">Keluar</button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <input type="file" onChange={(e) => setImage(e.target.files[0])} className="block w-full border p-2" />
          <textarea 
            placeholder="Tulis caption di sini..." 
            className="w-full border p-2 h-32"
            onChange={(e) => setCaption(e.target.value)}
          />
          <button 
            onClick={analyzeContent} 
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold"
          >
            {loading ? "Sedang Mengecek..." : "CEK KEAMANAN KONTEN"}
          </button>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300">
          <h2 className="font-bold mb-4">Hasil Analisis AI:</h2>
          <div className="whitespace-pre-wrap text-gray-700">
            {result || "Hasil akan muncul di sini..."}
          </div>
        </div>
      </div>
    </div>
  );
}