import {ReduxState} from '@/lib/redux'
import {createSelector} from '@reduxjs/toolkit'
import * as R from 'ramda'

const selectJsonFormState = (state: ReduxState) => state.jsonForm.formState

export const selectFormStateById = (formId: string) => createSelector([selectJsonFormState], (formStates) => {
    return R.prop(formId, formStates)
})

export const selectValueById = (formId: string) => createSelector([selectFormStateById(formId)], (formState) => {
    return R.prop('value', formState)
})


