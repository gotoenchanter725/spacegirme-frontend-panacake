import React from 'react'
import useI18n from 'hooks/useI18n'

export interface TranslatedTextProps {
  translationId: number
  children: string
  style?: any
}

const TranslatedText = ({ translationId, children, style }: TranslatedTextProps) => {
  const TranslateString = useI18n()
  return <div style={style}>{TranslateString(translationId, children)}</div>
}

export default TranslatedText
