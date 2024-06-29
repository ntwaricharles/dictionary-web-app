import { FunctionComponent } from "react";

export type DictionaryComponentType = {
  className?: string;
  synonyms?: string[];
  meanings?: { partOfSpeech: string; definitions: string[]; example?: string }[];
};

const DictionaryComponent: FunctionComponent<DictionaryComponentType> = ({
  className = "",
  synonyms = [],
  meanings = [],
}) => {
  return (
    <div
      className={`w-[756px] flex flex-col items-start justify-start py-0 pr-0 pl-5 box-border gap-[40px] max-w-full text-left text-xl text-color font-body-s-sans mq825:gap-[20px] ${className}`}
    >
      {synonyms.length > 0 && (
        <div className="flex flex-row items-start justify-start gap-[22px]">
          <div className="relative inline-block min-w-[98px] mq450:text-base">
            Synonyms
          </div>
          <b className="relative text-a445ed mq450:text-base">
            {synonyms.join(", ")}
          </b>
        </div>
      )}
      <div className="self-stretch flex flex-col items-end justify-start gap-[25px] max-w-full text-5xl text-d2d2d">
        {meanings.map((meaning, index) => (
          <div
            key={index}
            className="self-stretch flex flex-col items-start justify-start gap-[40px] max-w-full mq825:gap-[20px]"
          >
            <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[26px] max-w-full">
              <i className="relative inline-block font-bold min-w-[54px] mq450:text-lgi">
                {meaning.partOfSpeech}
              </i>
              <div className="flex-1 flex flex-col items-start justify-start pt-3.5 px-0 pb-0 box-border min-w-[426px] max-w-full lg:min-w-full">
                <div className="self-stretch h-px relative bg-e9e9e9" />
              </div>
            </div>
            <div className="relative text-xl text-color inline-block min-w-[82px] mq450:text-base">
              Meaning
            </div>
            {meaning.definitions.map((definition, defIndex) => (
              <div key={defIndex} className="w-[714px] flex flex-col items-start justify-start gap-[13px] max-w-full text-lg">
                <div className="flex flex-row items-start justify-start gap-[20px]">
                  <div className="flex flex-col items-start justify-start pt-2.5 px-0 pb-0">
                    <div className="w-[5px] h-[5px] relative rounded-[50%] bg-f19e8" />
                  </div>
                  <div className="relative leading-[24px]">
                    {definition}
                  </div>
                </div>
                {meaning.example && (
                  <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-[25px] box-border max-w-full text-color">
                    <blockquote className="m-0 flex-1 relative leading-[24px] inline-block max-w-full">
                      “{meaning.example}”
                    </blockquote>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DictionaryComponent;
