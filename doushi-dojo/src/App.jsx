import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Check, ArrowRight, RefreshCw, BookOpen, Trophy, AlertCircle, Sparkles, Globe, Loader2, Settings, Sliders, X, Filter, Search, Zap, Moon, Sun, Key, Volume2, XCircle, CheckCircle, Book, Eye, EyeOff } from 'lucide-react';
import { getStaticData } from './data';

const ROMAJI_TO_KANA = {
  'a':'あ','i':'い','u':'う','e':'え','o':'お',
  'ka':'か','ki':'き','ku':'く','ke':'け','ko':'こ',
  'ga':'が','gi':'ぎ','gu':'ぐ','ge':'げ','go':'ご',
  'sa':'さ','shi':'し','si':'し','su':'す','se':'せ','so':'そ',
  'za':'ざ','ji':'じ','zi':'じ','zu':'ず','ze':'ぜ','zo':'ぞ',
  'ta':'た','chi':'ち','ti':'ち','tsu':'つ','tu':'つ','te':'て','to':'と',
  'da':'だ','di':'ぢ','du':'づ','de':'で','do':'ど',
  'na':'な','ni':'に','nu':'ぬ','ne':'ね','no':'の',
  'ha':'は','hi':'ひ','fu':'ふ','hu':'ふ','he':'へ','ho':'ほ',
  'ba':'ば','bi':'び','bu':'ぶ','be':'べ','bo':'ぼ',
  'pa':'ぱ','pi':'ぴ','pu':'ぷ','pe':'ぺ','po':'ぽ',
  'ma':'ま','mi':'み','mu':'む','me':'め','mo':'も',
  'ya':'や','yu':'ゆ','yo':'よ',
  'ra':'ら','ri':'り','ru':'る','re':'れ','ro':'ろ',
  'wa':'わ','wo':'を',
  'nn':'ん',
  'kya':'きゃ','kyu':'きゅ','kyo':'きょ',
  'gya':'ぎゃ','gyu':'ぎゅ','gyo':'ぎょ',
  'sha':'しゃ','sya':'しゃ','shu':'しゅ','syu':'しゅ','sho':'しょ','syo':'しょ',
  'ja':'じゃ','jya':'じゃ','zya':'じゃ','ju':'じゅ','jyu':'じゅ','zyu':'じゅ','jo':'じょ','jyo':'じょ','zyo':'じょ',
  'cha':'ちゃ','tya':'ちゃ','chu':'ちゅ','tyu':'ちゅ','cho':'ちょ','tyo':'ちょ',
  'nya':'にゃ','nyu':'にゅ','nyo':'にょ',
  'hya':'ひゃ','hyu':'ひゅ','hyo':'ひょ',
  'bya':'びゃ','byu':'びゅ','byo':'びょ',
  'pya':'ぴゃ','pyu':'ぴゅ','pyo':'ぴょ',
  'mya':'みゃ','myu':'みゅ','myo':'みょ',
  'rya':'りゃ','ryu':'りゅ','ryo':'りょ',
  '-': 'ー'
};

const convertRomajiToKana = (text) => {
    let result = '';
    let i = 0;
    text = text.toLowerCase();
    
    while (i < text.length) {
        // Handle double consonant (small tsu)
        if (i + 1 < text.length && text[i] === text[i+1] && text[i].match(/[a-z]/) && !text[i].match(/[aeiouyn]/)) {
            result += 'っ';
            i++;
            continue;
        }
        // Lookahead 3 chars
        if (i + 2 < text.length) {
            const sub3 = text.substring(i, i+3);
            if (ROMAJI_TO_KANA[sub3]) {
                result += ROMAJI_TO_KANA[sub3];
                i += 3;
                continue;
            }
        }
        // Lookahead 2 chars
        if (i + 1 < text.length) {
            const sub2 = text.substring(i, i+2);
            // Handle standalone 'n' before a consonant
            if (sub2[0] === 'n' && sub2[1].match(/[bcdfghjklmpqrstvwxz]/)) {
                 result += 'ん';
                 i++;
                 continue;
            }
            if (ROMAJI_TO_KANA[sub2]) {
                result += ROMAJI_TO_KANA[sub2];
                i += 2;
                continue;
            }
        }
        // Lookahead 1 char
        const sub1 = text.substring(i, i+1);
        if (ROMAJI_TO_KANA[sub1]) {
            result += ROMAJI_TO_KANA[sub1];
            i += 1;
            continue;
        }
        
        result += text[i];
        i++;
    }
    return result;
};

/**
 * ==========================================
 * MAIN APPLICATION
 * ==========================================
 */

