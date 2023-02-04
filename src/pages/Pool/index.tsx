import React, { useContext, useMemo } from 'react'
import styled,  { ThemeContext } from 'styled-components'
import { Pair } from '@pancakeswap-libs/sdk'
import { Button, CardBody, Text } from 'spacegrime-uikit'
import { Link } from 'react-router-dom'
import CardNav from 'components/CardNav'
import Question from 'components/QuestionHelper'
import FullPositionCard from 'components/PositionCard'
import { useUserHasLiquidityInAllTokens } from 'data/V1'
import { useTokenBalancesWithLoadingIndicator } from 'state/wallet/hooks'
import { StyledInternalLink, TYPE } from 'components/Shared'
import { LightCard } from 'components/Card'
import { RowBetween } from 'components/Row'
import { AutoColumn } from 'components/Column'
import { useSelector } from "react-redux";

import { useActiveWeb3React } from 'hooks'
import { usePairs } from 'data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from 'state/user/hooks'
import { Dots } from 'components/swap/styleds'
import TranslatedText from 'components/TranslatedText'
import { TranslateString } from 'utils/translateTextHelpers'
import PageHeader from 'components/PageHeader'
import AppBody from '../AppBody'

const { body: Body } = TYPE

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()
  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map((tokens) => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map((tpwlt) => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens,
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some((V2Pair) => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const hasV1Liquidity = useUserHasLiquidityInAllTokens()

  const CustomNavDiv = styled.div`
    display: flex;
    align-item: center;
    flex-direction: column;
  `
  const mode = useSelector<any>((state) => state.user.isDarkMode );

  const getButtonShadow = () => {
    if(!mode)
      return{boxShadow: '10px 12px 30px -6px rgba(15,15,110, 0.5)', background: '#dadbe6', border: 'none'}
    return {boxShadow: 'rgba(29,29,112,.97) 2px 0px 17px 10px', background: 'rgb(58,57,150)', border: 'none'}
  }

  

  return (
    <>
      <AppBody>
        <CustomNavDiv>
          <CardNav activeIndex={1} />
          {/* <PageHeader title="" description="" /> */}
        </CustomNavDiv>
        <Button 
          id="join-pool-button" 
          as={Link} to="/add/ETH" 
          style={{background: '#1c8ffe', borderRadius: '50px', padding: '20px', marginBottom: '20px'}}
        >
          <TranslatedText translationId={100}>ADD LIQUIDITY</TranslatedText>
        </Button>
        <AutoColumn gap="lg" justify="center">
          <CardBody>
            <AutoColumn gap="12px" style={{ width: '100%' }}>
              <RowBetween padding="0 8px">
                <Text color='#7f7fa2' style={{textAlign: 'center'}}>
                  <TranslatedText translationId={102} style={{marginLeft: '-35px'}} >Your Liquidity</TranslatedText>
                </Text>
                <Question
                  text={TranslateString(
                    130,
                    'When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below.'
                  )}
                />
              </RowBetween>

              {!account ? (
                <LightCard style={getButtonShadow()} >
                  <Body style={{color: '#78789b'}} textAlign="center">
                    Connect to a wallet to view your liquidity.
                  </Body>
                </LightCard>
              ) : v2IsLoading ? (
                <LightCard padding="40px">
                  <Body color={theme.colors.textDisabled} textAlign="center">
                    <Dots>Loading</Dots>
                  </Body>
                </LightCard>
              ) : allV2PairsWithLiquidity?.length > 0 ? (
                <>
                  {allV2PairsWithLiquidity.map((v2Pair) => (
                    <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                  ))}
                </>
              ) : (
                <LightCard>
                  <Body color={theme.colors.textDisabled} textAlign="center" >
                    <TranslatedText translationId={104}>No liquidity found.</TranslatedText>
                  </Body>
                </LightCard>
              )}

              <div>
                <Text fontSize="14px" style={{ padding: '.5rem 0 .5rem 0' }}>
                  {hasV1Liquidity
                    ? 'Uniswap V1 liquidity found!'
                    : TranslateString(106, "Don't see a pool you joined?")}{' '}
                  <StyledInternalLink id="import-pool-link" to={hasV1Liquidity ? '/migrate/v1' : '/find'}>
                    {hasV1Liquidity ? 'Migrate now.' : TranslateString(108, 'Import it.')}
                  </StyledInternalLink>
                </Text>
                <Text fontSize="14px" color='#7f7fa2' style={{textAlign: 'center', padding: '.5rem 0 .5rem 0' }}>
                  Dont see a pool you joined? <span style={{color:'#f94ec8'}}>Improve it.</span>
                </Text>
              </div>
            </AutoColumn>
          </CardBody>
        </AutoColumn>
      </AppBody>
    </>
  )
}
