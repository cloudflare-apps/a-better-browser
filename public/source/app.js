(function (version, user) {
  var options = INSTALL_OPTIONS;
  var appElement;
  var DAY_DURATION = 1000 * 60 * 60 * 24;
  var now = new Date()
  var weekAgo = new Date(now - DAY_DURATION * 7)

  if (localStorage.lastSeen && weekAgo > new Date(localStorage.lastSeen)) {
    return;
  }

  localStorage.lastSeen = now.getTime()

  var TRANSLATIONS = {
    'en': ['You are using an outdated browser.', 'More information &#187;'],
    'af': ['Jy gebruik \'n verouderde webblaaier.', 'Meer inligting &#187;'],
    'ar': ['المتصفح الذي تستخدمه قديم وغير محدث.', 'المزيد من المعلومات &#187; '],
    'be': ['Вы выкарыстоўваеце састарэлы браўзэр.', 'Падрабязьней &#187;'],
    'bg': ['Използвате стар браузър.', 'Повече информация &#187;'],
    'bn': ['আপনি একটি সেকেলে ঘরানার ব্রাউজার ব্যবহার করছেন।', 'বিস্তারিত দেখুন &#187;'],
    'cs': ['Používáte zastaralý prohlížeč.', 'Více informací &#187;'],
    'da': ['Du bruger en forældet browser.', 'Mere information &#187;'],
    'de': ['Sie benutzen einen veralteten Browser.', 'Mehr Informationen &#187;'],
    'el': ['Χρησιμοποιείτε ένα ξεπερασμένο πρόγραμμα περιήγησης.', 'Περισσότερες πληροφορίες &#187;'],
    'eo': ['Vi uzas antikvan retumilon.', 'Pli informo &#187;'],
    'es': ['Su navegador está obsoleto.', 'M&aacute;s informaci&oacute;n &#187;'],
    'fa': ['شما از مرورگری قدیمی استفاده می کنید.', '&#187;اطلاعات بیشتر'],
    'fi': ['Käytät vanhentunutta selainta.', 'Lisää tietoa &#187;'],
    'fr': ['Votre navigateur n\'est pas à jour.', 'Plus d\'information &#187;'],
    'fy': ['Jo brûkt op dit stuit in ferâldere webbrowser.', 'Mear ynformaasje &#187;'],
    'ga': ['Tá tú ag baint úsáide as brabhsálaí atá as dáta.', 'Tuilleadh eolais &#187;'],
    'he': ['דפדפן האינטרנט שלך אינו מעודכן.', 'למידע נוסף &#187;'],
    'hr': ['Koristite zastarjeli pretraživač.', 'Više informacija &#187;'],
    'hu': ['A böngészője elavult.', 'További információ &#187;'],
    'id': ['Anda menggunakan web browser versi lama.', 'Informasi selengkapnya &#187;'],
    'is': ['Þú ert að nota úreltan vafra.', 'Nánari upplýsingar &#187;'],
    'it': ['Stai usando un browser datato.', 'Ulteriori informazioni &#187;'],
    'ja': ['旧式のブラウザーを利用されています。', '詳細情報 &#187;'],
    'ko': ['오래된 웹브라우저를 사용하고 계십니다.', '자세히 알아보기 &#187;'],
    'lt': ['Jūs naudojate pasenusią naršyklę.', 'Daugiau informacijos &#187;'],
    'lv': ['Jūs izmantojat novecojušu pārlūku.', 'Uzzināt vairāk &#187;'],
    'nb-NO': ['Du bruker en utdatert nettleser.', 'Mer informasjon &#187;'],
    'nl': ['U gebruikt op dit moment een verouderde webbrowser.', 'Meer informatie &#187;'],
    'pl': ['Używasz przestarzałej przeglądarki.', 'Więcej informacji &#187;'],
    'pt-BR': ['Você está usando um navegador desatualizado.', 'Mais informações &#187;'],
    'pt-PT': ['Está a utilizar um navegador desatualizado.', 'Mais informações &#187;'],
    'ro': ['Browserul dumneavoastră este depăşit.', 'Mai multe informații &#187;'],
    'ru': ['Вы используете устаревший браузер.', 'Подробнее &#187;'],
    'sk': ['Používate zastaralý prehliadač.', 'Viac informácií &#187;'],
    'sl': ['Uporabljate zastarel brskalnik.', 'Več informacij &#187;'],
    'sr': ['Vi koristite zastarelu verziju browsera.', 'Vi&#353;e informacija &#187;'],
    'sv': ['Du använder en gammal webbläsare.', 'Mer information &#187;'],
    'tr': ['Çok eski bir tarayıcı kullanıyorsunuz.', 'Daha fazla bilgi &#187;'],
    'vi': ['Trình duyệt bạn dùng đã lỗi thời rồi.', 'Thêm thông tin &#187;'],
    'zh': ['您的浏览器版本过旧。', '更多信息 &#187;'],
    'zh-tw': ['你正在使用過時的瀏覽器。', '詳細資訊 &#187;']
  };

  function updateElement () {
    var versions = [
      [version.internetExplorer, options.internetExplorer || 8],
      [version.edge            , options.edge || 0],
      [version.firefox         , options.firefox || 0],
      [version.chrome          , options.chrome || 0],
      [version.safari          , options.safari || 0]
    ]

    // version[version number, minimum]
    for (var i = 0; i < versions.length; i++ ) {
      version = versions[i];

      if (version[0] && version[1] >= version[0]) return;
    }

    var language = language = window.navigator.language || window.navigator.userLanguage || 'en';
    var translation = (TRANSLATIONS[language] || TRANSLATIONS[language.substring( 0, 2 )] || TRANSLATIONS.en)
    var moreInformationLink = '<a href="https://www.whatbrowser.org/intl/' + language + '/" target="_blank">' + translation[1] + '</a>',

    var closeButton = document.createElement('button');
    closeButton.class = 'cloudflare-old-browser-close';
    closeButton.innerHTML = '&times;';

    appElement = INSTALL.createElement({selector: 'body', method: 'prepend'}, appElement);
    appElement.setAttribute('app-id', 'a-better-browser')
    message.id = 'cloudflare-old-browser';
    message.innerHTML = translation.replace('{{LINK}}', )

    message.appendChild(closeButton);

    closeButton.addEventListener('click', function () {
      body.removeChild(message);
      appElement.setAttribute('data-visibility', 'visible');
    });

    appElement.setAttribute('data-visibility', 'visible');
    document.body.setAttribute('data-old-browser', version[0]);
  }

  window.INSTALL_SCOPE = {
    setOptions: function (nextOptions) {
      options = nextOptions;
    }
  };
}())