const App = () => {
  // Load data
  const { ALL_TENSES, ALL_VERBS, CUSTOM_LIBRARY, TENSE_GUIDE, VERB_TRANSLATIONS, VERB_LEVELS } = useMemo(() => getStaticData(), []);

  // State
  const [exercises, setExercises] = useState([]); 
  const [prefetchedExercises, setPrefetchedExercises] = useState([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [status, setStatus] = useState("idle"); 
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showReading, setShowReading] = useState(false);
  
  // Track missed questions & animation
  const [mistakes, setMistakes] = useState([]);
  const [shake, setShake] = useState(false);
  
  // Loading States
  const [isFetching, setIsFetching] = useState(false);
  const [isPrefetching, setIsPrefetching] = useState(false);
  
  const [apiError, setApiError] = useState(null);
  const [view, setView] = useState('settings');
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Settings State
  const [selectedTenses, setSelectedTenses] = useState([]);
  const [selectedVerbs, setSelectedVerbs] = useState([]);
  const [verbSearchTerm, setVerbSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState('All');
  const [batchSize, setBatchSize] = useState(5);

  const inputRef = useRef(null);
  const currentExercise = exercises[currentExerciseIndex];

  // Initialize theme
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // --- SEO INJECTION ---
  useEffect(() => {
    document.title = "DoushiDojo | Learn Japanese Verbs";
    let metaDesc = document.querySelector("meta[name='description']");
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = "description";
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Master Japanese verb conjugations with DoushiDojo. Interactive practice for English speakers.";
  }, []);

  // Focus management
  useEffect(() => {
    if (view === 'practice' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [currentExerciseIndex, view]);

  // Background Prefetch
  useEffect(() => {
    if ((view === 'practice' || view === 'summary') && prefetchedExercises.length === 0 && !isPrefetching && !isFetching) {
      prefetchNextRound();
    }
  }, [view, prefetchedExercises.length, isPrefetching, isFetching]);

  // --- HELPER FUNCTIONS ---

  const toggleTense = (tense) => {
    setSelectedTenses(prev => 
      prev.includes(tense) ? prev.filter(t => t !== tense) : [...prev, tense]
    );
  };

  const toggleVerb = (verb) => {
    setSelectedVerbs(prev => 
      prev.includes(verb) ? prev.filter(v => v !== verb) : [...prev, verb]
    );
  };

  const selectAllTenses = () => setSelectedTenses(ALL_TENSES);
  const selectNoTenses = () => setSelectedTenses([]);
  const selectAllVerbs = () => setSelectedVerbs(ALL_VERBS);
  const selectNoVerbs = () => setSelectedVerbs([]);

  // --- EXERCISE LOGIC ---

  const getExercises = async (targetCount, tenses, verbs) => {
    const resultsContainer = [];
    const seenSentences = new Set();
    
    const customMatches = CUSTOM_LIBRARY.filter(item => 
        tenses.includes(item.tense) && 
        verbs.some(v => v.toLowerCase() === item.verb.toLowerCase())
    );
    
    const shuffledCustom = [...customMatches].sort(() => 0.5 - Math.random());
    
    for (const item of shuffledCustom) {
        if (resultsContainer.length >= targetCount) break;
        
        const match = item.text.match(/^(.*?)\[(.*?)\](.*)$/);
        
        if (match && !seenSentences.has(item.text)) {
            resultsContainer.push({
                id: `custom-${Date.now()}-${Math.random()}`,
                verb: item.verb,
                englishTranslation: item.translation,
                tense: item.tense,
                sentenceParts: [match[1], match[3]],
                answer: match[2],
                kana: item.kana,
                reading: item.reading,
                exception: item.exception,
                hint: `The answer is '${match[2]}'`,
                fullSentence: item.text.replace(/[\[\]]/g, "")
            });
            seenSentences.add(item.text);
        }
    }

    return resultsContainer;
  };

  const prefetchNextRound = async () => {
    setIsPrefetching(true);
    try {
      const newBatch = await getExercises(batchSize, selectedTenses, selectedVerbs);
      if (newBatch && newBatch.length > 0) {
        setPrefetchedExercises(newBatch);
      }
    } catch (err) {
      console.warn("Background prefetch failed:", err);
    } finally {
      setIsPrefetching(false);
    }
  };

  const handleLoadExercises = async (isNextRound = false) => {
    if (isNextRound && prefetchedExercises.length > 0) {
      setExercises(prefetchedExercises);
      setPrefetchedExercises([]); 
      setCurrentExerciseIndex(0);
      setUserInput("");
      setStatus("idle");
      setMistakes([]); 
      setShowReading(false);
      setView('practice');
      return;
    }
    
    setIsFetching(true);
    setApiError(null);
    setMistakes([]);
    
    try {
      const newExercises = await getExercises(batchSize, selectedTenses, selectedVerbs);
      
      if (newExercises.length === 0) {
          throw new Error("No sentences found for your selection. Please select more verbs or forms.");
      }
      
      setExercises(newExercises);
      setPrefetchedExercises([]); 
      setCurrentExerciseIndex(0);
      setUserInput("");
      setStatus("idle");
      setShowReading(false);
      setView('practice'); 
    } catch (err) {
      console.error("Load failed:", err);
      setApiError(err.message || "Failed to load exercises.");
    } finally {
      setIsFetching(false);
    }
  };

  // --- TTS HELPER (JAPANESE) ---
  const speakSentence = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleInputChange = (e) => {
    let val = e.target.value;
    val = convertRomajiToKana(val);
    setUserInput(val);
  };

  const handleCheck = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    let finalInput = userInput.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()。、！？\s]/g,"");
    finalInput = finalInput.replace(/n$/, 'ん');

    const cleanAnswer = currentExercise.answer.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()。、！？\s]/g,"");
    const cleanKana = currentExercise.kana ? currentExercise.kana.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()。、！？\s]/g,"") : null;

    if (finalInput === cleanAnswer || (cleanKana && finalInput === cleanKana)) {
      setStatus("correct");
      setScore(score + 10);
      setStreak(streak + 1);
      speakSentence(currentExercise.fullSentence);
    } else {
      setStatus("incorrect");
      setStreak(0);
      setShake(true); 
      setTimeout(() => setShake(false), 500); 
      
      setMistakes(prev => {
        if (!prev.some(m => m.id === currentExercise.id)) {
            return [...prev, { ...currentExercise, usersWrongAnswer: userInput }];
        }
        return prev;
      });
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex + 1 >= exercises.length) {
      setView('summary');
      return;
    }

    setUserInput("");
    setStatus("idle");
    setShowHint(false);
    setShowReading(false);
    setApiError(null);
    setCurrentExerciseIndex((prev) => prev + 1);
  };

  const handleRetry = () => {
    setStatus("idle");
    inputRef.current.focus();
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (status === 'correct' && e.key === 'Enter') {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown);
    };
  }, [status, handleNext]);

  // --- VIEWS ---

  const renderPracticeView = () => {
    if (!currentExercise) return null;

    return (
      <main className={`w-full max-w-md rounded-3xl shadow-xl overflow-hidden border relative transition-colors duration-300 ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-stone-200'}`}>
        <button 
          onClick={() => setView('settings')}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-rose-400 hover:bg-zinc-800' : 'text-stone-400 hover:text-rose-600 hover:bg-stone-100'}`}
          title="Customize Practice"
        >
          <Sliders size={20} />
        </button>

        {/* Progress Bar */}
        <div className={`w-full h-1.5 ${isDarkMode ? 'bg-zinc-800' : 'bg-stone-100'}`}>
          <div 
            className="bg-rose-600 h-1.5 transition-all duration-500 ease-out rounded-r-full"
            style={{ width: `${((currentExerciseIndex + 1) / exercises.length) * 100}%` }}
          ></div>
        </div>

        <div className="p-6 sm:p-8">
          <div className="text-center mb-8">
            <div className={`inline-block px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase mb-3 ${isDarkMode ? 'bg-rose-900/30 text-rose-300' : 'bg-rose-100 text-rose-700'}`}>
              {currentExercise.tense}
            </div>
            <h2 className={`text-3xl font-black mb-2 tracking-tight flex flex-col gap-1 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
              <span>{currentExercise.verb}</span>
              {VERB_TRANSLATIONS[currentExercise.verb] && (
                <span className={`text-lg font-bold ${isDarkMode ? 'text-zinc-500' : 'text-stone-400'}`}>
                  {VERB_TRANSLATIONS[currentExercise.verb]}
                </span>
              )}
            </h2>
            
            <p className={`text-sm font-medium px-4 ${isDarkMode ? 'text-zinc-400' : 'text-stone-500'}`}>"{currentExercise.englishTranslation}"</p>
          </div>

          <form onSubmit={handleCheck} className="mb-6">
            <div className={`
                p-6 rounded-2xl border text-lg sm:text-xl leading-relaxed text-center shadow-sm transition-all duration-300 relative
                ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700 text-zinc-200' : 'bg-stone-50 border-stone-200 text-zinc-800'}
                ${shake ? 'animate-shake border-red-400' : ''} 
            `}>
              <style>{`
                @keyframes shake {
                  0%, 100% { transform: translateX(0); }
                  25% { transform: translateX(-5px); }
                  75% { transform: translateX(5px); }
                }
                .animate-shake {
                  animation: shake 0.3s ease-in-out;
                }
              `}</style>

              <button
                type="button"
                onClick={() => setShowReading(!showReading)}
                className={`absolute top-3 left-3 p-2 rounded-full transition-colors ${
                  isDarkMode 
                    ? 'text-zinc-400 hover:text-rose-400 hover:bg-zinc-700' 
                    : 'text-stone-400 hover:text-rose-600 hover:bg-white border border-transparent hover:border-stone-200 shadow-sm'
                }`}
                title="Toggle Hiragana Reading"
              >
                {showReading ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
              
              {status !== 'idle' && (
                <button
                  type="button"
                  onClick={() => speakSentence(currentExercise.fullSentence)}
                  className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                    isDarkMode 
                      ? 'text-zinc-400 hover:text-rose-400 hover:bg-zinc-700' 
                      : 'text-stone-400 hover:text-rose-600 hover:bg-white border border-transparent hover:border-stone-200 shadow-sm'
                  }`}
                  title="Listen to sentence"
                >
                  <Volume2 size={18} />
                </button>
              )}

              {/* Full Sentence Kana Reading */}
              {showReading && (
                <div className={`mb-5 pb-5 border-b text-sm sm:text-base animate-in fade-in slide-in-from-top-2 tracking-widest font-medium
                  ${isDarkMode ? 'border-zinc-700 text-rose-300' : 'border-stone-200 text-rose-600'}
                `}>
                  {status === 'correct' 
                    ? currentExercise.reading 
                    : currentExercise.reading.replace(currentExercise.kana, '________')}
                </div>
              )}

              <span>{currentExercise.sentenceParts[0]} </span>
              <span className="relative inline-block mx-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  disabled={status === 'correct'}
                  className={`
                    w-36 border-b-2 outline-none text-center font-bold px-1 py-1 rounded-t-lg transition-colors
                    ${status === 'idle' 
                        ? (isDarkMode ? 'bg-zinc-700/50 border-zinc-600 text-rose-300 focus:bg-zinc-700 focus:border-rose-500' : 'bg-white border-stone-300 text-rose-700 focus:bg-rose-50 focus:border-rose-500') 
                        : ''}
                    ${status === 'correct' 
                        ? (isDarkMode ? 'border-emerald-500 bg-emerald-900/20 text-emerald-400' : 'border-emerald-500 bg-emerald-50 text-emerald-700') 
                        : ''}
                    ${status === 'incorrect' 
                        ? (isDarkMode ? 'border-red-500 bg-red-900/20 text-red-400' : 'border-red-500 bg-red-50 text-red-700') 
                        : ''}
                  `}
                  placeholder="..."
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  lang="ja"
                />
              </span>
              <span> {currentExercise.sentenceParts[1]}</span>
            </div>

            {status !== 'correct' && (
              <div className="mt-5 flex justify-center">
                <button 
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className={`text-sm font-medium flex items-center gap-1.5 px-4 py-2 rounded-full transition-colors ${isDarkMode ? 'text-zinc-400 bg-zinc-800 hover:text-rose-400' : 'text-stone-500 bg-stone-100 hover:text-rose-600'}`}
                >
                  <Sparkles size={16} />
                  {showHint ? currentExercise.hint : "Need a hint?"}
                </button>
              </div>
            )}
          </form>

          <div className="mt-8 min-h-[4.5rem]"> 
            {status === 'idle' && (
              <button
                onClick={handleCheck}
                disabled={!userInput.trim()}
                className={`w-full py-4 rounded-2xl font-bold text-white shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2
                  ${userInput.trim() ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/25' : (isDarkMode ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed shadow-none' : 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none')}
                `}
              >
                Check Answer
              </button>
            )}

            {status === 'correct' && (
              <button
                onClick={handleNext}
                className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/25 transition-all transform active:scale-95 flex items-center justify-center gap-2 animate-in fade-in slide-in-from-bottom-2"
              >
                <span>Continue (Enter)</span>
                <ArrowRight size={20} />
              </button>
            )}

            {status === 'incorrect' && (
              <div className="flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2">
                 <div className="flex gap-3">
                   <div className={`flex-1 border rounded-2xl flex items-center justify-center px-4 font-bold ${isDarkMode ? 'bg-red-900/20 border-red-800/50 text-red-400' : 'bg-red-50 border-red-100 text-red-600'}`}>
                     Incorrect
                   </div>
                   <button
                    onClick={handleRetry}
                    className={`px-8 py-4 text-white rounded-2xl font-bold shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2 ${isDarkMode ? 'bg-zinc-700 hover:bg-zinc-600' : 'bg-zinc-800 hover:bg-zinc-900 shadow-zinc-800/25'}`}
                  >
                    <RefreshCw size={20} />
                    <span>Retry</span>
                  </button>
                 </div>
                 
                 {/* Exception Notice */}
                 {currentExercise.exception && (
                    <div className={`text-sm p-4 rounded-2xl text-left flex items-start gap-3 ${isDarkMode ? 'bg-amber-900/20 text-amber-400 border border-amber-800/30' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                        <p className="leading-relaxed"><strong>Irregular Verb:</strong> {currentExercise.exception}</p>
                    </div>
                 )}
              </div>
            )}
          </div>

          <div className={`mt-5 text-center text-sm font-bold transition-colors duration-300 h-6 tracking-wide
            ${status === 'correct' ? (isDarkMode ? 'text-emerald-400' : 'text-emerald-600') : ''}
            ${status === 'incorrect' ? (isDarkMode ? 'text-red-400' : 'text-red-500') : ''}
            ${status === 'idle' ? 'opacity-0' : 'opacity-100'}
          `}>
            {status === 'correct' ? 'Correct! Well done.' : status === 'incorrect' ? 'Not quite right. Try again.' : ''}
          </div>
        </div>
        
        <div className={`py-3 flex justify-center border-t ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-stone-50 border-stone-100'}`}>
           <div className={`text-xs font-medium tracking-wide flex items-center gap-1.5 ${isDarkMode ? 'text-zinc-500' : 'text-stone-400'}`}>
             <div className={`w-1.5 h-1.5 rounded-full ${isDarkMode ? 'bg-rose-500' : 'bg-rose-400'}`}></div>
             <span><strong className={isDarkMode ? 'text-zinc-300' : 'text-zinc-600'}>{exercises.length}</strong> in queue</span>
           </div>
        </div>
      </main>
    );
  };

  const renderGuideView = () => (
    <main className={`w-full max-w-md rounded-3xl shadow-xl overflow-hidden border animate-in fade-in zoom-in-95 flex flex-col h-[80vh] transition-colors duration-300 ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-stone-200'}`}>
      <div className={`p-6 pb-4 border-b ${isDarkMode ? 'border-zinc-800' : 'border-stone-100'}`}>
        <div className="flex justify-between items-center">
          <h2 className={`text-xl font-black flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
            <Book size={22} className={isDarkMode ? 'text-rose-400' : 'text-rose-600'}/>
            Verb Form Guide
          </h2>
          <button onClick={() => setView('settings')} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800' : 'text-stone-400 hover:text-zinc-800 hover:bg-stone-100'}`}>
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        {TENSE_GUIDE.map((item, index) => (
          <div key={index} className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700' : 'bg-stone-50 border-stone-200'}`}>
            <h3 className={`text-lg font-bold mb-3 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>{item.name}</h3>
            <p className={`text-sm mb-4 leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-stone-700'}`}>
              <strong className={isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}>Usage:</strong> {item.usage}
            </p>
            <div className={`text-sm p-4 rounded-xl ${isDarkMode ? 'bg-zinc-900 border border-zinc-700' : 'bg-white border border-stone-200 shadow-sm'}`}>
              <p className={`mb-2 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-stone-500'}`}>
                <strong className={isDarkMode ? 'text-zinc-200' : 'text-zinc-700'}>Structure:</strong> {item.structure}
              </p>
              <p className={`font-mono text-[13px] mt-3 font-semibold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                {item.example}
              </p>
            </div>
            
            {item.exceptions && (
              <div className={`mt-4 text-sm p-4 rounded-xl border flex items-start gap-2 ${isDarkMode ? 'bg-amber-900/10 text-amber-400 border-amber-900/30' : 'bg-amber-50 text-amber-800 border-amber-100'}`}>
                <AlertCircle size={16} className="mt-0.5 shrink-0 opacity-80" />
                <p className="leading-relaxed"><strong>Exceptions:</strong> {item.exceptions}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );

  const renderSummaryView = () => (
    <main className={`w-full max-w-md rounded-3xl shadow-xl overflow-hidden border animate-in fade-in zoom-in-95 p-8 transition-colors duration-300 flex flex-col ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-stone-200'}`}>
      <div className="text-center">
        <div className="flex justify-center mb-6">
            <div className={`p-5 rounded-full ${isDarkMode ? 'bg-rose-900/20 text-rose-400' : 'bg-rose-100 text-rose-600'}`}>
            <Trophy size={48} />
            </div>
        </div>
        
        <h2 className={`text-3xl font-black mb-3 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>Round Complete!</h2>
        <p className={`mb-8 font-medium ${isDarkMode ? 'text-zinc-400' : 'text-stone-500'}`}>You've finished this set of exercises.</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
            <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700' : 'bg-stone-50 border-stone-200'}`}>
            <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-zinc-500' : 'text-stone-400'}`}>Total Score</div>
            <div className={`text-3xl font-black ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>{score}</div>
            </div>
            <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-zinc-800/50 border-zinc-700' : 'bg-stone-50 border-stone-200'}`}>
            <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${isDarkMode ? 'text-zinc-500' : 'text-stone-400'}`}>Current Streak</div>
            <div className={`text-3xl font-black ${isDarkMode ? 'text-amber-400' : 'text-amber-500'}`}>{streak}</div>
            </div>
        </div>
      </div>

      {mistakes.length > 0 && (
          <div className="mb-8 w-full">
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${isDarkMode ? 'text-zinc-400' : 'text-stone-500'}`}>
                <div className="h-px bg-current flex-1 opacity-20"></div>
                Needs Review
                <div className="h-px bg-current flex-1 opacity-20"></div>
              </h3>
              <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                  {mistakes.map((mistake, i) => (
                      <div key={i} className={`p-4 rounded-2xl border text-left text-sm ${isDarkMode ? 'bg-red-900/10 border-red-900/30' : 'bg-red-50/50 border-red-100'}`}>
                          <div className="flex items-center gap-2 mb-2">
                              <XCircle size={16} className="text-red-500" />
                              <span className={`font-bold ${isDarkMode ? 'text-zinc-200' : 'text-zinc-800'}`}>{mistake.verb}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${isDarkMode ? 'bg-zinc-800 text-zinc-400' : 'bg-white text-stone-500 border border-stone-200'}`}>{mistake.tense}</span>
                          </div>
                          <div className={`pl-7 mb-3 leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-stone-600'}`}>
                              "{mistake.sentenceParts[0]} <span className="line-through decoration-red-500 text-red-500 font-semibold">{mistake.usersWrongAnswer}</span> {mistake.sentenceParts[1]}"
                          </div>
                          <div className={`pl-7 flex items-center gap-2 font-bold ${isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>
                              <CheckCircle size={16} />
                              <span>{mistake.answer}</span>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      )}

      <button 
        onClick={() => handleLoadExercises(true)}
        disabled={isFetching}
        className={`w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold shadow-lg shadow-rose-600/20 transition-all transform active:scale-95 flex items-center justify-center gap-2 ${isFetching ? (isDarkMode ? 'disabled:bg-zinc-800 disabled:text-zinc-500' : 'disabled:bg-stone-200 disabled:text-stone-400 disabled:shadow-none') : ''}`}
      >
        {isFetching ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>Loading...</span>
          </>
        ) : prefetchedExercises.length > 0 ? (
          <>
            <Sparkles size={20} className={isDarkMode ? 'text-amber-200' : 'text-amber-300'} />
            <span>Start Next Round</span>
          </>
        ) : (
          <>
            <RefreshCw size={20} />
            <span>Load Next Round</span>
          </>
        )}
      </button>
      
      <button 
        onClick={() => setView('settings')}
        className={`mt-4 py-3 text-sm font-bold transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-rose-400' : 'text-stone-400 hover:text-rose-600'}`}
      >
        Adjust Settings
      </button>
    </main>
  );

  const renderSettingsView = () => (
    <main className={`w-full max-w-md rounded-3xl shadow-xl overflow-hidden border animate-in fade-in zoom-in-95 flex flex-col h-[85vh] transition-colors duration-300 ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-stone-200'}`}>
      <div className={`p-6 pb-4 border-b ${isDarkMode ? 'border-zinc-800' : 'border-stone-100'}`}>
        <div className="flex justify-between items-center">
          <h2 className={`text-xl font-black flex items-center gap-2 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}>
            <Settings size={22} className={isDarkMode ? 'text-rose-400' : 'text-rose-600'}/>
            Practice Setup
          </h2>
          {exercises.length > 0 && (
            <button onClick={() => setView('practice')} className={`p-2 rounded-full transition-colors ${isDarkMode ? 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800' : 'text-stone-400 hover:text-zinc-800 hover:bg-stone-100'}`}>
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
        {/* Batch Size Selection */}
        <section>
            <label className={`text-xs font-bold uppercase tracking-widest mb-4 block ${isDarkMode ? 'text-zinc-500' : 'text-stone-400'}`}>
                Questions per Round
            </label>
            <div className={`flex gap-2 p-1.5 rounded-2xl ${isDarkMode ? 'bg-zinc-800/50' : 'bg-stone-100'}`}>
                {[5, 10, 15, 20].map(size => (
                    <button
                        key={size}
                        onClick={() => setBatchSize(size)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                            batchSize === size
                                ? (isDarkMode ? 'bg-zinc-700 text-rose-400 shadow-sm' : 'bg-white text-rose-600 shadow-sm')
                                : (isDarkMode ? 'text-zinc-400 hover:text-zinc-200' : 'text-stone-500 hover:text-zinc-900')
                        }`}
                    >
                        {size}
                    </button>
                ))}
            </div>
        </section>

        {/* Tenses Selection */}
        <section>
          <div className="flex justify-between items-end mb-4">
              <label className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-stone-400'}`}>Verb Forms</label>
              <div className="flex gap-3 text-xs font-bold">
                 <button onClick={selectAllTenses} className={`transition-colors ${isDarkMode ? 'text-rose-400 hover:text-rose-300' : 'text-rose-600 hover:text-rose-700'}`}>All</button>
                 <span className={isDarkMode ? 'text-zinc-700' : 'text-stone-300'}>|</span>
                 <button onClick={selectNoTenses} className={`transition-colors ${isDarkMode ? 'text-rose-400 hover:text-rose-300' : 'text-rose-600 hover:text-rose-700'}`}>None</button>
              </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {ALL_TENSES.map(tense => (
              <button
                key={tense}
                onClick={() => toggleTense(tense)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                  selectedTenses.includes(tense) 
                    ? (isDarkMode ? 'bg-rose-900/30 text-rose-300 border-rose-800/50 shadow-inner' : 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm')
                    : (isDarkMode ? 'bg-zinc-800/50 text-zinc-400 border-transparent hover:bg-zinc-800' : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100')
                }`}
              >
                {tense}
              </button>
            ))}
          </div>
        </section>

        {/* Verbs Selection */}
        <section>
          <div className={`flex flex-col gap-3 mb-4 sticky top-0 z-10 pt-2 pb-3 transition-colors ${isDarkMode ? 'bg-zinc-900' : 'bg-white'}`}>
              <div className="flex justify-between items-end">
                 <label className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-stone-400'}`}>
                    Verbs <span className={`ml-1 normal-case ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>({selectedVerbs.length})</span>
                 </label>
                 <div className="flex gap-3 text-xs font-bold">
                    <button onClick={selectAllVerbs} className={`transition-colors ${isDarkMode ? 'text-rose-400 hover:text-rose-300' : 'text-rose-600 hover:text-rose-700'}`}>All</button>
                    <span className={isDarkMode ? 'text-zinc-700' : 'text-stone-300'}>|</span>
                    <button onClick={selectNoVerbs} className={`transition-colors ${isDarkMode ? 'text-rose-400 hover:text-rose-300' : 'text-rose-600 hover:text-rose-700'}`}>None</button>
                 </div>
              </div>
              
              {/* JLPT Level Filters */}
              <div className="flex gap-2 overflow-x-auto pb-1 custom-scrollbar hide-scrollbar">
                 {['All', 'N5', 'N4', 'N3', 'N2', 'N1'].map(level => (
                     <button
                         key={level}
                         onClick={() => setLevelFilter(level)}
                         className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                             levelFilter === level
                                 ? (isDarkMode ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50' : 'bg-rose-100 text-rose-700 border border-rose-200')
                                 : (isDarkMode ? 'bg-zinc-800 text-zinc-400 border border-transparent hover:bg-zinc-700' : 'bg-stone-100 text-stone-500 border border-transparent hover:bg-stone-200')
                         }`}
                     >
                         {level === 'All' ? 'All Levels' : level}
                     </button>
                 ))}
              </div>

              <div className="relative">
                <Search size={18} className={`absolute left-3.5 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-zinc-500' : 'text-stone-400'}`} />
                <input 
                  type="text" 
                  placeholder="Search Japanese verbs..." 
                  value={verbSearchTerm}
                  onChange={(e) => setVerbSearchTerm(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-rose-500/50 transition-colors ${isDarkMode ? 'bg-zinc-800 text-zinc-200 placeholder:text-zinc-500' : 'bg-stone-100 text-zinc-900 border-transparent placeholder:text-stone-400'}`}
                />
              </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {(() => {
                const filteredVerbs = ALL_VERBS.filter(v => {
                    const matchesSearch = v.toLowerCase().includes(verbSearchTerm.toLowerCase());
                    const matchesLevel = levelFilter === 'All' || VERB_LEVELS[v] === levelFilter;
                    return matchesSearch && matchesLevel;
                });

                if (filteredVerbs.length === 0) {
                    return (
                        <div className={`w-full py-10 text-center border-2 border-dashed rounded-2xl text-sm font-medium ${isDarkMode ? 'border-zinc-800 text-zinc-500' : 'border-stone-200 text-stone-400'}`}>
                            <Filter size={28} className="mx-auto mb-3 opacity-40" />
                            <p>No verbs found matching your filters</p>
                        </div>
                    );
                }

                return filteredVerbs.map(verb => (
                  <button
                    key={verb}
                    onClick={() => toggleVerb(verb)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border flex flex-col items-center gap-1 ${
                      selectedVerbs.includes(verb) 
                        ? (isDarkMode ? 'bg-rose-900/30 text-rose-300 border-rose-800/50 shadow-inner' : 'bg-rose-50 text-rose-700 border-rose-200 shadow-sm')
                        : (isDarkMode ? 'bg-zinc-800/50 text-zinc-400 border-transparent hover:bg-zinc-800' : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100')
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                        <span>{verb}</span>
                        {VERB_LEVELS[verb] && (
                            <span className={`text-[9px] px-1.5 py-0.5 rounded font-black ${
                                selectedVerbs.includes(verb)
                                    ? (isDarkMode ? 'bg-rose-800/50 text-rose-300' : 'bg-rose-200 text-rose-600')
                                    : (isDarkMode ? 'bg-zinc-700 text-zinc-400' : 'bg-stone-200 text-stone-500')
                            }`}>
                                {VERB_LEVELS[verb]}
                            </span>
                        )}
                    </div>
                    {VERB_TRANSLATIONS[verb] && (
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${selectedVerbs.includes(verb) ? (isDarkMode ? 'text-rose-400/70' : 'text-rose-500/70') : (isDarkMode ? 'text-zinc-500' : 'text-stone-400')}`}>
                            {VERB_TRANSLATIONS[verb]}
                        </span>
                    )}
                  </button>
                ));
            })()}
          </div>
        </section>
      </div>

      <div className={`p-6 border-t ${isDarkMode ? 'border-zinc-800 bg-zinc-900/80 backdrop-blur' : 'border-stone-100 bg-white/80 backdrop-blur'}`}>
        {apiError && (
          <div className={`mb-4 p-4 text-sm font-medium rounded-2xl flex items-start gap-3 border ${isDarkMode ? 'bg-red-900/20 text-red-300 border-red-800/50' : 'bg-red-50 text-red-600 border-red-100'}`}>
            <AlertCircle size={18} className="mt-0.5 shrink-0" />
            <p>{apiError}</p>
          </div>
        )}

        <button 
          onClick={() => handleLoadExercises(false)}
          disabled={isFetching || selectedTenses.length === 0 || selectedVerbs.length === 0}
          className={`w-full py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-bold shadow-lg shadow-rose-600/25 transition-all transform active:scale-95 flex items-center justify-center gap-2 ${isFetching || selectedTenses.length === 0 || selectedVerbs.length === 0 ? (isDarkMode ? 'disabled:bg-zinc-800 disabled:text-zinc-600 disabled:shadow-none' : 'disabled:bg-stone-200 disabled:text-stone-400 disabled:shadow-none') : ''}`}
        >
          {isFetching ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Globe size={20} />
          )}
          <span>{isFetching ? "Loading..." : `Start Practice (${batchSize})`}</span>
        </button>
      </div>
    </main>
  );

  return (
    <div className={`min-h-screen font-sans flex flex-col items-center py-4 sm:py-10 px-4 sm:px-6 transition-colors duration-500 ${isDarkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-stone-50 text-zinc-900'}`}>
      
      {/* Header Area */}
      <header className="w-full max-w-md flex justify-between items-center mb-8 px-2">
        <div className="flex items-center gap-3">
          <div className="bg-rose-600 text-white p-2.5 rounded-full shadow-md shadow-rose-600/20">
            <div className="w-5 h-5 border-2 border-white rounded-full flex items-center justify-center relative">
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            </div>
          </div>
          <div>
            <h1 className={`font-black text-xl tracking-tight leading-none ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>DoushiDojo</h1>
            <p className={`text-[11px] font-bold uppercase tracking-widest mt-1 ${isDarkMode ? 'text-zinc-500' : 'text-stone-400'}`}>Nihongo</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => setView('guide')} 
              className={`p-2.5 rounded-full transition-colors ${isDarkMode ? 'bg-zinc-900 text-rose-400 hover:bg-zinc-800 border border-zinc-800' : 'bg-white text-rose-600 hover:bg-stone-50 border border-stone-200 shadow-sm'}`}
              aria-label="View Guide"
              title="Verb Form Guide"
            >
              <Book size={18} />
            </button>

            <div className="hidden sm:flex gap-4">
              <div className="flex flex-col items-end">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-stone-400'}`}>Score</span>
                <span className={`font-black text-lg leading-none mt-0.5 ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>{score}</span>
              </div>
              <div className="flex flex-col items-end">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-stone-400'}`}>Streak</span>
                  <div className={`flex items-center gap-1 font-black text-lg leading-none mt-0.5 ${isDarkMode ? 'text-amber-400' : 'text-amber-500'}`}>
                    <Trophy size={14} className="mb-0.5" />
                    <span>{streak}</span>
                  </div>
              </div>
            </div>

            <button 
              onClick={toggleTheme}
              className={`p-2.5 rounded-full transition-colors ${isDarkMode ? 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800' : 'bg-white text-stone-500 hover:bg-stone-50 hover:text-zinc-900 border border-stone-200 shadow-sm'}`}
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
        </div>
      </header>

      {/* Mobile Stat Bar */}
      <div className={`sm:hidden w-full max-w-md flex justify-between mb-6 px-5 py-4 rounded-2xl shadow-sm border ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-stone-200'}`}>
            <div className="flex items-center gap-3">
                <span className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-stone-400'}`}>Score</span>
                <span className={`font-black text-xl ${isDarkMode ? 'text-rose-400' : 'text-rose-600'}`}>{score}</span>
            </div>
            <div className="flex items-center gap-3">
                <span className={`text-xs font-bold uppercase tracking-widest ${isDarkMode ? 'text-zinc-500' : 'text-stone-400'}`}>Streak</span>
                <div className={`flex items-center gap-1.5 font-black text-xl ${isDarkMode ? 'text-amber-400' : 'text-amber-500'}`}>
                  <Trophy size={16} className="mb-0.5" />
                  <span>{streak}</span>
                </div>
            </div>
      </div>

      {/* Main Content Switcher */}
      {view === 'practice' && renderPracticeView()}
      {view === 'settings' && renderSettingsView()}
      {view === 'summary' && renderSummaryView()}
      {view === 'guide' && renderGuideView()}

      <div className={`mt-8 text-xs font-medium max-w-xs text-center tracking-wide leading-relaxed transition-colors ${isDarkMode ? 'text-zinc-600' : 'text-stone-400'}`}>
        Created for English speakers learning Japanese.<br/>Type in Romaji and it auto-converts to Hiragana.
      </div>
    </div>
  );
};

export default App;