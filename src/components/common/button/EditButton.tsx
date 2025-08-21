export function EditButton(props: { editing: boolean; handleEdit: () => void; text1?: string; text2?: string }) {
    let text1 = props.text1 ?? '편집' 
    let text2 = props.text2 ?? '완료'
    return (<button onClick={props.handleEdit} className='text-16 text-gray3'>{props.editing ? text2 : text1}</button>)
}