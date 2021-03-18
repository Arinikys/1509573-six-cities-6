import {NameSpace} from '../root-reducer';

export const getComments = (state) => state[NameSpace.COMMENTS].comments;
export const getOnLoadCommentsData = (state) => state[NameSpace.COMMENTS].onLoadCommentsData;
export const getOnLoadCommentsFormData = (state) => state[NameSpace.COMMENTS].onLoadCommentsFormData;
export const getCommentsFormError = (state) => state[NameSpace.COMMENTS].commentsFormError;


