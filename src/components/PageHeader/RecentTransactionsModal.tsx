/* eslint-disable import/no-cycle */
import React, { useMemo } from 'react'
import { CheckmarkCircleIcon, ErrorIcon, Flex, LinkExternal, Text, Modal, Button, useModal } from 'spacegrime-uikit'
import { useActiveWeb3React } from 'hooks'
import { getEtherscanLink } from 'utils'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import Loader from 'components/Loader'
import  styled  from "styled-components"
import NewWindowLogo from "../../assets/Logo/Open in New Window.png"
import SuccessfullLogo from "../../assets/Logo/Successful Transaction.png"
import SettingsModal from './SettingsModal'

type RecentTransactionsModalProps = {
  onDismiss?: () => void
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const newTransactionsFirst = (a: TransactionDetails, b: TransactionDetails) => b.addedTime - a.addedTime

const getRowStatus = (sortedRecentTransaction: TransactionDetails) => {
  const { hash, receipt } = sortedRecentTransaction

  if (!hash) {
    return { icon: <Loader />, color: 'text' }
  }

  if (hash && receipt?.status === 1) {
    return { icon: <CheckmarkCircleIcon color="success" />, color: 'success' }
  }

  return { icon: <ErrorIcon color="failure" />, color: 'failure' }
}

const RecentTransactionsModal = ({ onDismiss = defaultOnDismiss }: RecentTransactionsModalProps) => {
  const { account, chainId } = useActiveWeb3React()
  const allTransactions = useAllTransactions()

  // Logic taken from Web3Status/index.tsx line 175
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const handleOnBack = () => {
    return 1;
  };

  const StyledTD = styled.td`
  padding: 13px 6px;
  font-size: 15px;
  `

  const StyledTable = styled.table`
    background: #5fb4f5db;
    color: rgb(255, 255, 255);
    border-radius: 25px;
  `
const [onSettingTransactions] = useModal(<SettingsModal />)
const onClickIcon = (id: string) => {
  if(id === "setting") {
    onSettingTransactions();
  }
}

  return (
    <Modal title="Recent Transactions" onDismiss={onDismiss} onBack={handleOnBack} hideCloseButton onClickIcon={onClickIcon}>
      <Text color="#ED4B9E" fontSize="40px" style={{ fontWeight: 400,textAlign: 'right' }}>
        Recent
      </Text>
      <Text color="#FFF" fontSize="40px" style={{ fontWeight: 400,textAlign: 'right' }}>
      Transactions
      </Text>
      {!account && (
        <Flex justifyContent="center" flexDirection="column" alignItems="center">
          <Text mb="8px" bold>
            Please connect your wallet to view your recent transactions
          </Text>
          {/* <Button variant="tertiary" size="sm" onClick={onDismiss}>
            Close
          </Button> */}
        </Flex>
      )}
      {account && chainId && sortedRecentTransactions.length === 0 && (
        <Flex justifyContent="center" flexDirection="column" alignItems="center">
          <StyledTable>
            <tbody>
             <tr>
             <StyledTD>SWAP 600000000000 GRIMAX FOR 1 BNB </StyledTD>
              <StyledTD><img src={NewWindowLogo} alt="" /></StyledTD>
              <StyledTD><img src={SuccessfullLogo} alt="" /></StyledTD>
             </tr>
             <tr style={{background: '#74c8f999'}}>
             <StyledTD>SWAP 600000000000 GRIMAX FOR 1 BNB </StyledTD>
              <StyledTD><img src={NewWindowLogo} alt="" /></StyledTD>
              <StyledTD><img src={SuccessfullLogo} alt="" /></StyledTD>
             </tr>
             <tr>
             <StyledTD>SWAP 600000000000 GRIMAX FOR 1 BNB </StyledTD>
              <StyledTD><img src={NewWindowLogo} alt="" /></StyledTD>
              <StyledTD><img src={SuccessfullLogo} alt="" /></StyledTD>
             </tr>
             <tr style={{background: '#74c8f999'}}>
             <StyledTD>SWAP 600000000000 GRIMAX FOR 1 BNB </StyledTD>
              <StyledTD><img src={NewWindowLogo} alt="" /></StyledTD>
              <StyledTD><img src={SuccessfullLogo} alt="" /></StyledTD>
             </tr>
            </tbody>
          </StyledTable>
          {/* <Text mb="8px" bold>
            No recent transactions
          </Text> */}
          {/* <Button variant="tertiary" size="sm" onClick={onDismiss}>
            Close
          </Button> */}
        </Flex>
      )}
      {account &&
        chainId &&
        sortedRecentTransactions.map((sortedRecentTransaction) => {
          const { hash, summary } = sortedRecentTransaction
          const { icon, color } = getRowStatus(sortedRecentTransaction)

          return (
            <>
              <Flex key={hash} alignItems="center" justifyContent="space-between" mb="4px">
                <LinkExternal href={getEtherscanLink(chainId, hash, 'transaction')} color={color}>
                  {summary ?? hash}
                </LinkExternal>
                {icon}
              </Flex>
            </>
          )
        })}
      <Text onClick={onDismiss} style={{textAlign: 'right',color: '#fff', cursor: 'pointer'}}>
        CLOSE POPUP
      </Text>
    </Modal>
  )
}

export default RecentTransactionsModal
