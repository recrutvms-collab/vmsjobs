const TOTAL_STEPS = 5;

const startScreen = {
  image: "images/start.png",
  title: "Який напрям у ВМС – твій?",
  subtitle: "У ВМС безліч професій. Перевір, яка з них може стати твоєю.",
  body: "ВМС ЗСУ – це більше, ніж море. Це дрони, кібербезпека, медицина, інженерія, штаб, комунікації. Багато хто навіть не здогадується, скільки насправді є напрямів і який із них може підійти саме йому.\n\nПройди короткий тест із кількох простих запитань і дізнайся, до якого профілю у ВМС ти більш схильний. Жодних складних анкет – лише вибір між двома варіантами на кожному кроці.",
  cta: "Почати тест",
  ctaNote: "~2 хвилини, без реєстрації"
};

const questions = {
  Q1: {
    depth: 1,
    image: "images/q1.png",
    text: "Як будемо розвалювати ворога?",
    options: [
      { label: "Руками: екшн, адреналін, бруд, й щоб гучно бахкало.", next: "Q2" },
      { label: "Мізками: клавіатура, радіохвилі, кава і багатоходовочки.", next: "Q3" }
    ]
  },

  Q2: {
    depth: 2,
    image: "images/q2.png",
    text: "Ти в самому замісі чи забезпечуєш заміс?",
    options: [
      { label: "Я і є заміс: зброя, штурм, мінус вороги.", next: "Q4" },
      { label: "Тримаю цей цирк купи: рятую, лагоджу, підводжу снаряди.", next: "Q5" }
    ]
  },

  Q4: {
    depth: 3,
    image: "images/q4.png",
    text: "Твій улюблений агрегатний стан?",
    options: [
      { label: "Вода. Нехай мене качає.", next: "Q6" },
      { label: "Тверда земля (щоб зручніше топтати окупантів).", next: "Q7" }
    ]
  },

  Q6: {
    depth: 4,
    image: "images/q6.png",
    text: "Ти над чи під водою?",
    options: [
      { label: "На борту з пацанами: навігація, гармати, шторм в обличчя.", next: "crew_ship" },
      { label: "Як Аквамен, тільки з вибухівкою: гідрокостюми, тіні, секретні місії.", next: "combat_swimmer" }
    ]
  },

  Q7: {
    depth: 4,
    image: "images/q7.png",
    text: "Який у тебе стиль гри?",
    options: [
      { label: "Кемпер рівня «бог»: відправити важкий ракетний «подарунок» здалеку.", next: "artillery_rocket" },
      { label: "Раш по центру: динаміка, штурм, стрілкотня в упор.", next: "marine" }
    ]
  },

  Q5: {
    depth: 3,
    image: "images/q5.png",
    text: "З чим тобі приємніше возитися в полі?",
    options: [
      { label: "Із залізяками: мастило, ключі, двигуни, тротил.", next: "Q8" },
      { label: "З людьми: аптечки, турнікети, «терпи, козаче».", next: "medic" }
    ]
  },

  Q8: {
    depth: 4,
    image: "images/q8.png",
    text: "Що будемо робити із залізом?",
    options: [
      { label: "Крутити кермо: дайте мені щось велике і броньоване.", next: "driver" },
      { label: "Крутити гайки: розібрати, зібрати, змусити працювати.", next: "Q9" }
    ]
  },

  Q9: {
    depth: 5,
    image: "images/q9.png",
    text: "Ти лікуєш механізми чи мінуєш посадки?",
    options: [
      { label: "Оживляти «франкенштейнів»: ремонт двигунів та броні, щоб воно їхало.", next: "mechanic" },
      { label: "Робити сюрпризи: інженерка, пастки і щоб був «бум!» у потрібному місці.", next: "engineer_sapper" }
    ]
  },

  Q3: {
    depth: 2,
    image: "images/q3.png",
    text: "Твоя зброя – це ноутбук чи Excel?",
    options: [
      { label: "Цифра: код, дрони, радіоефір і кіберпанк.", next: "Q10" },
      { label: "Менеджмент: люди, склади, папери й щоб усе працювало як годинник.", next: "Q11" }
    ]
  },

  Q10: {
    depth: 3,
    image: "images/q10.png",
    text: "Ти граєш у RTS чи симулятор хакера?",
    options: [
      { label: "Оперативка: джойстик до рук і полетіли нести смерть окупантам.", next: "Q12" },
      { label: "Лаба: пишу код, паяю плати, ламаю сервери.", next: "Q13" }
    ]
  },

  Q12: {
    depth: 4,
    image: "images/q12.png",
    text: "Чим будеш виносити мозок ворогу?",
    options: [
      { label: "Джойстик від «пташки»: дрони, скиди, надводні камікадзе.", next: "drone_operator" },
      { label: "Радіостанції та РЕБ: глушити зв'язок, перехоплювати скиглення окупантів.", next: "signals_ew" }
    ]
  },

  Q13: {
    depth: 4,
    image: "images/q13.png",
    text: "Ти клавіатурний ніндзя чи володар каніфолі?",
    options: [
      { label: "Код, бази даних, алгоритми. Матриця – мій дім.", next: "Q14" },
      { label: "Паяльник, плати, мікросхеми. Зберу дрон із мікрохвильовки.", next: "uav_engineer" }
    ]
  },

  Q14: {
    depth: 5,
    image: "images/q14.png",
    text: "Ти створюєш чи захищаєш?",
    options: [
      { label: "Пишу софт, який допомагає нашим навалювати.", next: "developer" },
      { label: "Відбиваю хакерські атаки, захищаю мережі (і нерви командування).", next: "cybersecurity" }
    ]
  },

  Q11: {
    depth: 3,
    image: "images/q11.png",
    text: "Чим ти менеджиш краще?",
    options: [
      { label: "Словами: комунікація, підтримка, інстаграм, душа компанії.", next: "Q15" },
      { label: "Табличками: цифри, склади, накази, логістика.", next: "Q16" }
    ]
  },

  Q15: {
    depth: 4,
    image: "images/q15.png",
    text: "Твій інструмент впливу?",
    options: [
      { label: "Камера і текст: показувати красу ВМС, збирати лайки та донати.", next: "press_officer" },
      { label: "Вуха і спокій: вислухати, заспокоїти, дати опору, коли накриває.", next: "psychologist_chaplain" }
    ]
  },

  Q16: {
    depth: 4,
    image: "images/q16.png",
    text: "Твій персональний рай перфекціоніста?",
    options: [
      { label: "Рапорти, накази, штабна аналітика (паперовий спецзагін).", next: "staff_clerk" },
      { label: "Склади, зброя, паливо, екіпіровка (бог постачання).", next: "logistics" }
    ]
  }
};

