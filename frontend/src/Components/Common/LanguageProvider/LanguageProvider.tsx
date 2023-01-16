import React, { useState, createContext } from 'react'
import { languageOptions, dictionaryList, DictionaryListType } from '../Languages/language'



type ProviderType = {
  dictionary: DictionaryListType
  languageChange: (selected:string) => void
  language : LanguageType
}

export type LanguageContextType = {
  language : string 
  dictionary : DictionaryListType
  languageChange: (selected:string) => void
}

type LanguageType = 'arm' | 'ru' | 'en' 

// create the language context with default selected language
const defaultContext:LanguageContextType = {
  language: 'arm',
  dictionary: dictionaryList.arm,
  languageChange: () => {}
}

export const LanguageContext = createContext(defaultContext)

// it provides the language context to app

type PropsType = {
  children:React.ReactNode
}

export const LanguageProvider:React.FC<PropsType> = ({children}) => {
 
  let defaultLanguage
  if(window.localStorage.getItem('lang')){
    defaultLanguage = 'arm' as LanguageType
  }
   
  const [language, setLanguage] = useState(defaultLanguage || 'arm')

  const provider:ProviderType = {
    language,
    dictionary: dictionaryList[language as LanguageType],
    languageChange: (selected : string) => {
      const newLanguage = languageOptions[selected as LanguageType] ? selected : 'arm'
      setLanguage(newLanguage as LanguageType);
      window.localStorage.setItem('lang', newLanguage)
    }
  };

  return (
    <LanguageContext.Provider value={provider}>
      {children}
    </LanguageContext.Provider>
  )
}

