'use client';

// Bu dosya [locale] klasörü içinde olduğu için layout.js'ten html/body etiketlerini miras alır.
// O yüzden burada sadece içeriği döndürüyoruz.

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4 text-center text-white bg-black">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-xl text-gray-400">Sayfa Bulunamadı</p>
      <a href="/" className="px-6 py-3 mt-8 transition-colors border rounded-full border-white/20 hover:bg-white hover:text-black">
        Anasayfaya Dön
      </a>
    </div>
  );
}