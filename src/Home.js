import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// 🌀 Reusable Image Slider Component (same as before)
const ImageSlider = ({ images, title }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    console.log(`🎬 [${title}] Slider started with image: ${images[0]} (Index: 0)`);

    const timer = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % images.length;
        console.log(`🌀 [${title}] Image changed: ${images[next]} (Index: ${next})`);
        return next;
      });
    }, 2500);

    return () => {
      clearInterval(timer);
      console.log(`🛑 [${title}] Slider stopped`);
    };
  }, [images, title]);

  return (
    <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`slide-${index}`}
          className={`absolute w-full h-48 object-cover transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>
  );
};

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-blue-300 to-green-200 text-gray-800">
      {/* ---------------------------- 🌟 DESKTOP VIEW ---------------------------- */}
      <div className="hidden md:block">
        {/* 🌟 Hero Section */}
        <section className="text-center py-16 bg-gradient-to-r from-blue-300 to-green-200 text-white">
          <img
            src="/images/logo.png"
            alt="Holistic Health & Wellness Logo"
            className="mx-auto mb-4 w-20 h-20 rounded-full shadow-lg hover:scale-105 transition-transform"
          />
          <h1 className="text-5xl font-bold text-white drop-shadow-lg hover:drop-shadow-2xl transition-all duration-300">
            Holistic Health & Wellness
          </h1>
          <p className="max-w-2xl mx-auto text-lg mt-4">
            Empowering communities with awareness about diabetes management,
            physical fitness, mental well-being, and balanced nutrition.
          </p>
          <Link
            to="/survey"
            className="inline-block mt-6 bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-100 transition"
          >
            Take Health Survey
          </Link>
        </section>

        {/* 🧩 Information Cards */}
        <section className="max-w-6xl mx-auto py-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-6">
          {/* Cards same as before */}
          <Card
            title="Diabetes Management"
            images={[/*"/images/diabetes.jpg", "/images/diabetes1.jpg", "/images/diabetes2.jpg",*/ "/images/diabetes1.jpg"]}
            desc="Learn how regular screening, balanced diet, and physical activity can help prevent or manage diabetes effectively."
          />
          <Card
            title="Physical Fitness"
            images={[/*"/images/yoga1.jpg", "/images/yoga2.jpg", "/images/yoga3.jpg",*/ "/images/yoga1.jpg"]}
            desc="Consistent exercise boosts immunity, improves cardiovascular health, and enhances energy and mood."
          />
          <Card
            title="Mental Wellness"
            images={[/*"/images/dep.jpg", "/images/dep1.jpg",*/ "/images/yoga4.jpg"]}
            desc="Mindfulness, stress management, and good sleep are key to a healthier mind and emotional balance."
          />
          <Card
            title="Balanced Nutrition"
            images={[/*"/images/diet1.jpg", "/images/diet2.jpg",*/ "/images/diet3.jpg"]}
            desc="A nutritious diet rich in fruits, vegetables, and whole grains keeps your body strong and mind sharp."
          />
        </section>

        {/* 💫 Mission */}
        <MissionSection />

        {/* 🌿 Insights */}
        <InsightsSection />
      </div>

      {/* ---------------------------- 📱 MOBILE VIEW ---------------------------- */}
      <div className="block md:hidden">
        {/* Mobile hero */}
        <section className="text-center py-10 bg-gradient-to-r from-blue-400 to-green-300 text-white px-4">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="mx-auto mb-3 w-16 h-16 rounded-full shadow-md"
          />
          <h1 className="text-3xl font-bold mb-2">Holistic Health & Wellness</h1>
          <p className="text-base mb-4">
            Awareness about diabetes, fitness, and mental well-being for a healthier you.
          </p>
          <Link
            to="/survey"
            className="inline-block bg-white text-blue-700 px-5 py-2 rounded-full text-sm font-semibold shadow hover:bg-blue-100"
          >
            Take Survey
          </Link>
        </section>

        {/* Cards - stacked one by one */}
        <div className="px-4 py-8 space-y-6">
          <CardMobile
            title="Diabetes Management"
            images={[/*"/images/diabetes.jpg", "/images/diabetes1.jpg", "/images/diabetes2.jpg",*/ "/images/diabetes1.jpg"]}
            desc="Regular screening and balanced diet for diabetes prevention."
          />
          <CardMobile
            title="Physical Fitness"
            images={[/*"/images/yoga1.jpg", "/images/yoga2.jpg", */"/images/yoga1.jpg"]}
            desc="Exercise daily for better health and energy."
          />
          <CardMobile
            title="Mental Wellness"
            images={[/*"/images/dep.jpg", "/images/dep1.jpg",*/ "/images/yoga4.jpg"]}
            desc="Mindfulness and stress control for emotional balance."
          />
          <CardMobile
            title="Balanced Nutrition"
            images={[/*"/images/diet1.jpg", "/images/diet2.jpg",*/ "/images/diet3.jpg"]}
            desc="Healthy food choices for a sharp mind and strong body."
          />
        </div>

        {/* Mission */}
        <MissionSection />

        {/* Insights */}
        <InsightsSection />
      </div>
    </div>
  );
}

// 🔧 Reusable Card Component (Desktop)
const Card = ({ title, images, desc }) => (
  <div className="bg-white shadow-lg rounded-xl hover:shadow-2xl overflow-hidden transition">
    <ImageSlider title={title} images={images} />
    <div className="p-4">
      <h2 className="font-semibold text-xl mb-2">{title}</h2>
      <p className="text-sm">{desc}</p>
    </div>
  </div>
);

// 🔧 Mobile Card Component (simpler design)
const CardMobile = ({ title, images, desc }) => (
  <div className="bg-white shadow rounded-xl overflow-hidden">
    <ImageSlider title={title} images={images} />
    <div className="p-3">
      <h2 className="font-semibold text-lg mb-1">{title}</h2>
      <p className="text-xs text-gray-700">{desc}</p>
    </div>
  </div>
);

// 🧩 Mission Section (shared)
const MissionSection = () => (
  <section className="bg-gradient-to-r from-blue-300 to-green-200 py-10 text-center px-4">
    <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Mission</h2>
    <p className="max-w-3xl mx-auto text-gray-700 text-base md:text-lg">
      To promote holistic health by integrating awareness of physical,
      mental, and emotional well-being. This helps users identify habits,
      learn preventive care, and live a balanced lifestyle.
    </p>
  </section>
);

// 🌿 Health Insights Section (shared)
const InsightsSection = () => (
  <section className="bg-gradient-to-r from-blue-300 to-green-200 py-14">
    <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-10">
      Health Insights
    </h2>

    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
      {/* Diabetes */}
      <InsightCard
        img="/images/diabetess.jpg"
        title="Symptoms of Diabetes"
        color="text-blue-600"
        list={[
          "Frequent thirst and urination",
          "Fatigue or tiredness",
          "Unexplained weight loss",
          "Blurred vision or slow healing",
          "Increased hunger despite eating",
        ]}
      />

      {/* Mental Health */}
      <InsightCard
        img="/images/mentalhealth.jpg"
        title="Mental Health & Wellness"
        color="text-green-600"
        list={[
          "Practice deep breathing",
          "Connect with loved ones",
          "Get enough sleep",
          "Limit screen time",
          "Seek help when stressed",
        ]}
      />

      {/* Diet */}
      <InsightCard
        img="/images/diet2.jpg"
        title="Diet & Physical Fitness"
        color="text-purple-600"
        list={[
          "Eat fruits & vegetables",
          "Include whole grains",
          "Stay hydrated",
          "Exercise 30 mins daily",
          "Stretch during long sitting hours",
        ]}
      />
    </div>
  </section>
);

const InsightCard = ({ img, title, color, list }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
    <img
      src={img}
      alt={title}
      className="rounded-xl mb-4 h-48 w-full object-cover"
    />
    <h3 className={`text-2xl font-semibold mb-3 ${color}`}>{title}</h3>
    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
      {list.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
  </div>
);
