import React, { useState } from "react";
import FrameComponent from "../components/DictionaryComponent";

const DictionaryPage: React.FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [wordData, setWordData] = useState<any>(null);
  const [error, setError] = useState("");
  const [fetchedWords, setFetchedWords] = useState<string[]>([]);
  const [selectedFont, setSelectedFont] = useState("Sans Serif"); 
  const [darkMode, setDarkMode] = useState(false);
  const [inputError, setInputError] = useState(false);

  const fetchWordData = async (term: string) => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${term}`);

      if (!response.ok) {
        setError("No Definitions Found");
        setWordData(null);
        return;
      }

      const data = await response.json();
      setWordData(data[0]);
      setError("");
      setInputError(false);
      if (!fetchedWords.includes(term)) {
        setFetchedWords([...fetchedWords, term]);
      }
    } catch (error: any) {
      setError("An error occurred while fetching the data.");
      setWordData(null);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setError("Whooops, can't be empty.");
      setInputError(true);
      return;
    }
    if (fetchedWords.includes(searchTerm)) {
      setWordData(null); 
      setTimeout(() => {
        fetchWordData(searchTerm);
      }, 100);
    } else {
      fetchWordData(searchTerm);
    }
  };

  const handleFontChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFont(event.target.value);
  };

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setInputError(false);
    setError("");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  let fontClass = "";
  switch (selectedFont) {
    case "Sans Serif":
      fontClass = "font-sans";
      break;
    case "Serif":
      fontClass = "font-serif";
      break;
    case "Monospace":
      fontClass = "font-mono";
      break;
    default:
      fontClass = "font-sans";
  }

  return (
    <div
      className={`w-full min-h-screen relative overflow-hidden flex flex-col items-end justify-start pt-[58px] pb-[124px] pr-[352px] pl-0 box-border gap-[25px] leading-[normal] tracking-[normal] text-left text-lg ${
        darkMode ? "bg-black text-white" : "bg-white text-gray-800"
      } font-body-s-sans mq450:pr-5 mq450:box-border mq825:pr-44 mq825:box-border`}
    >
      <div className="w-[757px] flex flex-col items-end justify-start py-0 pr-0 pl-5 box-border gap-[40px] max-w-full mq825:gap-[20px]">
        <div className="self-stretch flex flex-col items-start justify-start gap-[51.5px] max-w-full mq825:gap-[26px]">
          <div className="self-stretch flex flex-row items-start justify-between gap-[20px] mq450:flex-wrap">
            <img
              className="h-[36.5px] w-8 relative object-cover min-h-[37px] filter brightness-100 dark:brightness-50"
              alt=""
              src="/iconoir-book@2x.png"
              style={{ filter: darkMode ? "brightness(50%)" : "brightness(100%)" }}
            />
            <div className="w-[253px] flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border">
              <div className="self-stretch flex flex-row items-start justify-start gap-[18px]">
                <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
                  <select
                    value={selectedFont}
                    onChange={handleFontChange}
                    className={`relative leading-[24px] font-bold text-[inherit] inline-block min-w-[90px] outline-none border-none ${
                      darkMode ? "bg-black text-white" : "text-gray-800"
                    }`}
                  >
                    <option value="Sans Serif">Sans Serif</option>
                    <option value="Serif">Serif</option>
                    <option value="Monospace">Monospace</option>
                  </select>
                </div>
                <div className="flex-1 flex flex-row items-start justify-start gap-[20px]">
                  <div className="flex flex-col items-start justify-start pt-[13px] pb-0 pr-1.5 pl-0"></div>
                  <div className="flex flex-col items-start justify-start py-0 pr-1.5 pl-0">
                    <div className={`w-px h-8 relative ${darkMode ? "bg-gray-700" : "bg-gray-200"}`} />
                  </div>
                  <div className="h-[26px] w-10 flex flex-col items-start justify-start pt-1.5 px-0 pb-0 box-border">
                    <div
                      className={`w-10 h-5 relative rounded-3xs ${
                        darkMode ? "bg-purple-600" : "bg-gray-400"
                      } `}
                      onClick={toggleDarkMode}
                    >
                      <div className="absolute top-[0px] left-[0px] rounded-3xs bg-gray-400 w-full h-full hidden" />
                      <div
                        className={`absolute top-[3px] ${
                          darkMode ? "left-[20px]" : "left-[3px]"
                        } rounded-[50%] bg-white w-3.5 h-3.5 z-[1] transition-all`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start justify-start pt-1.5 px-0 pb-0">
                    <img
                      className="w-5 h-5 relative"
                      loading="lazy"
                      alt=""
                      src="/iconoir-halfmoon.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {wordData ? (
            <div className="self-stretch flex flex-col items-end justify-start gap-[45px] max-w-full text-xl mq825:gap-[22px]">
              <div
                className={`self-stretch rounded-2xl ${
                  darkMode ? "bg-gray-800" : "bg-gray-100"
                } overflow-hidden flex flex-row items-start justify-between py-5 px-6 box-border max-w-full gap-[20px]`}
              >
                <div className="h-16 w-[736px] relative rounded-2xl hidden max-w-full" />
                <b
                  className={`relative inline-block min-w-[92px] z-[1] mq450:text-base ${fontClass}`}
                >
                  {wordData.word}
                </b>
                <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
                  <img
                    className="w-[15.6px] h-[15.6px] relative object-cover z-[1]"
                    alt=""
                    src="/iconoir-search@2x.png"
                  />
                </div>
              </div>
              <div className="self-stretch flex flex-row items-end justify-between gap-[20px] text-45xl mq825:flex-wrap">
                <div className="flex flex-col items-start justify-start gap-[8px]">
                  <h1
                    className={`m-0 relative text-inherit font-bold font-inherit mq450:text-[38px] mq825:text-[51px] ${fontClass}`}
                  >
                    {wordData.word}
                  </h1>
                  <div className="flex flex-row items-start justify-start py-0 px-px text-5xl text-purple-600">
                    <div
                      className={`relative inline-block min-w-[100px] mq450:text-lgi ${fontClass}`}
                    >
                      {wordData.phonetics[0]?.text}
                    </div>
                  </div>
                </div>
                {wordData.phonetics[0]?.audio && (
                  <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[19px] ">
                    <button
                      onClick={() => {
                        const audio = new Audio(wordData.phonetics[0].audio);
                        audio.play();
                      }}
                    >
                      <img
                        className="w-[75px] h-[75px] relative bg rounded-full"
                        loading="lazy"
                        alt="Play"
                        src="/group 4.png"
                      />
                    </button>
                  </div>
                )}
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[40px] max-w-full text-5xl mq825:gap-[20px]">
                {wordData.meanings.map((meaning: any, index: number) => (
                  <div
                    key={index}
                    className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[20px] max-w-full"
                  >
                    <i
                      className={`relative inline-block font-bold min-w-[60px] mq450:text-lgi ${fontClass}`}
                    >
                      {meaning.partOfSpeech}
                    </i>
                    <div className="flex-1 flex flex-col items-start justify-start pt-3.5 px-0 pb-0 box-border min-w-[426px] max-w-full lg:min-w-full">
                      <div
                        className={`self-stretch h-px relative ${
                          darkMode ? "bg-gray-700" : "bg-gray-200"
                        }`}
                      />
                    </div>
                    <div
                      className={`relative text-xl ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      } inline-block min-w-[82px] mq450:text-base ${fontClass}`}
                    >
                      {meaning.definitions[0]?.definition}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              className={`self-stretch rounded-2xl border ${
                inputError ? "border-red-500" : "border-transparent"
              } focus-within:border-purple-500 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              } overflow-hidden flex flex-row items-start justify-between py-5 px-6 box-border max-w-full gap-[20px] cursor-pointer`}
            >
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchInputChange}
                className={`flex-1 outline-none text-lg border-none ${
                  darkMode ? "text-white" : "text-gray-800"
                } font-body-s-sans bg-transparent`}
                placeholder="Search for anything..."
                autoFocus
              />
              <div
                onClick={handleSearch}
                className="flex flex-col items-start justify-start pt-1 px-0 pb-0"
              >
                <img
                  className="w-[15.6px] h-[15.6px] relative object-cover z-[1]"
                  alt=""
                  src="/iconoir-search@2x.png"
                />
              </div>
            </div>
          )}
          {error && !inputError && (
            <div className="w-[736px] flex flex-col items-start justify-start gap-[44px] max-w-full mq750:gap-[22px]">
              <div className="self-stretch flex flex-row items-start justify-center py-0 pr-5 pl-[22px]">
                <h1 className="m-0 h-16 w-16 relative text-inherit font-normal font-inherit inline-block mq450:text-[38px] mq750:text-[51px]">
                  😕
                </h1>
              </div>
              <div
                className={`self-stretch flex flex-col items-end justify-start gap-[24px] text-center text-xl ${
                  darkMode ? "text-gray-300" : "text-gray-800"
                } font-body-m-sans`}
              >
                <div className="self-stretch flex flex-row items-start justify-center py-0 pr-5 pl-[21px]">
                  <b className="relative mq450:text-[16px]">{error}</b>
                </div>
                <div className="self-stretch relative text-lg leading-[24px] text-color1">
                  Sorry pal, we couldn't find definitions for the word you were
                  looking for. You can try the search again at a later time or head
                  to the web instead.
                </div>
              </div>
            </div>
          )}
          {inputError && (
            <p className="text-red-500">Whooops, can't be empty.</p>
          )}
        </div>
      </div>
      <FrameComponent
        synonyms={wordData?.meanings[0]?.synonyms}
        meanings={wordData?.meanings.map((meaning: any) => ({
          partOfSpeech: meaning.partOfSpeech,
          definitions: meaning.definitions.map((def: any) => def.definition),
          example: meaning.definitions[0]?.example,
        }))}
      />
    </div>
  );
};

export default DictionaryPage;
