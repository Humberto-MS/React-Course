import { useFormStatus } from "react-dom"

export const SubmitButton = () => {

    const status = useFormStatus();

    return (
        <button
            type="submit"
            disabled={ status.pending }
            className="bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded flex-1 sm:flex-none">
            Agregar planeta
        </button>
    )
}