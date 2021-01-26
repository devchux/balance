import React, { useContext, useEffect } from 'react'
import Transaction from '../transaction/Transaction'
import { GetCreditData } from '../../context/CreditGlobalProvider'

function Credit(props) {
    const { state, getCreditFromApi } = useContext(GetCreditData)
    
    useEffect(() => {
        getCreditFromApi()
    },[])
    const pathname = props.location.pathname.split('/')[2]
    return (
        <React.Fragment>
            <Transaction pathname={pathname} transactions={state.credits} />
        </React.Fragment>
    )
}

export default Credit
