import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { addNewEmptyNote, savingNewNote, setActiveNote, startNewNote } from "../../../src/store";
import { FirebaseDB } from "../../../src/firebase";

describe ( 'Pruebas en Journal Thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();
    beforeEach ( () => jest.clearAllMocks() );

    test ( 'startNewNote debe de crear una nueva nota en blanco', async () => {
        const uid = 'TEST-UID';
        getState.mockReturnValue ( { auth: { uid: uid } } )
        await startNewNote()( dispatch, getState );
        expect ( dispatch ).toHaveBeenCalledWith ( savingNewNote () );
        
        expect ( dispatch ).toHaveBeenCalledWith ( addNewEmptyNote ( {
            body: '',
            title: '',
            id: expect.any ( String ),
            date: expect.any ( Number ),
            imageUrls: [],
        } ) );

        expect ( dispatch ).toHaveBeenCalledWith ( setActiveNote ( {
            body: '',
            title: '',
            id: expect.any ( String ),
            date: expect.any ( Number ),
            imageUrls: [],
        } ) );

        const collection_ref = collection ( FirebaseDB, `${ uid }/journal/notes` );
        const docs = await getDocs ( collection_ref );
        const delete_promises = [];
        docs.forEach ( doc => delete_promises.push ( deleteDoc ( doc.ref ) ) );
        await Promise.all ( delete_promises );
    } );
} );