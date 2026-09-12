# Ameliyat Listem — Kurulum

Klasördeki dosyalar: `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`

## 1) E-posta girişini açın (2 dk, telefondan olur)
Firebase konsolu → **Authentication → Sign-in method → Add new provider → Email/Password → Enable → Save**.
(Google girişi de açık kalsın; ancak iPhone ana ekran uygulamasında en güvenilir yöntem e-posta + şifredir. İlk açılışta "İlk kullanım: hesap oluştur" ile kendi e-postanızı ve şifrenizi belirleyeceksiniz.)

## 2) Güvenlik kuralını yapıştırın (2 dk)
**Firestore Database → Rules** sekmesi → mevcut metni tamamen silin, şunu yapıştırın → **Publish**:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

Bu kural, verileri yalnızca giriş yapan hesabın kendi kayıtlarına açar; başka hiç kimse okuyamaz.

## 3) Yayınlayın — GitHub Pages (bilgisayardan ~10 dk, bir kez)
1. **github.com** → ücretsiz hesap açın / giriş yapın.
2. Sağ üst **+ → New repository** → ad: `ameliyat-listem` → **Public** → **Create repository**.
3. Açılan sayfadaki **"uploading an existing file"** bağlantısına tıklayın → bu klasördeki **6 dosyayı** sürükleyip bırakın → **Commit changes**.
4. **Settings → Pages** → Branch: **main**, klasör **/(root)** → **Save**.
5. 1–2 dakika sonra adresiniz hazır: `https://KULLANICIADINIZ.github.io/ameliyat-listem/`

## 4) Google girişini de kullanmak isterseniz (isteğe bağlı)
Firebase → **Authentication → Settings → Authorized domains → Add domain** → `KULLANICIADINIZ.github.io` yazın. (E-posta girişi için bu adım gerekmez.)

## 5) Telefona simge olarak ekleyin
Safari'de adresi açın → giriş yapın → **Paylaş → Ana Ekrana Ekle**. Artık uygulama simgesinden tam ekran açılır; internet yokken de son liste görünür, bağlanınca eşitlenir.

## Güncellemeler
Değişiklik istediğinizde Claude'a yazın; yeni `index.html` dosyasını verir. GitHub'da repo sayfasında eski `index.html`'i silip yenisini yüklemeniz (Commit) yeterli — uygulama bir sonraki açılışta güncellenir.
