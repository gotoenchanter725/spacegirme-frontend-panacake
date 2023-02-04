/* eslint-disable react/jsx-no-duplicate-props */
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input, Text } from 'spacegrime-uikit'
import { useUserDeadline } from 'state/user/hooks'
import QuestionHelper from '../QuestionHelper'
import TranslatedText from '../TranslatedText'

const StyledTransactionDeadlineSetting = styled.div`
  margin-bottom: 16px;
`

const Label = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 8px;
`

const Field = styled.div`
  align-items: center;
  display: inline-flex;

  & > ${Input} {
    max-width: 100px;
  }

  & > ${Text} {
    font-size: 14px;
    margin-left: 8px;
  }
`

const TransactionDeadlineSetting = () => {
  const [deadline, setDeadline] = useUserDeadline()
  const [value, setValue] = useState(deadline / 60) // deadline in minutes
  const [error, setError] = useState<string | null>(null)

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = evt.target
    setValue(parseInt(inputValue, 10))
  }

  // Updates local storage if value is valid
  useEffect(() => {
    try {
      const rawValue = value * 60
      if (!Number.isNaN(rawValue) && rawValue > 0) {
        setDeadline(rawValue)
        setError(null)
      } else {
        setError('Enter a valid deadline')
      }
    } catch {
      setError('Enter a valid deadline')
    }
  }, [value, setError, setDeadline])

  return (
    <StyledTransactionDeadlineSetting>
      <Label>
        <Text style={{ fontWeight: 400 }}>
          <TranslatedText translationId={90} style={{color: "rgb(62,67,119)"}}>Transaction deadline</TranslatedText>
        </Text>
      </Label>
      <Field>
        <Input type="number" step="1" min="1" value={value} onChange={handleChange} style={{background: 'rgba(94, 163, 235, 0.82)', boxShadow: 'unset'}}/>
        <Text style={{color: "rgb(62,67,119)"}}>Minutes</Text>
      </Field>
      <Text style={{ fontWeight: 400, color: "rgb(62,67,119)" }} fontSize="10px" >
        Your transaction will revert if it is pending for more than this long.
      </Text>
      {error && (
        <Text mt="8px" color="failure">
          {error}
        </Text>
      )}
    </StyledTransactionDeadlineSetting>
  )
}

export default TransactionDeadlineSetting
