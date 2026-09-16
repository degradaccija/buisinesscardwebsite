import type en from "@/i18n/en";

const lv: typeof en = {
  nav: {
    about: "Par mani",
    skills: "Prasmes",
    experience: "Pieredze",
    projects: "Projekti",
    services: "Pakalpojumi",
    contact: "Kontakti",
    menu: "Izvēlne",
  },
  hero: {
    available: "Pieejams freelance un pilnas slodzes darbam",
    carouselLabel: "Izcelto projektu ekrānattēli",
    slideAlt: "Attēls: {project}",
    extraDashboard: "Hermes panelis",
    extraStats: "docker stats: 27 konteineri",
  },
  cta: {
    contact: "Sazināties",
  },
  about: {
    facts: {
      role: "Loma",
      focus: "Fokuss",
      languages: "Valodas",
    },
    focusValue: "Pilna cikla web izstrāde, MI aģenti",
    languagesValue: "Latviešu, angļu",
    cv: "Lejupielādēt CV",
  },
  skills: {
    note: "Pierādījumi sadaļā „Projekti“ zemāk.",
    countOne: "prasme",
    countOther: "prasmes",
  },
  experience: {
    present: "Šobrīd",
    groupWork: "Darbs",
    groupEducation: "Izglītība",
  },
  projects: {
    featured: "Izceltie",
        repo: "Kods",
    live: "Skatīt tiešsaistē",
  },
  contact: {
    title: "Sazināties",
    channels: {
      email: "E-pasts",
      github: "GitHub",
      linkedin: "LinkedIn",
    },
    note: "Tiešā saziņa ir ātrākā. Veidlapa nonāk tieši manā e-pastā. Bez CRM sistēmām un automatizētiem e-pastiem. Tavu ziņu izlasu es.",
    form: {
      name: "Vārds",
      email: "E-pasts",
      message: "Ziņa",
      send: "Sūtīt",
      sending: "Sūta…",
      success: "Ziņa nosūtīta. Drīz sazināšos ar tevi.",
      error: "Kaut kas nogāja greizi. Lūdzu, mēģini vēlreiz.",
      invalid: "Lūdzu, pārbaudi veidlapu: visi lauki ir obligāti un e-pastam jābūt derīgam.",
      hint: "Parasti atbildu 48 stundu laikā.",
      privacyNote: "Nosūtot, saglabāju Tavu vārdu, e-pastu un ziņu, lai varētu atbildēt. Vairāk skaties",
      privacyNoteLink: "privātuma politikā",
    },
  },
  cookieNotice: {
    message:
      "Viena maza izvēle: piekrīti, un vietne saglabā sīkdatni, kas atceras Tavu valodu, un ielādē ES mitinātu analītiku (PostHog). Noraidi, un tā paliek bez sīkdatnēm un bez pieprasījumiem. Bez reklāmām un izsekošanas pikseļiem.",
    accept: "Piekrītu",
    decline: "Noraidīt",
    policy: "Privātuma politika",
  },
  footer: {
    rights: "Visas tiesības aizsargātas.",
    privacy: "Privātuma politika",
  },
  privacy: {
    title: "Privātuma politika",
    backHome: "Atpakaļ uz vietni",
    updated: "Pēdējoreiz atjaunots: 2026. gada 15. septembris",
    intro:
      "Šī ir personīga vietne ar vienu lapu. Tā savāc pēc iespējas mazāk datu, un šis dokuments skaidri izskaidro, kas notiek ar visu, ko man nosūti.",
    controllerHeading: "Kas ir atbildīgs",
    controllerBody:
      "Mārcis Krēgers (vietnes īpašnieks un personas datu pārzinis). Privātuma jautājumos un pieprasījumos mani sasniedz e-pastā marcis.kregers@gmail.com.",
    dataHeading: "Kādi dati tiek savākti",
    dataItems: [
      {
        term: "Sazināšanās veidlapa",
        text: "Ja raksti man caur veidlapu, saglabāju Tavu vārdu, e-pasta adresi, ziņu un valodu, kurā pārlūkoji vietni. Tos izmantoju tikai, lai izlasītu ziņu un atbildētu. Tiesiskais pamats ir atbilde uz Tavu pieprasījumu pirms iespējama līguma (VDAR 6. panta 1. punkta b) iedaļa) un mana leģitīmā interese atbildēt cilvēkiem, kas sazinās (6. panta 1. punkta f) iedaļa).",
      },
      {
        term: "Analītika (neobligāta)",
        text: "Tikai ja piekrīti, vietne ielādē PostHog, ES mitinātu analītikas pakalpojumu, kas reģistrē anonīmus lietojuma datus (apmeklētās lapas, klikšķus), lai es varu uzlabot vietni. Ja noraidi, PostHog netiek ielādēts un neviens pieprasījums nepamet Tavu pārlūku. Tiesiskais pamats: Tava piekrišana (VDAR 6. panta 1. punkta a) iedaļa), ko vari jebkurā laikā atsaukt, nodzēšot šīs vietnes datus no pārlūka krātuves.",
      },
      {
        term: "Aizsardzība pret surogātpastu",
        text: "Iesniedzot veidlapu, Tava IP adrese tiek pārbaudīta pret īslaicīgu biežuma ierobežojumu, kas glabājas tikai servera atmiņā. Tā nekad netiek ierakstīta datubāzē un stundas laikā pazūd.",
      },
      {
        term: "Valodas sīkdatne",
        text: "Vietne izveido vienu sīkdatni, NEXT_LOCALE, lai atcerētos, vai izvēlējies angļu vai latviešu valodu. Tā tiek saglabāta tikai, ja piekrīti banerī. Ja noraidi, sīkdatne netiek saglabāta, un valoda katrā apmeklējumā atgriežas pie Tava pārlūka iestatījumiem. Sīkdatne nesatur nevienu identifikatoru un netiek izmantota izsekošanai.",
      },
      {
        term: "Servera žurnāli",
        text: "Manis izraudzītais mitināšanas pakalpojumu sniedzējs drošības un pieejamības nodrošināšanai apstrādā standarta pieprasījumu žurnālus (tostarp IP adresi). Es tos neizmantoju apmeklētāju profilēšanai.",
      },
    ],
    noTrackingHeading: "Kas netiek savākts",
    noTrackingBody:
      "Šajā vietnē nav reklāmu, sociālo tīklu izsekotāju, izsekošanas pikseļu vai profilēšanas. Analītika darbojas tikai pēc piekrišanas banerī, un PostHog (ES) ir vienīgais izmantotais analītikas pakalpojums. Ja noraidīji, vietne vispār neveic nevienu pieprasījumu uz trešajām pusēm.",
    processorsHeading: "Pakalpojumu sniedzēji",
    processorsBody:
      "Vietni uztur šie apstrādātāji, katrs ar datu apstrādes līgumu: Vercel (mitināšana), Supabase (datubāze), Resend (ziņu par kontaktformu e-pasta piegāde) un, tikai ja esi piekritis analītikai, PostHog (ES mitināta lietojuma analītika).",
    retentionHeading: "Cik ilgi dati tiek glabāti",
    retentionBody:
      "Ziņas glabāju tikai tik ilgi, cik nepieciešams sarunas vešanai. Ja vēlies, lai Tava ziņa tiktu dzēsta, raksti man e-pastā, un es to izņemšu.",
    rightsHeading: "Tavas tiesības",
    rightsBody:
      "Tev ir tiesības piekļūt saviem personas datiem, tos labot, dzēst, ierobežot to apstrādi, iebilst pret to un pieprasīt to pārnesamību. Lai izmantotu kādu no šīm tiesībām, raksti uz marcis.kregers@gmail.com. Tev ir arī tiesības iesniegt sūdzību Datu valsts inspekcijā.",
  },
  stub: {
    title: "Uzstādīšana notiek",
    body: "Sadaļas drīzumā.",
  },
  meta: {
    title: "Mārcis Krēgers | Pilna cikla web izstrādātājs un MI inženieris",
    description:
      "Pilna cikla web izstrādātājs un MI/aģentu inženieris no Latvijas. Veidoju web lietotnes ar React un Next.js, uzturu Linux serverus un automatizēju darbu ar MI aģentiem.",
  },
  skipLink: "Izlaist uz saturu",
};

export default lv;
