import {CHECK_AUTH, SET_AUTH} from '../constants';

export default (state={hasAuth: false}, action) => {
	const {hasAuth=false, type} = action;
	switch(type){
		case CHECK_AUTH:
			state.hasAuth = hasAuth;
			break;
        case SET_AUTH:
            state.authData = {name: 'zyh', age: 29, sex: 'boy'};
            break;
		default:
			break;
	}
	return state;
}