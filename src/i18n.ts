import LanguageDetector from "i18next-browser-languagedetector";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const options = {
    order: ["querystring", "navigator"],
    lookupQuerystring: "lng"
};

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ["en", "el"],
        detection: options,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        },
        resources: {
            en: {
                translation: {
                    addJob: "Add Job",
                    jobTitle: "Title/Position",
                    jobLink: "Title/Position Link",
                    jobCompany: "Company",
                    jobCompanyLink: "Company Link",
                    jobApplyDate: "Date Applied",
                    jobSalary: "Salary",
                    jobSalaryType: "Frequency"
                }
            },
            el: {
                translation: {
                    addJob: "Here we go again...",
                    jobTitle: "What I'm applying for?",
                    jobLink: "Where can I view this position?",
                    jobCompany: "Who are they?",
                    jobCompanyLink: "What's their site?",
                    jobApplyDate: "When did I apply for this?",
                    jobSalary: "What they going to pay?",
                    jobSalaryType: "How Often?"
                }
            }
        }
    });

export default i18n;
