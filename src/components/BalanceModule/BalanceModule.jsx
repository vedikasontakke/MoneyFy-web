import { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import './BalanceModule.scss'

const BalanceModule = () => {
    const [total, setTotal] = useState()
    const { user } = useAuthContext()

    useEffect(()=> {
        let expenses = 0
        for (let i = 0; i < user?.expense.length; i++){
            expenses += Number(user?.expense[i].amount)
        }
        let incomes = 0
        for (let i = 0; i < user?.income.length; i++){
            incomes += Number(user?.income[i].amount)
        }
        let totalSum = incomes - expenses
        setTotal(totalSum)
    },[user?.income, user?.expense, user])

    return (
        <div className='BalanceModule'>
            <div className='chart-div'>
                <div className='icon'>
                    <p>💰</p>
                </div>
                <div>
                    <h3>Total Balance</h3>
                   {total ?  <h2>{total} ₹</h2> :  <h2>0 ₹</h2>}
                </div>
                {/* {user && <BalanceChart totalBalance={total} userInfo={user}/>} */}
            </div>
        </div>
    )
}

export default BalanceModule