"use client";
import { motion } from "framer-motion";
import { Shield, FileText } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-slate-200"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
            Політика конфіденційності
          </h1>
        </div>

        <div className="prose prose-slate max-w-none">
          <p>
            Ця Політика конфіденційності описує, як ми збираємо, використовуємо
            та захищаємо вашу особисту інформацію, коли ви користуєтеся нашим
            веб-сайтом AutoPricer.
          </p>

          <h2 className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Збір інформації
          </h2>
          <p>
            Ми можемо збирати особисту інформацію, таку як ваше ім{"'"}я, адреса
            електронної пошти та дані, пов{"'"}язані з вашими пошуковими
            запитами, коли ви добровільно надаєте її нам.
          </p>

          <h2 className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Використання інформації
          </h2>
          <p>
            Зібрана інформація використовується для покращення якості наших
            послуг, персоналізації вашого досвіду, а також для надсилання вам
            важливих оновлень та маркетингових пропозицій, якщо ви на це
            погодилися.
          </p>

          <h2 className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Захист даних
          </h2>
          <p>
            Ми вживаємо відповідних заходів безпеки для захисту вашої особистої
            інформації від несанкціонованого доступу, зміни, розкриття або
            знищення.
          </p>

          <h2 className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Зміни до політики
          </h2>
          <p>
            Ми залишаємо за собою право оновлювати цю політику конфіденційності
            в будь-який час. Будь-які зміни набудуть чинності негайно після їх
            публікації на цій сторінці.
          </p>

          <h2 className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Контакти
          </h2>
          <p>
            Якщо у вас є будь-які питання щодо цієї Політики конфіденційності,
            будь ласка, зв{"'"}яжіться з нами за адресою{" "}
            <a href="mailto:traktoryiavtoad@gmail.com">
              traktoryiavtoad@gmail.com
            </a>
            .
          </p>
        </div>
      </motion.div>
    </div>
  );
}
