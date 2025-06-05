export function EditButton(props: { editing: boolean; handleEdit: () => void }) {
    return (<button onClick={props.handleEdit} className='text-16 text-gray3'>{props.editing ? '완료' : '편집'}</button>)
}