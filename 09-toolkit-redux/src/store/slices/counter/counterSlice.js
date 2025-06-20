import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        counter: 10
    },
    reducers: {
        increment: (state) => {
            state.counter++;
        },
        decrement: (state) => {
            state.counter--;
        },
        incrementByAmount: (state, action) => {
            state.counter += action.payload;
        },
    },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions