import { test_user_credentials } from "./testUser"

export const initial_state = {
    status: 'checking',
    user: {},
    errorMessage: undefined,
}

export const authenticated_state = {
    status: 'authenticated',
    user: test_user_credentials,
    errorMessage: undefined,
}

export const not_authenticated_state = {
    status: 'not-authenticated',
    user: {},
    errorMessage: undefined,
}