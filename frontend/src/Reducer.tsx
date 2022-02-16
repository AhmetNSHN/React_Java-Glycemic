
import { ResultFoods } from "./models/IFoods";




enum reduxState {
    ADD, DELETE
  }
  
  
  export interface IProAction {
    type: reduxState,
  }
export interface IFoods {
    type: reduxState,
    payload: ResultFoods
}

function ProductReducer ( state: ResultFoods[] = [{}], action: IFoods ) {

    switch (action.type) {
        
            case reduxState.ADD:
            return [ ...state, action.payload ]

            case reduxState.DELETE:
            const index = state.findIndex( item => item.cid === action.payload.cid  )
            state.splice(index, 1)
            return [...state]
    
        default:
            return state
    }

}

export default ProductReducer