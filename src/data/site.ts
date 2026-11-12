// src/data/site.ts
// ─── Single source of truth for all site-wide constants ─────────────────────
// Replace PHONE_NUMBER and WA_NUMBER with the real values when ready.

export const SITE = {
  name:         'جلي بلاط حفرالباطن',
  nameEn:       'JaliBlaat Al Batin',
  tagline:      'خدمات جلي وتلميع الرخام والأرضيات — حفر الباطن',
  taglineEn:    'Luxury Marble & Floor Restoration — Hafar Al-Batin',
  url:          'https://jaliblaatalbatin.com',
  phone:        '+966508866324',          // primary phone number
  phoneDisplay: '+966 50 886 6324',       // shown to users
  phoneAlt:     '+966539811299',          // alternate phone number
  phoneAltDisplay: '+966 53 981 1299',
  email:        'jaly.balat.hafar@gmail.com',
  emailAlt:     'aamirwafa89@gmail.com',
  waNumber:     '966508866324',           // WhatsApp number (no +)
  waMessageAr:  'السلام عليكم، أرغب في الاستفسار عن خدمة جلي الأرضيات في حفر الباطن',
  waMessageEn:  'Hello, I would like to inquire about tile polishing services in Hafar Al-Batin',
  hours:        'يومياً: 7:00 ص - 11:00 م',
  hoursEn:      'Daily: 7:00 AM – 11:00 PM',
  address: {
    street:   'طريق الملك فيصل',
    city:     'حفر الباطن',
    region:   'المنطقة الشرقية',
    zip:      '39921',
    country:  'SA',
    lat:      28.4342,
    lng:      45.9636,
  },
  districts: {
    ar: ['العزيزية','الخالدية','المحمدية','البلدية','أبو موسى الأشعري','الروضة','الربوة','الفيصلية','التلال','النزهة','الواحة','الريان'],
    en: ['Al-Aziziyah','Al-Khalidiyah','Al-Muhammadiyah','Al-Baladiyah','Abu Musa Al-Ashari','Al-Rawdah','Al-Rabwah','Al-Faisaliyah','Al-Tilal','Al-Naifiyah','Al-Wahat','Al-Rayyan'],
  },
};

export function waLink(lang: 'ar' | 'en' = 'ar') {
  const msg = lang === 'ar' ? SITE.waMessageAr : SITE.waMessageEn;
  return `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(msg)}`;
}

export function sitePath(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\/+/, '')}`;
}
