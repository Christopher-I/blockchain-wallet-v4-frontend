import * as AT from './actionTypes'
import { assoc } from 'ramda'
import { Remote } from 'blockchain-wallet-v4/src'

const INITIAL_STATE = {
  step: 1,
  checkDestination: Remote.NotAsked,
  isDestinationExchange: Remote.NotAsked,
  payment: Remote.NotAsked,
  feeToggled: false,
  showNoAccountForm: false
}

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action

  switch (type) {
    case AT.INITIALIZED:
    case AT.DESTROYED: {
      return INITIAL_STATE
    }
    case AT.PAYMENT_UPDATED_LOADING: {
      return assoc('payment', Remote.Loading, state)
    }
    case AT.PAYMENT_UPDATED_SUCCESS: {
      return assoc('payment', Remote.Success(payload), state)
    }
    case AT.PAYMENT_UPDATED_FAILURE: {
      return assoc('payment', Remote.Failure(payload), state)
    }
    case AT.SEND_XLM_CHECK_DESTINATION_ACCOUNT_EXISTS_LOADING: {
      return assoc('checkDestination', Remote.Loading, state)
    }
    case AT.SEND_XLM_CHECK_DESTINATION_ACCOUNT_EXISTS_SUCCESS: {
      return assoc('checkDestination', Remote.Success(payload), state)
    }
    case AT.SEND_XLM_CHECK_DESTINATION_ACCOUNT_EXISTS_FAILURE: {
      return assoc('checkDestination', Remote.Failure(payload), state)
    }
    case AT.SEND_XLM_CHECK_IF_DESTINATION_IS_EXCHANGE_LOADING: {
      return assoc('isDestinationExchange', Remote.Loading, state)
    }
    case AT.SEND_XLM_CHECK_IF_DESTINATION_IS_EXCHANGE_SUCCESS: {
      return assoc('isDestinationExchange', Remote.Success(payload), state)
    }
    case AT.SEND_XLM_CHECK_IF_DESTINATION_IS_EXCHANGE_FAILURE: {
      return assoc('isDestinationExchange', Remote.Failure(payload), state)
    }
    case AT.FIRST_STEP_SUBMIT_CLICKED: {
      return assoc('step', 2, state)
    }
    case AT.SECOND_STEP_CANCEL_CLICKED: {
      return assoc('step', 1, state)
    }
    case AT.FIRST_STEP_FEE_TOGGLED: {
      return assoc('feeToggled', !state.feeToggled, state)
    }
    case AT.SHOW_NO_ACCOUNT_FORM: {
      return assoc('showNoAccountForm', payload.shouldShow, state)
    }
    default:
      return state
  }
}