const results = {
  crew_ship: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/crew_ship?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "https://www.work.ua/jobs-%D0%BF%D0%BB%D0%B0%D0%B2%D1%81%D0%BA%D0%BB%D0%B0%D0%B4/?company=2592946",
    image: "images/crew_ship.png",
    title: "Екіпаж корабля / катера",
    category: "Бойові та операторські посади",
    description: "Ти – морський вовк. Пірати Карибського моря відпочивають. Робота в команді, де кожен знає свою кнопку і свій штурвал. Романтика Чорного моря, бриз в обличчя і регулярна можливість передати «палке вітання» ворожому флоту. Якщо суходіл для тебе занадто нудний – ласкаво просимо на борт."
  },

  combat_swimmer: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/combat_swimmer?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "https://www.work.ua/jobs-%D0%B2%D0%BE%D0%B4%D0%BE%D0%BB%D0%B0%D0%B7/?company=2592946",
    image: "images/combat_swimmer.png",
    title: "Бойовий плавець (Спецпризначенець)",
    category: "Бойові та операторські посади",
    description: "Аквамен, але зі зброєю і нульовою толерантністю до русні. Найзакритіший клуб ВМС. Виринаєш там, де не чекають, робиш місії, про які потім зніматимуть кіно (але ти нікому не розкажеш, бо це таємниця). Відбір пекельний, та якщо ти амфібія зі сталевими нервами – тобі сюди."
  },

  artillery_rocket: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/artillery_rocket?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "https://www.work.ua/jobs-%D0%BD%D0%B0%D0%B2%D1%96%D0%B4%D0%BD%D0%B8%D0%BA/?company=2592946",
    image: "images/artillery_rocket.png",
    title: "Артилерист / Ракетник",
    category: "Бойові та операторські посади",
    description: "Кемпер рівня «бог». Твій девіз: \"Навіщо бігати, якщо можна дотягнутися ракетою?\". Високоточна робота з важкими аргументами. Математика, розрахунки, кнопка – і десь далеко епічно палає склад БК ворога. Ідеально для тих, хто любить масштабні феєрверки без прямого контакту."
  },

  marine: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/marine?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "https://www.work.ua/jobs-%D1%81%D1%82%D1%80%D1%96%D0%BB%D0%B5%D1%86%D1%8C+%2B+%D1%81%D0%BD%D0%B0%D0%B9%D0%BF%D0%B5%D1%80/?company=2592946",
    image: "images/marine.png",
    title: "Морський піхотинець",
    category: "Бойові та операторські посади",
    description: "Машина для розвалу облич. Там, де страшно іншим, морпіх відкриває двері з ноги. Штурми, висадки, максимальний адреналін і братерство, міцніше за броню. Якщо ти хочеш бути на вістрі атаки та маєш фізуху, щоб це вивезти – «Вірні завжди» чекають."
  },

  medic: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/medic?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "https://www.work.ua/jobs-%D1%84%D0%B5%D0%BB%D1%8C%D0%B4%D1%88%D0%B5%D1%80+%D0%B0%D0%B1%D0%BE+%D0%BC%D0%B5%D0%B4%D0%B8%D0%BA/?company=2592946",
    image: "images/medic.png",
    title: "Військовий медик",
    category: "Забезпечення, логістика та управління",
    description: "Ангел-охоронець із турнікетом. Твоя робота – зробити так, щоб побратими могли й далі псувати демографію рф. Кров, бруд і екстремальний стрес, але врятоване життя того вартує. Ти той, на кого моляться всі в підрозділі, навіть найсуворіші штурмовики."
  },

  driver: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/driver?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "https://www.work.ua/jobs-%D0%B2%D0%BE%D0%B4%D1%96%D0%B9/?company=2592946",
    image: "images/driver.png",
    title: "Водій",
    category: "Забезпечення, логістика та управління",
    description: "Військовий Uber, тільки клієнти в броні, а замість заторів – кратери від мін. Крутиш кермо так, що Кен Блок нервово курить осторонь. Від тебе залежить, чи доїде БК і чи вибереться піхота. Вмієш витиснути максимум із будь-якого тарантаса? Заводь."
  },

  mechanic: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/mechanic?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "https://www.work.ua/jobs-%D0%BC%D0%B5%D1%85%D0%B0%D0%BD%D1%96%D0%BA/?company=2592946",
    image: "images/mechanic.png",
    title: "Механік / Ремонтник",
    category: "Технічні та ІТ-посади",
    description: "Бог гайкового ключа. Здатен зібрати робочий двигун із двох неробочих, армованого скотча і такої-то матері. Поки ти не скажеш «поїхали», війна стоятиме на паузі. Якщо твої руки вічно в мастилі й ти любиш повертати залізо з того світу – армії потрібен твій талант."
  },

  engineer_sapper: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/engineer_sapper?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "https://www.work.ua/jobs-%D1%81%D0%B0%D0%BF%D0%B5%D1%80/?company=2592946",
    image: "images/engineer_sapper.png",
    title: "Військовий інженер / Сапер",
    category: "Забезпечення, логістика та управління",
    description: "Ти мислиш категоріями «як це підірвати» або «як зробити так, щоб підірвались вони». Міни, розтяжки, окопи. Робота для людей із нордичним характером і відсутністю тремору рук. Помилок тут не вибачають, але  результати твоєї роботи ворог запам'ятає до кінця свого (короткого) життя."
  },

  drone_operator: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/drone_operator?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "https://www.work.ua/jobs-%D0%BE%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D0%BE%D1%80/?company=2592946",
    image: "images/drone_operator.png",
    title: "Оператор безпілотних і роботизованих систем",
    category: "Бойові та операторські посади",
    description: "Геймер, який вийшов на новий рівень. У тебе в руках пульт, на екрані – ворог, а в небі (або на воді) – твій дрон із «подарунком». Бачиш усе, дістаєш боляче, сам сидиш у відносній безпеці. Награв тисячі годин у симуляторах? Час застосувати скіли на практиці."
  },

  signals_ew: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/signals_ew?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "https://www.work.ua/jobs-telecommunications/?company=2592946",
    image: "images/signals_ew.png",
    title: "Зв'язківець / Спеціаліст РЕБ та РЕР",
    category: "Технічні та ІТ-посади",
    description: "Володар радіоефіру. Робиш так, щоб наші чули одне одного чітко, а ворог чув лише білий шум і власну паніку. Глушити чужі дрони, перехоплювати істеричні переговори в ефірі – це мистецтво. Без тебе армія – це натовп, з тобою – єдиний організм."
  },

  uav_engineer: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/uav_engineer?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "https://www.work.ua/jobs-%D1%96%D0%BD%D0%B6%D0%B5%D0%BD%D0%B5%D1%80/?company=2592946",
    image: "images/uav_engineer.png",
    title: "Інженер БПЛА та радіоелектроніки",
    category: "Технічні та ІТ-посади",
    description: "Доктор Франкенштейн для дронів. Ти збираєш їх, паяєш, прошиваєш і чіпляєш на них те, що робитиме гучне «бум». Твій найкращий друг – паяльник, а замість музики ти слухаєш дзижчання моторів. Хобі з радіогуртка тепер рятує життя і нищить окупантів."
  },

  developer: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/developer?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "",
    image: "images/developer.png",
    title: "Програміст / ІТ-розробник",
    category: "Технічні та ІТ-посади",
    description: "Айтівець у пікселі. Твій код тепер не для продажу реклами, а для систем наведення, управління військами та логістики. Жодних нудних дейліків із замовником – твій кастомер це ЗСУ, і фідбек тут вимірюється в знищеній техніці ворога."
  },

  cybersecurity: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/cybersecurity?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "https://www.work.ua/jobs-%D0%BA%D1%96%D0%B1%D0%B5%D1%80%D0%B1%D0%B5%D0%B7%D0%BF%D0%B5%D0%BA%D0%B0/?company=2592946",
    image: "images/cybersecurity.png",
    title: "Фахівець з кібербезпеки",
    category: "Технічні та ІТ-посади",
    description: "Цифрова спецура. Будуєш віртуальні стіни та відбиваєш атаки хакерів із-за порєбріка. Твоя лінія фронту – це сервери, мережі та бази даних. Якщо слова «пентест» і «DDoS» для тебе не просто терміни, йди захищати мозок нашої армії."
  },

  press_officer: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/press_officer?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "",
    image: "images/press_officer.png",
    title: "Фахівець з комунікацій / Фото-репортер",
    category: "Комунікації та морально-психологічне забезпечення",
    description: "Голос ВМС. Озброєний камерою, клавіатурою і харизмою. Зробити вірусний відос про наших котиків-морпіхів? Легко. Пояснити західним ЗМІ, чому нам потрібно більше ракет? Запросто. Ти ведеш інформаційну війну, де кожен пост може змінити настрої тисяч."
  },

  psychologist_chaplain: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/psychologist_chaplain?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "",
    image: "images/psychologist_chaplain.png",
    title: "Військовий психолог / Капелан",
    category: "Комунікації та морально-психологічне забезпечення",
    description: "Броня для психіки. Ти той, хто збирає докупи мізки й душі після пекла. Вмієш слухати, розуміти та знаходити слова, коли слів вже немає. Твоя зброя – емпатія і стабільність. Без тебе навіть найсильніші термінатори можуть перегоріти."
  },

  staff_clerk: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/staff_clerk?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "",
    image: "images/staff_clerk.png",
    title: "Діловод / Штабний фахівець",
    category: "Забезпечення, логістика та управління",
    description: "Паперовий спецзагін. Твій Excel гостріший за штик-ніж, а рапорти ідеальні, як статут. Поки піхота місить багнюку, ти тримаєш у порядку штаб, бо без твоїх папірців не поїде танк, не видадуть ЗП і не дадуть відпустку. Бюрократія, без якої - ніяк."
  },

  logistics: {
    jobUrl: "https://recrutvms.mil.gov.ua/qz/logistics?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms",
    jobUrlWork: "https://www.work.ua/jobs-%D0%B1%D0%B0%D1%82%D0%B0%D0%BB%D0%B5%D1%80/?company=2592946",
    image: "images/logistics.png",
    title: "Логіст / Постачальник",
    category: "Забезпечення, логістика та управління",
    description: "Бог «Нової Пошти» військового масштабу. Знаєш, де дістати снаряди, форму, їжу, і як це доставити туди, де навіть Google Maps каже «вибачте». Якщо логіст провтикав, війна зупинилася. Ти крутиш колеса армії своїми табличками, складами та нескінченними дзвінками."
  }
};
