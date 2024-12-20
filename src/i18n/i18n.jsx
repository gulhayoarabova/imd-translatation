import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // navbar
        user1: "Create a user",
        history: "Files history",
        logout: "Log out",
        //  login page
        login: "Login",
        intro: "Translate pdf files with high accuracy!",
        user: "Username",
        password: "Password",
        // translate pdf page
        translate: "Translate",
        download: "Download",
        noFile: "No uploaded files",
        stop: "Stop",
        pause: "Pause",
        resume: "Resume",
        uploadFile: "Drag and drop or click here to upload a file",
        onlyPdf: "Only PDF files (MAX. 816px x 1056px)",
        // create a new user
        newUser: "Create a new user",
        create: "Create",
        // downloads page
        fileName: "File name",
        translationDate: "Translation date",
        translationTime: "Translation time",
        originalFile: "Original ",
        translatedFile: "Translated ",
        prev:"Prev",
        next: "Next",
        rights: "All rights reserved",
        // breadcrumb
        home:"Home",
        downloadPage: "Downloads",

      },
    },
    uz: {
      translation: {
        // navbar
        user1: "Foydalanuvchi yaratish",
        history: "Fayllar tarixi",
        logout: "Chiqish",
        // login page
        login: "Kirish",
        intro: "PDF-fayllarni yuqori aniqlikda tarjima qiling!",
        user: "Foydalanuvchi nomi",
        password: "Parol",
        // translate pdf page
        translate: "Tarjima qilish",
        download: "Yuklab olish",
        noFile: "Yuklangan fayllar topilmadi...",
        stop: "To‘xtatish",
        pause: "To‘xtatib turish",
        resume: "Davom ettirish",
        uploadFile: "Fayllarni yuklash uchun shu yerni bosing",
        onlyPdf: "Faqat PDF fayllar (MAKS. 816px x 1056px)",
        // create a new user
        newUser: "Yangi foydalanuvchi yaratish",
        create: "Yaratish",
        // downloads page
        fileName: "Fayl nomi",
        translationDate: "Yaratilgan sana",
        translationTime: "Yaratilgan vaqt",
        originalFile: "Originial ",
        translatedFile: "Tarjima ",
        prev: "Oldingi",
        next: "Keyingi",
        rights: "Barcha huquqlar himoyalangan.",
          // breadcrumb
          home:"Asosiy",
          downloadPage: "Yuklangan fayllar",
}

    },
    ru: {
      translation: {
        // navbar
        user1: "Создать пользователя",
        history: "История",
        logout: "Выйти",
        // login page
        login: "Войти",
        intro: "Высококачественный перевод PDF-файлов!",
        user: "Имя пользователя",
        password: "Пароль",
        // translate pdf page
        translate: "Начать перевод",
        download: "Загрузить",
        noFile: "Загруженных файлов не найдено...",
        stop: "Остановить",
        pause: "Пауза",
        resume: "Продолжить",
        uploadFile: "Нажмите здесь для загрузки файлов или перетащите файлы",
        onlyPdf: "Поддержка только формата .PDF (MAX. 816px x 1056px)",
        // create a new user
        newUser: "Создать нового пользователя",
        create: "Создать",
        // downloads page
        fileName: "Название файла",
        translationDate: "Дата создания",
        translationTime: "Время создания",
        originalFile: "Оригинальный ",
        translatedFile: "Перевод ",
        prev: "Назад",
        next: "Вперед",
        rights: "Все права защищены.",
          // breadcrumb
          home: "Главная",
          downloadPage: "Загрузки",
          
      
}

    },
  },
});

export default i18n;