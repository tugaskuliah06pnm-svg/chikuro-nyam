/* =========================================================
   CHIKURO NYAM! — script.js
   ---------------------------------------------------------
   Bagian 1: DATA KONTEN  → semua tulisan, produk, foto, warna
   Bagian 2: TAMPILAN     → fungsi render halaman (struktur)
   Bagian 3: INTERAKSI    → router, keranjang, checkout, animasi
   Bagian 4: EDITOR       → panel "Edit Website" (localStorage)
   ========================================================= */
;(function () {
  'use strict'

  /* =======================================================
     BAGIAN 1 — DATA KONTEN DEFAULT
     Untuk mengubah website SECARA PERMANEN untuk semua pengunjung,
     ganti isi DEFAULT_CONTENT di bawah ini (bisa pakai hasil tombol
     "Salin data untuk script.js" di panel Edit Website).
     ======================================================= */
  
const IMG = {
  // Foto produk
  originalcheesse: 'image/original%20cheesse.jpeg',
  mentaimayo: 'image/mentai%20mayo.jpeg',
  mozamelt: 'image/moza%20melt.jpeg',
  noriseaweed: 'image/nori%20seaweed.jpeg',
  spicymentai: 'image/spicy%20mentai.jpeg',
  trufflemayo: 'image/truffle%20mayo.jpeg',
  blackpapercheesse: 'image/black%20paper%20cheese.jpeg',

  // Foto tambahan website
  group: 'image/moza%20melt.jpeg',
  campus: 'image/mentai%20mayo.jpeg',
  keju: 'image/original%20cheesse.jpeg',
  barbeque: 'image/original%20cheesse.jpeg',
  blackpaper: 'image/black%20paper%20cheese.jpeg',
  balado: 'image/truffle%20mayo.jpeg',
  pedasManis: 'image/spicy%20mentai.jpeg',
  jagungBakar: 'image/moza%20melt.jpeg',
  rumputLaut: 'image/nori%20seaweed.jpeg',
}

  const DEFAULT_CONTENT = {
    theme: {
      red: '#D7261E',
      orange: '#F47B20',
      yellow: '#FFC629',
      cream: '#FFF5E4',
      brown: '#4A2412',
      radius: 'bulat',
    },
    store: {
      name: 'Chikuro Nyam!',
      logo: '',
      address: 'Kampus II Politeknik Negeri Madiun, Kota Madiun, Jawa Timur',
      mapsUrl:
        'https://www.google.com/maps/search/?api=1&query=Kampus+II+Politeknik+Negeri+Madiun',
      whatsapp: '6289524144475',
      whatsappDisplay: '0895 2414 4475',
      instagram: 'chikuronyammm',
      orderEmail: '',
      qrisImage: '',
      qrisName: 'CHIKURO NYAM',
      bankName: 'BRI',
      bankAccount: '12345678910',
      bankHolder: 'Chikuro Nyam',
      openDays: 'Senin – Sabtu',
      openTime: '09:00',
      closeTime: '17:00',
      closedSunday: true,
      statusMode: 'otomatis',
    },
    home: {
      headline: 'Chikuro renyah,',
      headlineAccent: 'bikin nagih!',
      subheadline: 'Renyah di luar, lezat di dalam, tersedia 7 varian rasa',
      ctaPrimary: 'Pesan Sekarang',
      ctaSecondary: 'Chat WhatsApp',
      factLocation: 'Kampus II Politeknik Negeri Madiun',
      promoLabel: 'Promo minggu ini',
      promoTitle: 'Beli 3 porsi, gratis 1 saus keju lumer',
      promoText:
        'Berlaku Senin–Kamis untuk pre-order lewat website. Tunjukkan pesan WhatsApp pesananmu saat mengambil di outlet.',
      promoCta: 'Ambil Promonya',
      promoImage: IMG.group,
      favTitle: 'Rasa favorit yang paling sering dipesan',
      favText:
        'Geser dan pilih favoritmu. Semua rasa dibuat fresh saat kamu pesan.',
      aboutTitle: 'Camilan kampus yang dibuat dengan serius',
      aboutText:
        'Chikuro Nyam! lahir dari antrean panjang di jam istirahat. Kami ingin mahasiswa, dosen, staf, dan warga sekitar Kampus II PNM bisa jajan enak, mengenyangkan, dan ramah kantong — tanpa buang waktu istirahat.',
      aboutImage: IMG.campus,
      ctaTitle: 'Lapar di sela sela jam kuliah?',
      ctaText:
        'Pesan sekarang, ambil pas istirahat. Chikuro-mu sudah siap begitu kamu sampai.',
    },
    banners: [
      {
        image: IMG.keju,
        title: 'Keju lumer sampai menetes',
        text: 'Rasa paling dicari minggu ini.',
      },
      {
        image: IMG.group,
        title: '7 rasa, harga ramah kantong',
        text: 'Mulai Rp15.000 per porsi.',
      },
      {
        image: IMG.campus,
        title: 'Camilan wajib di sela jam kuliah',
        text: 'Pre-order dari kelas, ambil tanpa antre.',
      },
    ],
    products: [
      {
        id: 'Original Cheese',
        name: 'Original Cheese',
        category: 'Classic',
        price: 15000,
        image: IMG.barbeque,
        badge: '',
        available: true,
        desc: 'Rasa keju clasik yang gurih dan creamy.Perpaduan kulit crispy dengan saus keju yang lezat,cocok untuk pecinta rasa keju',
      },
      {
        id: 'Mentai Mayo',
        name: 'Mentai Mayo',
        category: 'Classic',
        price: 17000,
        image: IMG.blackpaper,
        badge: '',
        available: true,
        desc: 'Perpaduan saus mentai dan mayonnaise yang creamy,gurih ,serta sedikit manis.Memberikan sensasi rasa yang lembut di setiap gigitan.',
      },
      {
        id: 'Truffle Mayo',
        name: 'Truffle Mayo',
        category: 'Classic',
        price: 18000,
        image: IMG.balado,
        badge: 'Pedas',
        available: true,
        desc: 'Saus mayonnaise creamy,dengan aroma truffle yang khas.Menghadirkan perpaduan rasa gurih dan aroma mewah yang menggugah selera.',
      },
      {
        id: 'Nori Seaweed',
        name: 'Nori Seaweed',
        category: 'Loaded',
        price: 17000,
        image: IMG.keju,
        badge: 'Terlaris',
        available: true,
        desc: 'Taburan rumput laut pilihan dengan cita rasa gurih dan asin.cocok untuk kamu yang suka cemilan dengan rasa unik.',
      },
      {
        id: 'Mozza Melt',
        name: 'Mozza Melt',
        category: 'Loaded',
        price: 22000,
        image: IMG.pedasManis,
        badge: '',
        available: true,
        desc: 'Sensasi keju mozzarella yang lumer dan lembut dengan tekstur luar yang renyah.setiap gigitan terasa chessy dan bikin nagih.',
      },
      {
        id: 'Spicy Mentai ',
        name: 'Spicy Mentai',
        category: 'Classic',
        price: 22000,
        image: IMG.jagungBakar,
        badge: '',
        available: true,
        desc: 'Perpaduan saus mentai creamy dengan sentuhan pedas yang menggigit.Pilihan pas untuk pecinta cemilan pedas dan gurih.',
      },
      {
        id: 'Blackpaper Cheese',
        name: 'Blackpaper Cheese',
        category: 'Classic',
        price: 24000,
        image: IMG.rumputLaut,
        badge: '',
        available: true,
        desc: 'Perpaduan saus keju creamy dengan sensasi lada hitam yang pedas dan sedikit hangat.Rasanya gurih,creamy,dan kaya rempah.',
      },
    ],
    menuPage: {
      title: 'Tujuh rasa, satu kerenyahan.',
      intro:
        'Pilih rasa favoritmu, ketuk untuk lihat detail, lalu masukkan ke keranjang. Harga per porsi.',
      note: 'Harga dan ketersediaan bisa berubah sewaktu-waktu. Rasa yang habis akan ditandai.',
    },
    howto: {
      title: 'Pesan langsung di website.',
      intro:
        'Pilih rasa, checkout, dan dapat nomor pesanan dalam satu menit — tanpa harus chat. Lebih suka WhatsApp? Tetap bisa.',
      webTitle: 'Cara utama · Lewat website',
      webText:
        'Pesanan langsung dibuat di website. Kamu dapat nomor pesanan dan bisa memantau statusnya.',
      webSteps: [
        {
          title: 'Pilih rasa di halaman Menu',
          text: 'Ketuk produk untuk lihat detail, atur jumlah, lalu tambahkan ke keranjang.',
        },
        {
          title: 'Cek keranjang',
          text: 'Tambah, kurangi, atau hapus pesanan. Total dihitung otomatis.',
        },
        {
          title: 'Isi data & buat pesanan',
          text: 'Isi nama, nomor WhatsApp, cara ambil, dan metode bayar, lalu ketuk "Buat Pesanan".',
        },
        {
          title: 'Dapat nomor pesanan',
          text: 'Pantau status di menu Pesanan Saya, lalu tunjukkan nomornya saat mengambil.',
        },
      ],
      waTitle: 'Alternatif · via WhatsApp',
      waText:
        'Cocok kalau kamu mau tanya-tanya dulu atau pesan dalam jumlah banyak.',
      waSteps: [
        {
          title: 'Chat admin',
          text: 'Klik tombol di bawah, chat langsung terbuka.',
        },
        {
          title: 'Sebutkan rasa & jumlah',
          text: 'Plus nama, jam ambil, dan metode bayar.',
        },
        {
          title: 'Ambil tanpa antre',
          text: 'Datang ke outlet, sebut namamu, Chikuro siap dibawa.',
        },
      ],
      payTitle: 'Pembayaran & pengambilan',
      payments: [
        {
          name: 'Tunai',
          text: 'Bayar langsung saat mengambil pesanan di outlet.',
          instruction:
            'Siapkan uang pas, lalu bayar di outlet saat mengambil pesanan.',
        },
        {
          name: 'QRIS',
          text: 'Scan kode QRIS langsung saat checkout, bisa dari semua e-wallet dan m-banking.',
          instruction:
            'Scan kode QRIS, bayar sesuai total, lalu simpan bukti bayarnya.',
        },
        {
          name: 'Transfer',
          text: 'Transfer ke rekening BRI 12345678910 a.n. Chikuro Nyam.',
          instruction:
            'Transfer ke rekening BRI sesuai total, lalu tunjukkan bukti transfer saat mengambil pesanan.',
        },
      ],
      pickups: [
        {
          name: 'Ambil di outlet',
          text: 'Outlet di area Kampus II Politeknik Negeri Madiun. Pesanan siap sesuai jam yang kamu pilih.',
        },
        {
          
        },
      ],
    },
    testiPage: {
      title: 'Apa kata mereka yang sudah nyobain chikuro nyam',
      intro:
        'Ulasan jujur dari mahasiswa, dosen, staf, dan warga sekitar Kampus II PNM.',
    },
    testimonials: [
      {
        name: 'Rina Aprilia',
        role: 'Mahasiswa Akuntansi',
        rating: 5,
        text: 'Rasa keju-nya beneran lumer dan banyak! Pesan dari kelas, pas istirahat tinggal ambil. Nggak perlu desak-desakan di kantin lagi.',
      },
      {
        name: 'Pak Budi',
        role: 'Security Kampus II',
        rating: 5,
        text: 'Murah, kenyang, dan cepat. Pas buat ganjal perut waktu jaga sore.',
      },
      {
        name: 'Dimas Saputra',
        role: 'Mahasiswa Teknik Informatika',
        rating: 5,
        text: 'Black pepper paling juara. Websitenya enak dipakai, checkout-nya cepat banget langsung ke WA.',
      },
      {
        name: 'Bu Sari Wulandari',
        role: 'Dosen',
        rating: 4,
        text: 'Saya pesan 15 porsi untuk rapat jurusan, semuanya datang tepat waktu dan masih renyah.',
      },
      {
        name: 'Nadia Putri',
        role: 'Mahasiswa Administrasi Bisnis',
        rating: 5,
        text: 'Balado-nya pedes nendang! Harga segini dapet ayam sepanjang ini tuh worth it banget.',
      },
      {
        name: 'Mas Yoga',
        role: 'Warga sekitar kampus',
        rating: 5,
        text: 'Sering beli buat anak-anak di rumah. Rumput laut favorit mereka, gurih dan nggak terlalu pedas.',
      },
    ],
    faqPage: {
      title: 'Ada pertanyaan?',
      intro: 'Jawaban singkat untuk hal yang paling sering ditanyakan.',
    },
    faqs: [
      {
        q: 'Di mana lokasi outlet Chikuro Nyam!?',
        a: 'Outlet kami berada di area Kampus II Politeknik Negeri Madiun, Kota Madiun. Ketuk "Buka di Google Maps" di halaman Home untuk petunjuk arah.',
      },
      {
        q: 'Jam berapa Chikuro Nyam! buka?',
        a: 'Kami buka Senin – Sabtu pukul 09.00 – 17.00 WIB. Status buka/tutup terlihat langsung di halaman Home.',
      },
      {
        q: 'Metode pembayaran apa saja yang tersedia?',
        a: 'Tunai saat ambil pesanan, QRIS, atau transfer bank. Detail QRIS dan rekening dikirim admin lewat WhatsApp.',
      },
      {
        q: 'Bisa pesan banyak untuk acara atau rapat?',
        a: 'Tentu. Untuk pesanan di atas 10 porsi, sebaiknya pesan minimal H-1 lewat WhatsApp supaya kami siapkan tepat waktu.',
      },
      {
        q: 'Berapa lama pesanan disiapkan?',
        a: 'Biasanya 5–10 menit setelah pesanan dikonfirmasi. Saat jam ramai, pre-order membantu pesananmu siap lebih cepat.',
      },
    ],
    footer: {
      about:
        'Chikuro crispy panjang 7 rasa untuk mahasiswa dan warga sekitar Kampus II Politeknik Negeri Madiun. Pre-order, ambil, nyam!',
    },
  }

  const STORAGE_KEY = 'chikuroNyam.content.v1'
  const CART_KEY = 'chikuroNyam.cart.v1'
  const ORDERS_KEY = 'chikuroNyam.orders.v1'
  const ORDER_FLOW = ['Diterima', 'Diproses', 'Siap Diambil', 'Selesai']
  const ROUTES = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'cara-pesan', label: 'Cara Pesan' },
    { id: 'testimoni', label: 'Testimoni' },
    { id: 'faq', label: 'FAQ' },
  ]
  const PRESETS = [
    {
      name: 'Merah Klasik',
      colors: {
        red: '#D7261E',
        orange: '#F47B20',
        yellow: '#FFC629',
        cream: '#FFF5E4',
        brown: '#4A2412',
      },
    },
    {
      name: 'Sunset Oranye',
      colors: {
        red: '#E2471B',
        orange: '#FF8A1F',
        yellow: '#FFD23F',
        cream: '#FFF8EC',
        brown: '#3E2210',
      },
    },
    {
      name: 'Cokelat Hangat',
      colors: {
        red: '#B3261E',
        orange: '#D9731A',
        yellow: '#F2B632',
        cream: '#F8EEDC',
        brown: '#2F1A0E',
      },
    },
  ]

  /* =======================================================
     UTILITAS
     ======================================================= */
  const $ = (s, r) => (r || document).querySelector(s)
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s))
  const esc = (s) =>
    String(s == null ? '' : s).replace(
      /[&<>"']/g,
      (c) =>
        ({
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        })[c]
    )
  const rupiah = (n) => 'Rp' + Number(n || 0).toLocaleString('id-ID')
  const clone = (o) => JSON.parse(JSON.stringify(o))
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches

  function getPath(obj, path) {
    return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj)
  }
  function setPath(obj, path, val) {
    const keys = path.split('.')
    let o = obj
    keys.slice(0, -1).forEach((k) => {
      if (o[k] == null) o[k] = {}
      o = o[k]
    })
    o[keys[keys.length - 1]] = val
  }
  function merge(base, saved) {
    if (Array.isArray(base)) return Array.isArray(saved) ? saved : base
    if (base && typeof base === 'object') {
      if (!saved || typeof saved !== 'object') return base
      const out = Object.assign({}, base)
      Object.keys(saved).forEach((k) => {
        out[k] = k in base ? merge(base[k], saved[k]) : saved[k]
      })
      return out
    }
    return saved === undefined ? base : saved
  }

  const ICONS = {
    cart: '<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>',
    plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
    minus: '<path d="M5 12h14"/>',
    trash:
      '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
    back: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
    up: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    arrow: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    clock:
      '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    ig: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
    chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    upload:
      '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    reset:
      '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    wallet:
      '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    qr: '<rect width="5" height="5" x="3" y="3" rx="1"/><rect width="5" height="5" x="16" y="3" rx="1"/><rect width="5" height="5" x="3" y="16" rx="1"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/><path d="M21 21v.01"/><path d="M12 7v3a2 2 0 0 1-2 2H7"/><path d="M3 12h.01"/><path d="M12 3h.01"/><path d="M12 16v.01"/><path d="M16 12h1"/><path d="M21 12v.01"/><path d="M12 21v-1"/>',
    bank: '<rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/>',
    bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
    truck:
      '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
    store:
      '<path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"/><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><path d="M2 7h20"/><path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"/>',
    globe:
      '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    receipt:
      '<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z"/><path d="M8 7h8"/><path d="M8 11h8"/><path d="M8 15h5"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  }
  const icon = (n, cls) =>
    `<svg class="ic ${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ''}</svg>`

  /* =======================================================
     STATE
     ======================================================= */
  let content = loadContent()
  let draft = null // salinan konten saat mode edit
  let cart = loadCart()
  let orders = loadOrders()
  let lastOrderId = null
  let route = 'home'
  let routeStack = []
  let menuFilter = 'Semua'
  let modalProduct = null
  let modalQty = 1
  let heroIndex = 0
  let heroTimer = null
  let io = null
  let openOverlays = []
  let editorTab = 'home'
  let edOpen = {}
  let renderTimer = null
  const checkout = {
    step: 1,
    name: '',
    phone: '',
    method: '',
    address: '',
    time: '',
    payment: '',
    note: '',
    errors: {},
  }

  const view = () => draft || content

  function loadContent() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw
        ? merge(clone(DEFAULT_CONTENT), JSON.parse(raw))
        : clone(DEFAULT_CONTENT)
    } catch (e) {
      return clone(DEFAULT_CONTENT)
    }
  }
  function saveContent() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
      return true
    } catch (e) {
      toast(
        'Penyimpanan penuh. Gunakan foto yang lebih kecil atau link gambar.',
        'error'
      )
      return false
    }
  }
  function loadCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || {}
    } catch (e) {
      return {}
    }
  }
  function saveCart() {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart))
    } catch (e) {
      /* abaikan */
    }
  }
  function loadOrders() {
    try {
      return JSON.parse(localStorage.getItem(ORDERS_KEY)) || []
    } catch (e) {
      return []
    }
  }
  function saveOrders() {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
    } catch (e) {
      toast('Gagal menyimpan pesanan di perangkat ini', 'error')
    }
  }

  /* =======================================================
     BAGIAN 2 — TAMPILAN (RENDER)
     ======================================================= */
  function shellHTML() {
    const links = ROUTES.map(
      (r) =>
        `<a href="#/${r.id}" class="nav__link" data-route="${r.id}">${r.label}</a>`
    ).join('')
    const mlinks = ROUTES.map(
      (r, i) =>
        `<a href="#/${r.id}" class="mobile-menu__link" data-route="${r.id}" style="--i:${i}">${r.label}${icon('right')}</a>`
    ).join('')
    return `
    <div class="ck" id="ck">
      <a class="skip" href="#ckMain" data-action="skip">Lewati ke konten</a>
      <header class="nav" id="ckNav">
        <div class="nav__inner container">
          <a href="#/home" class="brand" id="ckBrand" aria-label="Home"></a>
          <nav class="nav__links" aria-label="Navigasi utama">${links}</nav>
          <div class="nav__actions">
            <a href="#/menu" class="btn btn--sm btn--primary nav__cta">Pesan Sekarang</a>
            <button type="button" class="icon-btn" data-action="open-orders" aria-label="Pesanan saya">${icon('receipt')}<span class="cart-badge cart-badge--alt" id="orderBadge">0</span></button>
            <button type="button" class="icon-btn" data-action="open-cart" aria-label="Buka keranjang">${icon('cart')}<span class="cart-badge" id="cartBadge">0</span></button>
            <button type="button" class="icon-btn nav__burger" data-action="toggle-menu" aria-label="Buka menu" aria-expanded="false" aria-controls="mobileMenu">${icon('menu')}</button>
          </div>
        </div>
        <div class="mobile-menu" id="mobileMenu"><nav class="container mobile-menu__inner" aria-label="Navigasi mobile">${mlinks}</nav></div>
      </header>

      <main id="ckMain" tabindex="-1"></main>
      <footer class="footer" id="ckFooter"></footer>

      <div class="overlay drawer" id="cartDrawer" aria-hidden="true">
        <div class="overlay__backdrop" data-action="close-overlay"></div>
        <aside class="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="cartTitle">
          <div class="drawer__head"><h2 class="drawer__title" id="cartTitle">Keranjang</h2><button type="button" class="icon-btn" data-action="close-overlay" aria-label="Tutup keranjang">${icon('x')}</button></div>
          <div class="drawer__body" id="cartBody"></div>
          <div class="drawer__foot" id="cartFoot"></div>
        </aside>
      </div>

      <div class="overlay drawer" id="ordersDrawer" aria-hidden="true">
        <div class="overlay__backdrop" data-action="close-overlay"></div>
        <aside class="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="ordersTitle">
          <div class="drawer__head"><h2 class="drawer__title" id="ordersTitle">Pesanan Saya</h2><button type="button" class="icon-btn" data-action="close-overlay" aria-label="Tutup pesanan saya">${icon('x')}</button></div>
          <div class="drawer__body" id="ordersBody"></div>
        </aside>
      </div>

      <div class="overlay modal" id="productModal" aria-hidden="true">
        <div class="overlay__backdrop" data-action="close-overlay"></div>
        <div class="modal__panel modal__panel--product" role="dialog" aria-modal="true" aria-labelledby="pmTitle" id="productPanel"></div>
      </div>

      <div class="overlay modal" id="checkoutModal" aria-hidden="true">
        <div class="overlay__backdrop" data-action="close-overlay"></div>
        <div class="modal__panel modal__panel--checkout" role="dialog" aria-modal="true" aria-labelledby="coTitle" id="checkoutPanel"></div>
      </div>

      <div class="toasts" id="toasts" aria-live="polite" aria-atomic="false"></div>
      <a class="fab-wa" id="fabWa" href="#" target="_blank" rel="noopener" aria-label="Chat WhatsApp Chikuro Nyam!">${icon('chat')}<span class="fab-wa__label">Chat Kami</span></a>
      <button type="button" class="back-top" id="backTop" data-action="back-top" aria-label="Kembali ke atas">${icon('up')}</button>
      
      <aside class="editor" id="editor" aria-label="Panel edit website" aria-hidden="true">
        <div class="editor__head">
          <div><h2 class="editor__title">Edit Website</h2><p class="editor__sub">Perubahan langsung tampil sebagai preview.</p></div>
          <button type="button" class="icon-btn" data-action="ed-cancel" aria-label="Tutup editor">${icon('x')}</button>
        </div>
        <div class="editor__notice">
          <strong>${icon('info')} Disimpan di browser ini saja</strong>
          <span>Perubahan tersimpan di localStorage perangkat & browser ini. Pengunjung lain <b>tidak</b> otomatis melihatnya. Agar permanen untuk semua orang, salin data lalu tempel ke <b>DEFAULT_CONTENT</b> di script.js.</span>
          <button type="button" data-action="ed-export">Salin data untuk script.js</button>
        </div>
        <div class="editor__tabs" id="edTabs" role="tablist"></div>
        <div class="editor__body" id="edBody"></div>
        <div class="editor__foot">
          <p class="editor__dirty" id="edDirty"><i></i><span>Belum ada perubahan</span></p>
          <button type="button" class="btn btn--danger" data-action="ed-reset" title="Kembalikan ke tampilan awal">${icon('reset')}<span class="sr-hide">Reset</span></button>
          <button type="button" class="btn btn--ghost" data-action="ed-preview">${icon('eye')}Preview</button>
          <button type="button" class="btn btn--ghost" data-action="ed-cancel">Batal</button>
          <button type="button" class="btn btn--primary" data-action="ed-save">${icon('check')}Simpan</button>
        </div>
      </aside>
      <div class="preview-bar" id="previewBar" role="status">
        <span>Mode preview — belum disimpan</span>
        <button type="button" class="btn btn--ghost" style="background:#ffffff22;color:#fff" data-action="ed-back">Edit lagi</button>
        <button type="button" class="btn btn--primary" data-action="ed-save">Simpan</button>
      </div>
    </div>`
  }

  function brandHTML(s) {
    if (s.logo)
      return `<img src="${esc(s.logo)}" alt="${esc(s.name)}" class="brand__img">`
    const parts = String(s.name || '')
      .trim()
      .split(/\s+/)
    const first = parts.shift() || ''
    const rest = parts.join(' ')
    return `<span class="brand__word">${esc(first)}</span>${rest ? `<span class="brand__nyam">${esc(rest)}</span>` : ''}`
  }

  function openStatus(s) {
    if (s.statusMode === 'buka')
      return {
        open: true,
        label: `Buka hari ini · ${s.openTime}–${s.closeTime}`,
      }
    if (s.statusMode === 'tutup') return { open: false, label: 'Sedang tutup' }
    const now = new Date()
    const toMin = (t) => {
      const p = String(t || '0:0')
        .split(':')
        .map(Number)
      return (p[0] || 0) * 60 + (p[1] || 0)
    }
    const mins = now.getHours() * 60 + now.getMinutes()
    const closedDay = s.closedSunday && now.getDay() === 0
    const open =
      !closedDay && mins >= toMin(s.openTime) && mins < toMin(s.closeTime)
    return open
      ? { open: true, label: `Buka sekarang · tutup ${s.closeTime}` }
      : {
          open: false,
          label: closedDay
            ? `Tutup hari ini · buka besok ${s.openTime}`
            : `Sedang tutup · buka ${s.openTime}`,
        }
  }

  const minPrice = (c) =>
    c.products.length
      ? Math.min.apply(
          null,
          c.products.map((p) => Number(p.price) || 0)
        )
      : 0
  const shortPrice = (n) => (n >= 1000 ? `${Math.round(n / 1000)}K` : String(n))

  function productCard(p, i, carousel) {
    const anim = carousel
      ? i % 2
        ? 'up'
        : 'zoom'
      : ['up', 'zoom', 'tilt'][i % 3]
    return `
    <article class="pcard rv" data-anim="${anim}" style="--dl:${(i % 8) * 90}ms;--d:${800 + (i % 3) * 100}ms">
      <button type="button" class="pcard__media" data-action="open-product" data-id="${esc(p.id)}" aria-label="Lihat detail ${esc(p.name)}">
        <img src="${esc(p.image)}" alt="Chikuro rasa ${esc(p.name)}" loading="lazy">
        <span class="pcard__cat">${esc(p.category)}</span>
        ${p.badge ? `<span class="pcard__badge">${esc(p.badge)}</span>` : ''}
        ${!p.available ? '<span class="pcard__soldout">Habis</span>' : ''}
      </button>
      <div class="pcard__body">
        <h3 class="pcard__name"><button type="button" data-action="open-product" data-id="${esc(p.id)}">${esc(p.name)}</button></h3>
        <p class="pcard__desc">${esc(p.desc)}</p>
        <div class="pcard__foot">
          <span class="price">${rupiah(p.price)}</span>
          <button type="button" class="add-btn" data-action="add" data-id="${esc(p.id)}" aria-label="Tambah ${esc(p.name)} ke keranjang" ${p.available ? '' : 'disabled'}>${icon('plus')}</button>
        </div>
      </div>
    </article>`
  }

  function pageHead(tone, title, intro, extra, deco) {
    return `
    <header class="phead phead--${tone}">
      <div class="container phead__inner">
        <button type="button" class="back-btn rv" data-anim="right" data-action="back">${icon('back')}Kembali</button>
        <h1 class="phead__title rv" data-anim="up" style="--d:900ms">${esc(title)}</h1>
        <p class="phead__intro rv" data-anim="up" style="--dl:160ms">${esc(intro)}</p>
        ${extra || ''}
      </div>
      ${deco || ''}
    </header>`
  }

  function pageHome(c) {
    const s = c.store,
      h = c.home,
      st = openStatus(s)
    const slides = c.banners
      .map(
        (b, i) => `
      <div class="hc__slide" role="group" aria-roledescription="slide" aria-label="${i + 1} dari ${c.banners.length}">
        <img src="${esc(b.image)}" alt="${esc(b.title)}" ${i ? 'loading="lazy"' : ''}>
        ${b.title || b.text ? `<div class="hc__cap"><h3>${esc(b.title)}</h3>${b.text ? `<p>${esc(b.text)}</p>` : ''}</div>` : ''}
      </div>`
      )
      .join('')
    const dots = c.banners
      .map(
        (_, i) =>
          `<button type="button" class="hc__dot" data-action="hc-dot" data-index="${i}" aria-label="Banner ${i + 1}"></button>`
      )
      .join('')
    const names = c.products.map((p) => p.name)
    const marquee = names
      .concat(names)
      .map((n) => `<span>${esc(n)}</span>${icon('star')}`)
      .join('')
    const mp = minPrice(c)

    return `
    <section class="page" data-page="home" aria-label="Home">
      <div class="hero">
        <div class="container hero__grid">
          <div class="hero__copy">
            <p class="status-pill ${st.open ? 'is-open' : 'is-closed'} rv" data-anim="down"><span class="status-dot"></span>${esc(st.label)}</p>
            <h1 class="hero__title rv" data-anim="up" style="--d:1000ms">${esc(h.headline)} <span class="hero__accent">${esc(h.headlineAccent)}</span></h1>
            <p class="hero__lead rv" data-anim="up" style="--dl:160ms">${esc(h.subheadline)}</p>
            <div class="hero__ctas rv" data-anim="up" style="--dl:300ms">
              <a href="#/menu" class="btn btn--yellow btn--lg">${icon('bag')}${esc(h.ctaPrimary)}</a>
              <button type="button" class="btn btn--outline-light btn--lg" data-action="wa-direct">${icon('chat')}${esc(h.ctaSecondary)}</button>
            </div>
            <dl class="hero__facts rv" data-anim="fade" style="--dl:450ms;--d:1000ms">
              <div><dt>Mulai</dt><dd>${rupiah(mp)}</dd></div>
              <div><dt>Pilihan rasa</dt><dd>${c.products.length} rasa</dd></div>
              <div><dt>Lokasi</dt><dd>${esc(h.factLocation)}</dd></div>
            </dl>
          </div>
          <div class="hero__visual rv" data-anim="zoom" style="--d:1000ms;--dl:120ms">
            <div data-parallax="0.05">
              <div class="hc" id="heroCarousel" aria-roledescription="carousel" aria-label="Banner Chikuro Nyam!">
                <div class="hc__track">${slides}</div>
                ${c.banners.length > 1 ? `<div class="hc__nav"><button type="button" class="hc__btn" data-action="hc-prev" aria-label="Banner sebelumnya">${icon('left')}</button><button type="button" class="hc__btn" data-action="hc-next" aria-label="Banner berikutnya">${icon('right')}</button></div>` : ''}
              </div>
              ${c.banners.length > 1 ? `<div class="hc__dots">${dots}</div>` : ''}
            </div>
            <div class="sticker sticker--price" data-parallax="-0.12" aria-hidden="true"><div class="sticker__inner"><div>Rp${shortPrice(mp)}<small>/porsi</small></div></div></div>
            <div class="sticker sticker--tag" data-parallax="0.1" aria-hidden="true"><div class="sticker__inner">Crunchy!</div></div>
          </div>
        </div>
      </div>

      <div class="marquee" aria-hidden="true"><div class="marquee__track">${marquee}</div></div>

      <section class="section" aria-labelledby="promoTitle">
        <div class="container">
          <div class="promo">
            <div class="promo__media rv" data-anim="right" style="--d:1000ms"><div class="promo__img" data-parallax="0.08"><img src="${esc(h.promoImage)}" alt="Aneka rasa Chikuro Nyam!" loading="lazy"></div></div>
            <div class="promo__copy">
              <p class="kicker rv" data-anim="left">${esc(h.promoLabel)}</p>
              <h2 class="promo__title rv" id="promoTitle" data-anim="left" style="--dl:100ms;--d:900ms">${esc(h.promoTitle)}</h2>
              <p class="promo__text rv" data-anim="left" style="--dl:220ms">${esc(h.promoText)}</p>
              <a href="#/menu" class="btn btn--yellow rv" data-anim="zoom" style="--dl:340ms">${esc(h.promoCta)}${icon('arrow')}</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section" style="padding-top:0" aria-labelledby="favTitle">
        <div class="container">
          <div class="sec-head sec-head--row">
            <div>
              <h2 class="sec-title rv" id="favTitle" data-anim="up">${esc(h.favTitle)}</h2>
              <p class="sec-lead rv" data-anim="up" style="--dl:120ms">${esc(h.favText)}</p>
            </div>
            <div class="hs-ctrl rv" data-anim="left">
              <button type="button" class="round-btn" data-action="fav-prev" aria-label="Geser ke kiri">${icon('left')}</button>
              <button type="button" class="round-btn" data-action="fav-next" aria-label="Geser ke kanan">${icon('right')}</button>
            </div>
          </div>
          <div class="hscroll" id="favTrack">${c.products.map((p, i) => productCard(p, i, true)).join('')}</div>
          <a href="#/menu" class="link-arrow">Lihat semua menu ${icon('arrow')}</a>
        </div>
      </section>

      <section class="section" style="padding-top:0" aria-labelledby="aboutTitle">
        <div class="container about__grid">
          <figure class="about__media rv" data-anim="zoom" style="--d:1000ms"><img src="${esc(h.aboutImage)}" alt="Pelanggan menikmati Chikuro di kampus" loading="lazy" data-parallax="0.04"></figure>
          <div>
            <h2 class="sec-title rv" id="aboutTitle" data-anim="left">${esc(h.aboutTitle)}</h2>
            <p class="about__text rv" data-anim="left" style="--dl:120ms">${esc(h.aboutText)}</p>
            <ul class="info-list">
              <li class="rv" data-anim="up" style="--dl:120ms"><span class="info-ic">${icon('pin')}</span><div><strong>Lokasi outlet</strong><span>${esc(s.address)}</span><br><a href="${esc(s.mapsUrl)}" target="_blank" rel="noopener">Buka di Google Maps</a></div></li>
              <li class="rv" data-anim="up" style="--dl:220ms"><span class="info-ic">${icon('clock')}</span><div><strong>Jam buka</strong><span>${esc(s.openDays)}, ${esc(s.openTime)} – ${esc(s.closeTime)} WIB · ${st.open ? 'sedang buka' : 'sedang tutup'}</span></div></li>
              <li class="rv" data-anim="up" style="--dl:320ms"><span class="info-ic">${icon('chat')}</span><div><strong>WhatsApp</strong><span>${esc(s.whatsappDisplay)}</span><br><a href="${waLink('Halo Chikuro Nyam!, saya mau tanya.')}" target="_blank" rel="noopener">Chat sekarang</a></div></li>
            </ul>
          </div>
        </div>
      </section>

      <section class="section" style="padding-top:0">
        <div class="container">
          <div class="cta-band rv" data-anim="zoom" style="--d:900ms">
            <div><h2>${esc(h.ctaTitle)}</h2><p style="margin-top:10px">${esc(h.ctaText)}</p></div>
            <div class="cta-band__actions"><a href="#/menu" class="btn btn--primary btn--lg">${esc(h.ctaPrimary)}</a><a href="#/cara-pesan" class="btn btn--ghost btn--lg">Cara pesan</a></div>
          </div>
        </div>
      </section>
    </section>`
  }

  function menuCategories(c) {
    const cats = []
    c.products.forEach((p) => {
      if (p.category && !cats.includes(p.category)) cats.push(p.category)
    })
    return ['Semua'].concat(cats)
  }
  function menuGridHTML(c) {
    const list =
      menuFilter === 'Semua'
        ? c.products
        : c.products.filter((p) => p.category === menuFilter)
    if (!list.length)
      return `<p class="menu-note">Belum ada produk di kategori ini.</p>`
    return list.map((p, i) => productCard(p, i, false)).join('')
  }

  function pageMenu(c) {
    const cats = menuCategories(c)
    if (!cats.includes(menuFilter)) menuFilter = 'Semua'
    const thumbs = c.products
      .slice(0, 3)
      .map(
        (p, i) =>
          `<div class="deco-thumb" style="transform:rotate(${[-8, 4, -3][i]}deg) translateY(${[0, -26, 10][i]}px)" data-parallax="${[0.08, -0.06, 0.12][i]}"><img src="${esc(p.image)}" alt=""></div>`
      )
      .join('')
    return `
    <section class="page" data-page="menu" aria-label="Menu">
      ${pageHead('red', c.menuPage.title, c.menuPage.intro, '', `<div class="phead__deco" aria-hidden="true">${thumbs}</div>`)}
      <div class="container section--tight">
        <div class="chips rv" data-anim="right" role="group" aria-label="Filter kategori">
          ${cats
            .map((cat) => {
              const count =
                cat === 'Semua'
                  ? c.products.length
                  : c.products.filter((p) => p.category === cat).length
              return `<button type="button" class="chip ${cat === menuFilter ? 'is-active' : ''}" data-action="filter" data-cat="${esc(cat)}" aria-pressed="${cat === menuFilter}">${esc(cat)}<span class="chip__count">${count}</span></button>`
            })
            .join('')}
        </div>
        <div class="menu-grid" id="menuGrid">${menuGridHTML(c)}</div>
        <p class="menu-note rv" data-anim="fade">${esc(c.menuPage.note)}</p>
      </div>
    </section>`
  }

  function payIcon(name) {
    if (/qris/i.test(name)) return 'qr'
    if (/transfer|bank/i.test(name)) return 'bank'
    return 'wallet'
  }

  function pageHow(c) {
    const hw = c.howto
    const steps = (list, base) =>
      list
        .map(
          (s, i) =>
            `<li class="step rv" data-anim="${base}" style="--dl:${i * 130}ms"><span class="step__num">${i + 1}</span><div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div></li>`
        )
        .join('')
    return `
    <section class="page" data-page="cara-pesan" aria-label="Cara Pesan">
      ${pageHead('yellow', hw.title, hw.intro)}
      <div class="container section">
        <div class="how-grid">
          <div class="how-col rv" data-anim="right" style="--d:900ms">
            <p class="how-col__label">${icon('globe')}${esc(hw.webTitle)}</p>
            <h2>Checkout di website</h2>
            <p>${esc(hw.webText)}</p>
            <ol class="steps">${steps(hw.webSteps, 'up')}</ol>
            <div style="display:flex;flex-wrap:wrap;gap:10px">
              <a href="#/menu" class="btn btn--primary">${icon('bag')}Mulai pesan</a>
              <button type="button" class="btn btn--ghost" data-action="open-orders">${icon('receipt')}Pesanan Saya</button>
            </div>
          </div>
          <div class="how-col how-col--wa rv" data-anim="left" style="--d:900ms;--dl:150ms">
            <p class="how-col__label">${icon('chat')}${esc(hw.waTitle)}</p>
            <h2>Chat ke ${esc(c.store.whatsappDisplay)}</h2>
            <p>${esc(hw.waText)}</p>
            <ol class="steps">${steps(hw.waSteps, 'left')}</ol>
            <button type="button" class="btn btn--wa" data-action="wa-direct">${icon('chat')}Buka WhatsApp</button>
          </div>
        </div>

        <div class="pay">
          <h2 class="sec-title rv" data-anim="up">${esc(hw.payTitle)}</h2>
          <div class="pay__grid">
            ${hw.payments.map((p, i) => `<div class="pay__item rv" data-anim="zoom" style="--dl:${i * 120}ms"><span class="pay__ic">${icon(payIcon(p.name))}</span><div><h3>${esc(p.name)}</h3><p>${esc(p.text)}</p></div></div>`).join('')}
            ${hw.pickups.map((p, i) => `<div class="pay__item rv" data-anim="up" style="--dl:${(i + 1) * 140}ms"><span class="pay__ic pay__ic--alt">${icon(i ? 'truck' : 'store')}</span><div><h3>${esc(p.name)}</h3><p>${esc(p.text)}</p></div></div>`).join('')}
          </div>
        </div>
      </div>
    </section>`
  }

  function starsHTML(n) {
    let out = ''
    for (let i = 1; i <= 5; i++) out += icon('star', i <= n ? '' : 'is-empty')
    return `<span class="stars" aria-label="${n} dari 5 bintang">${out}</span>`
  }

  function pageTesti(c) {
    const list = c.testimonials
    const avg = list.length
      ? list.reduce((a, t) => a + (Number(t.rating) || 0), 0) / list.length
      : 0
    const summary = `<div class="rating-sum rv" data-anim="zoom" style="--dl:260ms"><span class="rating-sum__num">${avg.toFixed(1).replace('.', ',')}</span><div>${starsHTML(Math.round(avg))}<p>dari ${list.length} ulasan pelanggan</p></div></div>`
    const anims = ['up', 'tilt', 'zoom', 'left', 'right']
    return `
    <section class="page" data-page="testimoni" aria-label="Testimoni">
      ${pageHead('cream', c.testiPage.title, c.testiPage.intro, summary)}
      <div class="container section" style="padding-top:24px">
        <div class="testi-grid">
          ${list
            .map(
              (t, i) => `
            <figure class="tcard rv" data-anim="${anims[i % anims.length]}" style="--dl:${(i % 3) * 120}ms;--d:${800 + (i % 2) * 150}ms; margin-left:0;margin-right:0">
              ${starsHTML(Number(t.rating) || 0)}
              <blockquote class="tcard__quote" style="margin:14px 0 0">“${esc(t.text)}”</blockquote>
              <figcaption class="tcard__who"><span class="avatar">${esc((t.name || '?').trim().charAt(0).toUpperCase())}</span><span><span class="tcard__name">${esc(t.name)}</span><span class="tcard__role">${esc(t.role)}</span></span></figcaption>
            </figure>`
            )
            .join('')}
        </div>
        <div class="testi-cta rv" data-anim="up">
          <h2>Sudah coba Chikuro Nyam!?</h2>
          <p style="color:var(--brown-soft)">Ceritakan pengalamanmu, testimoni terbaik akan kami tampilkan di sini.</p>
          <button type="button" class="btn btn--primary" data-action="wa-review">${icon('chat')}Kirim testimoni via WhatsApp</button>
        </div>
      </div>
    </section>`
  }

  function pageFaq(c) {
    return `
    <section class="page" data-page="faq" aria-label="FAQ">
      ${pageHead('brown', c.faqPage.title, c.faqPage.intro)}
      <div class="container section faq-wrap">
        <div class="faq-list">
          ${c.faqs
            .map(
              (f, i) => `
            <div class="faq-item rv" data-anim="${i % 2 ? 'left' : 'right'}" style="--dl:${i * 70}ms">
              <h3 style="font-size:inherit"><button type="button" class="faq-item__q" data-action="faq" aria-expanded="false" aria-controls="faq-${i}" id="faq-q-${i}">${esc(f.q)}<span class="faq-item__icon">${icon('plus')}</span></button></h3>
              <div class="faq-item__panel" id="faq-${i}" role="region" aria-labelledby="faq-q-${i}"><div><p>${esc(f.a)}</p></div></div>
            </div>`
            )
            .join('')}
        </div>
        <aside class="faq-aside rv" data-anim="zoom" style="--dl:200ms">
          <h2>Masih bingung?</h2>
          <p>Admin kami siap bantu jawab lewat WhatsApp di jam buka.</p>
          <button type="button" class="btn btn--primary" data-action="wa-direct">${icon('chat')}Tanya admin</button>
        </aside>
      </div>
    </section>`
  }

  function footerHTML(c) {
    const s = c.store
    return `
    <div class="container footer__grid">
      <div>
        <a href="#/home" class="brand" aria-label="Home">${brandHTML(s)}</a>
        <p class="footer__about">${esc(c.footer.about)}</p>
        <div class="footer__social">
          <a href="${waLink('Halo Chikuro Nyam!')}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon('chat')}</a>
          <a href="https://instagram.com/${esc(s.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${icon('ig')}</a>
          <a href="${esc(s.mapsUrl)}" target="_blank" rel="noopener" aria-label="Lokasi di Google Maps">${icon('pin')}</a>
        </div>
      </div>
      <div class="footer__col"><h3>Lokasi</h3><p>${esc(s.address)}</p><a href="${esc(s.mapsUrl)}" target="_blank" rel="noopener">Petunjuk arah →</a></div>
      <div class="footer__col"><h3>Jam buka</h3><p>${esc(s.openDays)}<br>${esc(s.openTime)} – ${esc(s.closeTime)} WIB</p></div>
      <div class="footer__col"><h3>Kontak</h3><a href="${waLink('Halo Chikuro Nyam!')}" target="_blank" rel="noopener">WA ${esc(s.whatsappDisplay)}</a><a href="https://instagram.com/${esc(s.instagram)}" target="_blank" rel="noopener">@${esc(s.instagram)}</a></div>
      <nav class="footer__col" aria-label="Navigasi footer"><h3>Halaman</h3>${ROUTES.map((r) => `<a href="#/${r.id}">${r.label}</a>`).join('')}</nav>
    </div>
    <div class="container footer__bottom"><span>© ${new Date().getFullYear()} ${esc(s.name)} · Kampus II PNM, Madiun</span><span>Pre-order, ambil, nyam!</span></div>`
  }

  function applyTheme(c) {
    const el = $('#ck')
    if (!el) return
    ;['red', 'orange', 'yellow', 'cream', 'brown'].forEach((k) =>
      el.style.setProperty('--' + k, c.theme[k])
    )
    el.dataset.radius = c.theme.radius || 'bulat'
  }

  function renderSite() {
    const c = view()
    applyTheme(c)
    $('#ckBrand').innerHTML = brandHTML(c.store)
    $('#ckMain').innerHTML =
      pageHome(c) + pageMenu(c) + pageHow(c) + pageTesti(c) + pageFaq(c)
    $('#ckFooter').innerHTML = footerHTML(c)
    $('#fabWa').href = waLink('Halo Chikuro Nyam!, saya mau pesan.')
    document.title = `${c.store.name} — Chikuro Crispy di Kampus II PNM Madiun`
    const active = $(`.page[data-page="${route}"]`)
    if (active) active.classList.add('is-active')
    updateNavActive()
    initHeroCarousel()
    observeReveals($('#ckMain'))
    renderCart()
    renderOrders()
    if (modalProduct && $('#productModal').classList.contains('is-open')) {
      const p = findProduct(modalProduct)
      if (p) renderProductModal(p)
    }
    requestParallax()
  }
  function scheduleRender() {
    clearTimeout(renderTimer)
    renderTimer = setTimeout(renderSite, 140)
  }

  /* =======================================================
     BAGIAN 3 — INTERAKSI
     ======================================================= */
  function waLink(text) {
    return `https://wa.me/${String(view().store.whatsapp).replace(/\D/g, '')}?text=${encodeURIComponent(text)}`
  }
  function openWa(text) {
    window.open(waLink(text), '_blank', 'noopener')
  }

  /* ---------- Router (tanpa reload) ---------- */
  function parseRoute() {
    const h = (location.hash || '').replace(/^#\/?/, '')
    return ROUTES.some((r) => r.id === h) ? h : 'home'
  }
  function go(id) {
    if (location.hash === '#/' + id) showPage(id, true)
    else location.hash = '#/' + id
  }
  let navToken = 0
  function showPage(id, animate) {
    const main = $('#ckMain')
    const next = $(`.page[data-page="${id}"]`, main)
    const cur = $('.page.is-active', main)
    route = id
    if (routeStack[routeStack.length - 1] !== id) routeStack.push(id)
    updateNavActive()
    closeMobileMenu()
    if (!next) return
    if (cur === next) {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
      return
    }
    const token = ++navToken
    const enter = () => {
      if (token !== navToken) return
      $$('.page', main).forEach((p) =>
        p.classList.remove('is-active', 'is-leaving', 'is-entering')
      )
      next.classList.add('is-active')
      if (animate && !reduceMotion) next.classList.add('is-entering')
      window.scrollTo(0, 0)
      observeReveals(next)
      requestParallax()
      setTimeout(() => next.classList.remove('is-entering'), 850)
    }
    if (animate && cur && !reduceMotion) {
      cur.classList.add('is-leaving')
      setTimeout(enter, 260)
    } else enter()
  }
  function updateNavActive() {
    $$('[data-route]').forEach((a) => {
      const on = a.dataset.route === route
      a.classList.toggle('is-active', on)
      if (on) a.setAttribute('aria-current', 'page')
      else a.removeAttribute('aria-current')
    })
  }
  function goBack() {
    routeStack.pop()
    const prev = routeStack.pop() || 'home'
    go(prev === route ? 'home' : prev)
  }
  function toggleMobileMenu(force) {
    const m = $('#mobileMenu')
    const b = $('.nav__burger')
    const open =
      typeof force === 'boolean' ? force : !m.classList.contains('is-open')
    m.classList.toggle('is-open', open)
    b.setAttribute('aria-expanded', String(open))
    b.innerHTML = icon(open ? 'x' : 'menu')
  }
  function closeMobileMenu() {
    if ($('#mobileMenu').classList.contains('is-open')) toggleMobileMenu(false)
  }

  /* ---------- Reveal berulang (IntersectionObserver) ---------- */
  function observeReveals(scope) {
    if (!io) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) =>
            e.target.classList.toggle('in', e.isIntersecting)
          )
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
      )
    }
    $$('.rv', scope).forEach((el) => {
      io.unobserve(el)
      el.classList.remove('in')
      io.observe(el)
    })
  }

  /* ---------- Parallax ---------- */
  let parallaxQueued = false
  function requestParallax() {
    if (reduceMotion || parallaxQueued) return
    parallaxQueued = true
    requestAnimationFrame(() => {
      parallaxQueued = false
      const vh = window.innerHeight
      $$('.page.is-active [data-parallax]').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.bottom < -200 || r.top > vh + 200) return
        const speed = parseFloat(el.dataset.parallax) || 0
        const offset = (r.top + r.height / 2 - vh / 2) * speed
        el.style.translate = `0 ${(-offset).toFixed(1)}px`
      })
    })
  }

  /* ---------- Carousel banner ---------- */
  function initHeroCarousel() {
    clearInterval(heroTimer)
    const root = $('#heroCarousel')
    if (!root) return
    const track = $('.hc__track', root)
    const slides = $$('.hc__slide', track)
    const dots = $$('.hc__dot')
    if (!slides.length) return
    heroIndex = Math.min(heroIndex, slides.length - 1)
    const goTo = (i) => {
      heroIndex = (i + slides.length) % slides.length
      track.style.transform = `translateX(-${heroIndex * 100}%)`
      slides.forEach((s, j) =>
        s.classList.toggle('is-current', j === heroIndex)
      )
      dots.forEach((d, j) => {
        d.classList.toggle('is-active', j === heroIndex)
        d.setAttribute('aria-current', String(j === heroIndex))
      })
    }
    root._goTo = goTo
    goTo(heroIndex)
    const start = () => {
      clearInterval(heroTimer)
      if (slides.length > 1 && !reduceMotion)
        heroTimer = setInterval(() => goTo(heroIndex + 1), 5000)
    }
    root._restart = start
    start()
    root.addEventListener('mouseenter', () => clearInterval(heroTimer))
    root.addEventListener('mouseleave', start)
    let x0 = null
    root.addEventListener('pointerdown', (e) => {
      x0 = e.clientX
    })
    root.addEventListener('pointerup', (e) => {
      if (x0 === null) return
      const dx = e.clientX - x0
      x0 = null
      if (Math.abs(dx) > 40) {
        goTo(heroIndex + (dx < 0 ? 1 : -1))
        start()
      }
    })
  }
  function heroGo(delta, index) {
    const root = $('#heroCarousel')
    if (!root || !root._goTo) return
    root._goTo(typeof index === 'number' ? index : heroIndex + delta)
    root._restart()
  }

  /* ---------- Overlays ---------- */
  function openOverlay(id) {
    const el = document.getElementById(id)
    if (!el || openOverlays.includes(el)) return
    el._returnFocus = document.activeElement
    el.classList.add('is-open')
    el.setAttribute('aria-hidden', 'false')
    openOverlays.push(el)
    document.documentElement.classList.add('ck-lock')
    setTimeout(() => {
      const f = $(
        'button:not([disabled]), [href], input',
        el.querySelector('.drawer__panel, .modal__panel')
      )
      if (f) f.focus({ preventScroll: true })
    }, 80)
  }
  function closeOverlay(el) {
    el = el || openOverlays[openOverlays.length - 1]
    if (!el) return
    el.classList.remove('is-open')
    el.setAttribute('aria-hidden', 'true')
    openOverlays = openOverlays.filter((o) => o !== el)
    if (!openOverlays.length)
      document.documentElement.classList.remove('ck-lock')
    if (el._returnFocus && el._returnFocus.focus)
      el._returnFocus.focus({ preventScroll: true })
  }

  /* ---------- Toast ---------- */
  function toast(msg, type) {
    const box = $('#toasts')
    if (!box) return
    const t = document.createElement('div')
    t.className = 'toast' + (type === 'error' ? ' toast--error' : '')
    t.setAttribute('role', 'status')
    t.innerHTML = `<span class="toast__ic">${icon(type === 'error' ? 'x' : type === 'info' ? 'info' : 'check')}</span><span>${esc(msg)}</span>`
    box.appendChild(t)
    while (box.children.length > 3) box.firstElementChild.remove()
    setTimeout(() => {
      t.classList.add('is-leaving')
      setTimeout(() => t.remove(), 230)
    }, 2800)
  }

  /* ---------- Produk & keranjang ---------- */
  const findProduct = (id) => view().products.find((p) => p.id === id)
  function cartLines() {
    return Object.keys(cart)
      .map((id) => {
        const p = findProduct(id)
        return p
          ? { p, qty: cart[id], total: (Number(p.price) || 0) * cart[id] }
          : null
      })
      .filter(Boolean)
  }
  const cartCount = () => cartLines().reduce((a, l) => a + l.qty, 0)
  const cartTotal = () => cartLines().reduce((a, l) => a + l.total, 0)

  function addToCart(id, qty) {
    const p = findProduct(id)
    if (!p) return
    if (!p.available) {
      toast(`Maaf, rasa ${p.name} sedang habis`, 'error')
      return
    }
    cart[id] = (cart[id] || 0) + (qty || 1)
    saveCart()
    renderCart(true)
    toast(`${qty > 1 ? qty + '× ' : ''}${p.name} masuk keranjang`)
  }
  function changeQty(id, d) {
    if (!cart[id]) return
    cart[id] += d
    if (cart[id] <= 0) {
      removeItem(id)
      return
    }
    saveCart()
    renderCart()
  }
  function removeItem(id) {
    const p = findProduct(id)
    delete cart[id]
    saveCart()
    renderCart()
    toast(`${p ? p.name : 'Produk'} dihapus dari keranjang`, 'info')
  }

  function renderCart(bump) {
    Object.keys(cart).forEach((id) => {
      if (!findProduct(id)) delete cart[id]
    })
    const lines = cartLines()
    const count = cartCount()
    const badge = $('#cartBadge')
    badge.textContent = count > 99 ? '99+' : String(count)
    badge.classList.toggle('has-items', count > 0)
    if (bump && count) {
      badge.classList.remove('bump')
      void badge.offsetWidth
      badge.classList.add('bump')
    }
    $('#cartTitle').textContent = count ? `Keranjang (${count})` : 'Keranjang'

    const body = $('#cartBody'),
      foot = $('#cartFoot')
    if (!lines.length) {
      const img = view().products[0]
      body.innerHTML = `<div class="empty">${img ? `<div class="empty__img"><img src="${esc(img.image)}" alt=""></div>` : ''}<h3>Keranjang masih kosong</h3><p>Yuk pilih rasa Chikuro favoritmu dulu.</p><button type="button" class="btn btn--primary" data-action="cart-to-menu">Lihat Menu</button></div>`
      foot.innerHTML = ''
      foot.style.display = 'none'
      return
    }
    foot.style.display = ''
    body.innerHTML = lines
      .map(
        (l) => `
      <div class="citem">
        <img src="${esc(l.p.image)}" alt="${esc(l.p.name)}">
        <div>
          <div class="citem__top"><div><p class="citem__name">${esc(l.p.name)}</p><p class="citem__price">${rupiah(l.p.price)} / porsi</p></div>
            <button type="button" class="remove-btn" data-action="remove" data-id="${esc(l.p.id)}" aria-label="Hapus ${esc(l.p.name)}">${icon('trash')}</button></div>
          <div class="citem__row">
            <div class="qty"><button type="button" data-action="dec" data-id="${esc(l.p.id)}" aria-label="Kurangi ${esc(l.p.name)}">${icon('minus')}</button><span aria-live="polite">${l.qty}</span><button type="button" data-action="inc" data-id="${esc(l.p.id)}" aria-label="Tambah ${esc(l.p.name)}">${icon('plus')}</button></div>
            <span class="citem__total">${rupiah(l.total)}</span>
          </div>
        </div>
      </div>`
      )
      .join('')
    const sub = cartTotal()
    foot.innerHTML = `
      <div class="sum-row"><span>Subtotal (${count} porsi)</span><span>${rupiah(sub)}</span></div>
      <div class="sum-row"><span>Biaya layanan</span><span>Gratis</span></div>
      <div class="sum-row sum-row--total"><span>Total</span><span>${rupiah(sub)}</span></div>
      <button type="button" class="btn btn--primary btn--block btn--lg" data-action="checkout">Checkout ${icon('arrow')}</button>`
  }

  function renderProductModal(p) {
    $('#productPanel').innerHTML = `
      <button type="button" class="icon-btn modal__close" data-action="close-overlay" aria-label="Tutup detail">${icon('x')}</button>
      <div class="pm">
        <div class="pm__media"><img src="${esc(p.image)}" alt="Chikuro rasa ${esc(p.name)}"></div>
        <div class="pm__body">
          <div class="pm__tags"><span class="tag">Chikuro ${esc(p.category)}</span><span class="tag ${p.available ? 'tag--ok' : 'tag--no'}">${p.available ? 'Tersedia' : 'Sedang habis'}</span>${p.badge ? `<span class="tag">${esc(p.badge)}</span>` : ''}</div>
          <h2 class="pm__title" id="pmTitle">${esc(p.name)}</h2>
          <p class="pm__price">${rupiah(p.price)} <span style="font-size:15px;color:var(--brown-soft);font-family:var(--font-body);font-weight:600">/ porsi</span></p>
          <p class="pm__desc">${esc(p.desc)}</p>
          <div class="pm__actions">
            <div class="qty qty--lg"><button type="button" data-action="m-dec" aria-label="Kurangi jumlah">${icon('minus')}</button><span id="mQty" aria-live="polite">${modalQty}</span><button type="button" data-action="m-inc" aria-label="Tambah jumlah">${icon('plus')}</button></div>
            <button type="button" class="btn btn--primary btn--lg" data-action="m-add" ${p.available ? '' : 'disabled'}>${icon('cart')}<span id="mAddLabel">Tambah · ${rupiah(p.price * modalQty)}</span></button>
          </div>
        </div>
      </div>`
  }
  function openProduct(id) {
    const p = findProduct(id)
    if (!p) return
    modalProduct = id
    modalQty = 1
    renderProductModal(p)
    openOverlay('productModal')
  }
  function setModalQty(q) {
    const p = findProduct(modalProduct)
    if (!p) return
    modalQty = Math.max(1, Math.min(50, q))
    $('#mQty').textContent = modalQty
    $('#mAddLabel').textContent = `Tambah · ${rupiah(p.price * modalQty)}`
  }

  /* ---------- Checkout ---------- */
  function renderCheckout() {
    const c = view()
    if (!checkout.method)
      checkout.method = c.howto.pickups[0]
        ? c.howto.pickups[0].name
        : 'Ambil di outlet'
    if (!checkout.payment)
      checkout.payment = c.howto.payments[0]
        ? c.howto.payments[0].name
        : 'Tunai'
    const lines = cartLines(),
      total = cartTotal()
    const isDelivery = /antar/i.test(checkout.method)
    const head = `
      <div class="co__head"><h2 class="co__title" id="coTitle">${['Checkout', 'Ringkasan pesanan', 'Pesanan dibuat'][checkout.step - 1]}</h2><button type="button" class="icon-btn" data-action="close-overlay" aria-label="Tutup checkout">${icon('x')}</button></div>
      <ol class="co__steps"><li class="is-active">1. Data</li><li class="${checkout.step >= 2 ? 'is-active' : ''}">2. Konfirmasi</li><li class="${checkout.step === 3 ? 'is-active' : ''}">3. Selesai</li></ol>`

    if (checkout.step === 3) {
      const o = orders.find((x) => x.id === lastOrderId)
      if (!o) {
        checkout.step = 1
        renderCheckout()
        return
      }
      const pay = c.howto.payments.find((p) => p.name === o.payment)
      const hasEmail = !!(c.store.orderEmail || '').trim()
      const sentNote =
        o.via === 'whatsapp'
          ? 'Pesanan juga dikirim lewat WhatsApp. Pastikan pesannya sudah terkirim di aplikasi WhatsApp.'
          : hasEmail
            ? o.notified
              ? 'Pesanan sudah diteruskan otomatis ke admin.'
              : 'Pesanan tersimpan, tapi belum terkirim otomatis ke admin. Kirim lewat WhatsApp supaya cepat diproses.'
            : 'Supaya admin cepat memproses, kamu juga bisa mengirim pesanan ini lewat WhatsApp.'
      $('#checkoutPanel').innerHTML = `<div class="co">${head}
        <div class="co-done">
          <span class="co-done__check">${icon('check')}</span>
          <p class="co-done__label">Nomor pesanan</p>
          <p class="co-done__id">#${esc(o.id)}</p>
          <p class="co-done__text">Terima kasih, ${esc(o.name)}! Tunjukkan nomor ini saat ${/antar/i.test(o.method) ? 'pesanan diantar' : 'mengambil pesanan di outlet'}.</p>
        </div>
        <dl class="sum-details">
          <dt>Total</dt><dd>${rupiah(o.total)}</dd>
          <dt>Cara ambil</dt><dd>${esc(o.method)}</dd>
          <dt>Siap</dt><dd>${o.time ? 'Jam ' + esc(o.time) : '± 10 menit'}</dd>
          <dt>Pembayaran</dt><dd>${esc(o.payment)}</dd>
        </dl>
        ${paymentDetailHTML(o.payment, o.total) || `<div class="co-pay"><strong>${icon(payIcon(o.payment))}Cara bayar</strong><p>${esc((pay && pay.instruction) || (pay && pay.text) || 'Admin akan menginformasikan cara pembayaran.')}</p></div>`}
        <p class="co__note" style="text-align:left;margin:14px 0 16px">${esc(sentNote)}</p>
        <div class="co__btns">
          <button type="button" class="btn btn--primary btn--block btn--lg" data-action="co-view-orders">${icon('receipt')}Lihat Pesanan Saya</button>
          ${o.via === 'whatsapp' ? '' : `<button type="button" class="btn btn--wa btn--block" data-action="order-wa" data-id="${esc(o.id)}">${icon('chat')}Kirim juga ke WhatsApp</button>`}
          <button type="button" class="btn btn--ghost btn--block" data-action="co-done">Kembali belanja</button>
        </div>
      </div>`
      return
    }
    const err = (k) =>
      checkout.errors[k]
        ? `<small class="field__err">${esc(checkout.errors[k])}</small>`
        : ''

    if (checkout.step === 1) {
      $('#checkoutPanel').innerHTML = `<div class="co">${head}
        <form id="coForm" novalidate>
          <label class="field ${checkout.errors.name ? 'has-error' : ''}"><span>Nama lengkap *</span><input type="text" data-co="name" value="${esc(checkout.name)}" autocomplete="name" placeholder="Contoh: Rina Aprilia">${err('name')}</label>
          <label class="field ${checkout.errors.phone ? 'has-error' : ''}"><span>Nomor WhatsApp *</span><input type="tel" inputmode="numeric" data-co="phone" value="${esc(checkout.phone)}" autocomplete="tel" placeholder="08xx xxxx xxxx">${err('phone')}</label>
          <fieldset class="field"><legend>Cara ambil</legend><div class="radio-row">
            ${c.howto.pickups.map((p, i) => `<label class="radio-card"><input type="radio" name="method" data-co="method" value="${esc(p.name)}" ${checkout.method === p.name ? 'checked' : ''}><span>${icon(i ? 'truck' : 'store')}${esc(p.name)}</span></label>`).join('')}
          </div></fieldset>
          ${isDelivery ? `<label class="field ${checkout.errors.address ? 'has-error' : ''}"><span>Alamat / titik antar *</span><textarea data-co="address" rows="2" placeholder="Contoh: Gedung B lantai 2, ruang B204">${esc(checkout.address)}</textarea>${err('address')}</label>` : ''}
          <label class="field"><span>Jam ${isDelivery ? 'antar' : 'ambil'} (opsional)</span><input type="time" data-co="time" value="${esc(checkout.time)}"></label>
          <fieldset class="field"><legend>Metode pembayaran</legend><div class="radio-row">
            ${c.howto.payments.map((p) => `<label class="radio-card"><input type="radio" name="payment" data-co="payment" value="${esc(p.name)}" ${checkout.payment === p.name ? 'checked' : ''}><span>${icon(payIcon(p.name))}${esc(p.name)}</span></label>`).join('')}
          </div></fieldset>
          ${paymentDetailHTML(checkout.payment, total)}
          <label class="field"><span>Catatan pesanan (opsional)</span><textarea data-co="note" rows="2" placeholder="Contoh: saus dipisah, tambah pedas">${esc(checkout.note)}</textarea></label>
          <div class="co__total"><span>Total (${cartCount()} porsi)</span><strong>${rupiah(total)}</strong></div>
          <button type="submit" class="btn btn--primary btn--block btn--lg">Lanjut ke ringkasan ${icon('arrow')}</button>
        </form></div>`
    } else {
      $('#checkoutPanel').innerHTML = `<div class="co">${head}
        <ul class="sum-list">
          ${lines.map((l) => `<li><span>${esc(l.p.name)} × ${l.qty}</span><span>${rupiah(l.total)}</span></li>`).join('')}
          <li style="border-top:1px dashed var(--line);margin-top:6px;padding-top:10px"><span>Subtotal</span><span>${rupiah(total)}</span></li>
          ${isDelivery ? '<li><span>Ongkir</span><span>Dikonfirmasi admin</span></li>' : ''}
          <li class="sum-row--total" style="display:flex"><span>Total</span><span>${rupiah(total)}</span></li>
        </ul>
        <dl class="sum-details">
          <dt>Nama</dt><dd>${esc(checkout.name)}</dd>
          <dt>WhatsApp</dt><dd>${esc(checkout.phone)}</dd>
          <dt>Cara ambil</dt><dd>${esc(checkout.method)}</dd>
          ${isDelivery ? `<dt>Alamat</dt><dd>${esc(checkout.address)}</dd>` : ''}
          <dt>Jam</dt><dd>${esc(checkout.time || 'Secepatnya')}</dd>
          <dt>Pembayaran</dt><dd>${esc(checkout.payment)}</dd>
          <dt>Catatan</dt><dd>${esc(checkout.note || '-')}</dd>
        </dl>
        <div class="co__btns">
          <button type="button" class="btn btn--primary btn--block btn--lg" data-action="place-order">${icon('check')}Buat Pesanan</button>
          <button type="button" class="btn btn--ghost btn--block" data-action="co-back">${icon('back')}Ubah data</button>
        </div>
        <div class="co-alt">
          <span>Lebih suka chat?</span>
          <button type="button" data-action="place-order-wa">${icon('chat')}Pesan lewat WhatsApp</button>
        </div>
      </div>`
    }
  }
  /* ---------- Detail pembayaran (QRIS & transfer) ---------- */
  function qrPlaceholderSVG() {
    const n = 25,
      cell = 8
    let seed = 7
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280
      return seed / 233280
    }
    const inFinder = (x, y) =>
      [
        [0, 0],
        [n - 7, 0],
        [0, n - 7],
      ].some(
        ([fx, fy]) => x >= fx - 1 && x <= fx + 7 && y >= fy - 1 && y <= fy + 7
      )
    let rects = ''
    for (let y = 0; y < n; y++)
      for (let x = 0; x < n; x++)
        if (!inFinder(x, y) && rnd() > 0.52)
          rects += `<rect x="${x * cell}" y="${y * cell}" width="${cell}" height="${cell}"/>`
    const finder = (fx, fy) =>
      `<rect x="${fx * cell}" y="${fy * cell}" width="${7 * cell}" height="${7 * cell}"/><rect x="${(fx + 1) * cell}" y="${(fy + 1) * cell}" width="${5 * cell}" height="${5 * cell}" fill="#fff"/><rect x="${(fx + 2) * cell}" y="${(fy + 2) * cell}" width="${3 * cell}" height="${3 * cell}"/>`
    return `<svg class="paybox__qr" viewBox="0 0 ${n * cell} ${n * cell}" role="img" aria-label="Contoh kode QRIS" fill="#1a1a1a"><rect width="100%" height="100%" fill="#fff"/>${rects}${finder(0, 0)}${finder(n - 7, 0)}${finder(0, n - 7)}</svg>`
  }
  function paymentDetailHTML(method, total) {
    const s = view().store
    const type = payIcon(method || '')
    if (type === 'qr') {
      const img = (s.qrisImage || '').trim()
      return `
      <div class="paybox paybox--qris">
        <div class="paybox__head"><span class="paybox__brand">QRIS</span><span>${esc(s.qrisName)}</span></div>
        <div class="paybox__qrwrap">
          ${img ? `<img class="paybox__qr" src="${esc(img)}" alt="Kode QRIS ${esc(s.qrisName)}">` : qrPlaceholderSVG()}
          ${img ? '' : '<span class="paybox__sample">Contoh — upload QRIS asli di Edit Website</span>'}
        </div>
        <p class="paybox__amount">Total bayar <strong>${rupiah(total)}</strong></p>
        <p class="paybox__hint">Scan pakai e-wallet atau m-banking (GoPay, OVO, DANA, ShopeePay, dll), masukkan nominal sesuai total, lalu simpan bukti bayar untuk ditunjukkan saat mengambil.</p>
        ${img ? `<a class="btn btn--sm btn--ghost" href="${esc(img)}" download="QRIS-${esc(s.qrisName)}.png" target="_blank" rel="noopener" style="box-shadow:none">${icon('upload')}Simpan gambar QRIS</a>` : ''}
      </div>`
    }
    if (type === 'bank') {
      return `
      <div class="paybox paybox--bank">
        <div class="paybox__head"><span class="paybox__brand paybox__brand--bank">${esc(s.bankName)}</span><span>Transfer bank</span></div>
        <p class="paybox__label">Nomor rekening</p>
        <div class="paybox__acc">
          <span class="paybox__num">${esc(String(s.bankAccount).replace(/(\d{4})(?=\d)/g, '$1 '))}</span>
          <button type="button" class="btn btn--sm btn--primary" style="box-shadow:none" data-action="copy-text" data-text="${esc(String(s.bankAccount).replace(/\s/g, ''))}" data-label="Nomor rekening">${icon('copy')}Salin</button>
        </div>
        <p class="paybox__holder">a.n. <strong>${esc(s.bankHolder)}</strong></p>
        <p class="paybox__amount">Total transfer <strong>${rupiah(total)}</strong></p>
        <p class="paybox__hint">Transfer sesuai total, lalu simpan bukti transfer dan tunjukkan saat mengambil pesanan.</p>
      </div>`
    }
    return ''
  }
  function copyText(text, label) {
    const ok = () => toast(`${label} disalin`)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(ok)
        .catch(() => fallbackCopy(text, label))
    } else fallbackCopy(text, label)
  }
  function fallbackCopy(text, label) {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    try {
      document.execCommand('copy')
      toast(`${label} disalin`)
    } catch (e) {
      toast('Gagal menyalin, salin manual ya', 'error')
    }
    ta.remove()
  }

  function validateCheckout() {
    const e = {}
    const digits = checkout.phone.replace(/\D/g, '')
    if (checkout.name.trim().length < 2) e.name = 'Nama wajib diisi.'
    if (!/^(08|628)\d{7,12}$/.test(digits))
      e.phone = 'Masukkan nomor WhatsApp yang valid, contoh 08123456789.'
    if (/antar/i.test(checkout.method) && checkout.address.trim().length < 4)
      e.address = 'Alamat antar wajib diisi.'
    checkout.errors = e
    return !Object.keys(e).length
  }
  function buildOrderMessage(o) {
    const c = view()
    const isDelivery = /antar/i.test(o.method)
    return [
      `Halo ${c.store.name}, saya mau pesan:`,
      `No. pesanan: #${o.id}`,
      '',
      '*DETAIL PESANAN*',
      ...o.items.map(
        (l, i) => `${i + 1}. ${l.name} x${l.qty} = ${rupiah(l.total)}`
      ),
      '',
      `*Total: ${rupiah(o.total)}*`,
      isDelivery ? '(Ongkir menunggu konfirmasi admin)' : null,
      '',
      '*DATA PEMESAN*',
      `Nama: ${o.name}`,
      `No. WA: ${o.phone}`,
      `Cara ambil: ${o.method}`,
      isDelivery ? `Alamat: ${o.address}` : null,
      `Jam: ${o.time || 'Secepatnya'}`,
      `Pembayaran: ${o.payment}`,
      payIcon(o.payment) === 'bank'
        ? `Rekening tujuan: ${c.store.bankName} ${c.store.bankAccount} a.n. ${c.store.bankHolder}`
        : null,
      payIcon(o.payment) === 'qr' ? `QRIS: ${c.store.qrisName}` : null,
      `Catatan: ${o.note || '-'}`,
      '',
      'Terima kasih!',
    ]
      .filter((l) => l !== null)
      .join('\n')
  }

  /* ---------- Pesanan langsung di website ---------- */
  function createOrder(via) {
    return {
      id: 'CN' + Date.now().toString().slice(-6),
      createdAt: new Date().toISOString(),
      status: 'Diterima',
      via: via,
      notified: false,
      items: cartLines().map((l) => ({
        id: l.p.id,
        name: l.p.name,
        qty: l.qty,
        price: Number(l.p.price) || 0,
        total: l.total,
      })),
      total: cartTotal(),
      name: checkout.name.trim(),
      phone: checkout.phone.trim(),
      method: checkout.method,
      address: /antar/i.test(checkout.method) ? checkout.address.trim() : '',
      time: checkout.time,
      payment: checkout.payment,
      note: checkout.note.trim(),
    }
  }
  function finishOrder(order) {
    orders.unshift(order)
    saveOrders()
    cart = {}
    saveCart()
    renderCart()
    renderOrders(true)
    lastOrderId = order.id
    checkout.step = 3
    checkout.note = ''
    renderCheckout()
    toast(`Pesanan #${order.id} berhasil dibuat`)
  }
  async function placeOrder(btn) {
    if (!cartLines().length) {
      toast('Keranjang kosong', 'error')
      return
    }
    const order = createOrder('website')
    const email = (view().store.orderEmail || '').trim()
    if (email) {
      btn.disabled = true
      btn.textContent = 'Membuat pesanan…'
      try {
        const res = await fetch(
          `https://formsubmit.co/ajax/${encodeURIComponent(email)}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              _subject: `Pesanan baru #${order.id} — ${view().store.name}`,
              _template: 'box',
              _captcha: 'false',
              Pesanan: buildOrderMessage(order),
            }),
          }
        )
        order.notified = res.ok
      } catch (e) {
        order.notified = false
      }
    }
    finishOrder(order)
  }
  function placeOrderViaWa() {
    if (!cartLines().length) {
      toast('Keranjang kosong', 'error')
      return
    }
    const order = createOrder('whatsapp')
    order.notified = true
    openWa(buildOrderMessage(order))
    finishOrder(order)
  }

  const activeOrders = () =>
    orders.filter((o) => o.status !== 'Selesai' && o.status !== 'Dibatalkan')
  function statusClass(s) {
    return s === 'Dibatalkan'
      ? 'is-cancel'
      : s === 'Selesai'
        ? 'is-done'
        : s === 'Siap Diambil'
          ? 'is-ready'
          : 'is-new'
  }
  function fmtDate(iso) {
    try {
      return new Date(iso).toLocaleString('id-ID', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch (e) {
      return ''
    }
  }
  function renderOrders(bump) {
    const badge = $('#orderBadge')
    if (!badge) return
    const n = activeOrders().length
    badge.textContent = String(n)
    badge.classList.toggle('has-items', n > 0)
    if (bump && n) {
      badge.classList.remove('bump')
      void badge.offsetWidth
      badge.classList.add('bump')
    }
    const body = $('#ordersBody')
    if (!orders.length) {
      body.innerHTML = `<div class="empty"><span class="info-ic" style="width:64px;height:64px;border-radius:20px">${icon('receipt')}</span><h3>Belum ada pesanan</h3><p>Pesanan yang kamu buat di website akan muncul di sini lengkap dengan statusnya.</p><button type="button" class="btn btn--primary" data-action="orders-to-menu">Mulai pesan</button></div>`
      return
    }
    body.innerHTML =
      `<p class="orders-note">${icon('info')}Pesanan tersimpan di perangkat ini. Tunjukkan nomor pesanan saat mengambil.</p>` +
      orders
        .map((o) => {
          const stepIdx = ORDER_FLOW.indexOf(o.status)
          return `
      <article class="ocard">
        <div class="ocard__top">
          <div><p class="ocard__id">#${esc(o.id)}</p><p class="ocard__date">${esc(fmtDate(o.createdAt))}</p></div>
          <span class="ostatus ${statusClass(o.status)}">${esc(o.status)}</span>
        </div>
        ${o.status === 'Dibatalkan' ? '' : `<ol class="otrack" aria-label="Status pesanan">${ORDER_FLOW.map((s, i) => `<li class="${i <= stepIdx ? 'is-done' : ''}"><span></span>${esc(s)}</li>`).join('')}</ol>`}
        <ul class="ocard__items">${o.items.map((l) => `<li><span>${esc(l.name)} × ${l.qty}</span><span>${rupiah(l.total)}</span></li>`).join('')}</ul>
        <div class="ocard__total"><span>Total</span><strong>${rupiah(o.total)}</strong></div>
        <p class="ocard__meta">${esc(o.method)} · ${esc(o.time || 'Secepatnya')} · ${esc(o.payment)}</p>
        <div class="ocard__actions">
          <button type="button" class="btn btn--sm btn--ghost" data-action="order-wa" data-id="${esc(o.id)}">${icon('chat')}WhatsApp</button>
          <button type="button" class="btn btn--sm btn--ghost" data-action="order-reorder" data-id="${esc(o.id)}">Pesan lagi</button>
          ${o.status === 'Diterima' ? `<button type="button" class="btn btn--sm btn--danger" data-action="order-cancel" data-id="${esc(o.id)}">Batalkan</button>` : ''}
        </div>
      </article>`
        })
        .join('')
  }
  function reorder(id) {
    const o = orders.find((x) => x.id === id)
    if (!o) return
    let added = 0
    o.items.forEach((l) => {
      const p = findProduct(l.id)
      if (p && p.available) {
        cart[p.id] = (cart[p.id] || 0) + l.qty
        added++
      }
    })
    if (!added) {
      toast('Rasa di pesanan ini sedang tidak tersedia', 'error')
      return
    }
    saveCart()
    renderCart(true)
    closeOverlay($('#ordersDrawer'))
    openOverlay('cartDrawer')
    toast('Pesanan lama dimasukkan ke keranjang')
  }
  function customerWaLink(phone, text) {
    let d = String(phone).replace(/\D/g, '')
    if (d.indexOf('0') === 0) d = '62' + d.slice(1)
    return `https://wa.me/${d}?text=${encodeURIComponent(text)}`
  }

  /* ---------- Event klik global ---------- */
  function onClick(e) {
    const el = e.target.closest('[data-action]')
    if (!el) {
      const link = e.target.closest('a[href^="#/"]')
      if (link) {
        closeMobileMenu()
        if (openOverlays.length)
          openOverlays.slice().forEach((o) => closeOverlay(o))
      }
      return
    }
    const a = el.dataset.action
    const id = el.dataset.id
    switch (a) {
      case 'skip':
        e.preventDefault()
        $('#ckMain').focus()
        break
      case 'toggle-menu':
        toggleMobileMenu()
        break
      case 'open-cart':
        closeMobileMenu()
        renderCart()
        openOverlay('cartDrawer')
        break
      case 'close-overlay':
        closeOverlay(el.closest('.overlay'))
        break
      case 'cart-to-menu':
        closeOverlay($('#cartDrawer'))
        go('menu')
        break
      case 'back':
        goBack()
        break
      case 'back-top':
        window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
        break
      case 'open-product':
        openProduct(id)
        break
      case 'add':
        addToCart(id, 1)
        el.animate &&
          !reduceMotion &&
          el.animate(
            [
              { transform: 'scale(1)' },
              { transform: 'scale(.85)' },
              { transform: 'scale(1)' },
            ],
            { duration: 260, easing: 'cubic-bezier(.23,1,.32,1)' }
          )
        break
      case 'inc':
        changeQty(id, 1)
        break
      case 'dec':
        changeQty(id, -1)
        break
      case 'remove':
        removeItem(id)
        break
      case 'm-inc':
        setModalQty(modalQty + 1)
        break
      case 'm-dec':
        setModalQty(modalQty - 1)
        break
      case 'm-add':
        addToCart(modalProduct, modalQty)
        closeOverlay($('#productModal'))
        break
      case 'checkout':
        if (!cartLines().length) {
          toast('Keranjang masih kosong', 'error')
          break
        }
        closeOverlay($('#cartDrawer'))
        checkout.step = 1
        checkout.errors = {}
        renderCheckout()
        openOverlay('checkoutModal')
        break
      case 'co-back':
        checkout.step = 1
        renderCheckout()
        break
      case 'place-order':
        placeOrder(el)
        break
      case 'place-order-wa':
        placeOrderViaWa()
        break
      case 'co-view-orders':
        closeOverlay($('#checkoutModal'))
        renderOrders()
        openOverlay('ordersDrawer')
        break
      case 'co-done':
        closeOverlay($('#checkoutModal'))
        go('menu')
        break
      case 'open-orders':
        closeMobileMenu()
        renderOrders()
        openOverlay('ordersDrawer')
        break
      case 'orders-to-menu':
        closeOverlay($('#ordersDrawer'))
        go('menu')
        break
      case 'order-wa': {
        const o = orders.find((x) => x.id === id)
        if (o) {
          openWa(buildOrderMessage(o))
          toast('Membuka WhatsApp…', 'info')
        }
        break
      }
      case 'order-reorder':
        reorder(id)
        break
      case 'copy-text':
        copyText(el.dataset.text, el.dataset.label || 'Teks')
        break
      case 'order-cancel': {
        const o = orders.find((x) => x.id === id)
        if (!o || !window.confirm(`Batalkan pesanan #${o.id}?`)) break
        o.status = 'Dibatalkan'
        saveOrders()
        renderOrders()
        toast(`Pesanan #${o.id} dibatalkan`, 'info')
        break
      }
      case 'filter': {
        menuFilter = el.dataset.cat
        $$('.chip').forEach((ch) => {
          const on = ch.dataset.cat === menuFilter
          ch.classList.toggle('is-active', on)
          ch.setAttribute('aria-pressed', String(on))
        })
        const grid = $('#menuGrid')
        grid.innerHTML = menuGridHTML(view())
        observeReveals(grid)
        break
      }
      case 'faq': {
        const item = el.closest('.faq-item')
        const open = !item.classList.contains('is-open')
        item.classList.toggle('is-open', open)
        el.setAttribute('aria-expanded', String(open))
        break
      }
      case 'hc-prev':
        heroGo(-1)
        break
      case 'hc-next':
        heroGo(1)
        break
      case 'hc-dot':
        heroGo(0, Number(el.dataset.index))
        break
      case 'fav-prev':
      case 'fav-next': {
        const t = $('#favTrack')
        if (t)
          t.scrollBy({
            left: (a === 'fav-next' ? 1 : -1) * t.clientWidth * 0.8,
            behavior: reduceMotion ? 'auto' : 'smooth',
          })
        break
      }
      case 'wa-direct':
        openWa(`Halo ${view().store.name}, saya mau pesan Chikuro.`)
        break
      case 'wa-review':
        openWa(
          `Halo ${view().store.name}, saya mau kasih testimoni:\n\nNama:\nRasa favorit:\nUlasan:`
        )
        break
      default:
        if (a.indexOf('ed-') === 0) onEditorAction(a, el)
    }
  }

  function onInput(e) {
    const t = e.target
    if (t.dataset.co) {
      checkout[t.dataset.co] = t.value
      if (
        t.type === 'radio' &&
        (t.dataset.co === 'method' || t.dataset.co === 'payment')
      ) {
        const panel = $('#checkoutPanel'),
          y = panel.scrollTop
        checkout.errors = {}
        renderCheckout()
        panel.scrollTop = y
      }
      return
    }
    if (t.dataset.path && draft) onEditorInput(t)
  }
  function onSubmit(e) {
    if (e.target.id === 'coForm') {
      e.preventDefault()
      if (validateCheckout()) {
        checkout.step = 2
        renderCheckout()
      } else {
        renderCheckout()
        toast('Lengkapi data yang ditandai dulu ya', 'error')
      }
    }
  }

  /* =======================================================
     BAGIAN 4 — EDITOR (MODE ADMIN)
     ======================================================= */
  const ED_TABS = [
    { id: 'home', label: 'Beranda' },
    { id: 'products', label: 'Produk' },
    { id: 'banners', label: 'Banner' },
    { id: 'pages', label: 'Halaman' },
    { id: 'testi', label: 'Testimoni' },
    { id: 'faq', label: 'FAQ' },
    { id: 'store', label: 'Info Toko' },
    { id: 'orders', label: 'Pesanan Masuk' },
    { id: 'theme', label: 'Warna & Tampilan' },
  ]
  const NEW_ITEM = {
    products: () => ({
      id: 'produk-' + Date.now(),
      name: 'Rasa Baru',
      category: 'Classic',
      price: 10000,
      image: IMG.group,
      badge: '',
      available: true,
      desc: 'Deskripsi singkat rasa baru.',
    }),
    banners: () => ({
      image: IMG.group,
      title: 'Judul banner baru',
      text: 'Keterangan singkat.',
    }),
    testimonials: () => ({
      name: 'Nama pelanggan',
      role: 'Mahasiswa',
      rating: 5,
      text: 'Tulis ulasan di sini.',
    }),
    faqs: () => ({ q: 'Pertanyaan baru?', a: 'Jawaban singkat.' }),
    'howto.webSteps': () => ({
      title: 'Langkah baru',
      text: 'Penjelasan singkat.',
    }),
    'howto.waSteps': () => ({
      title: 'Langkah baru',
      text: 'Penjelasan singkat.',
    }),
    'howto.payments': () => ({
      name: 'Metode baru',
      text: 'Penjelasan singkat.',
    }),
    'howto.pickups': () => ({ name: 'Opsi baru', text: 'Penjelasan singkat.' }),
  }

  const fText = (label, path, type, ph) => {
    const v = getPath(draft, path)
    return `<label class="ef"><span class="ef__label">${label}</span><input class="ef__input" type="${type || 'text'}" data-path="${path}" ${type === 'number' ? 'data-num="1" min="0" step="500"' : ''} value="${esc(v == null ? '' : v)}" ${ph ? `placeholder="${esc(ph)}"` : ''}></label>`
  }
  const fArea = (label, path, rows) =>
    `<label class="ef"><span class="ef__label">${label}</span><textarea class="ef__input" rows="${rows || 3}" data-path="${path}">${esc(getPath(draft, path) || '')}</textarea></label>`
  const fCheck = (label, path) =>
    `<label class="ef-check"><input type="checkbox" data-path="${path}" data-bool="1" ${getPath(draft, path) ? 'checked' : ''}>${label}</label>`
  const fSelect = (label, path, opts, num) => {
    const v = String(getPath(draft, path))
    return `<label class="ef"><span class="ef__label">${label}</span><select class="ef__input" data-path="${path}" ${num ? 'data-num="1"' : ''}>${opts
      .map((o) => {
        const val = typeof o === 'object' ? o.v : o
        const lab = typeof o === 'object' ? o.l : o
        return `<option value="${esc(val)}" ${String(val) === v ? 'selected' : ''}>${esc(lab)}</option>`
      })
      .join('')}</select></label>`
  }
  const fColor = (label, path) =>
    `<label class="ef"><span class="ef__label">${label}</span><span class="ef-color"><input type="color" data-path="${path}" value="${esc(getPath(draft, path))}"><code>${esc(getPath(draft, path))}</code></span></label>`
  const fImage = (label, path) => {
    const v = getPath(draft, path) || ''
    const isData = v.indexOf('data:') === 0
    return `<div class="ef"><span class="ef__label">${label}</span><div class="ef-img">
      <img class="ef-img__preview" src="${esc(v)}" alt="" data-preview="${path}">
      <div class="ef-img__ctrl">
        <label class="btn btn--sm btn--ghost">${icon('upload')}Upload foto<input type="file" accept="image/*" data-upload="${path}" hidden></label>
        <input class="ef__input" type="url" data-path="${path}" value="${isData ? '' : esc(v)}" placeholder="${isData ? 'Memakai foto dari perangkat' : 'atau tempel link gambar'}">
      </div></div></div>`
  }

  function listEditor(path, label, fieldsFn, titleFn, thumbFn) {
    const list = getPath(draft, path) || []
    return `${list
      .map((item, i) => {
        const key = path + '.' + i
        return `<details class="ei" data-key="${key}" ${edOpen[key] ? 'open' : ''}>
        <summary>${thumbFn ? `<img src="${esc(thumbFn(item))}" alt="">` : ''}<span class="ei__title">${esc(titleFn(item, i))}</span>
          <button type="button" class="ei__del" data-action="ed-remove" data-list="${path}" data-index="${i}" aria-label="Hapus">${icon('trash')}</button>${icon('down', 'ei__chev')}</summary>
        <div class="ei__body">${fieldsFn(key, item, i)}</div>
      </details>`
      })
      .join(
        ''
      )}<button type="button" class="ed-add" data-action="ed-add" data-list="${path}">${icon('plus')}Tambah ${label}</button>`
  }

  function editorTabHTML(tab) {
    const stepFields = (k) =>
      fText('Judul langkah', k + '.title') + fArea('Penjelasan', k + '.text', 2)
    switch (tab) {
      case 'home':
        return `
        <h3 class="eh">Hero (bagian paling atas)</h3>
        ${fText('Headline', 'home.headline')}${fText('Headline aksen (warna kuning)', 'home.headlineAccent')}
        ${fArea('Deskripsi', 'home.subheadline')}
        <div class="ef--row">${fText('Tombol utama', 'home.ctaPrimary')}${fText('Tombol kedua', 'home.ctaSecondary')}</div>
        ${fText('Info lokasi singkat', 'home.factLocation')}
        <h3 class="eh">Promo</h3>
        ${fText('Label promo', 'home.promoLabel')}${fText('Judul promo', 'home.promoTitle')}${fArea('Isi promo', 'home.promoText')}${fText('Tombol promo', 'home.promoCta')}${fImage('Foto promo', 'home.promoImage')}
        <h3 class="eh">Rasa favorit</h3>
        ${fText('Judul', 'home.favTitle')}${fArea('Deskripsi', 'home.favText', 2)}
        <h3 class="eh">Tentang kami</h3>
        ${fText('Judul', 'home.aboutTitle')}${fArea('Isi', 'home.aboutText', 4)}${fImage('Foto', 'home.aboutImage')}
        <h3 class="eh">Ajakan bawah</h3>
        ${fText('Judul', 'home.ctaTitle')}${fArea('Isi', 'home.ctaText', 2)}`
      case 'products':
        return `
        <h3 class="eh">Daftar produk</h3><p class="ehint">Ketuk produk untuk mengubah nama, harga, foto, dan deskripsi.</p>
        ${listEditor(
          'products',
          'produk',
          (k) => `
          ${fText('Nama rasa', k + '.name')}
          <div class="ef--row">${fText('Harga (Rp)', k + '.price', 'number')}${fSelect('Kategori', k + '.category', ['Classic', 'Loaded'])}</div>
          ${fImage('Foto produk', k + '.image')}
          ${fText('Label kecil (opsional)', k + '.badge', 'text', 'Contoh: Terlaris')}
          ${fArea('Deskripsi', k + '.desc')}
          ${fCheck('Tersedia (hapus centang jika habis)', k + '.available')}`,
          (p) => `${p.name} · ${rupiah(p.price)}`,
          (p) => p.image
        )}`
      case 'banners':
        return `
        <h3 class="eh">Carousel banner di Home</h3><p class="ehint">Upload foto banner sendiri. Ukuran ideal: tegak / persegi.</p>
        ${listEditor(
          'banners',
          'banner',
          (k) =>
            fImage('Foto banner', k + '.image') +
            fText('Judul', k + '.title') +
            fText('Keterangan', k + '.text'),
          (b, i) => b.title || 'Banner ' + (i + 1),
          (b) => b.image
        )}`
      case 'pages':
        return `
        <h3 class="eh">Halaman Menu</h3>${fText('Judul', 'menuPage.title')}${fArea('Intro', 'menuPage.intro', 2)}${fArea('Catatan bawah', 'menuPage.note', 2)}
        <h3 class="eh">Halaman Cara Pesan</h3>${fText('Judul', 'howto.title')}${fArea('Intro', 'howto.intro', 2)}
        ${fText('Label lewat website', 'howto.webTitle')}${fArea('Keterangan website', 'howto.webText', 2)}
        <p class="ef__label" style="margin:6px 0 8px">Langkah lewat website</p>${listEditor('howto.webSteps', 'langkah', stepFields, (s, i) => `${i + 1}. ${s.title}`)}
        <div style="height:14px"></div>${fText('Label WhatsApp', 'howto.waTitle')}${fArea('Keterangan WhatsApp', 'howto.waText', 2)}
        <p class="ef__label" style="margin:6px 0 8px">Langkah via WhatsApp</p>${listEditor('howto.waSteps', 'langkah', stepFields, (s, i) => `${i + 1}. ${s.title}`)}
        <div style="height:14px"></div>${fText('Judul pembayaran', 'howto.payTitle')}
        <p class="ef__label" style="margin:6px 0 8px">Metode pembayaran</p>${listEditor(
          'howto.payments',
          'metode',
          (k) =>
            fText('Nama', k + '.name') +
            fArea('Keterangan', k + '.text', 2) +
            fArea(
              'Instruksi bayar (muncul setelah pesanan dibuat)',
              k + '.instruction',
              2
            ),
          (p) => p.name
        )}
        <p class="ef__label" style="margin:14px 0 8px">Opsi pengambilan</p>${listEditor(
          'howto.pickups',
          'opsi',
          (k) =>
            fText('Nama', k + '.name') + fArea('Keterangan', k + '.text', 2),
          (p) => p.name
        )}
        <h3 class="eh">Halaman Testimoni</h3>${fText('Judul', 'testiPage.title')}${fArea('Intro', 'testiPage.intro', 2)}
        <h3 class="eh">Halaman FAQ</h3>${fText('Judul', 'faqPage.title')}${fArea('Intro', 'faqPage.intro', 2)}`
      case 'testi':
        return `
        <h3 class="eh">Testimoni pelanggan</h3>
        ${listEditor(
          'testimonials',
          'testimoni',
          (k) =>
            `${fText('Nama', k + '.name')}${fText('Keterangan (mis. Mahasiswa TI)', k + '.role')}${fSelect(
              'Rating',
              k + '.rating',
              [5, 4, 3, 2, 1].map((n) => ({ v: n, l: n + ' bintang' })),
              true
            )}${fArea('Ulasan', k + '.text')}`,
          (t) => `${t.name} · ${t.rating}★`
        )}`
      case 'faq':
        return `
        <h3 class="eh">Pertanyaan (FAQ)</h3>
        ${listEditor(
          'faqs',
          'pertanyaan',
          (k) => fText('Pertanyaan', k + '.q') + fArea('Jawaban', k + '.a'),
          (f) => f.q
        )}`
      case 'store':
        return `
        <h3 class="eh">Identitas</h3>
        ${fText('Nama toko', 'store.name')}${fImage('Logo (opsional, kosongkan untuk logo teks)', 'store.logo')}
        <h3 class="eh">Lokasi & kontak</h3>
        ${fArea('Alamat', 'store.address', 2)}${fText('Link Google Maps', 'store.mapsUrl', 'url')}
        <div class="ef--row">${fText('No. WA (format 62…)', 'store.whatsapp', 'tel')}${fText('No. WA tampilan', 'store.whatsappDisplay')}</div>
        ${fText('Username Instagram (tanpa @)', 'store.instagram')}
        <h3 class="eh">Pembayaran QRIS</h3>
        <p class="ehint">Upload foto/screenshot QRIS asli toko Anda. Selama kosong, pembeli melihat contoh QRIS yang tidak bisa di-scan.</p>
        ${fImage('Gambar QRIS', 'store.qrisImage')}${fText('Nama merchant QRIS', 'store.qrisName')}
        <h3 class="eh">Rekening transfer</h3>
        <div class="ef--row">${fText('Bank', 'store.bankName')}${fText('No. rekening', 'store.bankAccount')}</div>
        ${fText('Atas nama', 'store.bankHolder')}
        <h3 class="eh">Penerimaan pesanan website</h3>
        <p class="ehint">Isi email agar setiap pesanan dari website otomatis dikirim ke email Anda (gratis lewat FormSubmit). Saat pesanan pertama masuk, FormSubmit mengirim email aktivasi — klik link di email itu sekali. Kosongkan jika belum dipakai.</p>
        ${fText('Email penerima pesanan', 'store.orderEmail', 'email', 'contoh: chikuronyam@gmail.com')}
        <h3 class="eh">Jam buka</h3>
        ${fText('Hari buka', 'store.openDays')}
        <div class="ef--row">${fText('Jam buka', 'store.openTime', 'time')}${fText('Jam tutup', 'store.closeTime', 'time')}</div>
        ${fCheck('Tutup setiap hari Minggu', 'store.closedSunday')}
        ${fSelect('Status buka/tutup', 'store.statusMode', [
          { v: 'otomatis', l: 'Otomatis sesuai jam' },
          { v: 'buka', l: 'Paksa: Buka' },
          { v: 'tutup', l: 'Paksa: Tutup' },
        ])}
        <h3 class="eh">Footer</h3>${fArea('Deskripsi footer', 'footer.about', 3)}`
      case 'theme':
        return `
        <h3 class="eh">Pilihan palet cepat</h3>
        <div class="presets">${PRESETS.map((p, i) => `<button type="button" class="preset" data-action="ed-preset" data-index="${i}"><span class="preset__sw">${['red', 'orange', 'yellow', 'cream', 'brown'].map((k) => `<i style="background:${p.colors[k]}"></i>`).join('')}</span>${p.name}</button>`).join('')}</div>
        <h3 class="eh">Warna custom</h3>
        <div class="ef--row">${fColor('Merah (utama)', 'theme.red')}${fColor('Oranye', 'theme.orange')}</div>
        <div class="ef--row">${fColor('Kuning', 'theme.yellow')}${fColor('Cream (latar)', 'theme.cream')}</div>
        ${fColor('Cokelat (teks)', 'theme.brown')}
        <h3 class="eh">Bentuk sudut</h3>
        ${fSelect('Gaya sudut kartu & foto', 'theme.radius', [
          { v: 'bulat', l: 'Bulat (playful)' },
          { v: 'tegas', l: 'Tegas (minimal)' },
        ])}`
      case 'orders':
        return ordersAdminHTML()
      default:
        return ''
    }
  }

  function ordersAdminHTML() {
    const email = (content.store.orderEmail || '').trim()
    const head = `
      <h3 class="eh">Pesanan masuk</h3>
      <p class="ehint">${
        email
          ? `Pesanan dari semua pembeli dikirim otomatis ke <b>${esc(email)}</b>. Daftar di bawah hanya berisi pesanan yang dibuat di browser ini.`
          : 'Daftar ini hanya berisi pesanan yang dibuat di browser ini. Agar pesanan dari semua pembeli sampai ke Anda, isi <b>Email penerima pesanan</b> di tab Info Toko.'
      }</p>`
    if (!orders.length)
      return (
        head + '<p class="ehint" style="margin-top:12px">Belum ada pesanan.</p>'
      )
    const statuses = ORDER_FLOW.concat('Dibatalkan')
    return (
      head +
      orders
        .map(
          (o) => `
      <div class="ei" style="padding:12px">
        <div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start">
          <div><strong>#${esc(o.id)} · ${esc(o.name)}</strong><div class="ehint" style="margin:2px 0 0">${esc(fmtDate(o.createdAt))} · ${esc(o.phone)} · via ${o.via === 'whatsapp' ? 'WhatsApp' : 'website'}</div></div>
          <strong>${rupiah(o.total)}</strong>
        </div>
        <p style="margin:8px 0;font-size:13px">${o.items.map((l) => `${esc(l.name)} ×${l.qty}`).join(', ')}</p>
        <p class="ehint" style="margin:0 0 10px">${esc(o.method)}${o.address ? ' — ' + esc(o.address) : ''} · ${esc(o.time || 'Secepatnya')} · ${esc(o.payment)}${o.note ? ' · Catatan: ' + esc(o.note) : ''}</p>
        <div style="display:flex;gap:8px;align-items:center">
          <select class="ef__input" style="flex:1" data-order-status="${esc(o.id)}" aria-label="Status pesanan ${esc(o.id)}">${statuses.map((s) => `<option ${s === o.status ? 'selected' : ''}>${s}</option>`).join('')}</select>
          <button type="button" class="btn btn--sm btn--wa" style="box-shadow:none" data-action="ed-order-chat" data-id="${esc(o.id)}">${icon('chat')}Chat</button>
          <button type="button" class="ei__del" data-action="ed-order-delete" data-id="${esc(o.id)}" aria-label="Hapus pesanan">${icon('trash')}</button>
        </div>
      </div>`
        )
        .join('') +
      `<button type="button" class="ed-add" data-action="ed-orders-clear">${icon('trash')}Kosongkan daftar pesanan</button>`
    )
  }

  function renderEditor() {
    $('#edTabs').innerHTML = ED_TABS.map(
      (t) =>
        `<button type="button" role="tab" class="etab ${t.id === editorTab ? 'is-active' : ''}" aria-selected="${t.id === editorTab}" data-action="ed-tab" data-tab="${t.id}">${t.label}</button>`
    ).join('')
    $('#edBody').innerHTML = editorTabHTML(editorTab)
    updateDirty()
  }
  const isDirty = () =>
    draft && JSON.stringify(draft) !== JSON.stringify(content)
  function updateDirty() {
    const d = $('#edDirty')
    if (!d) return
    const dirty = isDirty()
    d.classList.toggle('is-dirty', !!dirty)
    $('span', d).textContent = dirty
      ? 'Ada perubahan yang belum disimpan'
      : 'Belum ada perubahan'
  }

  function openEditor() {
    draft = clone(content)
    edOpen = {}
    $('#ck').classList.add('is-editing')
    $('#editor').setAttribute('aria-hidden', 'false')
    closeMobileMenu()
    renderEditor()
    renderSite()
  }
  function closeEditor() {
    draft = null
    $('#ck').classList.remove('is-editing', 'is-previewing')
    $('#editor').setAttribute('aria-hidden', 'true')
    renderSite()
  }

  function onEditorInput(t) {
    const path = t.dataset.path
    let val = t.type === 'checkbox' ? t.checked : t.value
    if (t.dataset.num) val = Number(val) || 0
    setPath(draft, path, val)
    const prev = $(`[data-preview="${path}"]`)
    if (prev) prev.src = val
    if (t.type === 'color') {
      const code = t.parentElement.querySelector('code')
      if (code) code.textContent = val
      applyTheme(draft)
    }
    const det = t.closest('.ei')
    if (det && /\.(name|title|q|price|rating)$/.test(path)) {
      const key = det.dataset.key
      const item = getPath(draft, key)
      const span = $('.ei__title', det)
      if (span && item)
        span.textContent =
          item.q ||
          (item.price != null
            ? `${item.name} · ${rupiah(item.price)}`
            : item.rating != null
              ? `${item.name} · ${item.rating}★`
              : item.title || item.name)
    }
    updateDirty()
    scheduleRender()
  }

  function compressImage(file, keepPng) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const img = new Image()
        img.onload = () => {
          const max = 1100
          const scale = Math.min(1, max / Math.max(img.width, img.height))
          const cv = document.createElement('canvas')
          cv.width = Math.round(img.width * scale)
          cv.height = Math.round(img.height * scale)
          cv.getContext('2d').drawImage(img, 0, 0, cv.width, cv.height)
          resolve(
            keepPng
              ? cv.toDataURL('image/png')
              : cv.toDataURL('image/jpeg', 0.8)
          )
        }
        img.onerror = reject
        img.src = reader.result
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }
  function onChange(e) {
    const t = e.target
    if (t.dataset.co && t.type === 'radio') {
      onInput(e)
      return
    }
    if (t.dataset.orderStatus) {
      const o = orders.find((x) => x.id === t.dataset.orderStatus)
      if (o) {
        o.status = t.value
        saveOrders()
        renderOrders()
        toast(`Status #${o.id}: ${o.status}`)
      }
      return
    }
    if (t.dataset.upload && draft) {
      const file = t.files && t.files[0]
      if (!file) return
      if (!/^image\//.test(file.type)) {
        toast('File harus berupa gambar', 'error')
        return
      }
      const path = t.dataset.upload
      compressImage(file, file.type === 'image/png' && /logo/.test(path))
        .then((data) => {
          setPath(draft, path, data)
          const prev = $(`[data-preview="${path}"]`)
          if (prev) prev.src = data
          const urlInput = t
            .closest('.ef-img__ctrl')
            .querySelector('input[type="url"]')
          if (urlInput) {
            urlInput.value = ''
            urlInput.placeholder = 'Memakai foto dari perangkat'
          }
          updateDirty()
          scheduleRender()
          toast('Foto berhasil diupload')
        })
        .catch(() => toast('Gagal membaca foto', 'error'))
      t.value = ''
      return
    }
    if (
      t.dataset.path &&
      draft &&
      (t.tagName === 'SELECT' || t.type === 'checkbox')
    )
      onEditorInput(t)
  }

  function exportContent() {
    const json = JSON.stringify(draft || content, null, 2)
    const done = () =>
      toast(
        'Data disalin. Tempel menggantikan isi DEFAULT_CONTENT di script.js'
      )
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(json)
        .then(done)
        .catch(() => downloadJson(json))
    } else downloadJson(json)
  }
  function downloadJson(json) {
    const blob = new Blob([json], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'chikuro-konten.json'
    document.body.appendChild(a)
    a.click()
    a.remove()
    toast('File chikuro-konten.json diunduh')
  }

  function onEditorAction(a, el) {
    switch (a) {
      case 'ed-open':
        openEditor()
        break
      case 'ed-tab':
        editorTab = el.dataset.tab
        renderEditor()
        $('#edBody').scrollTop = 0
        break
      case 'ed-add': {
        const path = el.dataset.list
        const list = getPath(draft, path)
        list.push(NEW_ITEM[path]())
        edOpen[path + '.' + (list.length - 1)] = true
        renderEditor()
        scheduleRender()
        const body = $('#edBody')
        const target = $(`.ei[data-key="${path}.${list.length - 1}"]`, body)
        if (target)
          target.scrollIntoView({ block: 'center', behavior: 'smooth' })
        break
      }
      case 'ed-remove': {
        const path = el.dataset.list
        const list = getPath(draft, path)
        if (list.length <= 1 && (path === 'products' || path === 'banners')) {
          toast('Minimal harus ada 1 item', 'error')
          break
        }
        const label = list[Number(el.dataset.index)]
        if (
          !window.confirm(
            `Hapus "${label.name || label.title || label.q || 'item ini'}"?`
          )
        )
          break
        list.splice(Number(el.dataset.index), 1)
        edOpen = {}
        renderEditor()
        scheduleRender()
        break
      }
      case 'ed-preset': {
        const p = PRESETS[Number(el.dataset.index)]
        Object.assign(draft.theme, p.colors)
        renderEditor()
        applyTheme(draft)
        updateDirty()
        toast(`Palet "${p.name}" diterapkan (belum disimpan)`, 'info')
        break
      }
      case 'ed-preview':
        $('#ck').classList.add('is-previewing')
        window.scrollTo({ top: 0 })
        break
      case 'ed-back':
        $('#ck').classList.remove('is-previewing')
        break
      case 'ed-save':
        content = clone(draft)
        if (saveContent()) {
          toast('Perubahan disimpan di browser ini')
          closeEditor()
        }
        break
      case 'ed-cancel':
        if (
          isDirty() &&
          !window.confirm('Batalkan semua perubahan yang belum disimpan?')
        )
          break
        closeEditor()
        toast('Perubahan dibatalkan', 'info')
        break
      case 'ed-reset':
        if (
          !window.confirm(
            'Reset semua konten ke tampilan awal? Perubahan yang sudah disimpan akan hilang.'
          )
        )
          break
        try {
          localStorage.removeItem(STORAGE_KEY)
        } catch (e) {
          /* abaikan */
        }
        content = clone(DEFAULT_CONTENT)
        draft = clone(content)
        edOpen = {}
        renderEditor()
        renderSite()
        toast('Website dikembalikan ke tampilan awal', 'info')
        break
      case 'ed-export':
        exportContent()
        break
      case 'ed-order-chat': {
        const o = orders.find((x) => x.id === el.dataset.id)
        if (o)
          window.open(
            customerWaLink(
              o.phone,
              `Halo ${o.name}, pesanan #${o.id} di ${view().store.name} statusnya: ${o.status}. Terima kasih!`
            ),
            '_blank',
            'noopener'
          )
        break
      }
      case 'ed-order-delete': {
        const o = orders.find((x) => x.id === el.dataset.id)
        if (!o || !window.confirm(`Hapus pesanan #${o.id} dari daftar?`)) break
        orders = orders.filter((x) => x !== o)
        saveOrders()
        renderOrders()
        renderEditor()
        break
      }
      case 'ed-orders-clear':
        if (
          !orders.length ||
          !window.confirm('Hapus semua pesanan di daftar ini?')
        )
          break
        orders = []
        saveOrders()
        renderOrders()
        renderEditor()
        toast('Daftar pesanan dikosongkan', 'info')
        break
      default:
        break
    }
  }

  /* =======================================================
     INIT
     ======================================================= */
  function init() {
    const root = document.getElementById('chikuro-app')
    if (!root || root.dataset.ready) return
    root.dataset.ready = '1'
    root.innerHTML = shellHTML()
    const ck = $('#ck')

    ck.addEventListener('click', onClick)
    ck.addEventListener('input', onInput)
    ck.addEventListener('change', onChange)
    ck.addEventListener('submit', onSubmit)
    $('#editor').addEventListener(
      'toggle',
      (e) => {
        const d = e.target
        if (d.classList && d.classList.contains('ei'))
          edOpen[d.dataset.key] = d.open
      },
      true
    )
    $('#editor').addEventListener(
      'click',
      (e) => {
        if (e.target.closest('.ei__del')) e.preventDefault()
      },
      true
    )

    document.addEventListener('keydown', (e) => {
      if (e.key !== 'Escape') return
      if (openOverlays.length) closeOverlay()
      else if ($('#mobileMenu').classList.contains('is-open'))
        toggleMobileMenu(false)
      else if (ck.classList.contains('is-previewing'))
        ck.classList.remove('is-previewing')
    })

    const onScroll = () => {
      const y = window.scrollY
      $('#ckNav').classList.toggle('is-scrolled', y > 8)
      $('#backTop').classList.toggle('is-visible', y > 600)
      requestParallax()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', requestParallax)
    window.addEventListener('hashchange', () => showPage(parseRoute(), true))

    route = parseRoute()
    routeStack = [route]
    renderSite()
    onScroll()
    setInterval(() => {
      if (!draft) {
        const pill = $('.status-pill')
        if (pill) {
          const st = openStatus(view().store)
          pill.className = `status-pill ${st.open ? 'is-open' : 'is-closed'} rv in`
          pill.innerHTML = `<span class="status-dot"></span>${esc(st.label)}`
        }
      }
    }, 60000)
  }

  window.ChikuroApp = { init: init }
  function boot() {
    if (document.getElementById('chikuro-app')) init()
  }
  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', boot)
  else boot()
})()
