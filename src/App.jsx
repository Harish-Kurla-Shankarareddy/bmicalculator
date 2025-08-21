// src/App.jsx
import React, { useState, useEffect } from 'react';
import {
  Weight, 
  Ruler, 
  User, 
  Calendar, 
  Activity, 
  Calculator, 
  ArrowLeft, 
  Heart, 
  Target, 
  Utensils, 
  Moon,
  Dumbbell,
  ExternalLink,
  Info,
  Sun,
  Moon as MoonIcon,
  Globe
} from 'lucide-react';

// For Yoga icon, use Activity as a fallback
const Yoga = Activity;

// Multi-language support
const translations = {
  en: {
    title: 'Free Bmi Calculator',
    subtitle: 'Calculate your BMI and get personalized recommendations',
    weight: 'Weight',
    height: 'Height',
    age: 'Age',
    gender: 'Gender',
    activityLevel: 'Activity Level',
    male: 'Male',
    female: 'Female',
    sedentary: 'Sedentary',
    light: 'Light',
    moderate: 'Moderate',
    very: 'Very Active',
    sedentaryDesc: 'Little to no exercise',
    lightDesc: 'Light exercise 1-3 days/week',
    moderateDesc: 'Moderate exercise 3-5 days/week',
    veryDesc: 'Hard exercise 6-7 days/week',
    calculate: 'Calculate My Results',
    resultsTitle: 'Your Health Results',
    bmiResult: 'BMI Result',
    dailyCalories: 'Daily Calories',
    basedOnBMR: 'Based on BMR',
    estimateNote: 'This is an estimate. Individual needs may vary based on metabolism and other factors.',
    healthTips: 'Personalized Health Tips',
    exerciseRecommendations: 'Exercise Recommendations',
    tailoredToBMI: 'Tailored to your BMI category',
    examples: 'Examples',
    helpfulResources: 'Helpful Resources',
    recalculate: 'Recalculate',
    underweight: 'Underweight',
    normalWeight: 'Normal Weight',
    overweight: 'Overweight',
    obese: 'Obese',
    underweightMsg: 'Consider consulting a healthcare provider about healthy weight gain strategies.',
    normalWeightMsg: "You're in a healthy weight range! Keep up the good work.",
    overweightMsg: 'Consider adopting healthier eating habits and increasing physical activity.',
    obeseMsg: 'Consult with a healthcare provider for personalized weight management advice.',
    enterWeight: 'Enter your weight',
    enterHeightCm: 'Enter height in cm',
    enterHeightFt: 'Feet',
    enterHeightIn: 'Inches',
    enterAge: 'Enter your age',
    language: 'Language',
    theme: 'Theme',
    lightTheme: 'Light',
    darkTheme: 'Dark'
  },
  es: {
    title: 'Calculadora de Salud',
    subtitle: 'Calcula tu IMC y obtén recomendaciones personalizadas',
    weight: 'Peso',
    height: 'Altura',
    age: 'Edad',
    gender: 'Género',
    activityLevel: 'Nivel de Actividad',
    male: 'Hombre',
    female: 'Mujer',
    sedentary: 'Sedentario',
    light: 'Ligero',
    moderate: 'Moderado',
    very: 'Muy Activo',
    sedentaryDesc: 'Poco o ningún ejercicio',
    lightDesc: 'Ejercicio ligero 1-3 días/semana',
    moderateDesc: 'Ejercicio moderado 3-5 días/semana',
    veryDesc: 'Ejercicio intenso 6-7 días/semana',
    calculate: 'Calcular Mis Resultados',
    resultsTitle: 'Tus Resultados de Salud',
    bmiResult: 'Resultado de IMC',
    dailyCalories: 'Calorías Diarias',
    basedOnBMR: 'Basado en TMB',
    estimateNote: 'Esto es una estimación. Las necesidades individuales pueden variar según el metabolismo y otros factores.',
    healthTips: 'Consejos de Salud Personalizados',
    exerciseRecommendations: 'Recomendaciones de Ejercicio',
    tailoredToBMI: 'Adaptado a tu categoría de IMC',
    examples: 'Ejemplos',
    helpfulResources: 'Recursos Útiles',
    recalculate: 'Recalcular',
    underweight: 'Bajo Peso',
    normalWeight: 'Peso Normal',
    overweight: 'Sobrepeso',
    obese: 'Obeso',
    underweightMsg: 'Considera consultar a un proveedor de atención médica sobre estrategias saludables para aumentar de peso.',
    normalWeightMsg: '¡Estás en un rango de peso saludable! Sigue con el buen trabajo.',
    overweightMsg: 'Considera adoptar hábitos alimenticios más saludables y aumentar la actividad física.',
    obeseMsg: 'Consulta con a un proveedor de atención médica para obtener asesoramiento personalizado sobre el control de peso.',
    enterWeight: 'Ingresa tu peso',
    enterHeightCm: 'Ingresa altura en cm',
    enterHeightFt: 'Pies',
    enterHeightIn: 'Pulgadas',
    enterAge: 'Ingresa tu edad',
    language: 'Idioma',
    theme: 'Tema',
    lightTheme: 'Claro',
    darkTheme: 'Oscuro'
  },
  de: {
    title: 'Kostenloser BMI Rechner',
    subtitle: 'Berechne deinen BMI und erhalte personalisierte Empfehlungen',
    weight: 'Gewicht',
    height: 'Größe',
    age: 'Alter',
    gender: 'Geschlecht',
    activityLevel: 'Aktivitätslevel',
    male: 'Männlich',
    female: 'Weiblich',
    sedentary: 'Sitzend',
    light: 'Leicht',
    moderate: 'Mäßig',
    very: 'Sehr Aktiv',
    sedentaryDesc: 'Wenig bis keine Bewegung',
    lightDesc: 'Leichte Bewegung 1-3 Tage/Woche',
    moderateDesc: 'Mäßige Bewegung 3-5 Tage/Woche',
    veryDesc: 'Intensive Bewegung 6-7 Tage/Woche',
    calculate: 'Meine Ergebnisse berechnen',
    resultsTitle: 'Deine Gesundheitsergebnisse',
    bmiResult: 'BMI Ergebnis',
    dailyCalories: 'Tägliche Kalorien',
    basedOnBMR: 'Basierend auf Grundumsatz',
    estimateNote: 'Dies ist eine Schätzung. Individuelle Bedürfnisse können je nach Stoffwechsel und anderen Faktoren variieren.',
    healthTips: 'Personalisierte Gesundheitstipps',
    exerciseRecommendations: 'Trainingsempfehlungen',
    tailoredToBMI: 'Angepasst an deine BMI-Kategorie',
    examples: 'Beispiele',
    helpfulResources: 'Hilfreiche Ressourcen',
    recalculate: 'Neu berechnen',
    underweight: 'Untergewicht',
    normalWeight: 'Normalgewicht',
    overweight: 'Übergewicht',
    obese: 'Adipositas',
    underweightMsg: 'Erwäge, einen Arzt über gesunde Strategien zur Gewichtszunahme zu konsultieren.',
    normalWeightMsg: 'Du befindest dich in einem gesunden Gewichtsbereich! Weiter so.',
    overweightMsg: 'Erwäge, gesündere Ernährungsgewohnheiten zu übernehmen und die körperliche Aktivität zu steigern.',
    obeseMsg: 'Konsultiere einen Arzt für personalisierte Gewichtsmanagement-Beratung.',
    enterWeight: 'Gib dein Gewicht ein',
    enterHeightCm: 'Größe in cm eingeben',
    enterHeightFt: 'Fuß',
    enterHeightIn: 'Zoll',
    enterAge: 'Gib dein Alter ein',
    language: 'Sprache',
    theme: 'Design',
    lightTheme: 'Hell',
    darkTheme: 'Dunkel'
  }
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const t = translations[language];
  
  // Input states
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('moderate');
  
  // Unit toggles
  const [weightUnit, setWeightUnit] = useState('kg');
  const [heightUnit, setHeightUnit] = useState('cm');
  
  // Screen state
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    bmi: null,
    calories: null,
    tips: [],
    exercises: []
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  // Set initial dark mode based on system preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  // Utility functions
  const convertToKg = (weight, unit) => {
    return unit === 'lbs' ? weight * 0.453592 : weight;
  };

  const convertToCm = (height, feet, unit) => {
    if (unit === 'ft') {
      return (feet * 12 + height) * 2.54;
    }
    return height;
  };

  const calculateBMI = (weightKg, heightCm) => {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    
    let category, color, message;

    if (bmi < 18.5) {
      category = t.underweight;
      color = '#3B82F6';
      message = t.underweightMsg;
    } else if (bmi < 25) {
      category = t.normalWeight;
      color = '#10B981';
      message = t.normalWeightMsg;
    } else if (bmi < 30) {
      category = t.overweight;
      color = '#F59E0B';
      message = t.overweightMsg;
    } else {
      category = t.obese;
      color = '#EF4444';
      message = t.obeseMsg;
    }

    return { value: Math.round(bmi * 10) / 10, category, color, message };
  };

  const calculateCalories = (weightKg, heightCm, age, gender, activity) => {
    // BMR calculation using Mifflin-St Jeor equation
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
    }

    // Activity multipliers
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      very: 1.725,
    };

    const tdee = bmr * multipliers[activity];
    
    return {
      min: Math.round(tdee - 200),
      max: Math.round(tdee + 200),
      bmr: Math.round(bmr),
    };
  };

  const getHealthTips = (bmiCategory) => {
    const tips = {
      'Underweight': [
        { icon: <Utensils size={20} color="#3B82F6" />, text: 'Add healthy fats like nuts and avocados to your diet' },
        { icon: <Target size={20} color="#3B82F6" />, text: 'Focus on strength training to build muscle mass' },
        { icon: <Moon size={20} color="#3B82F6" />, text: 'Ensure adequate sleep for muscle recovery' },
      ],
      'Normal Weight': [
        { icon: <Utensils size={20} color="#10B981" />, text: 'Fill half your plate with vegetables and fruits' },
        { icon: <Activity size={20} color="#10B981" />, text: 'Aim for 150 minutes of moderate exercise weekly' },
        { icon: <Moon size={20} color="#10B981" />, text: 'Get 7-9 hours of quality sleep each night' },
      ],
      'Overweight': [
        { icon: <Utensils size={20} color="#F59E0B" />, text: 'Reduce portion sizes and limit processed foods' },
        { icon: <Activity size={20} color="#F59E0B" />, text: 'Start with 30 minutes of daily walking' },
        { icon: <Heart size={20} color="#F59E0B" />, text: 'Stay hydrated with 8 glasses of water daily' },
      ],
      'Obese': [
        { icon: <Utensils size={20} color="#EF4444" />, text: 'Focus on whole foods and lean proteins' },
        { icon: <Activity size={20} color="#EF4444" />, text: 'Begin with low-impact activities like swimming' },
        { icon: <Heart size={20} color="#EF4444" />, text: 'Monitor progress and celebrate small wins' },
      ],
    };

    return tips[bmiCategory] || tips['Normal Weight'];
  };

  const getExerciseRecommendations = (bmiCategory) => {
    const recommendations = {
      'Underweight': [
        {
          icon: <Dumbbell size={24} color="#3B82F6" />,
          title: 'Strength Training',
          description: 'Build muscle mass with focused strength exercises',
          examples: ['Weight lifting', 'Resistance bands', 'Bodyweight exercises'],
          resources: [
            { title: 'Beginner Strength Training Guide', url: 'https://bonytobeastly.com/workout-routine-for-skinny-beginners/' },
            { title: 'Home Workouts Without Equipment', url: 'https://www.nerdfitness.com/blog/beginner-body-weight-workout-burn-fat-build-muscle/' }
          ]
        },
        {
          icon: <Yoga size={24} color="#3B82F6" />,
          title: 'Yoga for Appetite & Digestion',
          description: 'Specific poses can help stimulate appetite and improve digestion',
          examples: ['Bhujangasana (Cobra Pose)', 'Pavanamuktasana (Wind-Relieving Pose)', 'Surya Namaskar (Sun Salutation)'],
          resources: [
            { title: 'Yoga for Digestion', url: 'https://www.yogajournal.com/practice/yoga-sequences/8-poses-better-digestion/' },
            { title: 'Yoga Poses to Boost Appetite', url: 'https://www.thehealthsite.com/photo-gallery/7-best-yoga-asanas-to-increase-your-appetite-1190849/' }
          ]
        }
      ],
      'Normal Weight': [
        {
          icon: <Dumbbell size={24} color="#10B981" />,
          title: 'Maintenance Workouts',
          description: 'Maintain your healthy weight with balanced exercise',
          examples: ['Cardio 3-4 times/week', 'Strength training 2-3 times/week', 'Flexibility exercises'],
          resources: [
            { title: 'Balanced Workout Routine', url: 'https://www.youtube.com/watch?v=cbKkB3POqaY&ab_channel=growingannanas' },
            { title: 'Fitness Blender Workouts', url: 'https://www.fitnessblender.com/' }
          ]
        },
        {
          icon: <Yoga size={24} color="#10B981" />,
          title: 'Yoga for Maintenance',
          description: 'Maintain flexibility, strength, and mental balance',
          examples: ['Vinyasa flow', 'Hatha yoga', 'Pranayama breathing exercises'],
          resources: [
            { title: 'Yoga for Every Body', url: 'https://www.youtube.com/watch?v=3X0hEHop8ec&ab_channel=YogawithKassandra' },
            { title: 'Free Yoga Classes', url: 'https://yogawithadriene.com/free-yoga-videos/' }
          ]
        }
      ],
      'Overweight': [
        {
          icon: <Dumbbell size={24} color="#F59E0B" />,
          title: 'Cardio & Strength Combo',
          description: 'Burn fat while building lean muscle',
          examples: ['Walking or jogging', 'Cycling', 'Circuit training'],
          resources: [
            { title: 'Beginner Fat Loss Workout', url: 'https://www.youtube.com/watch?v=CIxNJbit9BA&ab_channel=Roberta%27sGym' },
            { title: 'Low-Impact Cardio Exercises', url: 'https://www.verywellfit.com/low-impact-cardio-exercises-1230823' }
          ]
        },
        {
          icon: <Yoga size={24} color="#F59E0B" />,
          title: 'Yoga for Weight Management',
          description: 'Gentle practices to support weight loss journey',
          examples: ['Surya Namaskar (Sun Salutation)', 'Warrior poses', 'Twisting poses for detoxification'],
          resources: [
            { title: 'Yoga for Weight Loss', url: 'https://www.youtube.com/watch?v=zUnjJdJitPw&list=PLFr6eAcUWqfDoysc6gtxbFGUKRnq64DZA&ab_channel=YogawithZelinda' },
            { title: 'Beginner Yoga for Larger Bodies', url: 'https://www.verywellfit.com/yoga-for-plus-size-3566887' }
          ]
        }
      ],
      'Obese': [
        {
          icon: <Dumbbell size={24} color="#EF4444" />,
          title: 'Low-Impact Exercises',
          description: 'Gentle activities to start your fitness journey',
          examples: ['Water aerobics', 'Chair exercises', 'Walking with support'],
          resources: [
            { title: 'Exercises for Obese Beginners', url: 'https://www.youtube.com/watch?v=gC_L9qAHVJ8&t=337s&ab_channel=BodyProject' },
            { title: 'Safe Workouts for Larger Bodies', url: 'https://www.verywellfit.com/plus-size-exercise-tips-3496103' }
          ]
        },
        {
          icon: <Yoga size={24} color="#EF4444" />,
          title: 'Gentle Yoga for Beginners',
          description: 'Adapted practices focusing on mobility and breath',
          examples: ['Chair yoga', 'Restorative yoga', 'Gentle stretching'],
          resources: [
            { title: 'Yoga for Larger Bodies', url: 'https://www.youtube.com/watch?v=CUSkADgA5i8' },
            { title: 'Accessible Yoga Poses', url: 'https://bodybyyoga.training/yoga-for-beginners/yoga-for-plus-sized-beginners/' }
          ]
        }
      ],
    };

    return recommendations[bmiCategory] || recommendations['Normal Weight'];
  };

  const validateInputs = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const heightFeetNum = parseFloat(heightFeet) || 0;
    const heightInchesNum = parseFloat(heightInches) || 0;
    const ageNum = parseFloat(age);

    if (!weightNum || weightNum <= 0) return false;
    if (heightUnit === 'cm' && (!heightNum || heightNum <= 0)) return false;
    if (heightUnit === 'ft' && (!heightFeetNum || heightFeetNum <= 0)) return false;
    if (!ageNum || ageNum <= 0 || ageNum > 120) return false;

    return true;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);
    const heightFeetNum = parseFloat(heightFeet) || 0;
    const heightInchesNum = parseFloat(heightInches) || 0;
    const ageNum = parseFloat(age);

    const weightKg = convertToKg(weightNum, weightUnit);
    const heightCm = convertToCm(
      heightUnit === 'ft' ? heightInchesNum : heightNum,
      heightFeetNum,
      heightUnit
    );

    const bmi = calculateBMI(weightKg, heightCm);
    const calories = calculateCalories(weightKg, heightCm, ageNum, gender, activityLevel);
    const tips = getHealthTips(bmi.category);
    const exercises = getExerciseRecommendations(bmi.category);

    setResults({ bmi, calories, tips, exercises });
    setShowResults(true);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setShowResults(false);
  };

  const openLink = (url) => {
    window.open(url, '_blank');
  };

  const UnitToggle = ({ options, selected, onSelect }) => (
    <div className={`unit-toggle ${isDarkMode ? 'dark' : ''}`}>
      {options.map((option) => (
        <button
          key={option}
          className={`unit-option ${selected === option ? 'active' : ''}`}
          onClick={() => onSelect(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );

  if (showResults && results.bmi && results.calories) {
    return (
      <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="container">
          {/* Header */}
          <div className="results-header">
            <button className="back-button" onClick={handleBack}>
              <ArrowLeft size={24} />
            </button>
            <h2 className="results-title">{t.resultsTitle}</h2>
            <div className="placeholder" />
          </div>

          {/* BMI Result */}
          <div className="result-card" style={{ borderLeftColor: results.bmi.color }}>
            <div className="bmi-header">
              <div className="icon-container" style={{ backgroundColor: `${results.bmi.color}20` }}>
                <Heart size={24} color={results.bmi.color} />
              </div>
              <h3 className="card-title">{t.bmiResult}</h3>
            </div>
            <div className="bmi-value" style={{ color: results.bmi.color }}>
              {results.bmi.value}
            </div>
            <div className="bmi-category" style={{ color: results.bmi.color }}>
              {results.bmi.category}
            </div>
            <p className="bmi-message">{results.bmi.message}</p>
          </div>

          {/* Calorie Result */}
          <div className="result-card">
            <div className="calorie-header">
              <div className="icon-container" style={{ backgroundColor: '#3B82F620' }}>
                <Target size={24} color="#3B82F6" />
              </div>
              <h3 className="card-title">{t.dailyCalories}</h3>
            </div>
            <div className="calorie-range">
              {results.calories.min.toLocaleString()} - {results.calories.max.toLocaleString()}
            </div>
            <p className="calorie-subtext">
              {t.basedOnBMR}: {results.calories.bmr.toLocaleString()} calories
            </p>
            <div className="info-box">
              <Info size={16} />
              <p className="info-text">
                {t.estimateNote}
              </p>
            </div>
          </div>

          {/* Health Tips */}
          <div className="result-card">
            <div className="section-header">
              <h3 className="card-title">{t.healthTips}</h3>
            </div>
            <div className="tips-container">
              {results.tips.map((tip, index) => (
                <div key={index} className="tip-card">
                  <div className="tip-icon">
                    {tip.icon}
                  </div>
                  <p className="tip-text">{tip.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Exercise Recommendations */}
          <div className="result-card">
            <div className="section-header">
              <h3 className="card-title">{t.exerciseRecommendations}</h3>
              <p className="section-subtitle">{t.tailoredToBMI}</p>
            </div>
            
            {results.exercises.map((exercise, index) => (
              <div key={index} className="exercise-card">
                <div className="exercise-header">
                  <div className="exercise-icon">
                    {exercise.icon}
                  </div>
                  <div className="exercise-title-container">
                    <h4 className="exercise-title">{exercise.title}</h4>
                    <p className="exercise-description">{exercise.description}</p>
                  </div>
                </div>
                
                <div className="examples-container">
                  <h5 className="examples-title">{t.examples}:</h5>
                  {exercise.examples.map((example, idx) => (
                    <div key={idx} className="example-item">
                      <div className="bullet-point" style={{ backgroundColor: results.bmi?.color }} />
                      <p className="example-text">{example}</p>
                    </div>
                  ))}
                </div>
                
                <div className="resources-container">
                  <h5 className="resources-title">{t.helpfulResources}:</h5>
                  {exercise.resources.map((resource, idx) => (
                    <button 
                      key={idx} 
                      className="resource-link"
                      onClick={() => openLink(resource.url)}
                    >
                      <span className="resource-text">{resource.title}</span>
                      <ExternalLink size={16} color="#3B82F6" />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Recalculate Button */}
          <div className="recalculate-section">
            <button className="recalculate-button" onClick={handleBack}>
              <Calculator size={20} color="#3B82F6" />
              <span className="recalculate-button-text">{t.recalculate}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`app ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-icon">
            <Calculator size={32} color="#3B82F6" />
          </div>
          <h1 className="title">{t.title}</h1>
          <p className="subtitle">{t.subtitle}</p>
          
          {/* Settings Row */}
          <div className="settings-row">
            <button 
              className="setting-button"
              onClick={() => setLanguage(language === 'en' ? 'es' : language === 'es' ? 'de' : 'en')}
            >
              <Globe size={20} color="#3B82F6" />
              <span className="setting-text">
                {t.language}: {language.toUpperCase()}
              </span>
            </button>
            
            <button 
              className="setting-button"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? (
                <Sun size={20} color="#F59E0B" />
              ) : (
                <MoonIcon size={20} color="#1F2937" />
              )}
              <span className="setting-text">
                {t.theme}: {isDarkMode ? t.darkTheme : t.lightTheme}
              </span>
            </button>
          </div>
        </header>

        <div className="form-section">
          {/* Weight Input */}
          <div className="input-card">
            <div className="input-header">
              <div className="input-label">
                <Weight size={20} color="#3B82F6" />
                <span className="input-label-text">{t.weight}</span>
              </div>
              <UnitToggle
                options={['kg', 'lbs']}
                selected={weightUnit}
                onSelect={setWeightUnit}
              />
            </div>
            <div className="input-with-unit">
              <input
                className="input large-input"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={t.enterWeight}
              />
              <span className="input-unit">{weightUnit}</span>
            </div>
          </div>

          {/* Height Input */}
          <div className="input-card">
            <div className="input-header">
              <div className="input-label">
                <Ruler size={20} color="#3B82F6" />
                <span className="input-label-text">{t.height}</span>
              </div>
              <UnitToggle
                options={['cm', 'ft']}
                selected={heightUnit}
                onSelect={setHeightUnit}
              />
            </div>
            {heightUnit === 'cm' ? (
              <div className="input-with-unit">
                <input
                  className="input large-input"
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder={t.enterHeightCm}
                />
                <span className="input-unit">cm</span>
              </div>
            ) : (
              <div className="height-row">
                <div className="input-with-unit">
                  <input
                    className="input large-input"
                    type="number"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(e.target.value)}
                    placeholder={t.enterHeightFt}
                  />
                  <span className="input-unit">ft</span>
                </div>
                <div className="input-with-unit">
                  <input
                    className="input large-input"
                    type="number"
                    value={heightInches}
                    onChange={(e) => setHeightInches(e.target.value)}
                    placeholder={t.enterHeightIn}
                  />
                  <span className="input-unit">in</span>
                </div>
              </div>
            )}
          </div>

          {/* Age Input */}
          <div className="input-card">
            <div className="input-label">
              <Calendar size={20} color="#3B82F6" />
              <span className="input-label-text">{t.age}</span>
            </div>
            <input
              className="input large-input"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder={t.enterAge}
            />
          </div>

          {/* Gender Selection */}
          <div className="input-card">
            <div className="input-label">
              <User size={20} color="#3B82F6" />
              <span className="input-label-text">{t.gender}</span>
            </div>
            <div className="gender-toggle">
              <button
                className={`gender-option ${gender === 'male' ? 'active' : ''}`}
                onClick={() => setGender('male')}
              >
                {t.male}
              </button>
              <button
                className={`gender-option ${gender === 'female' ? 'active' : ''}`}
                onClick={() => setGender('female')}
              >
                {t.female}
              </button>
            </div>
          </div>

          {/* Activity Level */}
          <div className="input-card">
            <div className="input-label">
              <Activity size={20} color="#3B82F6" />
              <span className="input-label-text">{t.activityLevel}</span>
            </div>
            <div className="activity-grid">
              {[
                { key: 'sedentary', label: t.sedentary, desc: t.sedentaryDesc },
                { key: 'light', label: t.light, desc: t.lightDesc },
                { key: 'moderate', label: t.moderate, desc: t.moderateDesc },
                { key: 'very', label: t.very, desc: t.veryDesc },
              ].map((item) => (
                <button
                  key={item.key}
                  className={`activity-option ${activityLevel === item.key ? 'active' : ''}`}
                  onClick={() => setActivityLevel(item.key)}
                >
                  <span className="activity-option-text">{item.label}</span>
                  <span className="activity-option-desc">{item.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        <div className="calculate-section">
          <button
            className={`calculate-button ${!validateInputs() ? 'disabled' : ''}`}
            onClick={handleCalculate}
            disabled={!validateInputs()}
          >
            <Calculator size={28} color="#FFFFFF" />
            <span className="calculate-button-text">{t.calculate}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;