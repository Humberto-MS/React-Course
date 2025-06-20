import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, startLoadingNotes } from "../store";
import { FirebaseAuth } from "../firebase";

export const useCheckAuth = () => {
    
    const { status } = useSelector ( state => state.auth );
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged ( FirebaseAuth, async ( user ) => {
            if ( !user ) return dispatch ( logout() );
            const { uid, email, displayName, photoURL } = user;
            dispatch ( login ({ uid, email, displayName, photoURL }) );
            dispatch ( startLoadingNotes() );
        } );
    }, []);

    return status;
}