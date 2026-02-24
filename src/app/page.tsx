"use client";
import { auth, provider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login gagal:", error);
    }
  };

  return (
    <main style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#1a73e8' }}>AI Compliance Checker</h1>
      {!user ? (
        <button onClick={handleLogin} style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Login dengan Google
        </button>
      ) : (
        <div>
          <p>Selamat datang, {user.displayName}!</p>
          <div style={{ marginTop: '20px', border: '2px dashed #ccc', padding: '30px' }}>
            <input type="file" accept="image/*" />
            <p>Klik untuk upload gambar yang akan dicek oleh AI</p>
          </div>
        </div>
      )}
    </main>
  );
}