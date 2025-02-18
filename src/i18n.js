import { createI18n } from 'vue-i18n';

const messages = {
    en: {
      logo: 'Kostovnya',
      handmadeProducts: 'Handmade beaded products',
      exclusiveJewelry: 'Exclusive necklaces, bracelets, and more',
      viewProducts: 'View products',
      popularGoods: 'Popular Goods',
      newArrivals: 'New Arrivals',
      followInsta: 'Follow us on Instagram, to',
      dontMissTheMost: 'not miss the most interesting!',
      instagramHandle: '@koshtovnya_jewelry',
      quoteText: 'Ukrainian ethnos is the voice of ancestors, embroidered on the fabric of the soul, woven into the music of winds and the echoes of the Carpathian peaks. It is an endless source of strength and beauty that nourishes our present...',
      gnatKhotkevich: 'Hnat Khotkevych',
      defaultBeadProducer: 'Czech beads',
      buyButton: 'Buy',
      aboutUs: 'About Us',
      aboutDelivery: 'About Payment | Delivery',
      wishlist: 'Wishlist',
      searchPlaceholder: 'Search in our catalog',
      bracelets: 'Bracelets',
      herdany: 'Herdany',
      dukats: 'Dukats',
      sylyanky: 'Sylyanky',
      earrings: 'Earrings',
      belts: 'Belts',
      shopByCategory: 'Shop by Category',
      userAccount: 'User account',
      links: 'LINKS',
      contactUs: 'CONTACT US',
      followUs: 'FOLLOW US',
      description: 'We create unique handmade beadwork, preserving the traditions of Ukrainian culture. Here you will find items full of authenticity and beauty.',
      address: 'Stepana Bandery 22, Kolomyia',
      
      titleAboutUs: 'About Us',
      historyOpen: 'History of foundation "Koshtovnya"',
      aboutHistoryOpen: 'In 2015, an idea was born, starting as a simple passion — creating traditional beadwork necklaces. Initially, it was a soul-enriching hobby, recreating authentic patterns and ornaments. Each piece radiated its unique energy, blending traditional Ukrainian motifs with modern elements. This allowed the creation of jewelry that held not only aesthetic value but also deep symbolism.',
      aboutUsConclusion: '"Koshtovnya" has grown from a simple passion into a true brand, where each piece of jewelry is created with soul and respect for traditions. The designs combine centuries-old Ukrainian culture with modern trends, making every item unique and one-of-a-kind.',
      faqTitle: 'Frequently Asked Questions',
      faqQuestionFirst: 'What is the difference between bead manufacturers?',
      faqRespondFirst: 'More expensive beads often differ in material quality and manufacturing processes. For example, Japanese beads are usually distinguished by precise size and shape, making them easier to work with and ensuring a more aesthetic result. Czech beads are also known for their high quality, while Chinese beads may have variations in shape, affecting the final product\'s appearance.',
      faqQuestionSecond: 'How to care for beaded jewelry?',
      faqRespondSecond: 'To maintain the quality of bead jewelry, it is important to avoid contact with water, especially chlorinated or salty water. It is not recommended to wear such jewelry while swimming or engaging in sports. Store them in a dry place, in a soft pouch or box, to prevent damage or scratches.',
      faqQuestionThird: 'Is it possible to order an individual piece of jewelry?',
      faqRespondThird: 'Yes, we offer the possibility of creating jewelry by custom request. You can choose the design, colors, and sizes that suit your personal preferences. Contact us to discuss the details, and we will create a unique piece just for you.',
      contactUsAboutUs: 'Contact us',
      emailPost: 'Email',
      messageEmail: 'Message',
      yourMessage: 'Your Message',


    },
    uk: {
      handmadeProducts: 'Вироби ручної роботи з бісеру',
      exclusiveJewelry: 'Ексклюзивні гердани, браслети, силянки та інше',
      viewProducts: 'Дивитися вироби',
      popularGoods: 'Популярні товари',
      newArrivals: 'Новинки',
      followInsta: 'Слідкуй за нами в Instagram, щоб',
      dontMissTheMost: 'не пропустити найцікавіше!',
      instagramHandle: '@koshtovnya_jewelry',
      quoteText: 'Українське етно – це голос предків, вишитий на полотні душі, вплетений у музику вітрів і відлуння карпатських вершин. Це нескінченне джерело сили та краси, яке живить наше сьогодення...',
      gnatKhotkevich: 'Гнат Хоткевич',
      defaultBeadProducer: 'Чешський бісер',
      buyButton: 'Купити',
      aboutUs: 'Про нас',
      aboutDelivery: 'Про оплату | Доставку',
      wishlist: 'Список бажаного',
      searchPlaceholder: 'Пошук в нашому каталозі',
      bracelets: 'Браслети',
      herdany: 'Гердани',
      dukats: 'Дукати',
      sylyanky: 'Силянки',
      earrings: 'Сережки',
      belts: 'Пояси', 
      shopByCategory: 'Придбайте за категорією',   
      userAccount: 'Кабінет користувача',
      links: 'ПОСИЛАННЯ',
      contactUs: 'ЗВ\'ЯЖІТЬСЯ З НАМИ',
      followUs: 'СЛІДКУЙТЕ ЗА НАМИ',
      description: 'Ми виготовляємо унікальні прикраси ручної роботи з бісеру, зберігаючи традиції української культури. У нас ви знайдете вироби, сповнені автентичності та краси.',
      address: 'вул. Степана Бандери 22, Коломия',
      logo: 'Коштовня',
      titleAboutUs: 'Про нас',
      historyOpen: 'Історія заснування "Коштовня"',
      aboutHistoryOpen: 'У 2015 році зародилася ідея, що почалася як просте захоплення — створення традиційних герданів із бісеру. Спочатку це було заняттям для душі, відтворюючи автентичні візерунки та орнаменти. Кожен виріб випромінював свою унікальну енергію, поєднуючи традиційні українські мотиви з сучасними елементами. Це дозволяло створювати прикраси, які мали не лише естетичну цінність, а й несли в собі глибокий символізм.',
      aboutUsConclusion: '"Коштовня" виросла з простого захоплення у справжній бренд, де кожна прикраса створюється з душею та повагою до традицій. У виробах поєднується багатовікова українська культура та сучасні тенденції, що робить кожну річ унікальною і неповторною.',
      faqTitle: 'Часті запитання',
      faqQuestionFirst: 'У чому різниця між виробниками бісерів?',
      faqRespondFirst: 'Дорожчий бісер часто відрізняється якістю матеріалів та процесом виробництва. Наприклад, японський бісер зазвичай вирізняється точністю розмірів і форми, що полегшує роботу і забезпечує більш естетичний результат. Чеський бісер також славиться високою якістю, тоді як китайський бісер може мати варіації у формі, що впливає на зовнішній вигляд готового виробу.',
      faqQuestionSecond: 'Як доглядати за прикрасами з бісеру?',
      faqRespondSecond: 'Для збереження якості прикрас з бісеру важливо уникати їх контакту з водою, особливо з хлорованою чи солоною. Не рекомендується носити такі прикраси під час купання чи занять спортом. Зберігайте їх у сухому місці, у м’якому мішечку чи коробочці, щоб уникнути пошкоджень чи подряпин.',
      faqQuestionThird: 'Чи можливо замовити індивідуальну прикрасу?',
      faqRespondThird: 'Так, ми пропонуємо можливість створення прикрас за індивідуальним запитом. Ви можете обрати дизайн, кольори та розміри, які відповідають вашим особистим вподобанням. Зв\'яжіться з нами для обговорення деталей, і ми створимо унікальний виріб спеціально для вас.',
      contactUsAboutUs: 'Зв\'яжіться з нами',
      emailPost: 'Електронна пошта',
      messageEmail: 'Повідомлення',
      yourMessage: 'Ваше повідомлення',
    }
  };
  

const i18n = createI18n({
  locale: 'uk', // Мова за замовчуванням
  messages, // Переклади
});

export default i18n;
