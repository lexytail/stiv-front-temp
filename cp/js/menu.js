    const menu = [
      {href: "/cp/?page=add_account", video: "https://www.youtube.com/watch?v=LBU0WJXtQsM", addClass: "zmdi-account-add", content: 'Добавить аккаунт', rel:"add_account"},
      {href: "/cp/?page=account_list", video: "https://www.youtube.com/watch?v=8cmDdik3Fww", addClass: "zmdi-accounts-list", content: 'Список аккаунтов', rel:"account_list"},
      {href: "/cp/?page=account_settings", addClass: "zmdi-wrench", content: 'Настройки аккаунтов', rel:"account_settings"},
      
      {href: "javascript:void(0)", addClass: "zmdi-format-valign-bottom", content: 'Наполнение аккаунтов', arrow: 1,
        subMenu: [
            {href: "/cp/?page=filling_settings", video: "https://www.youtube.com/watch?v=fLJZLZt5wn4", addClass: "zmdi-format-valign-bottom", content: "Настройки", rel:"filling_settings"},
            {href: "/cp/?page=postsFeed", video: "https://www.youtube.com/watch?v=n2r_RGQSorE", addClass: "zmdi-copy", content: "Лента публикаций", rel:"postsFeed"},
            {href: "/cp/?page=posting", addClass: "zmdi-plus-square", content: "Добавить свой пост", rel: "posting"}
        ]
      },

      {href: "/cp/?page=direct", addClass: "zmdi-email", content: 'Директ', rel:"direct"},

      {href: "javascript:void(0)", addClass: "zmdi-trending-up", content: 'Раскрутка аккаунтов', arrow: 1,
        subMenu: [
            {href: "/cp/?page=promotionAccount", video: "https://www.youtube.com/watch?v=WvPEUKB0DpA", addClass: "zmdi-wrench", content: "Настройки", rel:"promotionAccount"},
        ]
      },
      
      {href: "/cp/?page=unblock", video: "https://www.youtube.com/watch?v=psNpkLGIuHk", addClass: "zmdi-lock-open", content: 'Разблокировка аккаунтов', rel:"unblock"},
      
      {href: "/cp/?page=referal", video: "https://www.youtube.com/watch?v=n2X-xCJ2VoY", addClass: "zmdi-money zmdi-hc-rotate-90", content: 'Реферальная система', rel:"referal"},

      {href: "https://community.insaev.ru/", addClass: "zmdi-comments", content: 'Сообщество', target: 1},
      
      {href: "javascript:void(0)", addClass: "zmdi-info-outline", content: 'ПОМОЩЬ', arrow: 1,
        subMenu: [
            {href: "https://www.youtube.com/watch?v=riQ9uT0DuU0", content: "Обучение", target: 1},
            {href: "/cp/?page=errors", content: "Расшифровка логов", rel:"errors"},
            {href: "/cp/?page=faq", content: "FAQ", rel:"faq"},
            {href: "/cp/?page=recommend", content: "Рекомендации", rel:"recommend"}
        ]
      },
      
      {href: "https://tele.click/joinchat/DAQ8mk8cX_Kwl25ofFu8Xg", addClass: "telegramico", content: 'Чат в Telegram', target: 1},
      
    ];
