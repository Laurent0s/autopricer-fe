"use client";
import { motion } from "framer-motion";
import SearchForm from "../components/search/SearchForm";
import MarketStats from '@/components/analytics/MarketStats';
import {
  Clock,
  CheckCircle,
  BarChart3,
  Zap,
  DollarSign,
  Eye,
  FileText,
  Car,
  Calendar,
  Wallet,
  Target,
} from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: FileText,
      title: "500k+",
      subtitle: "Оголошень проаналізовано",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Car,
      title: "9.8k+",
      subtitle: "Моделей у відстеженні",
      color: "from-emerald-500 to-emerald-600",
    },
    {
      icon: Clock,
      title: "24/7",
      subtitle: "Регулярне оновлення даних",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const serviceFeatures = [
    {
      icon: BarChart3,
      title: "Дізнайся ринкову ціну",
      description:
        "Аналізуй середню ціну на будь-яку модель та кількість актуальних пропозицій на ринку.",
      features: [
        "Оцінка вартості автомобілів",
        "Тенденції зміни цін",
        "Порівняння 2-х моделей",
      ],
      color: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50",
    },
    {
      icon: Calendar,
      title: "Аналізуй ціни по роках",
      description:
        "Переглянь, як змінюється ціна на авто залежно від року випуску, і знайди найвигідніший варіант.",
      features: [
        "Динаміка вартості по роках",
        "Порівняння 2-х авто по роках",
        "Знаходь найвигідніший рік",
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
    },
    {
      icon: Wallet,
      title: "Підбери авто за бюджетом",
      description:
        "Вкажи свій бюджет та отримай список автомобілів, які відповідають твоїм фінансовим можливостям.",
      features: [
        "Фільтр за бюджетом",
        "Рекомендації моделей",
        "Порівняння поколінь",
      ],
      color: "from-emerald-500 to-green-500",
      bgColor: "from-emerald-50 to-green-50",
    },
  ];

  const advantages = [
    {
      icon: DollarSign,
      title: "Реальні ціни ринку",
      description:
        "Порівнюй ціни з усіх майданчиків та знаходь найвигідніші пропозиції на ринку",
      color: "from-emerald-500 to-green-500",
    },
    {
      icon: Eye,
      title: "Аналіз цін та пропозиції на ринку",
      description:
        "Дізнайся розподіл цін та ринкової пропозиції на омріяну модель. Порівняй 2 моделі між собою",
      color: "from-blue-500 to-indigo-500",
    },
    {
      icon: Target,
      title: "Підбір за бюджетом",
      description:
        "Вкажи $15,000 - побачиш всі доступні моделі від Passat B8 до Camry XV50. Структуровано по поколіннях, а не хаотично",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: Zap,
      title: "На крок попереду",
      description:
        "Поки інші шукають по оголошеннях, ти аналізуєш ринок як професіонал і знаходиш найкращі пропозиції першим",
      color: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-indigo-600/5 to-purple-600/5" />

        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="flex flex-col text-5xl md:text-7xl font-bold text-slate-800 mb-6">
              Допомагаємо знайти
              <span className="inline-block text-blue-600 bg-clip-text">
                твоє наступне авто
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Аналізуй ринок вживаних авто, знаходь вигідні пропозиції та обирай
              найкраще на основі актуальних даних
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          > 
          <div className="grid grid-cols-2 gap-8 border-0 shadow-2xl bg-white/95 rounded-xl">
            <SearchForm onSearch={""} />

            <MarketStats />
          </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                className="text-center"
              >
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl mb-4 shadow-lg`}
                >
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600">{feature.subtitle}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Service Features */}
      <section className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Можливості сервісу
            </h2>
            <p className="text-lg text-slate-600">
              Всі інструменти для розумного вибору автомобіля
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {serviceFeatures.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{
                  opacity: 0,
                  x: index === 0 ? -30 : index === 1 ? 0 : 30,
                  y: index === 1 ? 30 : 0,
                }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`bg-gradient-to-br ${service.bgColor} p-8 rounded-2xl flex flex-col`}
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mb-4`}
                >
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-4 flex-grow">
                  {service.description}
                </p>
                <ul className="space-y-2 text-slate-600">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Чому AutoPricer?
            </h2>
            <p className="text-lg text-slate-600">
              Купуй авто розумно - економ час і гроші з точними даними
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <motion.div
                key={advantage.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${advantage.color} rounded-xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <advantage.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {advantage.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
