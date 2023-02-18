import {RECETA_ESPECIFICA} from '../types';

const initialState = {
    // film: {},
    recetas : []
};

const busquedaRecetasReducer = (state = initialState, action) => {
    switch(action.type){
        //GUARDO EN EL ESTADO LOS DATOS DEL USUARIO LOGUEADO
        case RECETA_ESPECIFICA :
            return action.payload;

        // case MOVIES_TITLE :
        //     return {...state, recetas: action.payload};

        default :
            return state
    }
}

export default busquedaRecetasReducer;