'use client'
import { editBio } from "../utils/edit";

export default function EditBio({id}) {
    return(
            <button onClick={() => {
                        editBio(id);
                    }}>Edit Bio</button>
    )
}