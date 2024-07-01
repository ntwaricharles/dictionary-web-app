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
  console.log(wordData);
  const fetchWordData = async (term: string) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${term}`
      );

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

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
    // main container
    <div
      className={`w-full min-h-screen relative px-6 py-8  ${
        darkMode ? "bg-black text-white" : "bg-white text-gray-800"
      } `}
    >
      {/* top 1st section */}

      <div className="w-full lg:w-1/2 mx-auto flex justify-between pt-6 px-2">
        <img
          className="h-9 w-8 relative object-cover  filter brightness-100 dark:brightness-50"
          alt=""
          src="/iconoir-book@2x.png"
          style={{
            filter: darkMode ? "brightness(50%)" : "brightness(100%)",
          }}
        />
        <div className="flex gap-3">
          <select
            value={selectedFont}
            onChange={handleFontChange}
            className={` leading-[24px] font-bold text-[inherit] inline-block min-w-[90px] outline-none mr-2 px-4 py-2 border-none rounded bg-transparent ${
              darkMode ? "bg-black text-white" : "text-gray-800"
            }`}
          >
            <option value="Sans Serif">Sans Serif</option>
            <option value="Serif">Serif</option>
            <option value="Monospace">Monospace</option>
          </select>
          <section className="icons container flex gap-8 items-center">
            {/* toggle icon */}
            <div className="h-8 w-10 flex flex-col items-start justify-start pt-1.5 /* px-0 pb-0  */box-border">
              <div
                className={` sm:w-12 sm:h-7 relative rounded-2xl ${
                  darkMode ? "bg-purple-600" : "bg-gray-400"
                } `}
                onClick={toggleDarkMode}
              >
                <div className="absolute top-[0px] left-[0px] rounded-3xs bg-gray-400 w-full h-full hidden" />
                <div
                  className={`absolute top-[3px] ${
                    darkMode ? "left-[20px]" : "left-[3px]"
                  } rounded-[50%] bg-white sm:w-5 sm:h-5 w-3.5 h-3.5 z-[1] transition-all`}
                />
              </div>
            </div>
            <img
              className="w-8 h-8 relative"
              loading="lazy"
              alt=""
              src="/iconoir-halfmoon.svg"
            />
          </section>
        </div>
      </div>
      {/* search section */}
      <section className="w-full lg:w-1/2 mx-auto px-8 py-20">
        {wordData ? (
          <div className="self-stretch flex flex-col items-end justify-start gap-[45px] max-w-full text-xl mq825:gap-[22px]">
            <div
              className={`self-stretch rounded-2xl ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              } overflow-hidden flex flex-row items-start justify-between py-5 px-6 box-border max-w-full gap-[20px]`}
            >
              <div className="h-16 w-[736px] relative rounded-2xl hidden max-w-full" />
              <h1
                className={`relative inline-block min-w-[92px] z-[1] mq450:text-base ${fontClass}`}
              >
                {wordData.word}
              </h1>
              <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
                <img
                  className="w-[15.6px] h-[15.6px] relative object-cover z-[1]"
                  alt=""
                  src="/iconoir-search@2x.png"
                />
              </div>
            </div>
            {/* key word section */}
            <section className=" w-full flex justify-between">
              <div>
                <h1 className={`font-bold text-3xl sm:text-4xl ${fontClass}`}>
                  {wordData.word}
                </h1>
                <p className={`${fontClass} text-purple-600`}>
                  {wordData.phonetics[1]?.text}
                </p>
              </div>
              {wordData.phonetics[0]?.audio && (
                <div className="flex flex-col items-start justify-end ">
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
            </section>
            {/* meaning section */}
            <div className="w-full flex flex-col items-start justify-start gap-8 ">
              {wordData.meanings.map((meaning: any, index: number) => (
                <div
                  key={index}
                  className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[20px] max-w-full"
                >
                  <div className="container items-center flex gap-2">
                    <h1 className={` flex-1 font-bold text-3xl ${fontClass}`}>
                      {meaning.partOfSpeech}
                    </h1>
                    <div
                      className={`w-4/5 h-0.5 flex-4 ${
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
            className={`self-stretch rounded-2xl border relative ${
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
        {inputError && (
          <p className="text-red-500  z-40 mt-2">Whooops, can't be empty.</p>
        )}
      </section>
      {/* eeeroor */}
      {error && !inputError && (
        <div className="w-full flex flex-col items-center justify-center gap-8 ">
          <h1 className="text-3xl sm:text-6xl ">😕</h1>

          <div
            className={`self-stretch flex flex-col items-center justify-start gap-[24px] text-center text-xl ${
              darkMode ? "text-gray-300" : "text-gray-800"
            } font-body-m-sans`}
          >
            <h1 className="relative text-3xl font-bold">{error}</h1>

            <div className="self-stretch relative text-lg leading-[24px] text-color1">
              Sorry pal, we couldn't find definitions for the word you were
              looking for. You can try the search again at a later time or head
              to the web instead.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DictionaryPage;
