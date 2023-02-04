/* eslint-disable import/no-cycle */
/* eslint-disable import/no-self-import */
/* eslint-disable import/no-unresolved */
import React from 'react'
import { IconButton, Modal, Text, useModal } from 'spacegrime-uikit'
import InterfaceSetting from './InterfaceSetting'
import SlippageToleranceSetting from './SlippageToleranceSetting'
import TransactionDeadlineSetting from './TransactionDeadlineSetting'
import RecentTransactionsModal from './RecentTransactionsModal'
// import RecentIcon from "../../assets/Logo/Open in New Window.png"
// import SettingIcon from "../../assets/Logo/Successful Transaction.png"

type SettingsModalProps = {
  onDismiss?: () => void
}
// background-position: right 0px
// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const SettingsModal = ({ onDismiss = defaultOnDismiss }: SettingsModalProps) => {
  const handleOnBack = () => {
    return 1;
  };
  const [onPresentRecentTransactions] = useModal(<RecentTransactionsModal />)
  
  const onClickIcon = (id: string) => {
    if(id === "recent") {
      onPresentRecentTransactions();
    }
  }
  return (
    <Modal title="Settings" onDismiss={onDismiss} onBack={handleOnBack} hideCloseButton onClickIcon={onClickIcon}>
      <SlippageToleranceSetting />
      <TransactionDeadlineSetting />
      <InterfaceSetting />
      <Text onClick={onDismiss} style={{textAlign: 'right',color: '#fff', cursor: 'pointer'}}>
        UPDATE SETTINGS
      </Text>
      {/* <IconButton variant="text" title="Settings">
        <img src={SettingIcon} alt="" width="80px" />
      </IconButton>
      <IconButton variant="text" onClick={onPresentRecentTransactions} title="Recent transactions">
        <img src={RecentIcon} alt="" width="80px" />
      </IconButton> */}
    </Modal>
  )
}

export default SettingsModal
