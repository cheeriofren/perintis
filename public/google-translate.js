function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'id',
      includedLanguages: 'en,ar,zh-CN,fr,de,hi,it,ja,ko,pt,ru,es,th,tr,vi',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
    },
    'google_translate_element'
  );
} 