"use client";
import { auth, provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleLogin = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      setUser(res.user);
    } catch (err) {
      alert("Login gagal! Pastikan whitelist sudah benar.");
    }
  };

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <main style={{ padding: '40px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#1a73e8' }}>🛡️ Content Shield AI</h1>
      
      {!user ? (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <button onClick={handleLogin} style={{ padding: '12px 24px', fontSize: '16px', cursor: 'pointer', borderRadius: '8px', border: 'none', backgroundColor: '#4285F4', color: 'white' }}>
            Masuk dengan Google
          </button>
        </div>
      ) : (
        <div>
          <p>Selamat bekerja, <b>{user.displayName}</b></p>
          <div style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center', borderRadius: '12px' }}>
            <input type="file" accept="image/*" onChange={handleUpload} />
            {image && <img src={image} style={{ marginTop: '20px', maxWidth: '100%', borderRadius: '8px' }} />}
          </div>
          
          <button 
            disabled={!image || loading}
            style={{ width: '100%', marginTop: '20px', padding: '12px', backgroundColor: loading ? '#ccc' : '#1a73e8', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
          >
            {loading ? "Sedang Memeriksa..." : "Cek Kepatuhan Konten"}
          </button>

          {result && (
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', borderLeft: '5px solid #1a73e8' }}>
              <h3>Hasil Analisis:</h3>
              <p>{result}</p>
            </div>
          )}
        </div>
      )}
    </main>
  );
}