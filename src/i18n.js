import { createI18n } from 'vue-i18n';

const messages = {
    en: {
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
      shopByCategory: 'Shop by Category'
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
      shopByCategory: 'Придбайте за категорією'   
    }
  };
  

const i18n = createI18n({
  locale: 'uk', // Мова за замовчуванням
  messages, // Переклади
});

export default i18n;
