import React, { useContext, useEffect } from 'react'
import { GetDebitData } from '../../context/DebitGlobalProvider'
import Transaction from '../transaction/Transaction'

function Debit(props) {
    const { state, getDebitFromApi } = useContext(GetDebitData)

    useEffect(() => {
        getDebitFromApi()
    },[])
    const pathname = props.location.pathname.split('/')[2]
    return (
        <React.Fragment>
            <Transaction pathname={pathname} transactions={state.debits} />
        </React.Fragment>
    )
}

export default Debit