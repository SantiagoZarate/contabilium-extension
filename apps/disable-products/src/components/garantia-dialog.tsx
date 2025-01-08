import './garantia-dialog.css'
import '../styles/index.css'
import { Button } from '@contabilium-extensions/ui'

interface Props {
  title: string
}

export default function GarantiaDialog({ title }: Props){
  const handleCloseDialog = () => {
    const dialogElement = document.querySelector('#react-dialog-container')!
    dialogElement.remove()
    console.log('Removing dialog');
  }

  return (
    <section className='garantia-dialog bg-green-500'>
      garantia dialog {title}
      <section>
        <Button onClick={() => handleCloseDialog()}>close</Button>
      </section>
    </section>
  )
}