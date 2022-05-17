import Modal from '@components/UI/Modal'
import NewUserForm from '@components/auth/NewUserForm'

const NewUserModal = ({ open }) => {
  return (
    <Modal
      open={open}
      title='Complete Your Registration'
      description='Choose a username for your account...'
    >
      <NewUserForm />
    </Modal>
  )
}

export default NewUserModal
