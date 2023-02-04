import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input, Text, Toggle } from 'spacegrime-uikit'
import TranslatedText from '../TranslatedText'

const StyledInterfaceSetting = styled.div`
  margin-bottom: 16px;
`

const Label = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 8px;
`

const NewContent = styled.div`
    display: flex; 
    margin-bottom: 15px !important;
`

const InterfaceSetting = () => {

  const [isCheckedMode, setCheckedMode] = useState(false);
  const [isCheckedMultiHops, setCheckedMultiHops] = useState(false);

  const toggleMode = () => {
    setCheckedMode(!isCheckedMode);
  }

  const toggleMultiHops = () => {
    setCheckedMultiHops(!isCheckedMultiHops);
  }
  
  return (
    <StyledInterfaceSetting>
      <Label>
        <Text style={{ fontWeight: 400 }}>
          <TranslatedText translationId={90} style={{color: "rgb(62,67,119)"}} >Interface Settings</TranslatedText>
        </Text>
      </Label>
      <NewContent>
        <div>
          <Text fontSize="18px" style={{color: "rgb(62,67,119)"}}>Toggle Expert Mode</Text>
          <Text fontSize="10px" style={{color: "rgb(62,67,119)"}} >Bypasses confirmation modals and allow high slippage trades.</Text>
          <Text fontSize="10px" style={{ fontWeight: 600 }} color="#ED4B9E">
            Use at your own risk.
          </Text>
        </div>
        <div>
          <Toggle checked={isCheckedMode} onChange={toggleMode} />
        </div>
      </NewContent>
      <NewContent>
        <div style={{width: '100%'}}>
          <Text fontSize="18px" style={{color: "rgb(62,67,119)"}} >Disable Multihops</Text>
          <Text fontSize="10px" style={{color: "rgb(62,67,119)"}} >Restrict swaps to direct paires only.</Text>
        </div>
        <div>
          <Toggle checked={isCheckedMultiHops} onChange={toggleMultiHops} />
        </div>
      </NewContent>
    </StyledInterfaceSetting>
  )
}

export default InterfaceSetting
