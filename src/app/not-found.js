'use client';

// Bu dosya, Next.js'in kök dizininde (dilden bağımsız) bir hata olduğunda çalışır.
// HTML ve BODY etiketleri içermek zorundadır.

export default function NotFound() {
  return (
    <html>
      <body className="text-center p-10">
        <h1 className="text-2xl font-bold mt-10">404 - Sayfa Bulunamadı</h1>
        <p>Aradığınız sayfa mevcut değil.</p>
      </body>
    </html>
  );
}