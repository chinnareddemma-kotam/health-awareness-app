import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

const HealthAwarenessPortal = () => {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState({
    name: "",
    age: "",
    exercise: "",
    diet: "",
    sleep: "",
    stress: "",
    checkup: "",
  });

  const questions = [
    {
      key: "exercise",
      question: "How often do you exercise per week?",
      options: [
        { label: "Never", value: 0 },
        { label: "1–2 times", value: 1 },
        { label: "3–4 times", value: 2 },
        { label: "5+ times", value: 3 },
      ],
    },
    {
      key: "diet",
      question: "How balanced is your daily diet?",
      options: [
        { label: "Mostly junk food", value: 0 },
        { label: "Sometimes healthy", value: 1 },
        { label: "Mostly balanced", value: 2 },
        { label: "Completely healthy", value: 3 },
      ],
    },
    {
      key: "sleep",
      question: "How many hours of sleep do you get daily?",
      options: [
        { label: "Less than 5 hours", value: 0 },
        { label: "5–6 hours", value: 1 },
        { label: "7–8 hours", value: 2 },
        { label: "More than 8 hours", value: 3 },
      ],
    },
    {
      key: "stress",
      question: "How often do you feel stressed or anxious?",
      options: [
        { label: "Always", value: 0 },
        { label: "Frequently", value: 1 },
        { label: "Sometimes", value: 2 },
        { label: "Rarely", value: 3 },
      ],
    },
    {
      key: "checkup",
      question: "When was your last health checkup?",
      options: [
        { label: "Never", value: 0 },
        { label: "Over a year ago", value: 1 },
        { label: "Within the last year", value: 2 },
        { label: "Within the last 6 months", value: 3 },
      ],
    },
  ];

  // 🔹 Handle form input changes
  const handleInputChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  // 🔹 Handle button-based answers
  const handleChange = (key, value) => {
    setAnswers({ ...answers, [key]: value });
  };

  // 🔹 Submit and save to Firestore
  const handleSubmit = async () => {
    const totalScore = questions.reduce(
      (sum, q) => sum + Number(answers[q.key] || 0),
      0
    );

    if (!answers.name || !answers.age) {
      alert("Please enter your name and age before submitting.");
      return;
    }

    setLoading(true);
    setScore(totalScore);

    // ✅ Save directly to Firestore (no backend needed)
      try {
      await addDoc(collection(db, "health_surveys"), {
        name: answers.name,
        age: answers.age,
        exercise: answers.exercise,
        diet: answers.diet,
        sleep: answers.sleep,
        stress: answers.stress,
        checkup: answers.checkup,
        score: totalScore,
        createdAt: new Date().toISOString(),
      });

      alert("✅ Survey saved successfully to Firebase!");
    } catch (error) {
      console.error("❌ Error adding document:", error);
      alert("Failed to save data to Firestore. Please check your Firebase config.");
    }

  };

  // 🔹 Personalized Feedback
  const getFeedback = () => {
    if (score <= 5)
      return "Your lifestyle needs improvement. Include more exercise, eat balanced meals, and focus on sleep and stress management.";
    if (score <= 10)
      return "You're doing okay! But there’s room for improvement in your routine and mental health.";
    if (score <= 13)
      return "Great job! You're maintaining a good lifestyle. Keep building healthy habits!";
    return "Excellent! You’re living a balanced life — keep inspiring others!";
  };

  // 🔹 Dynamic Health Tips
  const getTips = () => {
    let tips = [];

    if (score <= 5) {
      tips = [
        "🏃 Try brisk walking or yoga for at least 30 minutes daily.",
        "🥗 Add more fruits, veggies, and whole grains to your diet.",
        "😴 Ensure at least 7 hours of sleep each night.",
        "🧘‍♀️ Practice mindfulness or deep breathing daily.",
      ];
    } else if (score <= 10) {
      tips = [
        "💧 Stay hydrated throughout the day.",
        "🥦 Limit sugary and processed foods.",
        "🚶 Engage in light physical activities regularly.",
        "💤 Maintain a consistent sleep schedule.",
      ];
    } else if (score <= 13) {
      tips = [
        "💪 Continue your workout routine — include strength training.",
        "🍎 Keep your diet colorful and nutrient-rich.",
        "🧠 Practice relaxation techniques for stress relief.",
        "🩺 Get a routine health checkup every 6 months.",
      ];
    } else {
      tips = [
        "🌟 Keep inspiring others with your healthy lifestyle!",
        "🏋️ Try new workout styles to stay motivated.",
        "🥑 Eat foods rich in vitamins and fiber.",
        "💧 Continue prioritizing hydration and balanced meals.",
      ];
    }

    // Age-based tips
    const age = Number(answers.age);
    if (age > 0) {
      if (age < 18) {
        tips.push("🧒 Focus on outdoor games and balanced meals for growth.");
        tips.push("🥛 Include calcium-rich foods and milk daily.");
      } else if (age <= 40) {
        tips.push("🏃‍♂️ Add strength training 2–3 times a week.");
        tips.push("💻 Avoid long screen hours; stretch often.");
      } else if (age <= 60) {
        tips.push("❤️ Monitor blood pressure and sugar levels regularly.");
        tips.push("🚶 Walk daily and find hobbies to reduce stress.");
      } else {
        tips.push("🦴 Focus on bone health — calcium and Vitamin D help!");
        tips.push("🧘 Practice light yoga and breathing exercises.");
      }
    }

    return tips;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-green-200 flex flex-col items-center py-10 px-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Health Awareness Survey
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Answer these quick questions to check your health and wellness awareness.
        </p>

        {/* 👤 User Info */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={answers.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Age</label>
          <input
            type="number"
            name="age"
            value={answers.age}
            onChange={handleInputChange}
            placeholder="Enter your age"
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        {/* 🧠 Questions */}
        {questions.map((q) => (
          <div key={q.key} className="mb-6">
            <h2 className="text-lg font-semibold mb-3">{q.question}</h2>
            <div className="flex flex-wrap gap-3">
              {q.options.map((opt) => (
                <button
                  key={opt.label}
                  className={`px-4 py-2 rounded-full border transition ${
                    answers[q.key] === opt.value
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => handleChange(q.key, opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* 🔘 Submit Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-8 py-3 rounded-full font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            {loading ? "Submitting..." : "Submit Survey"}
          </button>
        </div>

        {/* 🧾 Results */}
        {score !== null && (
          <div className="mt-10 bg-green-50 border border-green-200 p-6 rounded-xl text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Hello {answers.name || "User"} 👋
            </h2>
            <p className="text-gray-700 mb-1">Age: {answers.age || "N/A"}</p>
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              Your Health Score: {score} / 15
            </h3>

            <p className="text-gray-700 text-lg mb-4">{getFeedback()}</p>

            <h3 className="text-xl font-semibold text-blue-600 mb-3">
              💡 Personalized Health Tips:
            </h3>
            <ul className="text-left text-gray-700 list-disc list-inside space-y-2">
              {getTips().map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthAwarenessPortal;
