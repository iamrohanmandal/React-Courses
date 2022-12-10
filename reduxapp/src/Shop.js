import React from 'react'
import { useDispatch } from 'react-redux/es/exports'
import { bindActionCreators } from 'redux'
// import { bindActionCreators } from 'redux'
import { useSelector } from 'react-redux/es/exports'
import {actionCreators} from './state/index'
const Shop = () => {
  const balance = useSelector(state => state.amount)
  const dispatch = useDispatch()
  const {withdrawMoney, depositMoney} = bindActionCreators(actionCreators, dispatch)
  return (
    <div>
        <h2>Deposit/Withdraw Money</h2>
        {/* <button className="btn btn-primary mx-2 my-2" onClick={()=>{dispatch(actionCreators.withdrawtMoney(100))}}>-</button>
        Update Balance
        <button className="btn btn-primary mx-2 my-2" onClick={()=>{dispatch(actionCreators.depositMoney(100))}}>+</button> */}
       <button className="btn btn-primary mx-2 my-2" onClick={()=>{withdrawMoney(100)}}>-</button>
        Update Balance({balance})
        <button className="btn btn-primary mx-2 my-2" onClick={()=>{depositMoney(100)}}>+</button>
    </div>
  )
}

export default Shop